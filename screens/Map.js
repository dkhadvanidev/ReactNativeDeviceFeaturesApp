import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/ui/IconButton";

export default function Map({ navigation }) {
  const [selectedLoaction, setSelectedLocation] = useState();

  const initialRegion = {
    latitude: 38.58,
    longitude: -121.5,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // function onRegionChange(region) {
  //   this.setState({ region });
  // }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLoaction) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location by tapping on the map first!"
      );
      return;
    }

    // console.log("selected Marker:", selectedLoaction);
    navigation.navigate("AddPlace", {
      pickedLat: selectedLoaction.lat,
      pickedLng: selectedLoaction.lng,
    });
  }, [navigation, selectedLoaction]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  function selectLocationOnMapHandler(event) {
    // console.log("Palced Marker:", event.nativeEvent.coordinate);
    const palcedMarkerLat = event.nativeEvent.coordinate.latitude;
    const palcedMarkerLng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: palcedMarkerLat, lng: palcedMarkerLng });
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      onPress={selectLocationOnMapHandler}
      // onRegionChange={this.onRegionChange}
    >
      {selectedLoaction && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLoaction.lat,
            longitude: selectedLoaction.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
