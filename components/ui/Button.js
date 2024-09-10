import { Text, Pressable, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";
export default function MyButton({ onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    marginVertical: 8,
    paddingVertical: 8,
    marginHorizontal: 15,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowRadius: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primary100,
  },
});
