import { useMemo, useState } from "react";
import { PermissionsAndroid } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";

// interface BLEApi {
//   requestBluetoothPermission(): Promise<boolean>;
//   scanForPeripherals(): void;
// }

function useBLE() {
  const bleManager = useMemo(() => new BleManager(), []);

  const [allDevices, setAllDevices] = useState([]);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermissions = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Bluetooth Scan Permission",
        message: "This app requires access to Bluetooth",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermissions = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Bluetooth Connect Permission",
        message:
          "This app needs to be able to connect to a device using Bluetooth",
        buttonPositive: "OK",
      }
    );
    const bluetoothFineLocationPermissions = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Fine Location Access",
        message: "This app needs to be able to access your fine location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermissions === "granted" &&
      bluetoothConnectPermissions === "granted" &&
      bluetoothFineLocationPermissions === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs to access your location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();
        return isAndroid31PermissionsGranted;
      }
    }
  };

  const scanForPeripherals = () => {};

  return {
    requestPermissions,
    scanForPeripherals,
  };
}

export default useBLE;
