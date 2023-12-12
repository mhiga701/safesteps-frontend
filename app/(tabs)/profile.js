import { React } from "react";
import { Text, ScrollView, View } from "react-native";
import { styles } from "../../components/styles";
import FeedbackForm from "../../components/FeedbackForm";
import VisAlert from "../../components/VisAlert";
import AudioAlert from "../../components/AudioAlert";
import AlertHeader from "../../assets/AlertTypes3.svg";
import PushNotifications from "../../components/Notifications";

export default function Profile() {
  return (
    <>
      <View style={styles.headerContainer}>
        <AlertHeader style={styles.alertHeader} />
      </View>

      <Text style={{ color: "#f2f2f2", fontSize: 24, fontWeight: "700", marginTop: 100, marginLeft: 20, fontFamily: "Montserrat-Bold", position: "absolute" }}>
        Alert Types
      </Text>
      <View style={styles.profileContainer}>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          automaticallyAdjustContentInsets={true}
          showsVerticalScrollIndicator={false}
        >
          <PushNotifications />

          <VisAlert />

          <Text style={styles.subheadingText}>AUDIO ALERT</Text>

          <AudioAlert />

          <Text style={styles.subheadingText}>Feedback Form</Text>

          <FeedbackForm />
        </ScrollView>
      </View>
    </>
  );
}
