import { Dog } from '../types';

export const dogsLoader = async () => {
    try {
      const response = await fetch('http://localhost:5000/dogs');
      if (!response.ok) {
        throw new Error('Failed to fetch dogs');
      }
      const data: Dog[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dogs:', error);
      throw new Error("Failed to fetch dogs list.");
    }
  };
  