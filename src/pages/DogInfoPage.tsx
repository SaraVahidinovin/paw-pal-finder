import {Dog} from "../types"
import { useLocation } from 'react-router-dom';
import "../styles/dogInfoPage.css"
import Header from '../components/Header';
import FavoriteButton from "../components/FavoriteButton";

export default function DogInfoPage() {
    const location = useLocation();
   const dog = location.state.dog as Dog; // Get the dog object from the state

    return (
        <section className="dog-info-container">
            <section className="header-container">
                <Header />
            </section>
            <section className="all-dogs-content">
                <h2>Learn More About This Furry Friend</h2>
                <section className="dog-card">
                    <FavoriteButton dog={dog} />
                    <section className="dog-info">
                        <div className="image-wrapper">
                        <img src={dog.img} alt={dog.name} className="dog-image" />
                        </div>
                        <section className="info-sections">
                            <section className="dog-info-section">
                                <h3>Dog Information</h3>
                                <div className="info-item">
                                    <p className="label"><strong>Name:</strong></p>
                                    <p className="value">{dog.name}</p>
                                </div>
                                <div className="info-item">
                                    <p className="label"><strong>Breed:</strong></p>
                                    <p className="value">{dog.breed}</p>
                                </div>
                                <div className="info-item">
                                    <p className="label"><strong>Gender:</strong></p>
                                    <p className="value">{dog.sex}</p>
                                </div>
                                <div className="info-item">
                                    <p className="label"><strong>Age:</strong></p>
                                    <p className="value">{dog.age} years old</p>
                                </div>
                            </section>
                            <section className="owner-info-section">
                                <h3>Owner Information</h3>
                                <div className="info-item">
                                    <p className="label"><strong>Name:</strong></p>
                                    <p className="value">{dog.owner.name}</p>
                                </div>
                                <div className="info-item">
                                    <p className="label"><strong>Last Name:</strong></p>
                                    <p className="value">{dog.owner.lastName}</p>
                                </div>
                                <div className="info-item">
                                    <p className="label"><strong>Phone Number:</strong></p>
                                    <p className="value">{dog.owner.phoneNumber}</p>
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}