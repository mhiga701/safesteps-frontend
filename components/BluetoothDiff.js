import React, { Component, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import BleManager from "react-native-ble-manager";

const bluetoothDiff = () => {
  // const [bleState, setBleState] = useState("Null");
  // const [scanIds, setScanIds] = useState([]);
  // const [isConnected, setIsConnected] = useState(false);
  // const [peripheralsRssi, setPeripheralsRssi] = useState([]);
  // const startBleManager = () => {
  //   BleManager.start({ showAlert: false }).then(() => {
  //     // Success code
  //     console.log("Module initialized");
  //   });
  // };
  // const startTheScan = () => {
  //   BleManager.scan(["6969"], 5, true).then(() => {
  //     // Success code
  //     console.log("Scan started");
  //   });
  // };
  // const stopTheScan = () => {
  //   BleManager.stopScan().then(() => {
  //     // Success code
  //     console.log("Scan stopped");
  //   });
  // };
  // const getState = () => {
  //   BleManager.checkState().then((state) => {
  //     // console.log(`current BLE state = '${state}'.`);
  //     setBleState(state);
  //   });
  //   // return state;
  // };
  // const retrieveConnected = () => {
  //   BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
  //     // Success code
  //     console.log("Discovered peripherals: " + peripheralsArray.length);
  //     // console.log(peripheralsArray[0].advertising.localName);
  //     console.log(
  //       peripheralsArray.map((item) => [
  //         item.advertising.localName,
  //         item.rssi,
  //         item.advertising.isConnectable,
  //         item.advertising.serviceUUIDs,
  //         item.id,
  //       ])
  //     );
  //     ids_array = peripheralsArray.map((item) => item.id);
  //     setScanIds(ids_array);
  //   });
  // };
  // const retrieveRssi = (peripheralId) => {
  //   BleManager.readRSSI(peripheralId)
  //     .then((rssi) => {
  //       // Success code
  //       console.log("Current RSSI: " + rssi);
  //     })
  //     .catch((error) => {
  //       // Failure code
  //       console.log(error);
  //     });
  // };
  // const connectToDevices = () => {
  //   if (scanIds.length > 0) {
  //     scanIds.map((item) => {
  //       BleManager.connect(item)
  //         .then(() => {
  //           // Success code
  //           console.log("Connected to ", item);
  //         })
  //         .catch((error) => {
  //           // Failure code
  //           console.log(error);
  //           disconnectFromDevices();
  //         });
  //     });
  //     setIsConnected(true);
  //   }
  // };
  // const disconnectFromDevices = () => {
  //   if (scanIds.length > 0) {
  //     scanIds.map((item) => {
  //       BleManager.disconnect(item)
  //         .then(() => {
  //           // Success code
  //           console.log("Disconnected from ", item);
  //         })
  //         .catch((error) => {
  //           // Failure code
  //           console.log(error);
  //         });
  //     });
  //   }
  //   setIsConnected(false);
  // };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // console.log("This will run every second!");
  //     getState();
  //     if (scanIds.length > 0) {
  //       // retrieveConnected();
  //       for (i in scanIds) {
  //         retrieveRssi(i);
  //       }
  //     }
  //     // console.log(bleState);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [bleState]);
  // return (
  //   <>
  //     <Text>Bluetooth State: {bleState}</Text>
  //   </>
  // );
};

export default bluetoothDiff;
