import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../../../components/styles";
import { useRouter } from "expo-router";
import ReportObstacle from "../../../components/ReportObstacle";
import Ionicon from "react-native-vector-icons/Ionicons";
import ReportFormGeneral from "../../../components/ReportFormGeneral";

export default function ReportFormScreen() {
  const history = useRouter();
  return (
    <>
      <ScrollView
        style={styles.reportContainer}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => history.back()}
          style={{ top: 40, left: 0 }}
        >
          <View>
            <Ionicon name="arrow-back" size={30} color="black" />
          </View>
        </TouchableOpacity>

        <ReportFormGeneral />
      </ScrollView>
    </>
  );
}
