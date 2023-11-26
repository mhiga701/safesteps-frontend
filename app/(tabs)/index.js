import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import MapView, {Marker} from "react-native-maps";
import { styles } from "../../components/styles";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import BluetoothClient from "../../components/BluetoothClient";
import Icon from "react-native-vector-icons/FontAwesome";
// import { BottomSheet } from '@gorhom/bottom-sheet';

export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  // const background = BluetoothClient();
  const mapRef = React.createRef();

  const [location, setLocation] = useState(null);

  const locationData = [
    {
      latitude: 42.35074, 
      longitude: 71.11078, 
      title: 'BU Bridge'
    },
    {
      latitude: 42.35021,
      longitude: 71.10653,
      title: 'Marsh Plaza'
    },
    {
      latitude: 42.34986,
      longitude: 71.10360,
      title: 'CCDS'
       
    }
  ];

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
        >
         
          
         </MapView> 
         <LocationButton />
      </View>
    </>
  );
}
