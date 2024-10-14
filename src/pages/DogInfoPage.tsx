import {Dog} from "../types"
import { useLocation } from 'react-router-dom';
import "../styles/dogInfoPage.css"
import Header from '../components/Header';

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
                <div className="dog-info">
                    <img src={dog.img} alt={dog.name} className="dog-image" />
                    <div className="info-sections">
                        <div className="dog-info-section">
                            <h3>Dog Information</h3>
                            <p><strong>Name: </strong>{dog.name}</p>
                            <p><strong>Breed: </strong>{dog.breed}</p>
                            <p><strong>Gender: </strong>{dog.sex}</p>
                            <p><strong>Age: </strong>{dog.age} years old</p>
                        </div>
                        <div className="owner-info-section">
                            <h3>Owner Information</h3>
                            <p><strong>Owner's Name: </strong>{dog.owner.name}</p>
                            <p><strong>Owner's Last Name: </strong>{dog.owner.lastName}</p>
                            <p><strong>Phone Number: </strong>{dog.owner.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}