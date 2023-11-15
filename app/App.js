import { React, useState } from "react";
import { Text, View, Modal, TouchableOpacity, Image } from "react-native";
import * as Font from "expo-font";
import { styles } from "../components/styles";
import { BleManager } from "react-native-ble-plx";
import Splash from "../assets/splash.svg";
import Profile from "./(tabs)/profile";
// import Nav from "../components/Nav";
// import * as Notifications from "expo-notifications";

export default function App() {
  const manager = new BleManager();
  // const [sound, setSound] = useState(new Audio.Sound());
  const [fontLoaded, setFontLoaded] = useState(false);
  const [splash, setSplash] = useState(true);

  async function loadFont() {
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.otf"),
      "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.otf"),
      "Bitter-Regular": require("../assets/fonts/Bitter-Regular.otf"),
    });
    setFontLoaded(true);
  }
  loadFont();

  if (!fontLoaded) {
    return (
      <Image
        source={require("../assets/splash.png")}
        style={styles.backgroundImage}
      />
    );
  } else {
    if (splash) {
      return (
        <Modal visible={splash} animationType="fade">
          <View style={styles.modalContainer}>
            <Splash style={styles.backgroundImage} />
            <View style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.buttonHomeScreen}
                onPress={() => setSplash(false)}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        <>
          <Profile />
          {/* <Nav style={styles.navContainer} /> */}
        </>
      );
    }
  }
}
