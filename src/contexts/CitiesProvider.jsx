import { createContext } from "react";

const citiesContext = createContext();

function CitiesProvider({ children }) {
  return <citiesContext.Provider>{children}</citiesContext.Provider>;
}

export { CitiesProvider };
