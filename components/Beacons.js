import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
const threshold = 3;

export const locationsGet = async () => {
  let outMarkerInfo = [];

  const querySnapshot = await getDocs(collection(db, "LocationReport"));

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      // console.log("doc: ", doc.id, " => ", doc.data());

      // console.log(
      //   `${doc.id} => ${doc.data().location.latitude}, ${
      //     doc.data().location.longitude
      //   }`
      // );

      const subReports = await getDocs(
        collection(db, "LocationReport", doc.id, "SubReport")
      );

      let seenTrue = 0;
      let seenFalse = 0;

      let outSubReports = [];

      subReports.forEach((subDoc) => {
        // console.log(
        //   "Subdoc of " +
        //     doc.id +
        //     `${subDoc.id} => ${subDoc.data().description}, ${
        //       subDoc.data().seen
        //     }, ${subDoc.data().timestamp}`
        // );

        if (subDoc.data().seen) {
          seenTrue++;
        } else {
          seenFalse++;
        }

        outSubReports.push({
          id: subDoc.id,
          description: subDoc.data().description,
          seen: subDoc.data().seen,
          timestamp: subDoc.data().timestamp,
        });
      });

      // console.log("le sub report: ", outSubReports);

      if (!(seenFalse - seenTrue > threshold)) {
        // console.log(
        //   "adding to outMarkerInfo: " + doc.id + " => " + doc.data().type
        // );
        let date = new Date(doc.data().timestamp.seconds * 1000);
        outMarkerInfo.push({
          id: doc.id,
          value: {
            type: doc.data().type,
            locale: doc.data().locale,
            description: doc.data().description,
            timestamp: date.toDateString(),
            location: {
              latitude: doc.data().location.latitude,
              longitude: doc.data().location.longitude,
            },
            active: doc.data().active,
            seenTrue: seenTrue,
            seenFalse: seenFalse,
            subReports: outSubReports,
          },
        });
      }

      // console.log(outMarkerInfo);
    })
  );

  // console.log("data: ", outMarkerInfo);
  return outMarkerInfo;
};

// const outinfo = locationsGet();
// console.log("outinfo: ", outinfo);

const getLocations = async () => {
  const outinfo = await locationsGet();
  console.log("outinfo: ", outinfo);
};

// getLocations();

// export const locationData = [
//   {
//     title: "BU Bridge",
//     location: {
//       latitude: 42.35074,
//       longitude: -71.11078,
//     },
//     description: "Cars drive fast here!",
//   },
//   {
//     title: "Marsh Plaza",
//     location: {
//       latitude: 42.35021,
//       longitude: -71.10653,
//     },
//     description: "Lots of pedestrians here!",
//   },
//   {
//     title: "CCDS",
//     location: {
//       latitude: 42.34986,
//       longitude: -71.1036,
//     },
//     description: "Lots of pedestrians here!",
//   },
// ];
