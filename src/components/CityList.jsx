import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ cities, isLoading }) {
  if (isLoading) <Spinner />;

  if (!cities.length)
    <Message message="Add your first city by clicking on a city on the map" />;

  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;