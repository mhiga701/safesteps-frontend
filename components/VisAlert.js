import { React, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  Image,
} from "react-native";
import { styles } from "./styles";
import Alert from '../assets/alert.svg';
import AlertHeader from '../assets/AlertTypes3.svg'

export default function VisAlert() {
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [visualAlertEnabled, setVisualAlertEnabled] = useState(false);

  return (
    <>
    <Text style={styles.subheadingText}>VISUAL ALERT</Text>
      <View style={styles.settingsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Enable Visual Alerts</Text>
          <Switch
            value={visualAlertEnabled}
            onValueChange={() => setVisualAlertEnabled(!visualAlertEnabled)}
            trackColor={{ false: "#e9e9ea", true: "#B164E8" }}
          />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Visual Alert #1</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (visualAlertEnabled) {
                setAlert1(true);
              }
            }}
          >
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer3}>
          <Text style={styles.toggleText}>Visual Alert #2</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (visualAlertEnabled) {
                setAlert2(true);
              }
            }}
          >
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AwesomeAlert
        show={alert1}
        showProgress={false}
        title="Approaching Intersection"
        titleStyle={styles.alert1Text}
        message="Look Up!"
        messageStyle={styles.alert1Text}
        showConfirmButton={true}
        confirmText="I acknowledge"
        confirmButtonStyle={styles.button2}
        onConfirmPressed={() => setAlert1(false)}
      />

      <Modal visible={alert2} animationType="fade">
        <View style={styles.alert2Container}>
          <Text style={styles.alert2Text}>Approaching</Text>
          <Text style={styles.alert2Text}>Intersection</Text>
          <Alert style={{marginVertical: 50}}/>
          <Image source={require('../assets/ripple.gif')} style={styles.gifStyle}/>
          <Text style={styles.alert2Text}>Look Up!</Text>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => setAlert2(false)}
          >
            <Text style={styles.ackButtonText}>I acknowledge</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
