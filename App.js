import { React, useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import { styles } from "./components/styles";
import { BleManager } from "react-native-ble-plx";
import FeedbackForm from "./components/FeedbackForm";
import VisAlert from "./components/VisAlert";
import AudioAlert from "./components/AudioAlert";
// import * as Notifications from "expo-notifications";

export default function App() {
  const manager = new BleManager();
  // const [sound, setSound] = useState(new Audio.Sound());
  const [fontLoaded, setFontLoaded] = useState(false);
  const [splash, setSplash] = useState(true);

  async function loadFont() {
    await Font.loadAsync({
      "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.otf"),
      "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.otf"),
      "Bitter-Regular": require("./assets/fonts/Bitter-Regular.otf"),
    });
    setFontLoaded(true);
  }
  loadFont();

  if (!fontLoaded) {
    return (
      <Image
        source={require("./assets/splash.png")}
        style={styles.backgroundImage}
      />
    );
  } else {
    if (splash) {
      return (
        <Modal visible={splash} animationType="fade">
          <View style={styles.modalContainer}>
            <Image
              source={require("./assets/sc.png")}
              style={styles.backgroundImage}
            />
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
          <ScrollView
            style={styles.container}
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <Text style={styles.mainHeadingText}>Alert Types</Text>
            <Text style={styles.subheadingText}>VISUAL ALERT</Text>

            <VisAlert />

            <Text style={styles.subheadingText}>AUDIO ALERT</Text>

            <AudioAlert />

            <Text style={styles.subheadingText}>Feedback Form</Text>

            <FeedbackForm />
          </ScrollView>
        </>
      );
    }
  }
}
