import { Text, View } from "react-native";
import { Link } from "expo-router";
import FeedbackForm from "../components/FeedbackForm";
import  { styles } from "../components/styles";


export default function RPage() {
  return (
    <View style={styles.container}>
      <Text>Reporting page</Text>
      <Link href="/">Go to main page!</Link>
      <FeedbackForm />
    </View>
  );
}