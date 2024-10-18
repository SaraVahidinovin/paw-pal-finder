import Header from '../components/Header';
import DogForm from '../components/CreateNewProduct';
import '../styles/addDogPage.css'

interface AddDogPageProps {
    mode: "create" | "edit"
}

export default function AddDogPage({ mode } : AddDogPageProps) {

    return (
        <section className="add-dog-container">
        <section className="header-container">
            <Header />
        </section>
        <h2>Help a Dog Find Their Forever Family!</h2>
        <DogForm mode={mode} />
        </section>
    )
}