import { useContext, useEffect } from "react"
import GlobalStateContext from "../context/GlobalStateContext"
import ProductCard from "../components/ProductCard";
import Header from '../components/Header';
import '../styles/favoritePage.css'
import Pagination from "../components/Pagination";

export default function FavoritesPage() {

    // Retrieve the favorites array from the global context
    const { favorites, currentPage, itemsPerPage, setCurrentPage } = useContext(GlobalStateContext);

    // Calculate the displayed favorites based on the current page
    const displayedFavorites = favorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Effect to reset to the first page when favorites change
    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when favorites change
    }, [favorites, setCurrentPage]);

    return (
        <section className="favorites-container">
            <section className="header-container">
                <Header />
            </section>
            <h1>Dogs You've Fallen For</h1>
            <section className="card-container">
                {/* Check if there are any favorite dogs */}
                {displayedFavorites.length > 0 ?
                    // If there are favorites, map over the array and display each as a ProductCard component
                    (displayedFavorites.map((dog) => (
                        <section key={dog.id} className="favorite-item">
                            <ProductCard dog={dog} />
                        </section>
                    ))
                    ) : (
                        // If no favorites are found, display a message to the user
                        <section className="not-found-container">
                        <h3>No favorite dog found.
                        </h3>
                        </section>
                    )
                }
            </section>
            <Pagination dataSource={favorites} />
        </section>
    )
}