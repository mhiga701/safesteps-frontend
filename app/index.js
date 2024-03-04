import { Stack, useRouter } from "expo-router";
import { React, useState } from "react";
import * as Font from "expo-font";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "../components/styles";
import Splash1 from "../assets/Logo.svg";
import Splash2 from "../assets/logo2.svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import RootLayoutNav from "./_layout";
import { getValueFor } from "../components/ExpoStorage";


export default function RootLayout() {
    const router = useRouter();
    const [fontLoaded, setFontLoaded] = useState(false);
    const [splash, setSplash] = useState(true);
  
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
        //   <Modal visible={splash} animationType="fade">
            <View style={styles.modalContainer}>
              <Splash2 style={styles.backgroundImage} />
              <View style={styles.contentContainer}>
                <TouchableOpacity
                  style={styles.buttonHomeScreen}
                  onPress={() => {
                    const onboarding =  getValueFor("onboarding");
                if (onboarding === "true") {
                    router.push("(tabs)");
                } else {
                    router.push("onboarding");
                }
            }}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
              </View>
            </View>
        //   </Modal>
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
