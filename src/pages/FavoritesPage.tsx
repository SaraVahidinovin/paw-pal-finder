import { useContext } from "react"
import GlobalStateContext from "../context/GlobalStateContext"
import ProductCard from "../components/ProductCard";

export default function FavoritesPage() {

    // Retrieve the favorites array from the global context
    const { favorites } = useContext(GlobalStateContext);

    return (
        <section className="main-content-container">
            <h2>Dogs You've Fallen For</h2>
            <section className="card-container">
                {/* Check if there are any favorite dogs */}
                {favorites.length > 0 ?
                    // If there are favorites, map over the array and display each as a ProductCard component
                    (favorites.map((dog, index) => (
                        <section key={index} className="favorite-item">
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
        </section>
    )
}