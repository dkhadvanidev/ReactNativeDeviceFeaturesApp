import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";

import { Colors } from "../../constants/colors";
import { Place } from "../../models/place.js";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import MyButton from "../ui/Button";

export default function PlaceForm({ onAddPlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectImage, setSelectImage] = useState();
  const [selectLocation, setSelectLocation] = useState();

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }

  function takeImageHandler(imageUri) {
    setSelectImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    // console.log(location);
    setSelectLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place({
      title: enteredTitle,
      imageUri: selectImage,
      location: selectLocation,
    });
    onAddPlace(placeData);
    // console.log(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.lable}>Title</Text>
        <TextInput
          style={styles.input}
          value={enteredTitle}
          placeholder="Enter Title"
          onChangeText={changeTitleHandler}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <MyButton onPress={savePlaceHandler}>Save Place</MyButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  lable: {
    marginBottom: 4,
    fontWeight: "bold",
    color: Colors.primary500,
  },
  input: {
    // width: "80%",
    fontSize: 16,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700,
    backgroundColor: Colors.primary100,
  },
});
