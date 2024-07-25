import { useState } from "react";

export function useGeolocate({ curPos = null }) {
  const [position, setPosition] = useState(curPos);
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
