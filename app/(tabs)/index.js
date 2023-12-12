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
import Ionicon from 'react-native-vector-icons/Ionicons';
import { db } from "../../firebase";
import { doc, setDoc, addDoc,getDoc, collection,updateDoc} from "firebase/firestore";
export default function Page() {
  const [errorMsg, setErrorMsg] = useState(null);
  // const background = BluetoothClient();
  const mapRef = useRef();
  const date = new Date();
  const day = date.toLocaleDateString();
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
  const timeOptions = { hour12: true, hour: 'numeric', minute: 'numeric' };
  const time = date.toLocaleTimeString('en-US', timeOptions);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try{
          console.log("Marsh Plaza");
          const accidentquery = await getDoc(doc(db,"Accident Reports","Marsh Plaza"));
          const accdata = accidentquery.data();
          let dates = Object.keys(accdata);
          const obstaclequery = await getDoc(doc(db,"Obstacle Reports","Marsh Plaza"));
          const obsdata = obstaclequery.data();
          //one_day = dates;
          //console.log(one_day);
          dates.forEach(date => {
            
            const time1 = accdata[date];
            const time_key1 = Object.keys(time1);
            //Gets the most recent timestamp of a accident report
            const a = accdata[date][time_key1[0]];
            setMaryAccidentData(a);
            console.log("Time and accident data at Marsh Plaza",date,"-",time_key1[0],"-",a);
            const time2 = obsdata[date];
            const time_key2 = Object.keys(time2);
            //Gets the most recent timestamp of a obstacle report
            const o = obsdata[date][time_key2[0]];
            setMaryObstacleData(o);
            console.log("Time and obstacle data at Marsh Plaza",date,"-",time_key2[0],"-",o);
            
          });
          
          console.log("BU Bridge");
          
          const accidentquery2 = await getDoc(doc(db,"Accident Reports","BU Bridge"));
          const accdata2 = accidentquery2.data();
          dates = Object.keys(accdata2);
          const obstaclequery2 = await getDoc(doc(db,"Obstacle Reports","BU Bridge"));
          const obsdata2 = obstaclequery2.data();
         
          dates.forEach(date => {
            const time1 = accdata2[date];
            const time_key1 = Object.keys(time1);
            //Gets the most recent timestamp of a accident report
            const a2 = accdata2[date][time_key1[0]];
            setCentralAccidentData(a2);
            console.log("Time and accident data at BU Bridge",date,"-",time_key1[0],"-",a2);
            const time2 = obsdata2[date];
            const time_key2 = Object.keys(time2);
          
            //Gets the most recent timestamp of a obstacle report
            const o2 = obsdata2[date][time_key2[0]];
            setCentralObstacleData(o2);
            console.log("Time and obstacle data at BU Bridge",date,"-",time_key2[0],"-",o2);
            
          });
        
          
          console.log("CCDS");

          const accidentquery3 = await getDoc(doc(db,"Accident Reports","CCDS"));
          const accdata3 = accidentquery3.data();
          dates = Object.keys(accdata3);
          const obstaclequery3 = await getDoc(doc(db,"Obstacle Reports","CCDS"));
          const obsdata3 = obstaclequery3.data();
          
          dates.forEach (date => {
            
            const time2 = accdata3[date];
            const time_key2 = Object.keys(time2);
            
            //Gets the most recent timestamp of a accident report
            const a3 = accdata3[date][time_key2[0]];
            setEastAccidentData(a3);
            console.log("Time and accident data at CCDS",date,"-",time_key2[0],"-",a3);
            const time3 = obsdata3[date];
            const time_key3 = Object.keys(time3);
            
            //Gets the most recent timestamp of a obstacle report
            const o3 = obsdata3[date][time_key3[0]];
            setEastObstacleData(o3);
            console.log("Time and obstacle data at CCDS",date,"-",time_key3[0],"-",o3);
            
          });
          setIsLoading(false);
        }catch(e){
          console.log('Error Fetching Data',e);
        }
      };
      fetchData()
  },[]);

  useEffect(() => {
    if (!isLoading){
      let accidentresult = ""+day+'\t'+time+'\n';
      let obstacleresult = ""+day+'\t'+time+'\n';
            
      for (let i = 0; i< MaryaccidentData.length; i++){
          accidentresult += (i+1) + ':'+MaryaccidentData[i] + '\n';
      }
      for (let i = 0; i<MaryobstacleData.length; i++){
          obstacleresult += (i+1) + ':'+MaryobstacleData[i] + '\n';
      }
      setAData(accidentresult);
      setOData(obstacleresult);

      accidentresult = ""+day+'\t'+time+'\n';
      obstacleresult = ""+day+'\t'+time+'\n';
      for (let i = 0; i< CentralaccidentData.length; i++){
        accidentresult += (i+1) + ':'+ CentralaccidentData[i] + '\n';
      }
      for (let i = 0; i<CentralobstacleData.length; i++){
        obstacleresult += (i+1) + ':'+ CentralobstacleData[i] + '\n';
      }
        setAData2(accidentresult);
        setOData2(obstacleresult);
        accidentresult = ""+day+'\t'+time+'\n';
        obstacleresult = ""+day+'\t'+time+'\n';
        for (let i = 0; i< EastaccidentData.length; i++){
          accidentresult += (i+1) + ':'+ EastaccidentData[i] + '\n';
        }
        for (let i = 0; i<EastobstacleData.length; i++){
          obstacleresult += (i+1) + ':'+ EastobstacleData[i] + '\n';
        }
        setAData3(accidentresult);
        setOData3(obstacleresult);
      
            
    }
  },[isLoading, MaryaccidentData, MaryobstacleData,CentralaccidentData,CentralobstacleData,EastaccidentData,EastobstacleData]);

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
      <Icon name="crosshairs" size={25} color="#5787f5" style={styles.mapButtonStyle} />
    </TouchableOpacity>
  );

  const DefaultMapButton = () => (
    <TouchableOpacity style={styles.initialButton} onPress={() => {
      goToInitialLocation();
      setSelectedMarker(null);
    }}>
      <Ionicon name="arrow-back" size={25} color="#52525a" style={styles.initButtonStyle} />
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
            ;
             
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
        {selectedMarker ? <DefaultMapButton /> : null}
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
        <CollapsibleView title={<Text style={styles.collapsibleTitle}>Obstacles</Text>} titleStyle={styles.collapsibleTitle} style={styles.collapsibleContainer} collapsibleContainerStyle={styles.collapsibleContainerFull} unmountOnCollapse={true}>
        <Text style={styles.collapsibleTitle}>{Odata? Odata: 'Loading...'}</Text> 
        </CollapsibleView>
        <CollapsibleView title={<Text style={styles.collapsibleTitle}>Accidents</Text>} titleStyle={styles.collapsibleTitle} style={styles.collapsibleContainer} collapsibleContainerStyle={styles.collapsibleContainerFull} unmountOnCollapse={true}>
         <Text style={styles.collapsibleTitle}>{Adata? Adata: 'Loading...'}</Text> 
         
        </CollapsibleView>
        
        </View>
        }


          {selectedMarker !== null && selectedMarker.title === "BU Bridge" && 
          <View>
          <Text style={localStyles.bottomSheetHeader}>BU Bridge</Text>
         
          <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
          <CollapsibleView title={<Text style={styles.collapsibleTitle}>Obstacles</Text>}  titleStyle={styles.collapsibleTitle} style={styles.collapsibleContainer} collapsibleContainerStyle={styles.collapsibleContainerFull} unmountOnCollapse={true}>
          <Text style={styles.collapsibleTitle}>{Odata2? Odata2: 'Loading...'}</Text> 
          </CollapsibleView>
          <CollapsibleView title={<Text style={styles.collapsibleTitle}>Accidents</Text>} titleStyle={styles.collapsibleTitle} style={styles.collapsibleContainer} collapsibleContainerStyle={styles.collapsibleContainerFull} unmountOnCollapse={true}>
          <Text style={styles.collapsibleTitle}>{Adata2? Adata2: 'Loading...'}</Text> 
         
        </CollapsibleView>
       
        </View>
          }

          {selectedMarker !== null && selectedMarker.title === "CCDS" &&
             <View>
             <Text style={localStyles.bottomSheetHeader}>CCDS</Text>
            
             <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
             <CollapsibleView title={<Text style={styles.collapsibleTitle}>Obstacles</Text>} titleStyle={styles.collapsibleTitle} style={styles.collapsibleContainer} collapsibleContainerStyle={styles.collapsibleContainerFull} unmountOnCollapse={true}>
              <Text style={styles.collapsibleTitle}>{Odata3? Odata3: 'Loading...'}</Text> 
             </CollapsibleView>
             <CollapsibleView title={<Text style={styles.collapsibleTitle}>Accidents</Text>} titleStyle={styles.collapsibleTitle} style={styles.collapsibleContainer} collapsibleContainerStyle={styles.collapsibleContainerFull} unmountOnCollapse={true}>
              <Text style={styles.collapsibleTitle}>{Adata3? Adata3: 'Loading...'}</Text> 
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
  bottomSheetSubheader: {
    fontFamily: "Montserrat-Regular",
    color: "#52525a",
    fontSize: 14,
    textAlign: "left",
    paddingLeft: 20,
    marginVertical: 10,
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