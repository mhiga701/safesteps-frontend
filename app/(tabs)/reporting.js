import { Text, View } from "react-native";
import { Link } from "expo-router";
import Report from "../../components/Report";
import { styles } from "../../components/styles";
import FeedbackForm from "../../components/FeedbackForm";
export default function RPage() {
  return (
    <View style={styles.container}>
      {/* <Text>Reporting page</Text>
      <Link href="/">Go to main page!</Link> */}
      <Report/>
    </View>
  );
}
