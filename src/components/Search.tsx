import { useState, useContext } from 'react';
import { Range } from 'react-range';
import GlobalStateContext from '../context/GlobalStateContext';
import '../styles/search.css';

const MIN = 0;
const MAX = 20;

export default function SearchComponent() {
  const { dogs, setSearchResults} = useContext(GlobalStateContext);
  const [keyword, setKeyword] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState([MIN, MAX]);

  const handleFilter = () => {
    let filteredDogs = dogs;

    if (keyword) {
        filteredDogs = filteredDogs.filter(dog =>
          dog.name.toLowerCase().includes(keyword.toLowerCase()) || 
          dog.breed.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      if (breed) {
        filteredDogs = filteredDogs.filter(dog => dog.breed.toLowerCase() === breed.toLowerCase());
      }
      if (gender) {
        filteredDogs = filteredDogs.filter(dog => dog.sex.toLowerCase() === gender.toLowerCase());
      }
      if (ageRange) {
        filteredDogs = filteredDogs.filter(dog => dog.age >= ageRange[0] && dog.age <= ageRange[1]);
      }
  
      setSearchResults(filteredDogs);
};

    const handleClear = () => {
        setKeyword('');
        setBreed('');
        setGender('');
        setAgeRange([MIN, MAX]);
        setSearchResults(dogs);
    };

  return (
    <section className="filter-container">
        <h3>Filter</h3>
      <input type="text" placeholder="Type Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <input type="text" placeholder="Type a breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select a gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <div className="range-slider">
        <label>Age range</label>
        <div className="slider-values">
          <span>{ageRange[0]}</span> - <span>{ageRange[1]}</span>
        </div>
        <Range
          values={ageRange}
          step={1}
          min={MIN}
          max={MAX}
          onChange={(values) => setAgeRange(values)}
          renderTrack={({ props, children }) => {
            const { key, ...restProps } = props; 
            return (
              <div key={key} {...restProps} className="range-track">
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            const { key, ...restProps } = props; 
            return <div key={key} {...restProps} className="range-thumb" />;
          }}
        />
      </div>
      <button className="filter-button" onClick={handleFilter}>Apply Filter</button>
      <button className="clear-button" onClick={handleClear}>Clear</button>
    </section>
  );
}