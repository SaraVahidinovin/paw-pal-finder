import { Dog } from '../types';
import { useNavigate } from 'react-router-dom';
import '../styles/productCard.css'
import FavoriteButton from './FavoriteButton';

interface ProductCardProps {
    dog: Dog;
    isUserDog?: boolean;  // Prop to determine if the dog belongs to the logged-in user
}

export default function ProductCard({ dog, isUserDog }: ProductCardProps) {

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
        navigate(`/editDog/${dog.id}`, { state: { mode: 'edit', dog } });
    };

    const handleClick = (dog: Dog) => {
        // Navigate to the details page using the dog's Id
        navigate(`/dogInfo/${dog.id}`, { state: { dog } });
    };

    return (
        <article className="product-card" onClick={() => handleClick(dog)} style={{ cursor: 'pointer' }}>
            <div className="img-wrapper">
                <FavoriteButton dog={dog} />
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



