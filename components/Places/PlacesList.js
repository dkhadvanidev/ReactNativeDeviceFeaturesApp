import { Text, View, FlatList, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

export default function PlacesList({ places }) {
  // if (!places || !places.length) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet! - Start adding some!
        </Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={places}
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceItem key={item.id} place={item} onSelect={() => {}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 16,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 16,
    // fontWeight: "bold",
    color: Colors.primary200,
  },
});
