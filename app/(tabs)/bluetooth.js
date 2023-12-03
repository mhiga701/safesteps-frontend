/*
  This is a debug page for bluetooth. We're trying to test the following functionalities:
  - Start/Stop Scan
  - Retrieve devices
  - Iterate over devices and choose which one to connect to
  - Pub/Sub to the device
  - Disconnect when done
*/

import React, { Component, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import BleManager from "react-native-ble-manager";
import { styles } from "../../components/styles";
import AlertHeader from "../../assets/AlertTypes3.svg";

const bluetooth = () => {
  const [bleState, setBleState] = useState("Null");
  const [scanIds, setScanIds] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const startBleManager = () => {
    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initialized");
    });
  };

  const startTheScan = () => {
    BleManager.scan(["6969"], 5, true).then(() => {
      // Success code
      console.log("Scan started");
    });
  };

  const stopTheScan = () => {
    BleManager.stopScan().then(() => {
      // Success code
      console.log("Scan stopped");
    });
  };

  const getState = () => {
    BleManager.checkState().then((state) => {
      // console.log(`current BLE state = '${state}'.`);
      setBleState(state);
    });
    // return state;
  };

  const retrieveConnected = () => {
    BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
      // Success code
      console.log("Discovered peripherals: " + peripheralsArray.length);
      // console.log(peripheralsArray[0].advertising.localName);
      console.log(
        peripheralsArray.map((item) => [
          item.advertising.localName,
          item.rssi,
          item.advertising.isConnectable,
          item.advertising.serviceUUIDs,
          item.id,
        ])
      );
      ids_array = peripheralsArray.map((item) => item.id);
      setScanIds(ids_array);
    });
  };

  const connectToDevices = () => {
    if (scanIds.length > 0) {
      scanIds.map((item) => {
        BleManager.connect(item)
          .then(() => {
            // Success code
            console.log("Connected to ", item);
          })
          .catch((error) => {
            // Failure code
            console.log(error);
            disconnectFromDevices();
          });
      });
      setIsConnected(true);
    }
  };

  const disconnectFromDevices = () => {
    if (scanIds.length > 0) {
      scanIds.map((item) => {
        BleManager.disconnect(item)
          .then(() => {
            // Success code
            console.log("Disconnected from ", item);
          })
          .catch((error) => {
            // Failure code
            console.log(error);
          });
      });
    }
    setIsConnected(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("This will run every second!");
      getState();
      // console.log(bleState);
    }, 1000);
    return () => clearInterval(interval);
  }, [bleState]);

  // Return Function

  return (
    <>
      <View style={styles.headerContainer}>
        <AlertHeader style={styles.alertHeader} />
      </View>
      <Text
        style={{
          color: "#f2f2f2",
          fontSize: 24,
          fontWeight: "700",
          marginTop: 100,
          marginLeft: 20,
          fontFamily: "Montserrat-Bold",
          position: "absolute",
        }}
      >
        Bluetooth Debugging Page
      </Text>
      <View style={styles.profileContainer}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          automaticallyAdjustContentInsets={true}
          bounces={true}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Text style={styles.subheadingText}>Current States</Text>
          <Text style={styles.subheadingText}>
            Needs to be started before anything else.
          </Text>
          <View style={styles.settingsContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>{bleState}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log("BLE Start");
                  startBleManager();
                }}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subheadingText}>Bluetooth Scan</Text>
          <View style={styles.settingsContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Test Scan</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log("Button Pressed");
                  startTheScan();
                }}
              >
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Get Devices after scan</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={retrieveConnected}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Stop Scan</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log("Button Pressed");
                  stopTheScan();
                }}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subheadingText}>Device IDs:</Text>
          <Text style={styles.subheadingText}>
            {scanIds.length > 0 ? scanIds.toString() : "nope nothing 'ere"}
          </Text>
          {scanIds.length > 0 ? (
            <>
              <Text style={styles.subheadingText}>Connect to devices</Text>
              <View style={styles.settingsContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.toggleText}>Do it you won't</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      console.log("BLE Connecting");
                      connectToDevices();
                    }}
                  >
                    <Text style={styles.buttonText}>I will m8</Text>
                  </TouchableOpacity>
                </View>
                {isConnected ? (
                  <View style={styles.rowContainer}>
                    <Text style={styles.toggleText}>
                      Ok now disconnect when you need to
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        console.log("BLE Disconnecting");
                        disconnectFromDevices();
                      }}
                    >
                      <Text style={styles.buttonText}>Aight</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </>
          ) : (
            <Text style={styles.subheadingText}>
              No devices to connect to yet.
            </Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default bluetooth;
