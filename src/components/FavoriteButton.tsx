import { Dog } from '../types';
import { useContext } from 'react';
import GlobalStateContext from '../context/GlobalStateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import '../styles/favoriteButton.css'

interface FavoriteButtonProps {
    dog: Dog;
}

export default function FavoriteButton({ dog }: FavoriteButtonProps) {
    const { favorites, setFavorites } = useContext(GlobalStateContext);

    // Check if the current dog is already in the list of favorites
    const isFavorite = favorites.some(favorite => favorite.id === dog.id);

    // Add the current dog to the favorites list
    function addFavorite() {
        setFavorites([...favorites, dog]);
    }

    // Remove the current dog from the favorites list
    function removeFavorite() {
        setFavorites(favorites.filter(favorite => favorite.id !== dog.id));
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
        <button className="favorite-icon" onClick={handleFavoriteClick}
            style={{ color: isFavorite ? 'red' : 'white' }}>
            <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} title={isFavorite ? 'Remove from favorite': 'Add to favorite'} />
        </button>
    );
}