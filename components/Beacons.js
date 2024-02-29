import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
const threshold = 3;

export const locationsGet = async () => {
  let outMarkerInfo = [];

  const querySnapshot = await getDocs(collection(db, "LocationReport"));

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      qID = doc.id;
      qData = doc.data();

      // console.log(
      //   `${doc.id} => ${doc.data()}, ${qData.location.latitude}, ${
      //     qData.location.longitude
      //   }`
      // );

      const subReports = await getDocs(
        collection(db, "LocationReport", qID, "SubReport")
      );

      let seenTrue = 0;
      let seenFalse = 0;

      let outSubReports = [];

      subReports.forEach((subDoc) => {
        // console.log(
        //   `${subDoc.id} => ${subDoc.data().description}, ${
        //     subDoc.data().seen
        //   }, ${subDoc.data().timestamp}`
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

        // console.log("le sub report: ", outSubReports);
      });

      // console.log("le sub report hon hon: ", outSubReports);

      if (!(seenFalse - seenTrue > threshold)) {
        outMarkerInfo.push({
          id: qID,
          value: {
            type: qData.type,
            description: qData.description,
            location: {
              latitude: qData.location.latitude,
              longitude: qData.location.longitude,
            },
            active: qData.active,
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
