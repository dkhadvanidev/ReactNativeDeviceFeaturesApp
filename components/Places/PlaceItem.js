import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 6,
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 2,
    overflow: "hidden",
    shadowOffset: { width: 1, height: 1 },
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    height: 100,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray700,
  },
  address: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.gray700,
  },
});
