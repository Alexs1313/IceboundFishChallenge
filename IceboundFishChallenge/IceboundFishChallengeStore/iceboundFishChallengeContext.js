import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';
import { fisherTales } from '../IceboundFishChallengeData/fisherTales';

export const StoreContext = createContext(undefined);

export const useStore = () => useContext(StoreContext);

export const IceboundFishChallengeContext = ({ children }) => {
  const [storedIceboundIds, setStoredIceboundIds] = useState({});
  const [storedIceboundTales, setStoredIceboundTales] = useState([]);

  const fetchSavedTales = async () => {
    const storedTales = await AsyncStorage.getItem('FISHER_TALES_SAVED');
    const parsedTales = storedTales ? JSON.parse(storedTales) : {};
    setStoredIceboundIds(parsedTales);

    const filteredTales = fisherTales.filter(t => parsedTales[t.id]);
    setStoredIceboundTales(filteredTales);
  };

  const deleteIceboundSavedTale = async selectedId => {
    const updatedIceboundTales = { ...storedIceboundIds };
    delete updatedIceboundTales[selectedId];

    setStoredIceboundIds(updatedIceboundTales);
    setStoredIceboundTales(prevTales =>
      prevTales.filter(t => t.id !== selectedId),
    );
    await AsyncStorage.setItem(
      'FISHER_TALES_SAVED',
      JSON.stringify(updatedIceboundTales),
    );
  };

  const contextValue = {
    storedIceboundIds,
    storedIceboundTales,
    fetchSavedTales,
    deleteIceboundSavedTale,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
