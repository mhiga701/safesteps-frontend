import { RootContainer, SplashScreen, Stack, Tabs } from "expo-router";
import { React, useState } from "react";
import * as Font from "expo-font";
import {
  useColorScheme,
  Image,
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "../components/styles";
import Splash from "../assets/splash.svg";
import { BleManager } from "react-native-ble-plx";

const manager = new BleManager();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack>
        {/* <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
      </Stack>
    </>
  );
}

export default function RootLayout() {
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
          <RootLayoutNav />
        </>
      );
    }
  }
}
