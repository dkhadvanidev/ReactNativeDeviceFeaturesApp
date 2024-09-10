import { View, Image, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";

import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";

import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";

export default function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse.status);
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [
          {
            text: "Okay",
            onPress: () => console.log("Permission not Granted"),
          },
          {
            text: "Grant Permission",
            onPress: async () => {
              const permissionResponse = await requestPermission();
              if (permissionResponse.granted) {
                console.log("Permission granted");
                return permissionResponse.granted;
              } else {
                console.log("Permission still denied");
              }
            },
            style: "destructive",
          },
        ]
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.assets || image.assets.length === 0) {
      Alert.alert("No image selected!", "Please try again.");
      return;
    }
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  function clearImageHandler() {
    setPickedImage(null);
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <View style={styles.action}>
        <OutlineButton icon="camera" onPress={takeImageHandler}>
          Take Image
        </OutlineButton>
        <OutlineButton icon="trash" onPress={clearImageHandler}>
          Clear
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    height: 200,
    width: "100%",
    borderRadius: 4,
    marginVertical: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary100,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
