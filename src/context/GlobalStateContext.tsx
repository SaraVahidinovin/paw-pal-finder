import { createContext, useState, ReactNode } from 'react';
import { Dog } from '../types';

interface GlobalStateContextType {
  searchResults: Dog[];
  setSearchResults: (dogs: Dog[]) => void;
  favorites: Dog[];
  setFavorites: (dogs: Dog[]) => void;
}
const defaultState: GlobalStateContextType = {
  searchResults: [],
  setSearchResults: () => {},
  favorites: [],
  setFavorites: () => {},
};

// Create the context

const GlobalStateContext = createContext<GlobalStateContextType>(defaultState);


// Create a provider 
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<Dog[]>([]);

  return (
    <GlobalStateContext.Provider value={{ searchResults, setSearchResults, favorites, setFavorites }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContext;