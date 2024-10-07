import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    // Hook to handle navigation
    const navigate = useNavigate(); 

    const handleClickAllDogs = () => {
            navigate(`/cocktail/all-dogs`);
    };

    return (
        <>
        </>
    )
}