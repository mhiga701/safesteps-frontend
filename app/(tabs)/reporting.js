import { Text, View } from "react-native";
import { Link } from "expo-router";
import ReportScreen from "../../components/Report";
import { styles } from "../../components/styles";

import AccidentScreen from "../../components/Accident";
export default function RPage() {
  return (
    <View style={styles.container}>
      {/* <Text>Reporting page</Text>
      <Link href="/">Go to main page!</Link> */}
      {/* <ReportScreen/> */}
      <AccidentScreen/>
    </View>
  );
}
