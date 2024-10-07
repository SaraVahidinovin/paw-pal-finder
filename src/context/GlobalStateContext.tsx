import { createContext, useState, ReactNode } from 'react';

// Create the context

const GlobalStateContext = createContext(null);


// Create a provider 
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <GlobalStateContext.Provider value={{ searchResults, setSearchResults, favorites, setFavorites }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContext;