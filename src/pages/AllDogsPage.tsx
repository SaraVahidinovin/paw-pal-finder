import { useNavigate } from 'react-router-dom';
import { useLoaderData} from 'react-router-dom';
import { Dog } from '../types';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import '../styles/allDogsPage.css'

export default function AllDogsPage() {
    const dogs = useLoaderData() as Dog[];

    return (
        <section className="all-dogs-container">
            <section className="header-container">
            <Header />
            </section>
            <section className="all-dogs-content">
                <h1>Explore Dogs Ready For Adoption</h1>
                <section className="card-container">
                    {dogs.map((dog, index) => (
                        <section
                        key={index}
                    >
                        <ProductCard dog={dog} />
                    </section>
                    ))}
                </section>
            </section>
        </section>
    )
}