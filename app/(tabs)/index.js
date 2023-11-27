import { View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../components/styles";
import * as Location from "expo-location";
import React, { useState, useEffect, useRef } from "react";
import BluetoothClient from "../../components/BluetoothClient";
import Icon from "react-native-vector-icons/FontAwesome";
// import { BottomSheet } from '@gorhom/bottom-sheet';

const locationData = [
  {
    title: 'BU Bridge',
    location: {
      latitude: 42.35074, 
      longitude: 71.11078, 
    },
    description: 'Cars drive fast here!',
  },
  {
    title: 'Marsh Plaza',
    location: {
      latitude: 42.35021, 
      longitude: 71.10653, 
    },
    description: 'Lots of pedestrians here!',
  },
  {
    title: 'CCDS',
    location: {
      latitude: 42.34986, 
      longitude: 71.10360, 
    },
    description: 'Lots of pedestrians here!',
  },
];


export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  // const background = BluetoothClient();
  const mapRef = useRef();

  const [location, setLocation] = useState(null);

  const renderMarkers = () => {
    return locationData.map((marker, index) => {
      return (
        <Marker
          key={index}
          coordinate={marker.location}
          title={marker.title}
          description={marker.description}
        />
      );
    })
  }
  
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
          // followsUserLocation={true}
        >
         {renderMarkers()}
         </MapView> 
         <LocationButton />
      </View>
    </>
  );
}
