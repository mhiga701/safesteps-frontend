import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  GeoPoint,
  Timestamp,
} from "firebase/firestore";
import Toast from "react-native-root-toast";
import { styles } from "./styles";
import * as Location from "expo-location";
import { useEffect } from "react";

const templateSubmission = true;

const locationsData = [
  { label: "Kenmore", value: "1" },
  { label: "BU East", value: "2" },
  { label: "BU Central", value: "3" },
  { label: "Amory St", value: "4" },
  { label: "Babcock St", value: "5" },
  { label: "BU West", value: "6" },
  { label: "South Campus", value: "7" },
  { label: "Fenway Campus", value: "8" },
  { label: "BU Bridge", value: "9" },
];

const typesData = [
  { label: "Construction", value: 1 },
  { label: "Closed Sidewalks", value: 2 },
  { label: "Weather", value: 3 },
  { label: "Black Ice", value: 4 },
  { label: "Flooding", value: 5 },
  { label: "Obstruction", value: 6 },
  { label: "Spilled Food", value: 7 },
  { label: "Lost Bag", value: 8 },
  { label: "Traffic accidents", value: 9 },
  { label: "Unsafe Sidewalks", value: 10 },
  { label: "MBTA maintenance", value: 11 },
];

export default function ReportObstacle() {
  const [locale, setSelectedLocale] = useState("Choose a Locale");
  const [types, setSelectedTypes] = useState("Choose a Type");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      console.log("Location granted");

      let location = await Location.getLastKnownPositionAsync({});
      //   getCurrentPositionAsync is much slower, this is better at first, then a precise location can be obtained shortly
      setLocation(location);
      console.log(
        "Location: " +
          location.coords.latitude +
          " " +
          location.coords.longitude
      );

      let location2 = await Location.getCurrentPositionAsync({});
      setLocation(location2);
      console.log(
        "Location updated: " +
          location2.coords.latitude +
          " " +
          location2.coords.longitude
      );
    })();
  }, []);

  const handleSubmit = async () => {
    const uploadLocation = new GeoPoint(
      location.coords.latitude,
      location.coords.longitude
    );

    console.log(uploadLocation);

    // get current timestamp
    const timestamp = new Timestamp.now();

    console.log("Timestamp: " + timestamp);

    const docRef = await addDoc(collection(db, "LocationReport"), {
      type: types,
      locale: locale,
      active: true,
      template: templateSubmission,
      description: description,
      location: uploadLocation,
      timestamp: timestamp,
    });

    console.log("Document written with ID: ", docRef.id);

    // await setDoc(docRef, additional_data);
    // // don't submit if intersection is empty
    // if (locale === "Choose an Intersection") {
    //   console.log("Intersection not chosen. Returning...");
    //   let etoast = Toast.show("Error: Please select a location.", {
    //     duration: Toast.durations.LONG,
    //     position: Toast.positions.BOTTOM,
    //     shadow: true,
    //     animation: true,
    //     hideOnPress: true,
    //     delay: 0,
    //   });
    //   setTimeout(function hideToast() {
    //     Toast.hide(etoast);
    //   }, 3000);
    //   return;
    // } //Check to see if message is empty but options are still available to submit
    // else {
    //   if (message === "") {
    //     if (
    //       !potholesPressed ||
    //       !objectonRoad ||
    //       !roadKillPressed ||
    //       !foodPressed ||
    //       !icePressed ||
    //       !puddlesPressed ||
    //       !otherPressed
    //     ) {
    //       try {
    //         const docRef = doc(db, "Obstacle Reports", locale);
    //         const additional_data = {
    //           [day]: {
    //             [time]: reports,
    //           },
    //         };

    //         await setDoc(docRef, additional_data, { merge: true });
    //         console.log("Uploaded!");
    //         console.log(
    //           `Report: ${reports}, ${message} at ${locale} on ${day}, at ${time}`
    //         );
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //         let etoast = Toast.show(
    //           "Error submitting feedback: please try again later.",
    //           {
    //             duration: Toast.durations.LONG,
    //             position: Toast.positions.BOTTOM,
    //             shadow: true,
    //             animation: true,
    //             hideOnPress: true,
    //             delay: 0,
    //           }
    //         );
    //         setTimeout(function hideToast() {
    //           Toast.hide(etoast);
    //         }, 3000);
    //       }
    //     } //Else case is if message is empty and no options are selected
    //     else {
    //       console.log("message or options is empty. Returning...");
    //       let etoast = Toast.show("Error: Please enter a message", {
    //         duration: Toast.durations.LONG,
    //         position: Toast.positions.BOTTOM,
    //         shadow: true,
    //         animation: true,
    //         hideOnPress: true,
    //         delay: 0,
    //       });
    //       setTimeout(function hideToast() {
    //         Toast.hide(etoast);
    //       }, 3000);
    //       return;
    //     }
    //   } //Handles cases for having a message on the text box and options chosen
    //   else if (message !== "") {
    //     if (
    //       !potholesPressed ||
    //       !objectonRoad ||
    //       !roadKillPressed ||
    //       !foodPressed ||
    //       !icePressed ||
    //       !puddlesPressed ||
    //       !otherPressed
    //     ) {
    //       try {
    //         reports.push(message);
    //         const docRef = doc(db, "Obstacle Reports", locale);
    //         const additional_data = {
    //           [day]: {
    //             [time]: reports,
    //           },
    //         };
    //         await setDoc(docRef, additional_data, { merge: true });
    //         console.log("Uploaded!");
    //         console.log(
    //           `Report: ${reports}, ${message} at ${locale} on ${day}, at ${time}`
    //         );
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //         let etoast = Toast.show(
    //           "Error submitting feedback: please try again later.",
    //           {
    //             duration: Toast.durations.LONG,
    //             position: Toast.positions.BOTTOM,
    //             shadow: true,
    //             animation: true,
    //             hideOnPress: true,
    //             delay: 0,
    //           }
    //         );
    //         setTimeout(function hideToast() {
    //           Toast.hide(etoast);
    //         }, 3000);
    //       }
    //     } else {
    //       try {
    //         reports.push(message);
    //         const docRef = doc(db, "Obstacle Reports", locale);
    //         const additional_data = {
    //           [day]: {
    //             [time]: reports,
    //           },
    //         };
    //         await setDoc(docRef, additional_data, { merge: true });
    //         console.log("Uploaded!");
    //         console.log(
    //           `Report: ${reports}, ${message} at ${locale} on ${day}, at ${time}`
    //         );
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //         let etoast = Toast.show(
    //           "Error submitting feedback: please try again later.",
    //           {
    //             duration: Toast.durations.LONG,
    //             position: Toast.positions.BOTTOM,
    //             shadow: true,
    //             animation: true,
    //             hideOnPress: true,
    //             delay: 0,
    //           }
    //         );
    //         setTimeout(function hideToast() {
    //           Toast.hide(etoast);
    //         }, 3000);
    //       }
    //     }
    //   }
    // }

    resetForm();

    let toast = Toast.show("Thank you for your report!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const resetForm = () => {
    setDescription("");
    setSelectedLocale("Choose a Locale");
    setSelectedTypes("Choose a Type");
  };
  const handleReset = () => {
    resetForm();
  };

  return (
    <>
      <View>
        <Text style={styles.ReportAccident}>New Report Form</Text>
        <Text style={styles.ReportHeader}>
          Choose your precise location on the map:
        </Text>
        <Text style={[styles.ReportHeader, { top: 230 }]}>
          Which Locale Are You Closest To?
        </Text>
        <View style={{ top: 250 }}>
          <Dropdown
            mode="default"
            style={styles.dropdownContainer}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            iconStyle={styles.dropdownIcon}
            containerStyle={styles.itemContainer}
            itemTextStyle={styles.itemText}
            data={locationsData}
            search={false}
            showsVerticalScrollIndicator={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={locale}
            searchPlaceholder="Search..."
            value={locale}
            onChange={(locale) => setSelectedLocale(locale.label)}
          />
        </View>

        <Text style={[styles.ReportHeader, { top: 270 }]}>Type of report</Text>
        <View style={{ top: 280 }}>
          <Dropdown
            mode="default"
            style={styles.dropdownContainer}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            iconStyle={styles.dropdownIcon}
            containerStyle={styles.itemContainer}
            itemTextStyle={styles.itemText}
            data={typesData}
            search={false}
            showsVerticalScrollIndicator={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={types}
            searchPlaceholder="Search..."
            value={types}
            onChange={(types) => setSelectedTypes(types.label)}
          />
        </View>

        <View style={{ flexDirection: "row", top: 250 }}>
          <Text
            style={{
              color: "#52525A",
              fontSize: 17,
              fontFamily: "Montserrat",
              fontWeight: "600",
              lineHeight: 25,
              bottom: -45,
              left: 5,
            }}
          >
            Any Other Details?
          </Text>
        </View>
        <View
          style={[styles.MessageContainer, { flexDirection: "row", top: 315 }]}
        >
          <TextInput
            style={{
              top: 10,
              fontSize: 16,
              fontFamily: "Bitter",
              fontWeight: "400",
              lineHeight: 20,
              letterSpacing: 0.5,
            }}
            ref={(input) => {
              this.secondTextInput = input;
            }}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter your message here"
            multiline={true}
            maxLength={500}
            returnKeyType="done"
            blurOnSubmit={true}
          />
        </View>
        <View style={{ flexDirection: "row", top: 275 }}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleReset}>
            <Text
              style={{
                color: "#7E678F",
                fontSize: 15,
                fontFamily: "Montserrat",
                fontWeight: "500",
                lineHeight: 20,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontFamily: "Montserrat",
                fontWeight: "500",
                lineHeight: 20,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
