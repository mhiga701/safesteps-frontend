import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../components/styles";
import * as Location from "expo-location";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Octicons";
import BottomSheet from "@gorhom/bottom-sheet";
import BackgroundLocation from "../../components/BackgroundLocation";
import Mapmarker from "../../assets/Mapmarker.svg";
import { locationData } from "../../components/Beacons";

export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  // const background = BluetoothClient();
  const mapRef = useRef();

  const [location, setLocation] = useState(null);

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
      <Icon name="crosshairs" size={25} color="#066ee6" />
    </TouchableOpacity>
  );

  const goToMyLocation = async () => {
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
        latitude: marker.location.latitude,
        longitude: marker.location.longitude,
      },
      // zoom: 17, // Android, needs to be adjusted after testing on Android
      altitude: 2000,
      pitch: 0,
      angle: 0,
      heading: 0,
      // useNativeDriver: true,
    });
  };
  const snapPoints = useMemo(() => ["25%", "40%", "90%"], []);

  const bottomSheetRef = useRef(null);

  const renderMarkers = () => {
    return locationData.map((marker, index) => {
      return (
        <Marker
          key={index}
          coordinate={marker.location}
          title={marker.title}
          description={marker.description}
          onPress={() => {
            //bottomSheetRef.current.expand();
            goToMarkerLocation(marker);
          }}
        >
          {/* <Image source={require("../../assets/Mapmarker.svg")} />
           */}
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
          // followsUserLocation={true}
        >
          {/* <RenderMarkers /> */}
          {renderMarkers()}
        </MapView>
        <LocationButton />
        <BottomSheet
          snapPoints={snapPoints}
          backgroundStyle={localStyles.bottomSheetContainer}
          style={localStyles.bottomSheetContainer}
          index={0}
          ref={bottomSheetRef}
        >
          <View>
            <Text style={localStyles.bottomSheetHeader}>Nearby Beacons</Text>
            <View style={localStyles.settingsContainer}>
              <View style={localStyles.rowContainer}>
                <Text style={styles.toggleText}>BU Central</Text>
              </View>
              <View style={localStyles.rowContainer3}>
                <Icon2 name="dot-fill" size={20} color="#fe2d01" />
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.toggleText}>
                    2 New Reports Since Yesterday
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={localStyles.settingsContainer}>
              <View style={localStyles.rowContainer}>
                <Text style={styles.toggleText}>BU East</Text>
              </View>
              <View style={localStyles.rowContainer3}>
                {/* <Icon name="dot-circle-o" size={15} color="#fe2d01" /> */}
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.toggleText}>
                    No New Reports Since Yesterday
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={localStyles.settingsContainer}>
              <View style={localStyles.rowContainer}>
                <Text style={styles.toggleText}>St. Mary's Street</Text>
              </View>
              <View style={localStyles.rowContainer3}>
                <Icon2 name="dot-fill" size={20} color="#fe2d01" />
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.toggleText}>
                    1 New Report Since Yesterday
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </>
  );
}

const localStyles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: "#ecedf2",
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: "#52525a",
  },
  bottomSheetHeader: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    marginLeft: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: -15,
  },
  rowContainer3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingRight: 50,
  },
  settingsContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 5,
    marginBottom: 15,
    paddingHorizontal: 25, // Add padding to separate elements
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
