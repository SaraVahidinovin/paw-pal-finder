import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/GlobalAuthContext';
import { Dog } from '../types';
import ProductCard from '../components/ProductCard';
import { dogsLoader } from '../loader/loader';
import Header from '../components/Header';

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
            <button onClick={handleNavigation}>Add</button>
            {userDogs.length === 0 ? (
                <p>You have not added any dogs yet.</p>
            ) : (
                <section className="card-container">
                    {userDogs.map(dog => (
                        <ProductCard 
                            key={dog.chipNumber} 
                            dog={dog} 
                            isUserDog={true}  // Show edit and delete options only for user’s dogs
                        />
                    ))}
                </section>
            )}
        </section>
    </section>
    );
}