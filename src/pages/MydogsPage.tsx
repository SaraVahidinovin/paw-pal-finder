import { useLoaderData, useNavigate } from 'react-router-dom';
import { Dog } from '../types';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/myDogsPage.css'

export default function MyDogsPage() {
    const dogs = useLoaderData() as Dog[];
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Filter the dogs to show only the ones added by the logged-in user
    const userDogs = dogs.filter((dog: Dog) => dog.addedBy === loggedInUser);

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/addDog', { state: { mode: 'create' } })
    };


    return (
        <section className="my-dogs-container">
        <section className="header-container">
        <Header />
        </section>
        <section className="my-dogs-content">
            <h1>Your Dogs Awaiting New Homes</h1>
            <button onClick={handleNavigation} title='Add a new dog' className='add-button'>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            {userDogs.length === 0 ? (
                <p>You have not added any dogs yet.</p>
            ) : (
                <section className="card-container">
                    {userDogs.map(dog => (
                        <ProductCard 
                            key={dog.chipNumber} 
                            dog={dog} 
                            isUserDog={true}  // To show edit and delete options only for user’s dogs
                        />
                    ))}
                </section>
            )}
        </section>
    </section>
    );
}