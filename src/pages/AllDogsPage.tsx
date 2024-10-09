import { useNavigate } from 'react-router-dom';
import { useLoaderData} from 'react-router-dom';
import { Dog } from '../types';
import ProductCard from '../components/ProductCard';

export default function AllDogsPage() {
    const dogs = useLoaderData() as Dog[];

    // Hook to handle navigation
    const navigate = useNavigate(); 

    return (
        <>
            <div>
                <h1>Explore Dogs Ready For Adoption</h1>
                <div className="card-container">
                    {dogs.map((dog, index) => (
                        <section
                        key={index}
                        style={{ cursor: "pointer" }}
                    >
                        <ProductCard dog={dog} />
                    </section>
                    ))}
                </div>
            </div>
        </>
    )
}