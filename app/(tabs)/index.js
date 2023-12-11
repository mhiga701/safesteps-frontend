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
  const test = async () =>{
    
      const accidentquery = await getDoc(doc(db,"Accident Reports","St Mary's Street"));
      const accdata = accidentquery.data();
      console.log(day);
      console.log(time);
      const q = accdata[day]['9:05 PM'];
      console.log("Document data:", q);

      const obstaclequey = await getDoc(doc(db,"Obstacle Reports","St Mary's Street"));
      const obsdata = obstaclequey.data();
      const o = obsdata[day]['9:05 PM'];
      console.log("Document data:", o);
      return;
  };
  useEffect(() => {
    const fetchData = async () => {
        try{
          // const intersection = ["BU Central","St Mary's Street","BU East"];
          // for (let i = 0; i < intersection.length;i++){
          //   const obstaclequey = await getDoc(doc(db,"Obstacle Reports",intersection[i]));
          //   const obsdata = obstaclequey.data();
          //   const o = obsdata[day]['10:19 PM'];
          //   setMaryObstacleData(o);
          //   // setCentralObstacleData
          //   // setEastObstacleData
          //   let obstacleresult = ""+day+'\t'+time+'\n';
          //   for (let j = 0; MaryobstacleData.length;j++){
          //     obstacleresult += i + ':'+MaryobstacleData[i] + '\n';
          //   }
          // }
          

          const accidentquery = await getDoc(doc(db,"Accident Reports","St Mary's Street"));
          const accdata = accidentquery.data();
          const a = accdata[day]['9:05 PM'];
          
          const obstaclequery = await getDoc(doc(db,"Obstacle Reports","St Mary's Street"));
          const obsdata = obstaclequery.data();
          const o = obsdata[day]['9:05 PM'];
          
          setMaryAccidentData(a);
          setMaryObstacleData(o);
          
          
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
          

          const accidentquery2 = await getDoc(doc(db,"Accident Reports","BU Central"));
          const accdata2 = accidentquery2.data();
          const a2 = accdata2[day]['10:13 PM'];
          
         
          const obstaclequery2 = await getDoc(doc(db,"Obstacle Reports","BU Central"));
          const obsdata2 = obstaclequery2.data();
          const o2 = obsdata2[day]['10:19 PM'];
          
          console.log(o3);
          setCentralAccidentData(a2);
          setCentralObstacleData(o2);

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
          console.log(o);
          const accidentquery3 = await getDoc(doc(db,"Accident Reports","BU East"));
          const accdata3 = accidentquery3.data();
          const a3 = accdata3[day]['10:13 PM'];
          
          const obstaclequery3 = await getDoc(doc(db,"Obstacle Reports","BU East"));
          const obsdata3 = obstaclequery3.data();
          const o3 = obsdata3[day]['10:19 PM'];
          
          setEastAccidentData(a3);
          setEastObstacleData(o3);

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
          
          
        }catch(e){
          console.log('Error Fetching Data',e);
        }
      };
      fetchData()
  },[]);

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
        <CollapsibleView title="Obstacles">
        <Text>{Odata? Odata: 'Loading...'}</Text> 
        </CollapsibleView>
        <CollapsibleView title="Accidents">
         <Text>{Adata? Adata: 'Loading...'}</Text> 
         
        </CollapsibleView>
        
        </View>
        }


          {selectedMarker !== null && selectedMarker.title === "BU Bridge" && 
          <View>
          <Text style={localStyles.bottomSheetHeader}>BU Bridge</Text>
         
          <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
          <CollapsibleView title="Obstacles">
          <Text>{Odata2? Odata2: 'Loading...'}</Text> 
          </CollapsibleView>
          <CollapsibleView title="Accidents">
          <Text>{Adata2? Adata2: 'Loading...'}</Text> 
         
        </CollapsibleView>
       
        </View>
          }

          {selectedMarker !== null && selectedMarker.title === "CCDS" &&
             <View>
             <Text style={localStyles.bottomSheetHeader}>CCDS</Text>
            
             <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
             <CollapsibleView title="Obstacles">
              <Text>{Odata3? Odata3: 'Loading...'}</Text> 
             </CollapsibleView>
             <CollapsibleView title="Accidents">
              <Text>{Adata3? Adata3: 'Loading...'}</Text> 
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