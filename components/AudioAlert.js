import { React, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { Audio } from "expo-av";
import { View, Text, TouchableOpacity, Switch, Modal } from "react-native";
import { styles } from "./styles";

export default function AudioAlert() {
  const [alert3, setAlert3] = useState(false);
  const [confirmAudio, setConfirmAudio] = useState(false);
  const [changeAudio, setChangeAudio] = useState(false);
  const [audioAlertEnabled, setAudioAlertEnabled] = useState(false);
  const [soundIndex, setSoundIndex] = useState(0);
  const [soundSelection, setSoundSelection] = useState("Beep (Default)");

  const handleNewAudio = (index) => {
    setSoundIndex(index);
    setChangeAudio(false);
  };

  const handleConfirmAudio = () => {
    setConfirmAudio(!confirmAudio);
  };

  const sounds = [
    "beep.mp3",
    "chimes.wav",
    "clicks.wav",
    "dingdong.wav",
    "dundun.wav",
    "flutes.wav",
  ];

  const soundFiles = {
    "beep.mp3": require("../assets/sounds/beep.mp3"),
    "chimes.wav": require("../assets/sounds/chimes.wav"),
    "clicks.wav": require("../assets/sounds/clicks.wav"),
    "dingdong.wav": require("../assets/sounds/dingdong.wav"),
    "dundun.wav": require("../assets/sounds/dundun.wav"),
    "flutes.wav": require("../assets/sounds/flutes.wav"),
  };

  playSound = async () => {
    const sound = new Audio.Sound();
    try {
      let source = sounds[soundIndex];
      await sound.loadAsync(soundFiles[source]);
      await sound
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            sound.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.settingsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Enable Audio Alerts</Text>
          <Switch
            value={audioAlertEnabled}
            onValueChange={() => setAudioAlertEnabled(!audioAlertEnabled)}
            trackColor={{ false: "#e8e5ea", true: "#7e678f" }}
          />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Audio Alert</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (audioAlertEnabled) {
                setAlert3(!alert3);
                playSound();
              }
            }}
          >
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer3}>
          <Text style={styles.toggleText}>Change Alert Sound</Text>
          <TouchableOpacity
            style={styles.button3}
            onPress={() => setChangeAudio(true)}
          >
            <Text style={styles.toggleText}>{soundSelection}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AwesomeAlert
        show={alert3}
        showProgress={false}
        title="Ongoing Auditory Alert"
        titleStyle={styles.alert1Text}
        message="When the auditory alert is enabled, just the audio will play. This pop-up is just to show that the alert is working."
        messageStyle={styles.toggleText}
        showConfirmButton={true}
        cancelText="Test Again"
        cancelButtonStyle={styles.audiobutton1}
        cancelButtonTextStyle={styles.ackButtonText}
        showCancelButton={true}
        confirmText="Got it!"
        confirmButtonStyle={styles.audiobutton2}
        confirmButtonTextStyle={styles.ackButtonText2}
        onConfirmPressed={() => setAlert3(!alert3)}
        onCancelPressed={() => {
          if (audioAlertEnabled) {
            playSound();
          }
        }}
      />

      <AwesomeAlert
        show={confirmAudio}
        showProgress={false}
        title="Change Alert Sound?"
        showConfirmButton={true}
        showCancelButton={true}
        confirmText="Confirm"
        cancelText="Cancel"
        confirmButtonStyle={styles.changeAudioConfirm}
        cancelButtonStyle={styles.changeAudioCancel}
        confirmButtonTextStyle={styles.ackButtonText2}
        cancelButtonTextStyle={styles.audioButtonText}
        onConfirmPressed={() => handleConfirmAudio}
        onCancelPressed={() => handleConfirmAudio}
      />

      <Modal visible={changeAudio} animationType="fade">
        <View style={styles.container}>
          <Text style={styles.mainHeadingText}>Alert Sounds</Text>
          <Text style={styles.subheadingText}>SOUNDS</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => {
                handleNewAudio(0);
                setSoundSelection("Beep (Default)");
              }}
            >
              <Text style={styles.toggleText}>Beep (Default)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => {
                handleNewAudio(1);
                setSoundSelection("Alert");
              }}
            >
              <Text style={styles.toggleText}>Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => {
                handleNewAudio(2);
                setSoundSelection("Beacon");
              }}
            >
              <Text style={styles.toggleText}>Beacon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => {
                handleNewAudio(3);
                setSoundSelection("Bulletin");
              }}
            >
              <Text style={styles.toggleText}>Bulletin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer}
              onPress={() => {
                handleNewAudio(4);
                setSoundSelection("By The Seaside");
              }}
            >
              <Text style={styles.toggleText}>By The Seaside</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowContainer3}
              onPress={() => {
                handleNewAudio(5);
                setSoundSelection("Chimes");
              }}
            >
              <Text style={styles.toggleText}>Chimes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
