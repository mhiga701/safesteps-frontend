import { useRouter } from "expo-router";
import { React, useState } from "react";
import * as Font from "expo-font";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../components/styles";
import Splash2 from "../assets/logo2.svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import RootLayoutNav from "./_layout";
import { getValueFor } from "../components/ExpoStorage";


export default function RootLayout() {
    const router = useRouter();
    const [fontLoaded, setFontLoaded] = useState(false);
    const [splash, setSplash] = useState(true);
    // async function onboardingComplete() {
    //     await g
    // }
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
      return   (
        <View style={styles.modalContainer}>
            <Splash2 style={styles.backgroundImage} />
        </View>
      );
    } else {
      if (splash) {
        return (
        //   <Modal visible={splash} animationType="fade">
            <View style={styles.modalContainer}>
              <Splash2 style={styles.backgroundImage} />
              <View style={styles.contentContainer}>
                <TouchableOpacity
                  style={styles.buttonHomeScreen}
                  onPress={async () => {
                    // const onboarding = "fals[]"
                    const onboarding = await getValueFor("onboardingComplete");
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
