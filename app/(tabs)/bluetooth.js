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
import BluetoothHeader from "../../assets/BluetoothHeader.svg";
// import BluetoothDiff from "../../components/BluetoothDiff";

export const UUID_filter = ["6969"];

const bluetooth = () => {
  const [bleState, setBleState] = useState("Null");
  const [scanIds, setScanIds] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  // const [peripheralsRssi, setPeripheralsRssi] = useState([]);
  const [nearbyRSSIs, setNearbyRSSIs] = useState([]);
  const [diff1, setDiff1] = useState(0);
  const [diff2, setDiff2] = useState(0);
  const [closerDevice, setCloserDevice] = useState(0);

  const startBleManager = () => {
    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initialized");
    });
  };

  const startTheScan = () => {
    BleManager.scan(UUID_filter, 5, true).then(() => {
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

  const retrieveScan = async () => {
    await BleManager.getDiscoveredPeripherals([])
      .then((peripheralsArray) => {
        // Success code
        console.log("Discovered peripherals: " + peripheralsArray.length);
        // console.log(peripheralsArray[0].advertising.localName);
        // console.log(
        //   peripheralsArray.map((item) => [
        //     item.advertising.localName,
        //     item.rssi,
        //     item.advertising.isConnectable,
        //     item.advertising.serviceUUIDs,
        //     item.id,
        //   ])
        // );
        ids_array = peripheralsArray.map((item) => item.id);
        rssi_array = peripheralsArray.map((item) => item.rssi);
        setScanIds(ids_array);
        setNearbyRSSIs(rssi_array);
      })
      .then(() => {
        console.log(nearbyRSSIs.toString());
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
    setScanIds([]);
    setDiff1(0);
    setDiff2(0);
    setCloserDevice(0);
  };

  const retrieveRssi = (peripheralId) => {
    BleManager.readRSSI(peripheralId)
      .then((rssi) => {
        index = scanIds.indexOf(peripheralId);

        // console.log(index);

        if (index == 0) {
          setDiff1(rssi);
        } else {
          setDiff2(rssi);
        }
      })
      // .then(console.log(diff1, diff2, closerDevice))
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const tryToConnect = async () => {
    BleManager.scan(UUID_filter, 2.5, true)
      .then(async () => {
        // Success code
        await delay(2500);
        console.log("Scanned for 2.5 secs");
      })
      .then(() => {
        retrieveScan();
      })
      .then(() => {
        connectToDevices();
      });
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getState();
  //     if (!isConnected && bleState == "on") {
  //       tryToConnect();
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [bleState, scanIds, isConnected]);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("This will run every second!", scanIds.length);
      getState();
      if (isConnected) {
        scanIds.map((item) => retrieveRssi(item));
      }
      if (diff1 > diff2) {
        setCloserDevice(0);
      } else {
        setCloserDevice(1);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isConnected, scanIds, diff1, diff2, closerDevice]);

  return (
    <>
      <View style={styles.headerContainer}>
        <BluetoothHeader style={styles.alertHeader} />
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
          {/* <BluetoothDiff /> */}
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
              <TouchableOpacity style={styles.button} onPress={retrieveScan}>
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
                  <Text style={styles.toggleText}>
                    Tap to connect to devices:
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      console.log("BLE Connecting");
                      connectToDevices();
                    }}
                  >
                    <Text style={styles.buttonText}>Ok</Text>
                  </TouchableOpacity>
                </View>
                {isConnected ? (
                  <>
                    <View style={styles.rowContainer}>
                      <Text style={styles.toggleText}>Closest Beacon: </Text>
                      <Text style={styles.toggleText}>{closerDevice}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.toggleText}>Disconnect</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          console.log("BLE Disconnecting");
                          disconnectFromDevices();
                        }}
                      >
                        <Text style={styles.buttonText}>Ok</Text>
                      </TouchableOpacity>
                    </View>
                  </>
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
