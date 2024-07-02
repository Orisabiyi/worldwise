import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) <Spinner />;

  if (!cities.length)
    <Message message="Add your first city by clicking on a city on the map" />;

  return (
    <ul className={styles.countryList}>
      {cities.map((city) => (
        <CountryItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CountryList;
