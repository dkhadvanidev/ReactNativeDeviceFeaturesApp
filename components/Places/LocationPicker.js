import { useState, useEffect } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";

import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";

import OutlineButton from "../ui/OutlineButton";
import { Colors } from "../../constants/colors";
import {
  getAddress,
  getAddressFromCoordinates,
  getMapPerview,
} from "../../util/location";

export default function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();

  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    // if (!locationPermissionInformation) {
    //   console.log(
    //     `locationPermissionInformation: ${locationPermissionInformation}`
    //   );
    //   return false;
    // }
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      console.log(
        `Asked locationPermissionInformation: ${locationPermissionInformation.status}`
      );
      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [
          {
            text: "Okay",
            onPress: () => console.log("Permission not Granted"),
          },
          {
            text: "Grant Permission",
            // onPress: () => requestPermission(),
            onPress: async () => {
              const permissionResponse = await requestPermission();
              return permissionResponse.granted;
            },
          },
        ]
      );
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (isFocused && route.params) {
      const { pickedLat, pickedLng } = route.params;
      setPickedLocation({
        lat: pickedLat,
        lng: pickedLng,
      });
    }
  }, [isFocused, route]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddressFromCoordinates({
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
        });
        // console.log(address);
        onPickLocation({ ...pickedLocation, address: address });
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      console.log("getLocationHandler hasPermission: " + hasPermission);
      // return null;
      return;
    }

    const location = await getCurrentPositionAsync();
    // console.log(location.coords);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  let locationPreview = <Text>No location picked yet!</Text>;
  if (pickedLocation && isFocused) {
    locationPreview = getMapPerview(pickedLocation.lat, pickedLocation.lng);
  }

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.action}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    overflow: "hidden",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
