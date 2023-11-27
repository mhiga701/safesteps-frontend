import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import MapView from "react-native-maps";
import Marker from "react-native-maps";
import { styles } from "../../components/styles";
import * as Location from "expo-location";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import BluetoothClient from "../../components/BluetoothClient";
import Icon from "react-native-vector-icons/FontAwesome";
import { BottomSheet } from "@gorhom/bottom-sheet";
import BackgroundLocation from "../../components/BackgroundLocation";

export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  // const background = BluetoothClient();
  const mapRef = React.createRef();

  const [location, setLocation] = useState(null);

  const bottomSheetRef = useRef < BottomSheet > null;

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

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
      <Icon name="crosshairs" size={30} color="#000000" />
    </TouchableOpacity>
  );

  const goToMyLocation = async () => {
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
    });
  };

  return (
    <>
      <BackgroundLocation />
      <BluetoothClient />
      <View style={styles.map_container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 42.35012,
            longitude: -71.10472,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          // followsUserLocation={true}
        />
        <LocationButton />
      </View>
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.container}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet> */}
    </>
  );
}
