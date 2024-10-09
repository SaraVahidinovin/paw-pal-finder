import { Dog } from '../types';
import GlobalStateContext from '../context/GlobalStateContext';
import { useContext } from 'react';

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
        setFavorites(favorites.filter(favorite => favorite.chipNumber !== favorite.chipNumber));
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

    return (
        <article className="product-card">
            <button className="favorite-icon" onClick={handleFavoriteClick}
             style={{ color: isFavorite ? 'red' : 'white' }}
            >
            ❤️
            </button>
            <img src={dog.img} alt={dog.name} className="card-image" />
            <section className="card-content">
                <h3 className="name">{dog.name}</h3>
                <span className="gender">{dog.sex}</span>
                <span className="breed">{dog.breed}</span>
                <span className="age">{dog.age}years old</span>
            </section>
        </article>
    )
}



