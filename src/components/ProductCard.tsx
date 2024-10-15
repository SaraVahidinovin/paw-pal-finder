import { Dog } from '../types';
import GlobalStateContext from '../context/GlobalStateContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/productCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

interface ProductCardProps {
    dog: Dog;
    isUserDog: boolean;  // Prop to determine if the dog belongs to the logged-in user
}

export default function ProductCard({ dog, isUserDog }: ProductCardProps) {
    // Destructure the global context to use the setFavorites function
    const { favorites, setFavorites } = useContext(GlobalStateContext);

    // Check if the current dog is already in the list of favorites
    const isFavorite = favorites.some(favorite => favorite.chipNumber === dog.chipNumber);

    // Add the current dog to the favorites list
    function addFavorite() {
        setFavorites([...favorites, dog]);
    }

    // Remove the current dog from the favorites list
    function removeFavorite() {
        setFavorites(favorites.filter(favorite => favorite.chipNumber !== dog.chipNumber));
    }

    // Toggle between adding and removing the dog from favorites
    function handleFavoriteClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();  // Prevent event from bubbling up
        if (isFavorite) {
            removeFavorite();  // If already a favorite, remove it
        } else {
            addFavorite();     // If not a favorite, add it
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        // Ask for confirmation before deleting the dog
        const confirmed = window.confirm('Are you sure you want to delete this dog?');

        if (!confirmed) {
            return;  // If the user cancels, exit the function
        }

        try {
            const response = await fetch(`http://localhost:5000/dogs/${dog.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Dog deleted successfully!');

                // Navigate to MyDogsPage and trigger the page reload
                navigate('/mydogs', { replace: true });
            } else {
                console.error('Failed to delete dog.');
            }
        } catch (error) {
            console.error('Error deleting dog:', error);
        }
    };

    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        // Navigate to the edit page 
        navigate(`/editDog/${dog.id}`, { state: { dog } });
    };

    const handleClick = (dog: Dog) => {
        // Navigate to the details page using the dog's Id
        navigate(`/dogInfo/${dog.id}`, { state: { dog } });
    };

    return (
        <article className="product-card" onClick={() => handleClick(dog)} style={{ cursor: 'pointer' }}>
            <div className="img-wrapper">
                <button className="favorite-icon" onClick={handleFavoriteClick}
                    style={{ color: isFavorite ? 'red' : 'white' }}>
                    <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
                </button>
                <img src={dog.img} alt={dog.name} className="card-image" />
            </div>
            <section className="card-content">
                <h3 className="name">{dog.name}</h3>
                <h3 className="gender">{dog.sex}</h3>
                <h3 className="breed">{dog.breed}</h3>
                <h3 className="age">{dog.age} years old</h3>
            </section>
            {isUserDog && (
                <section className="dog-actions">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </section>
            )}
        </article>
    )
}



