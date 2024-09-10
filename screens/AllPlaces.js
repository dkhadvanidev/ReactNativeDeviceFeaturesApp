import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      // console.log("AllPlaces places:", places);
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   if (isFocused && route.params?.place) {
  //     setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
  //   } else {
  //     setLoadedPlaces([...loadedPlaces]);
  //   }
  // }, [isFocused, route.params]);

  return <PlacesList places={loadedPlaces} />;
}
