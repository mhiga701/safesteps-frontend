import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
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
import BluetoothClient from "../../components/BluetoothClient";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import BackgroundLocation from "../../components/BackgroundLocation";


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
  const currentLocation = () => {
    if (location) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }
    return {
      latitude: 42.35074,
      longitude: -71.11078,
    };
  }
  const snapPoints = useMemo(() => ['25%', '40%', '90%'], []);

  const bottomSheetRef = useRef(null);


  return (
    <>
      <BackgroundLocation />
      <BluetoothClient />
      <View style={styles.map_container}>
        
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 42.35074,
            longitude:  -71.11078,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          // followsUserLocation={true}
        >
         {renderMarkers()}
         </MapView> 
         <LocationButton />
         <BottomSheet 
         snapPoints={snapPoints} 
         backgroundStyle={localStyles.bottomSheetContainer} 
         style={localStyles.bottomSheetContainer} 
         index={1} 
         ref={bottomSheetRef}>
          <View>
            <Text style={localStyles.bottomSheetHeader}>Nearby Beacons</Text>
              <View style={localStyles.settingsContainer}>
                <View style={localStyles.rowContainer}>
                  <Text style={styles.toggleText}>BU Central</Text>
                </View>
                  <View style={localStyles.rowContainer3}>
                    <Icon name="dot-circle-o" size={15} color="#fe2d01" />
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.toggleText}>2 New Reports Since Yesterday</Text>
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
                      <Text style={styles.toggleText}>No New Reports Since Yesterday</Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={localStyles.settingsContainer}>
                <View style={localStyles.rowContainer}>
                  <Text style={styles.toggleText}>St. Mary's Street</Text>
                </View>
                  <View style={localStyles.rowContainer3}>
                    <Icon name="dot-circle-o" size={15} color="#fe2d01" />
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.toggleText}>1 New Report Since Yesterday</Text>
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
  },
  bottomSheetHeader: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
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
    paddingRight:50,
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
