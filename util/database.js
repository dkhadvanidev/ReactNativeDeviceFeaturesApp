// import * as SQLite from "expo-sqlite/legacy";
// import { Place } from "../models/place";

// const db = SQLite.openDatabase("places.db");

// create/load Database
// export function init() {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS places (
//           id INTEGER PRIMARY KEY NOT NULL,
//           title TEXT NOT NULL,
//           imageUri TEXT NOT NULL,
//           address TEXT NOT NULL,
//           lat REAL NOT NULL,
//           lng REAL NOT NULL
//         )`,
//         [],
//         () => {
//           console.log("Table created successfully");
//           resolve();
//         },
//         (_, error) => {
//           console.log(`Table Creation error ${error}`);
//           reject(error);
//         }
//       );
//     });

//     return promise;
//   });
// }
// // add place
// // export function insertPlace(place) {
// //   console.log("insertPlace called");
// //   const promise = new Promise((resolve, reject) => {
// //     db.transaction((tx) => {
// //       tx.executeSql(
// //         `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
// //         [
// //           place.title,
// //           place.imageUri,
// //           place.address,
// //           place.location.lat,
// //           place.location.lng,
// //         ],
// //         (_, result) => {
// //           resolve(result);
// //         },
// //         (_, error) => {
// //           reject(error);
// //         }
// //       );
// //     });
// //   });

// //   return promise;
// // }

// export async function insertPlace(place) {
//   console.log("insertPlace called");
//   try {
//     const result = await db.transaction(async (tx) => {
//       try {
//         const result = await tx.executeSql(
//           `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
//           [
//             place.title,
//             place.imageUri,
//             place.address,
//             place.location.lat,
//             place.location.lng,
//           ]
//         );

//         console.log("Place inserted successfully:", result);
//         return result;
//       } catch (error) {
//         console.error("Error executing SQL:", error);
//         throw error;
//       }
//     });
//     return result;
//   } catch (error) {
//     console.error("Error inserting place:", error);
//     throw error;
//   }
// }

// // get places
// export function  fetchPlaces() {
//   console.log("fetchPlaces called");
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         // can make the query an ORDER BY or use WHERE here to filter stuff
//         "SELECT * FROM places",
//         [],
//         (_, result) => {
//           const places = [];

//           for (const dp of result.rows._array) {
//             places.push(
//               new Place(
//                 dp.title,
//                 dp.imageUri,
//                 {
//                   address: dp.address,
//                   lat: dp.lat,
//                   lng: dp.lng,
//                 },
//                 dp.id
//               )
//             );
//           }

//           console.log("Palces fetched: " + places);
//           resolve(places);
//         },
//         (_, error) => {
//           console.log("Fetch error: " + error);
//           reject(error);
//         }
//       );
//     });
//   });

//   return promise;
// }

import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const db = SQLite.openDatabaseSync("places");
export const init = async () => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
        )
    `);
};

export const insertPlace = async (place) => {
  try {
    const result = await db.runAsync(
      "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    console.log("Place inserted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error executing SQL:", error);
    throw error;
  }
};

export const fetchPlaces = async () => {
  try {
    // const placesArray = [];
    const places = await db.getAllAsync("SELECT * FROM places");

    const placesArray = places.map((place) => {
      console.log("place:", place);
      console.log("place.address:", place.address);

      return new Place(
        place.title,
        place.imageUri,
        {
          address: place.address,
          lat: place.lat,
          lng: place.lng,
        },
        place.id
      );
    });
    // for (const place of places) {

    //   placesArray.push(
    //     new Place(
    //       place.title,
    //       place.imageUri,

    //       {
    //         address: place.address,
    //         lat: place.lat,
    //         lng: place.lng,
    //       },
    //       place.id
    //     )
    //   );
    // }
    return placesArray;
  } catch (error) {
    console.error("Error Fetching places:", error);
    throw error;
  }
};

export const fetchPlaceDetails = async (id) => {
  const stmt = await db.prepareAsync("SELECT * FROM places1 WHERE id = $id");
  const result = await stmt.executeAsync({ $id: id });
  const firstRow = await result.getFirstAsync();
  await result.resetAsync();
  return firstRow;
};
