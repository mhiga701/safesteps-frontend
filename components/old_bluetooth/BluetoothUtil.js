import BleManager from "react-native-ble-manager";

export const startBleManager = () => {
  BleManager.start({ showAlert: false }).then(() => {
    // Success code
    console.log("Module initialized");
  });
};
