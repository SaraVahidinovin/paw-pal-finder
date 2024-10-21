import { useNavigate } from 'react-router-dom';
import { useLoaderData} from 'react-router-dom';
import { Dog } from '../types';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import '../styles/allDogsPage.css'
import SearchComponent from '../components/Search';
import Pagination from '../components/Pagination';
import { useEffect, useContext } from 'react';
import GlobalStateContext from '../context/GlobalStateContext';
import { dogsLoader } from '../loader/loader';


export default function AllDogsPage() {
    //const dogs = useLoaderData() as Dog[];
    const { setDogs, searchResults, setSearchResults, currentPage, itemsPerPage } = useContext(GlobalStateContext);

  useEffect(() => {
    const loadDogs = async () => {
      try {
        const dogs = await dogsLoader();
        setDogs(dogs);
        setSearchResults(dogs); // Set initial search results to all dogs
      } catch (error) {
        console.error('Failed to load dogs:', error);
      }
    };

    loadDogs();
  }, [setDogs]);

  const displayedDogs = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <section className="all-dogs-container">
      <section className="header-container">
        <Header />
      </section>
      <section className="all-dogs-content">
        <h1>Explore Dogs Ready For Adoption</h1>
        <section className='search-card-container'>
          <SearchComponent />
          <section className='card-pagination-container'>
            <section className="card-container">
              {displayedDogs.length > 0 ? (
                displayedDogs.map(dog => (
                  <section
                    key={dog.id}
                  >
                    <ProductCard dog={dog} />
                  </section>
                ))
              ) : (
                <p>No dogs found matching the criteria.</p>
              )}
            </section>
            <Pagination dataSource={searchResults} />
          </section>
        </section>
      </section>
    </section>
  )
}