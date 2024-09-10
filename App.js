import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Map from "./screens/Map";
import AddPlace from "./screens/AddPlace";
import AllPlaces from "./screens/AllPlaces";
import IconButton from "./components/ui/IconButton";

import { init } from "./util/database";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator();
export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        init();
      } catch (e) {
        console.warn(e);
      } finally {
        setDbInitialized(true);
      }
    };
    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      console.log("Database Initialized : " + dbInitialized);
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) return null;

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          initialRouteName="AllPlaces"
          screenOptions={{
            headerTitleAlign: "center",
            headerTintColor: Colors.gray700,
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a new place" }}
          />
          <Stack.Screen name="Map" component={Map} options={{ title: "Map" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
