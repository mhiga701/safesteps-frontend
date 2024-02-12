import { Stack, useRouter } from "expo-router";
import { React, useState } from "react";
import * as Font from "expo-font";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "../components/styles";
import Splash1 from "../assets/Logo.svg";
import Splash2 from "../assets/logo2.svg";
import { RootSiblingParent } from "react-native-root-siblings";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const router = useRouter();
export const unstable_settings = {
  initialRouteName: "index",
};

const handleOnboarding = async () => {
  const onboardingCompleted = await SecureStore.getItem('onboardingCompleted');
  // return onboardingCompleted === 'true';
}
// const getStarted =  () => {

//             if (handleOnboarding()) {
//               router.push("(tabs)");
                  
//               } else {
//                     router.push("index");
//                   }
// }

function RootLayoutNav() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
                <Text style={styles.buttonText}>Get Started</Text>
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
