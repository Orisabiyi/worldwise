import { useState } from "react";

export function useGeolocate() {
  const [position, setPosition] = useState(false);
  const [loading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  function getPosition() {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      function (position) {
        setError("");
        setPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      function (positionError) {
        setPosition("");
        setError(positionError.message);
      }
    );

    if (error || position) setIsLoading(false);
  }

  return { loading, position, error, getPosition };
}

