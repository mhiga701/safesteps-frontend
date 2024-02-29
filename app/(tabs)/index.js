import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../components/styles";
import * as Location from "expo-location";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet from "@gorhom/bottom-sheet";
import BackgroundLocation from "../../components/BackgroundLocation";
import Mapmarker from "../../assets/Mapmarker.svg";
import { locationData, locationsGet } from "../../components/Beacons";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Octicons";

let BuBridge_numreports = 0;
let MarshPlaza_numreports = 0;
let CCDS_numreports = 0;

export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const snapPoints = useMemo(() => ["25%", "40%", "90%"], []);
  const bottomSheetRef = useRef(null);

  const [locData, setLocData] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const outinfo = await locationsGet();
      setLocData(outinfo);
    };

    getLocations();
  }, []);

  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const RedDot = () => {
    return <Icon2 name="dot-fill" size={20} color="#fe2d01" />;
  };
  //default view of the bottomsheet
  const DefaultMap = () => {
    return (
      <View>
        <Text style={styles.bottomSheetHeader}>Nearby Reports</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>Marsh Plaza</Text>
          </View>
          <View style={styles.rowContainer3}>
            {MarshPlaza_numreports ? <RedDot /> : null}
            <TouchableOpacity
              onPress={() => {
                // setSelectedMarker({ title: "Marsh Plaza" });
              }}
            >
              {<Text style={styles.toggleText}>
                {MarshPlaza_numreports} New Reports Since Yesterday
              </Text> ? (
                <Text style={styles.toggleText}>
                  {MarshPlaza_numreports} New Reports Since Yesterday
                </Text>
              ) : (
                <Text style={styles.toggleText}>
                  0 new Reports Since Yesterday
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>CCDS</Text>
          </View>
          <View style={styles.rowContainer3}>
            {CCDS_numreports ? <RedDot /> : null}
            <TouchableOpacity
              onPress={() => {
                // setSelectedMarker({ title: "CCDS" });
              }}
            >
              {<Text style={styles.toggleText}>
                {CCDS_numreports} New Reports Since Yesterday
              </Text> ? (
                <Text style={styles.toggleText}>
                  {CCDS_numreports} New Reports Since Yesterday
                </Text>
              ) : (
                <Text style={styles.toggleText}>
                  0 new Reports Since Yesterday
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>BU Bridge</Text>
          </View>
          <View style={styles.rowContainer3}>
            {BuBridge_numreports ? <RedDot /> : null}
            <TouchableOpacity
              onPress={() => {
                // setSelectedMarker({ title: "BU Bridge" });
              }}
            >
              {<Text style={styles.toggleText}>
                {BuBridge_numreports} New Reports Since Yesterday
              </Text> ? (
                <Text style={styles.toggleText}>
                  {BuBridge_numreports} New Reports Since Yesterday
                </Text>
              ) : (
                <Text style={styles.toggleText}>
                  0 new Reports Since Yesterday
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    let locationWatcher = null;

    const startWatching = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 1000, // Update location every second
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    };
    startWatching();
    return () => {
      if (locationWatcher) {
        locationWatcher.remove();
      }
    };
  }, []);

  const LocationButton = () => (
    <TouchableOpacity style={styles.locationButton} onPress={goToMyLocation}>
      <Icon
        name="crosshairs"
        size={25}
        color="#5787f5"
        style={styles.mapButtonStyle}
      />
    </TouchableOpacity>
  );

  const DefaultMapButton = () => (
    <TouchableOpacity
      style={styles.initialButton}
      onPress={() => {
        goToInitialLocation();
        setSelectedMarker(null);
      }}
    >
      <Ionicon
        name="arrow-back"
        size={25}
        color="#52525a"
        style={styles.initButtonStyle}
      />
    </TouchableOpacity>
  );
  const goToMyLocation = async () => {
    console.log("Latitude:", location.coords.latitude);
    console.log("Longitude:", location.coords.longitude);
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      // zoom: 17, // Android, needs to be adjusted after testing on Android
      altitude: 2000,
      pitch: 0,
      angle: 0,
      heading: 0,
      // useNativeDriver: true,
    });
  };

  const goToMarkerLocation = async (marker) => {
    mapRef.current.animateCamera({
      center: {
        latitude: marker.value.location.latitude,
        longitude: marker.value.location.longitude,
      },
      // zoom: 17, // Android, needs to be adjusted after testing on Android
      altitude: 2000,
      pitch: 0,
      angle: 0,
      heading: 0,
      // useNativeDriver: true,
    });
  };
  const goToInitialLocation = async () => {
    mapRef.current.animateCamera({
      center: {
        latitude: 42.35021,
        longitude: -71.10653,
      },
      altitude: 9000,
    });
  };

  const renderMarkers = () => {
    return locData.map((marker) => {
      // Takes marker: {id: ___, value: {type: ___, location: {latitude: ___, longitude: ___}, active: ___, seenTrue: ___, seenFalse: ___, subReports: ___}}

      return (
        <Marker
          key={marker.id}
          coordinate={marker.value.location}
          title={marker.value.type}
          description={marker.value.description.substring(0, 30) + "..."}
          onPress={() => {
            if (selectedMarker !== null && selectedMarker === marker) {
              setSelectedMarker(null);
              goToInitialLocation();
            } else if (selectedMarker !== null && selectedMarker !== marker) {
              setSelectedMarker(marker);
              goToMarkerLocation(marker);
            } else {
              setSelectedMarker(marker);
              goToMarkerLocation(marker);
            }
          }}
        >
          <Mapmarker />
        </Marker>
      );
    });
  };
  return (
    <>
      <BackgroundLocation />
      <View style={styles.map_container}>
        <MapView
          // https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 42.35021,
            longitude: -71.10653,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          showsUserLocation={true}
          showsCompass={false}
          showsPointsOfInterest={false}
          showsTraffic={true}
          showsIndoors={true}
          showsMyLocationButton={true}
        >
          {renderMarkers()}
        </MapView>
        <LocationButton />
        {selectedMarker ? <DefaultMapButton /> : null}
        <BottomSheet
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetContainer}
          style={styles.bottomSheetContainer}
          index={1}
          ref={bottomSheetRef}
        >
          {selectedMarker === null && <DefaultMap />}

          {selectedMarker !== null && (
            <View>
              <Text style={styles.bottomSheetHeader}>
                {selectedMarker.value.type} at{" "}
                {selectedMarker.value.location.latitude}
                {", "}
                {selectedMarker.value.location.longitude}
              </Text>
              <Text style={styles.bottomSheetSubheader}>
                {selectedMarker.value.description}
              </Text>
              <Text style={styles.bottomSheetSubheader}>
                {selectedMarker.value.seenTrue}
                {" other "}
                {selectedMarker.value.seenTrue === 1
                  ? "person has "
                  : "people have "}
                confirmed this is still here
              </Text>
              {/* <Text style={styles.bottomSheetSubheader}>
                {selectedMarker.value.seenFalse}{" "}
                {selectedMarker.value.seenTrue === 1
                  ? "person doesn't "
                  : "people don't "}
                see this anymore
              </Text> */}
              {console.log(
                "selectedMarker: ",
                selectedMarker,
                selectedMarker.value.subReports
              )}
              {selectedMarker.value.subReports.map((subReport, index) => {
                const date = new Date(subReport.timestamp.seconds * 1000);
                return (
                  <CollapsibleView
                    key={index}
                    title={
                      <Text style={styles.collapsibleTitle}>
                        Report on {date.toDateString()}
                      </Text>
                    }
                    titleStyle={styles.collapsibleTitle}
                    style={styles.collapsibleContainer}
                    collapsibleContainerStyle={styles.collapsibleContainerFull}
                    unmountOnCollapse={true}
                  >
                    <Text style={styles.collapsibleTitle}>
                      {subReport.description}
                    </Text>
                    <Text style={styles.collapsibleTitle}>
                      Still seen: {subReport.seen ? "true" : "false"}
                    </Text>
                  </CollapsibleView>
                );
              })}
            </View>
          )}
        </BottomSheet>
      </View>
    </>
  );
}
