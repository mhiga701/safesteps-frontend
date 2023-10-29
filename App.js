import { StatusBar } from "expo-status-bar";
import { React, useEffect, useReducer, useRef, useState } from "react";
import { FlatList, TouchableOpacity, Modal, Switch,Text, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Audio } from 'expo-av';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Font from 'expo-font'
import { styles } from './components/styles'
import tw from "twrnc";

async function loadFont(){
  await Font.loadAsync({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
    'Bitter-Regular': require('./assets/fonts/Bitter-Regular.otf'),
    'Shrikhand-Regular': require('./assets/fonts/Shrikhand-Regular.otf'),
  });
};
loadFont();


playSound = async () => {
  const sound = new Audio.Sound();
  try {
    let source = require('./assets/beep.mp3');
    await sound.loadAsync(source);
    await sound
    .playAsync()
    .then(async playbackStatus => {
      setTimeout(() => {
        sound.unloadAsync();
      }, playbackStatus.playableDurationMillis)
    })
    .catch(error => {
      console.log(error)
    })
  } catch (error) {
    console.log(error)
  }
}

let initialState = {
  isScanning: false,
  scanDone: false,
  bleReady: false,
  items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setBLEReady":
      return { ...state, bleReady: true };

      //break;
    case "setBLEScan":
      return { ...state, isScanning: action.payload };
    case "addItem":
      let items = state.items;

      if (items.findIndex((x) => x.id == action.payload.id) == -1) {
        items.push(action.payload);
      }

      return { ...state, items: items };
    case "stopScan":
      return { ...state, isScanning: false, scanDone: true };
    case "reset":
      return {
        ...state,
        items: [],
        bleReady: true,
        isScanning: false,
        scanDone: false,
      };

    default:
      return state;
  }
};
const manager = new BleManager();
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stopBLEScan = () => {
    manager.stopDeviceScan();
    dispatch({ type: "stopScan" });
  };

  const timerRef = useRef(null);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      dispatch({ type: "setBLEScan", payload: true });
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      dispatch({ type: "addItem", payload: device });
    });
  };
   //scan and connect

  useEffect(() => {
    if (state.bleReady && !state.isScanning && !state.scanDone) {
      scanAndConnect();
    }

    if (state.scanTimeout <= 0 && state.isScanning && !state.scanDone) {
      dispatch({ type: "stopScan" });
    }
  }, [state]);

  //10 seconds of scanning before refresh./timeout

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      stopBLEScan();
    }, 1000 * 10);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  //check for state changes

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === "PoweredOn") {
        dispatch({ type: "setBLEReady" });
        subscription.remove();
      }
    }, true);
    return () => subscription.remove();
  }, [manager]);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [testscreen, setTestScreen] = useState(false);
  const [visualAlertEnabled, setVisualAlertEnabled] = useState(false);
  const [audioAlertEnabled, setAudioAlertEnabled] = useState(false);
  if (!fontLoaded) {
    return <Image source={require('./assets/splash.png')}/>
  }
  else {
    if (splash) {
      return <Modal visible={splash} animationType="fade">
      <View style={styles.container}>
        <Image source={require('./assets/sc.png')}/>
        <TouchableOpacity style={styles.button} onPress={() => setSplash(false)}>
          <Text style={styles.ackButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    }
  const renderItem = ({ item }) => {
    return (
      <View style={tw`p-2 border rounded-md m-2`}>
        <Text style={tw`text-[24px]`}>{item.name || "No name found"}</Text>
        <Text style={tw`text-[12px]`}>{item.id}</Text>
      </View>
    );
  };

  return (
   
    <View> 
       <Modal show={testscreen}>
      <StatusBar style="auto" />
      <View
        style={tw`text-red-200 flex`}
      >
        <View style={tw` h-full flex`}>
          <View style={tw`p-4 border-b`}>
            <Text style={tw`text-[22px]`}>
              Available BLE devices in your area
            </Text>
          </View>
          <FlatList
            refreshing={state.isScanning}
            onRefresh={() => dispatch({ type: "reset" })}
            renderItem={renderItem}
            data={state.items}
            style={tw`flex border-b`}
          />
        </View>
      </View>
  </Modal>
      <>
        
        <View style={styles.container}>
          <Text style={styles.mainHeadingText}>Alert Types</Text>
          <Text style={styles.subheadingText}>VISUAL ALERT</Text>
    
          <View style={styles.settingsContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Enable Visual Alerts</Text>
              <Switch
                value={visualAlertEnabled}
                onValueChange={() => setVisualAlertEnabled(!visualAlertEnabled)}
                trackColor={{ false: '#e8e5ea', true: '#7e678f' }} />
            </View>
    
    
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Visual Alert #1</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  if (visualAlertEnabled) {
                    setAlert1(true);
                  }
                } }>
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>
    
            <View style={styles.rowContainer3}>
              <Text style={styles.toggleText}>Visual Alert #2</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  if (visualAlertEnabled) {
                    setAlert2(true);
                  }
                } }>
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>
    
          </View>
    
          <Text style={styles.subheadingText}>AUDIO ALERT</Text>
    
          <View style={styles.settingsContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Enable Audio Alerts</Text>
              <Switch
                value={audioAlertEnabled}
                onValueChange={() => 
                  setAudioAlertEnabled(!audioAlertEnabled)
                }
                trackColor={{ false: '#e8e5ea', true: '#7e678f' }} />
            </View>
    
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Audio Alert</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  if (audioAlertEnabled) {
                    setAlert3(!alert3);
                    playSound();
                  }
                } }>
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>
    
          </View>
                <TouchableOpacity style={styles.button} onPress={() => setTestScreen(true)}>Find Nearby Devices</TouchableOpacity>
        </View>
        <AwesomeAlert
            show={alert1}
            showProgress={false}
            title="Approaching Intersection"
            titleStyle={styles.alert1Text}
            message="Look Up!"
            messageStyle={styles.alert1Text}
            showConfirmButton={true}
            confirmText="I acknowledge"
            confirmButtonStyle={styles.button2}
            onConfirmPressed={() => setAlert1(false)} />
    
    <AwesomeAlert
               show={alert3}
               showProgress={false}
               title="Ongoing Auditory Alert"
               titleStyle={styles.alert1Text}
               message="When the auditory alert is enabled, just the audio will play. This pop-up is just to show  that the alert is working."
               messageStyle={styles.toggleText}
               showConfirmButton={true}
               cancelText="Test Again"
               cancelButtonStyle={styles.audiobutton1}
               cancelButtonTextStyle={styles.gotItButton}
               showCancelButton={true}
               confirmText='Got it!'
               confirmButtonStyle={styles.audiobutton2}
               confirmButtonTextStyle={styles.ackButtonText2}
               onConfirmPressed={() => setAlert3(!alert3)} 
               onCancelPressed={() => {
                 if (audioAlertEnabled) {
                   playSound();
                 }
               }} 
           />
            
            
          <Modal visible={alert2} animationType="fade">
            <View style={styles.alert2Container}>
              <Text style={styles.alert2Text}>Approaching</Text>
              <Text style={styles.alert2Text}>Intersection</Text>
              <Image source={require('./assets/alert.png')} style={styles.alert2Image} />
              <Text style={styles.alert2Text}>Look Up!</Text>
              <TouchableOpacity style={styles.visbutton1} onPress={() => setAlert2(false)}>
                <Text style={styles.ackButtonText}>I acknowledge</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <StatusBar style="auto" />
          
          </>
  
    </View>
    
  );
}
}
