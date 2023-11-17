import { BleManager } from "react-native-ble-plx";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

const manager = new BleManager();

export default function BluetoothClient() {
  const [errorMsgBkg, setErrorMsgBkg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status_b } = await Location.requestBackgroundPermissionsAsync();
      if (status_b !== "granted") {
        setErrorMsgBkg(
          "Permission to access location was denied - BluetoothClient.js"
        );
        console.log(errorMsgBkg);
        return;
      }
    })();
  }, []);
}
