import { useNavigate } from 'react-router-dom';
import "../styles/homePage.css"
import Header from '../components/Header';
import img1 from '../assets/img1.svg'
import img2 from '../assets/img2.svg'
import img3 from '../assets/img3.svg'
import img4 from '../assets/img4.svg'
import img5 from '../assets/img5.svg'

export default function HomePage() {

    // Hook to handle navigation
    const navigate = useNavigate(); 

    const handleClickAllDogs = () => {
            navigate(`/alldogs`);
    };

    return (
        <section className="home-container">
            <Header />
            <section className="home-content">
                <section className="intro-section">
                    <h1>Adopt a paw pal!</h1>
                    <h2>Don’t shop!</h2>
                    <p>
                        Looking for a loyal companion? Paw Pal Finder helps you connect with dogs in need of a loving home.
                        From playful pups to wise senior dogs, our platform makes it easy to find your new best friend.
                        Adopt a dog today and change a life—yours and theirs!
                    </p>
                    <button className="check-button" onClick={handleClickAllDogs}>Check them out</button>
                </section>
                <section className="image-grid">
                    <div className="image-grid-1">
                        <img src={img1} alt="Dog" className='dog-1'/>
                        <img src={img2} alt="Dog 2" className='dog-2'/>
                    </div>
                    <div className="image-grid-2">
                        <img src={img3} alt="Dog 3" className='dog-3' />
                        <div className="image-grid-3">
                            <img src={img4} alt="Dog 4" className='dog-4'/>
                            <img src={img5} alt="Dog 5" className='dog-5'/>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}