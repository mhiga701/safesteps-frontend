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
import BottomSheet from "@gorhom/bottom-sheet";
import BackgroundLocation from "../../components/BackgroundLocation";
import Mapmarker from "../../assets/Mapmarker.svg";
import { locationData } from "../../components/Beacons";
import DefaultMap from "../../components/Bottomsheets";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

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
  const goToInitialLocation = async () => {
    mapRef.current.animateCamera({
      center: {
        latitude: 42.35021,
        longitude: -71.10653,
     
      },
      altitude: 4000,
    });
  };
  const snapPoints = useMemo(() => ["25%", "40%", "90%"], []);

  const bottomSheetRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const renderMarkers = () => {
    return locationData.map((marker, index) => {
      return (
        <Marker
          key={index}
          coordinate={marker.location}
          title={marker.title}
          description={marker.description}
          onPress={() => {
            if (selectedMarker !== null && selectedMarker === marker) {
              setSelectedMarker(null);
              goToInitialLocation();
            }
            else if (selectedMarker !== null && selectedMarker !== marker) {
              setSelectedMarker(marker);
              goToMarkerLocation(marker);
            }
            else {
              setSelectedMarker(marker);
              goToMarkerLocation(marker);
             
            }
            
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
          index={1}
          ref={bottomSheetRef}
        >
          {selectedMarker === null && <DefaultMap />}


          {selectedMarker !== null && selectedMarker.title === "Marsh Plaza" &&  
          <View>
          <Text style={localStyles.bottomSheetHeader}>Marsh Plaza</Text>
         
          <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
        <CollapsibleView 
        title="Black Ice"
        style={styles.collapsibleContainer}
        titleStyle={styles.collapsibleTitle}
        >
         <Text>Watch out for black ice near the curbs around Marsh Plaza. It's very slippery!</Text> 
        </CollapsibleView>
        </View>
        }


          {selectedMarker !== null && selectedMarker.title === "BU Bridge" && 
          <View>
          <Text style={localStyles.bottomSheetHeader}>BU Bridge</Text>
         
          <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
        <CollapsibleView title="Black Ice">
         <Text>Watch out for black ice near the curbs around Marsh Plaza. It's very slippery!</Text> 
        </CollapsibleView>
        </View>
          }

          {selectedMarker !== null && selectedMarker.title === "CCDS" &&
             <View>
             <Text style={localStyles.bottomSheetHeader}>CCDS</Text>
            
             <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
           <CollapsibleView title="Black Ice">
            <Text>Watch out for black ice near the curbs around Marsh Plaza. It's very slippery!</Text> 
           </CollapsibleView>
           </View>
          }
       
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