import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function getMapPerview(lat, lng) {
  const initialRegion = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const markerCoordinate = {
    latitude: lat,
    longitude: lng,
  };

  return (
    <MapView
      region={region}
      style={styles.mapPreview}
      initialRegion={initialRegion}
    >
      <Marker coordinate={markerCoordinate} />
    </MapView>
  );
}

// export async function getAddress(lat, lng) {
//   const Here_API_KEY = "mBN-mE8X7cV-kMdhz7mfLOhDQN5ni_aqQwwBR12bwdw5G8o";
//   const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${lat}%2C${lng}%2C&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=${Here_API_KEY}`;
//   const resposne = await fetch(url);

//   if (!resposne.ok) {
//     throw new Error("Failed to fetch address");
//   }

//   const data = await resposne.json();
//   const address = data.Response.View[0].Result[0].Location.Address.Lable;

//   // return address;
// }

export function getAddressFromCoordinates({ latitude, longitude }) {
  const HERE_API_KEY = "IjQOxeMF01eJ1mfe5JdvrBZVitGlr1HS49wbZIqr83U";
  return new Promise((resolve, reject) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${HERE_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.items[0].title) {
          // console.log(resJson.items[0].address);
          resolve(resJson.items[0].address.label);
        } else {
          reject("not found");
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: "100%",
    // borderRadius: 4,
    // marginVertical: 8,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
