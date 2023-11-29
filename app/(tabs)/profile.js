import { React } from "react";
import { Text, ScrollView, View } from "react-native";
import { styles } from "../../components/styles";
import { BleManager } from "react-native-ble-plx";
import FeedbackForm from "../../components/FeedbackForm";
import VisAlert from "../../components/VisAlert";
import AudioAlert from "../../components/AudioAlert";
import AlertHeader from "../../assets/AlertTypes3.svg";

export default function Profile() {
  const manager = new BleManager();
  // const [sound, setSound] = useState(new Audio.Sound());

  return (
    <>
    <View style={styles.headerContainer}>
      <AlertHeader style={styles.alertHeader}/>
    </View>

        <Text style={{color: '#f2f2f2', fontSize: 24,
    fontWeight: "700",
    marginTop: 100,
    marginLeft: 20,
    fontFamily: "Montserrat-Bold",
    position: "absolute",}}>Alert Types</Text>
      <ScrollView
        style={styles.profileContainer}
        automaticallyAdjustKeyboardInsets={true}
        automaticallyAdjustContentInsets={true}
        // bounces={false}
        // contentContainerStyle={{
        //   flexGrow: 1,
        // }}
      >
        
        <VisAlert />

        <Text style={styles.subheadingText}>AUDIO ALERT</Text>

        <AudioAlert />

        <Text style={styles.subheadingText}>Feedback Form</Text>

        <FeedbackForm />
      </ScrollView>
    </>
  );
}
