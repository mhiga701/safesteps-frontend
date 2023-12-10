import { Redirect, Stack, Tabs, useRouter, Navigate } from "expo-router";
import { React, useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styles } from "../components/styles";
import Splash1 from "../assets/Logo.svg";
import Splash2 from "../assets/logo2.svg";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  initialRouteName: "index",
};

function RootLayoutNav({ initial_route }) {
  console.log("initial_route: " + initial_route);

  return (
    <>
      <Stack initialRouteName={initial_route}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [splash, setSplash] = useState(true);
  const [initial_route, setInitialRoute] = useState("index");

  async function loadFont() {
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.otf"),
      "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.otf"),
      "Bitter-Regular": require("../assets/fonts/Bitter-Regular.otf"),
      "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.otf"),
    });
    setFontLoaded(true);
  }
  loadFont();

  if (!fontLoaded) {
    return <Splash1 />;
  } else {
    if (splash) {
      return (
        <Modal visible={splash} animationType="fade">
          <View style={styles.modalContainer}>
            <Splash2 style={styles.backgroundImage} />
            <View style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.buttonHomeScreen}
                onPress={() => {
                  setSplash(false);
                }}
              >
                <Text style={styles.buttonText}>Onboarding</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.buttonHomeScreen}
                onPress={async () => {
                  const changeRouteAndHideSplash = () => {
                    return new Promise((resolve) => {
                      // Change the initial route name
                      // unstable_settings.initialRouteName = "(tabs)";
                      setInitialRoute("(tabs)");

                      // Resolve the promise after changing the route name
                      resolve();
                    });
                  };

                  console.log(unstable_settings.initialRouteName);

                  // Call the function to change the route name
                  await changeRouteAndHideSplash();

                  console.log(unstable_settings.initialRouteName);

                  setSplash(false);
                }}
              >
                <Text style={styles.buttonText}>Main Page</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </Modal>
      );
    } else {
      return (
        <>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootSiblingParent>

              <RootLayoutNav />

            </RootSiblingParent>
          </GestureHandlerRootView>
        </>
      );
    }
  }
}
