import { React } from "react";
import { Text, ScrollView } from "react-native";
import { styles } from "../components/styles";
import { BleManager } from "react-native-ble-plx";
import FeedbackForm from "../components/FeedbackForm";
import VisAlert from "../components/VisAlert";
import AudioAlert from "../components/AudioAlert";

export default function Profile() {
  const manager = new BleManager();
  // const [sound, setSound] = useState(new Audio.Sound());
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
