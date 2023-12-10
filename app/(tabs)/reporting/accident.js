import { React, startTransition, useState } from "react";
import { Text, View ,TextInput,TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../../../components/styles";
import { useRouter } from "expo-router";
import ReportForm from "../../../components/ReportForm";
import Ionicon from 'react-native-vector-icons/Ionicons';
export default function AccidentScreen() {

 
  const history = useRouter();
  return (
    <> 
    
    <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
      <TouchableOpacity onPress={() => history.back()} style={{top: 40, left: 0}}>
        <Ionicon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <ReportForm />
    
</ScrollView>
    
    </>
    
  );
}