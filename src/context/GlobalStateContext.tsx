import { createContext, useState, ReactNode } from 'react';
import { Dog } from '../types';

interface GlobalStateContextType {
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  searchResults: Dog[];
  setSearchResults: (dogs: Dog[]) => void;
  favorites: Dog[];
  setFavorites: (dogs: Dog[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

const defaultState: GlobalStateContextType = {
  dogs: [],
  setDogs: () => {},
  searchResults: [],
  setSearchResults: () => {},
  favorites: [],
  setFavorites: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  itemsPerPage: 8, 
};

// Create the context

const GlobalStateContext = createContext<GlobalStateContextType>(defaultState);


// Create a provider 
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchResults, setSearchResults] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  return (
    <GlobalStateContext.Provider value={{ dogs, setDogs, searchResults, setSearchResults, favorites, setFavorites, currentPage, setCurrentPage, itemsPerPage }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContext;