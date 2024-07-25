import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider";
import Button from "./Button";
import { useGeolocate } from "../hooks/useGeolocation";

function Map() {
  const { cities } = useCities();
  const {
    loading,
    position: geolocationPosition,
    getPosition,
  } = useGeolocate();
  const [searchParam] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {loading ? "loading..." : "Use Current Location"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <SetMapView position={mapPosition} />
        <MapPos />
      </MapContainer>
    </div>
  );
}

function SetMapView({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function MapPos() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
