import { useState } from "react";

export function useGeolocate(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [loading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  function getPosition() {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      function (position) {
        setError("");
        setPosition({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setIsLoading(false);
      },
      function (positionError) {
        setPosition("");
        setError(positionError.message);
        setIsLoading(false);
      }
    );
  }

  return { loading, position, error, getPosition };
}
