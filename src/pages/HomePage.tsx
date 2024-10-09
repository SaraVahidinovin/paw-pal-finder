import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    // Hook to handle navigation
    const navigate = useNavigate(); 

    const handleClickAllDogs = () => {
            navigate(`/alldogs`);
    };

    return (
        <>
        <button onClick={handleClickAllDogs}>Check them out</button>
        </>
    )
}