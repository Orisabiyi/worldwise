import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:8000";
const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();

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

  async function getCity() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <citiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const value = useContext(citiesContext);
  if (value === undefined)
    throw new Error("Cities Context Provider is called out of place");
  return value;
}

export { CitiesProvider, useCities };
