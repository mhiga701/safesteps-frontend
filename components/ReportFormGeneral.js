import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { styles } from "./styles";
import * as Location from "expo-location";
import { useEffect, useRef } from "react";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";

const locationsData = [
  { label: "Kenmore", value: "1" },
  { label: "BU East", value: "2" },
  { label: "BU Central", value: "3" },
  { label: "Amory St", value: "4" },
  { label: "Babcock St", value: "5" },
  { label: "BU West", value: "6" },
  { label: "South Campus", value: "7" },
  { label: "Fenway Campus", value: "8" },
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
  const [value, setValue] = useState(null);
  const [locale, setSelectedLocale] = useState("Choose a Locale");
  const [types, setSelectedTypes] = useState("Choose a Type");
  const [reports, setreports] = useState([]);
  const [message, setMessage] = useState("");
  const date = new Date();
  const day = date.toLocaleDateString();
  const timeOptions = { hour12: true, hour: "numeric", minute: "numeric" };
  const time = date.toLocaleTimeString("en-US", timeOptions);
  const [location, setLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef();

  const goToMyLocation = async () => {
    console.log("Latitude:", location.coords.latitude);
    console.log("Longitude:", location.coords.longitude);
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      // zoom: 17, // Android, needs to be adjusted after testing on Android
      altitude: 2000,
      pitch: 0,
      angle: 0,
      heading: 0,
      // useNativeDriver: true,
    });
  };

  const LocationButton = () => (
    <TouchableOpacity style={styles.smallLocationButton} onPress={goToMyLocation}>
      <Icon
        name="crosshairs"
        size={25}
        color="#5787f5"
        style={styles.mapButtonStyle}
      />
    </TouchableOpacity>
  );

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
    // const docRef = doc(db, "User Location", "Max");
    const additional_data = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    console.log(additional_data);

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

    // resetForm();
    // // console.log(reports);
    // let toast = Toast.show("Thank you for your report!", {
    //   duration: Toast.durations.LONG,
    //   position: Toast.positions.BOTTOM,
    //   shadow: true,
    //   animation: true,
    //   hideOnPress: true,
    //   delay: 0,
    // });

    // setTimeout(function hideToast() {
    //   Toast.hide(toast);
    // }, 3000);
  };

  //   const [objectonRoad, setObjectPressed] = useState(true);
  //   const [potholesPressed, setPotholesPressed] = useState(true);
  //   const [roadKillPressed, setRoadKillPressed] = useState(true);
  //   const [foodPressed, setFoodPressed] = useState(true);
  //   const [icePressed, setIcePressed] = useState(true);
  //   const [puddlesPressed, setPuddlesPressed] = useState(true);
  //   const [otherPressed, setOtherPressed] = useState(true);

  const resetForm = () => {
    // setObjectPressed(true);
    // setPotholesPressed(true);
    // setRoadKillPressed(true);
    // setFoodPressed(true);
    // setIcePressed(true);
    // setPuddlesPressed(true);
    // setOtherPressed(true);
    setMessage("");
    setSelectedLocale("Choose an Intersection");
    setreports([]);
  };
  const handleReset = () => {
    resetForm();
  };
  //   const handleObjectPress = () => {
  //     setObjectPressed(!objectonRoad);
  //     setreports([...reports, "Object on Road"]);
  //   };

  //   const handlePotHolesPress = () => {
  //     setPotholesPressed(!potholesPressed);
  //     setreports([...reports, "Road Potholes"]);
  //   };

  //   const handleRoadKillPress = () => {
  //     setRoadKillPressed(!roadKillPressed);
  //     setreports([...reports, "Road Kill"]);
  //   };
  //   const handleFoodPress = () => {
  //     setFoodPressed(!foodPressed);
  //     setreports([...reports, "Spilled Food"]);
  //   };

  //   const handleIcePress = () => {
  //     setIcePressed(!icePressed);
  //     setreports([...reports, "Black Ice/Ice"]);
  //   };
  //   const handlePuddlePress = () => {
  //     setPuddlesPressed(!puddlesPressed);
  //     setreports([...reports, "Puddles"]);
  //   };

  //   const handleOtherPress = () => {
  //     setOtherPressed(!otherPressed);
  //     setreports([...reports, "Other"]);
  //   };
  //   const objectButtonColor = objectonRoad ? "#808080" : "#5787F5";
  //   const potholesButtonColor = potholesPressed ? "#808080" : "#5787F5";
  //   const RoadKillButtonColor = roadKillPressed ? "#808080" : "#5787F5";
  //   const FoodButtonColot = foodPressed ? "#808080" : "#5787F5";
  //   const IceButtonColor = icePressed ? "#808080" : "#5787F5";
  //   const PuddleButtonColor = puddlesPressed ? "#808080" : "#5787F5";
  //   const otherButtonColor = otherPressed ? "#808080" : "#5787F5";

  return (
    <>
      <View style={styles.reportContainer}>
        <Text style={styles.ReportAccident}>New Report Form</Text>
        <Text style={styles.ReportHeader}>
          Choose your precise location on the map:
        </Text>
        <View style={styles.mapContainer}>
        <MapView
          // https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
          ref={mapRef}
          style={styles.smallMap}
          initialRegion={{
            latitude: 42.35021,
            longitude: -71.10653,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          showsCompass={false}
          showsPointsOfInterest={false}
          showsTraffic={true}
          showsIndoors={true}
          showsMyLocationButton={true}
        >
          {/* {renderMarkers()} */}
        </MapView>
        <LocationButton />
        </View>
        
        <Text style={[styles.ReportHeader, { top: 200 }]}>
          Which Locale Are You Closest To?
        </Text>
        <View style={{ top: 210 }}>
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

        <Text style={[styles.ReportHeader, { top: 230 }]}>Type of report</Text>
        <View style={{ top: 240 }}>
          <Dropdown
            mode="default"
            style={styles.dropdownContainer}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            iconStyle={styles.dropdownIcon}
            containerStyle={styles.itemContainer}
            itemTextStyle={styles.itemText}
            data={typesData}
            search={true}
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

        {/* <View>
          <Text style={styles.Present}>What Obstacles are Present?</Text>
        </View>
        <Text style={styles.Options}>Add any relevant options</Text>

        <TouchableOpacity
          onPress={handleObjectPress}
          style={[
            styles.Collisionbutton,
            { backgroundColor: objectButtonColor },
          ]}
        >
          <Text style={styles.AccidentOptions}>Object on Road</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePotHolesPress}
          style={[
            styles.Rolloverbutton,
            ,
            { backgroundColor: potholesButtonColor },
          ]}
        >
          <Text style={styles.AccidentOptions}>Road Potholes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRoadKillPress}
          style={[
            styles.Subwaybutton,
            { backgroundColor: RoadKillButtonColor },
          ]}
        >
          <Text style={styles.AccidentOptions}>Road Kill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFoodPress}
          style={[
            styles.Pedestrianbutton,
            { backgroundColor: FoodButtonColot },
          ]}
        >
          <Text style={styles.AccidentOptions}>Spilled Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleIcePress}
          style={[
            styles.SingleCar,
            { backgroundColor: IceButtonColor, width: 120 },
          ]}
        >
          <Text style={styles.AccidentOptions}>Black Ice/Ice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePuddlePress}
          style={[
            styles.Other,
            { backgroundColor: PuddleButtonColor, right: -125 },
          ]}
        >
          <Text style={styles.AccidentOptions}>Puddles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOtherPress}
          style={[
            styles.Other,
            {
              backgroundColor: otherButtonColor,
              top: -9,
              left: 220,
              width: 120,
            },
          ]}
        >
          <Text style={styles.AccidentOptions}>Other</Text>
        </TouchableOpacity> */}
        <View style={{ flexDirection: "row", top: 210 }}>
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
          style={[styles.MessageContainer, { flexDirection: "row", top: 270 }]}
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
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message here"
            multiline={true}
            maxLength={500}
            returnKeyType="done"
            blurOnSubmit={true}
          />
        </View>
        <View style={{ flexDirection: "row", top: 240 }}>
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
