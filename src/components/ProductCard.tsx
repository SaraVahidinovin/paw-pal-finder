import { Dog } from '../types';
import GlobalStateContext from '../context/GlobalStateContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/productCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


export default function ProductCard({ dog }: { dog: Dog }) {
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

    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    const handleClick = (dog: Dog) => {
        // Navigate to the details page using the dog's chipNumber
        navigate(`/dogInfo/${dog.chipNumber}`, { state: { dog } });
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
        </article>
    )
}



