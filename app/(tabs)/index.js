import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../../components/styles";
import * as Location from "expo-location";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet from "@gorhom/bottom-sheet";
import BackgroundLocation from "../../components/BackgroundLocation";
import Mapmarker from "../../assets/Mapmarker.svg";
import { locationData } from "../../components/Beacons";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Octicons";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

let BuBridge_numreports = 0;
let MarshPlaza_numreports = 0;
let CCDS_numreports = 0;

export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const snapPoints = useMemo(() => ["25%", "40%", "90%"], []);
  const bottomSheetRef = useRef(null);

  const [MaryaccidentData, setMaryAccidentData] = useState(null);
  const [MaryobstacleData, setMaryObstacleData] = useState(null);
  const [CentralaccidentData, setCentralAccidentData] = useState(null);
  const [CentralobstacleData, setCentralObstacleData] = useState(null);
  const [EastaccidentData, setEastAccidentData] = useState(null);
  const [EastobstacleData, setEastObstacleData] = useState(null);
  const [Odata, setOData] = useState("");
  const [Adata, setAData] = useState("");
  const [Odata2, setOData2] = useState("");
  const [Adata2, setAData2] = useState("");
  const [Odata3, setOData3] = useState("");
  const [Adata3, setAData3] = useState("");

  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [accidentresult, setaccidentresult] = useState("");
  const [obstacleresult, setobstacleresult] = useState("");
  const [accidentresult2, setaccidentresult2] = useState("");
  const [obstacleresult2, setobstacleresult2] = useState("");
  const [accidentresult3, setaccidentresult3] = useState("");
  const [obstacleresult3, setobstacleresult3] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //       try{
  //         // console.log("Marsh Plaza");
  //         const accidentquery = await getDoc(doc(db,"Accident Reports","Marsh Plaza"));
  //         const accdata = accidentquery.data();
  //         let dates = Object.keys(accdata);

  //         dates.forEach(date => {
  //           const time1 = accdata[date];
  //           const time_key1 = Object.keys(time1);
  //           //Gets the most recent timestamp of a accident report
  //           const a = accdata[date][time_key1[0]];
  //           setMaryAccidentData(a);
  //           // console.log("Time and accident data at Marsh Plaza",date,"-",time_key1[0],"-",a);
  //           setaccidentresult(""+date+'\t'+time_key1[0]+'\n');
  //         });
  //         const obstaclequery = await getDoc(doc(db,"Obstacle Reports","Marsh Plaza"));
  //         const obsdata = obstaclequery.data();
  //         dates = Object.keys(obsdata);

  //         dates.forEach(date => {
  //           const time2 = obsdata[date];
  //           const time_key2 = Object.keys(time2);
  //           //Gets the most recent timestamp of a obstacle report
  //           const o = obsdata[date][time_key2[0]];
  //           setMaryObstacleData(o);
  //           // console.log("Time and obstacle data at Marsh Plaza",date,"-",time_key2[0],"-",o);
  //           setobstacleresult(""+date+'\t'+time_key2[0]+'\n');
  //         });
  //         // console.log("BU Bridge");
  //         const accidentquery2 = await getDoc(doc(db,"Accident Reports","BU Bridge"));
  //         const accdata2 = accidentquery2.data();
  //         dates = Object.keys(accdata2);

  //         dates.forEach(date => {
  //           const time1 = accdata2[date];
  //           const time_key1 = Object.keys(time1);
  //           //Gets the most recent timestamp of a accident report
  //           const a2 = accdata2[date][time_key1[0]];
  //           setCentralAccidentData(a2);
  //           // console.log("Time and accident data at BU Bridge",date,"-",time_key1[0],"-",a2);
  //           setaccidentresult2(""+date+'\t'+time_key1[0]+'\n');

  //         });

  //         const obstaclequery2 = await getDoc(doc(db,"Obstacle Reports","BU Bridge"));
  //         const obsdata2 = obstaclequery2.data();
  //         dates = Object.keys(obsdata2);

  //         dates.forEach(date => {
  //           const time2 = obsdata2[date];
  //           const time_key2 = Object.keys(time2);
  //           //Gets the most recent timestamp of a obstacle report
  //           const o2 = obsdata2[date][time_key2[0]];
  //           setCentralObstacleData(o2);
  //           // console.log("Time and obstacle data at BU Bridge",date,"-",time_key2[0],"-",o2);
  //           setobstacleresult2(""+date+'\t'+time_key2[0]+'\n');
  //         });

  //         // console.log("CCDS");
  //         const accidentquery3 = await getDoc(doc(db,"Accident Reports","CCDS"));
  //         const accdata3 = accidentquery3.data();
  //         dates = Object.keys(accdata3);

  //         dates.forEach (date => {
  //           const time2 = accdata3[date];
  //           const time_key2 = Object.keys(time2);
  //           //Gets the most recent timestamp of a accident report
  //           const a3 = accdata3[date][time_key2[0]];
  //           setEastAccidentData(a3);
  //           // console.log("Time and accident data at CCDS",date,"-",time_key2[0],"-",a3);
  //           setaccidentresult3(""+date+'\t'+time_key2[0]+'\n');

  //         });

  //         const obstaclequery3 = await getDoc(doc(db,"Obstacle Reports","CCDS"));
  //         const obsdata3 = obstaclequery3.data();
  //         dates = Object.keys(obsdata3);

  //         dates.forEach(date => {
  //           const time2 = obsdata3[date];
  //           const time_key2 = Object.keys(time2);
  //           //Gets the most recent timestamp of a obstacle report
  //           const o3 = obsdata3[date][time_key2[0]];
  //           setEastObstacleData(o3);
  //           // console.log("Time and obstacle data at CCDS",date,"-",time_key2[0],"-",o3);
  //           setobstacleresult3(""+date+'\t'+time_key2[0]+'\n');
  //         });

  //         setIsLoading(false);
  //       }catch(e){
  //          console.log('Error Fetching Data',e);
  //       }
  //     };
  //     fetchData()

  // },[]);

  // useEffect(() => {
  //   if (!isLoading){
  //     let a = accidentresult;
  //     let o = obstacleresult;

  //     MarshPlaza_numreports = MaryaccidentData.length + MaryobstacleData.length;

  //     for (let i = 0; i< MaryaccidentData.length; i++){
  //         a += (i+1) + ':'+MaryaccidentData[i] + '\n';
  //     }
  //     for (let i = 0; i<MaryobstacleData.length; i++){
  //         o += (i+1) + ':'+MaryobstacleData[i] + '\n';
  //     }
  //     setAData(a);
  //     setOData(o);

  //     let a2 = accidentresult2;
  //     let o2 = obstacleresult2;
  //     BuBridge_numreports = CentralaccidentData.length + CentralobstacleData.length;

  //     for (let i = 0; i< CentralaccidentData.length; i++){
  //       a2 += (i+1) + ':'+ CentralaccidentData[i] + '\n';
  //     }
  //     for (let i = 0; i<CentralobstacleData.length; i++){
  //       o2 += (i+1) + ':'+ CentralobstacleData[i] + '\n';
  //     }
  //       setAData2(a2);
  //       setOData2(o2);
  //     let a3 = accidentresult3;
  //     let o3 = obstacleresult3;
  //     CCDS_numreports = EastaccidentData.length + EastobstacleData.length;

  //     for (let i = 0; i< EastaccidentData.length; i++){
  //       a3 += (i+1) + ':'+ EastaccidentData[i] + '\n';
  //     }
  //     for (let i = 0; i<EastobstacleData.length; i++){
  //       o3 += (i+1) + ':'+ EastobstacleData[i] + '\n';
  //     }
  //       setAData3(a3);
  //       setOData3(o3);
  //   }
  // },[isLoading, MaryaccidentData, MaryobstacleData,CentralaccidentData,CentralobstacleData,EastaccidentData,EastobstacleData]);

  //marker that pops up if there are reports at a beacon
  const RedDot = () => {
    return <Icon2 name="dot-fill" size={20} color="#fe2d01" />;
  };
  //default view of the bottomsheet
  const DefaultMap = () => {
    return (
      <View>
        <Text style={styles.bottomSheetHeader}>Nearby Beacons</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>Marsh Plaza</Text>
          </View>
          <View style={styles.rowContainer3}>
            {MarshPlaza_numreports ? <RedDot /> : null}
            <TouchableOpacity
              onPress={() => {
                setSelectedMarker({ title: "Marsh Plaza" });
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
                setSelectedMarker({ title: "CCDS" });
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
                setSelectedMarker({ title: "BU Bridge" });
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

          {selectedMarker !== null &&
            selectedMarker.title === "Marsh Plaza" && (
              <View>
                <Text style={styles.bottomSheetHeader}>Marsh Plaza</Text>
                <Text style={styles.bottomSheetSubheader}>
                  REPORTS THIS WEEK
                </Text>
                <CollapsibleView
                  title={<Text style={styles.collapsibleTitle}>Obstacles</Text>}
                  titleStyle={styles.collapsibleTitle}
                  style={styles.collapsibleContainer}
                  collapsibleContainerStyle={styles.collapsibleContainerFull}
                  unmountOnCollapse={true}
                >
                  <Text style={styles.collapsibleTitle}>
                    {Odata ? Odata : "Loading..."}
                  </Text>
                </CollapsibleView>

                <CollapsibleView
                  title={<Text style={styles.collapsibleTitle}>Accidents</Text>}
                  titleStyle={styles.collapsibleTitle}
                  style={styles.collapsibleContainer}
                  collapsibleContainerStyle={styles.collapsibleContainerFull}
                  unmountOnCollapse={true}
                >
                  <Text style={styles.collapsibleTitle}>
                    {Adata ? Adata : "Loading..."}
                  </Text>
                </CollapsibleView>
              </View>
            )}

          {selectedMarker !== null && selectedMarker.title === "BU Bridge" && (
            <View>
              <Text style={styles.bottomSheetHeader}>BU Bridge</Text>
              <Text style={styles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
              <CollapsibleView
                title={<Text style={styles.collapsibleTitle}>Obstacles</Text>}
                titleStyle={styles.collapsibleTitle}
                style={styles.collapsibleContainer}
                collapsibleContainerStyle={styles.collapsibleContainerFull}
                unmountOnCollapse={true}
              >
                <Text style={styles.collapsibleTitle}>
                  {Odata2 ? Odata2 : "Loading..."}
                </Text>
              </CollapsibleView>

              <CollapsibleView
                title={<Text style={styles.collapsibleTitle}>Accidents</Text>}
                titleStyle={styles.collapsibleTitle}
                style={styles.collapsibleContainer}
                collapsibleContainerStyle={styles.collapsibleContainerFull}
                unmountOnCollapse={true}
              >
                <Text style={styles.collapsibleTitle}>
                  {Adata2 ? Adata2 : "Loading..."}
                </Text>
              </CollapsibleView>
            </View>
          )}

          {selectedMarker !== null && selectedMarker.title === "CCDS" && (
            <View>
              <Text style={styles.bottomSheetHeader}>CCDS</Text>
              <Text style={styles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
              <CollapsibleView
                title={<Text style={styles.collapsibleTitle}>Obstacles</Text>}
                titleStyle={styles.collapsibleTitle}
                style={styles.collapsibleContainer}
                collapsibleContainerStyle={styles.collapsibleContainerFull}
                unmountOnCollapse={true}
              >
                <Text style={styles.collapsibleTitle}>
                  {Odata3 ? Odata3 : "Loading..."}
                </Text>
              </CollapsibleView>

              <CollapsibleView
                title={<Text style={styles.collapsibleTitle}>Accidents</Text>}
                titleStyle={styles.collapsibleTitle}
                style={styles.collapsibleContainer}
                collapsibleContainerStyle={styles.collapsibleContainerFull}
                unmountOnCollapse={true}
              >
                <Text style={styles.collapsibleTitle}>
                  {Adata3 ? Adata3 : "Loading..."}
                </Text>
              </CollapsibleView>
            </View>
          )}
        </BottomSheet>
      </View>
    </>
  );
}
