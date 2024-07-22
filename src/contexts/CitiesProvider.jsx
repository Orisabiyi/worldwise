import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:8000";
const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCountries() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    }

    getCountries();
  }, []);

  return (
    <citiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(citiesContext);
  return value;
}

export { CitiesProvider, useCities };