import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from "./styles";
import Icon2 from "react-native-vector-icons/Octicons";

export default DefaultMap = () => {
  return (
    <View>
    <Text style={localStyles.bottomSheetHeader}>Nearby Beacons</Text>
    <View style={localStyles.settingsContainer}>
      <View style={localStyles.rowContainer}>
        <Text style={styles.toggleText}>Marsh Plaza</Text>
      </View>
      <View style={localStyles.rowContainer3}>
        <Icon2 name="dot-fill" size={20} color="#fe2d01" />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.toggleText}>
            2 New Reports Since Yesterday
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={localStyles.settingsContainer}>
      <View style={localStyles.rowContainer}>
        <Text style={styles.toggleText}>CCDS</Text>
      </View>
      <View style={localStyles.rowContainer3}>
        {/* <Icon name="dot-circle-o" size={15} color="#fe2d01" /> */}
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.toggleText}>
            No New Reports Since Yesterday
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={localStyles.settingsContainer}>
      <View style={localStyles.rowContainer}>
        <Text style={styles.toggleText}>BU Bridge</Text>
      </View>
      <View style={localStyles.rowContainer3}>
        <Icon2 name="dot-fill" size={20} color="#fe2d01" />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.toggleText}>
            1 New Report Since Yesterday
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

const MarshPlaza = () => {

  return (
    <View>
      <Text style={localStyles.bottomSheetHeader}>Marsh Plaza</Text>
     
      <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
      


    </View>
  );
}

const CCDS = () => {

  return (
    <View>
       <Text style={localStyles.bottomSheetHeader}>CCDS</Text>
     
      <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>

    </View>
  );
}

const BUBridge = () => {

  return (
    <View>
       <Text style={localStyles.bottomSheetHeader}>BU Bridge</Text>
     
     <Text style={localStyles.bottomSheetSubheader}>REPORTS THIS WEEK</Text>
    </View>
  );
  }

  export {BUBridge, MarshPlaza, CCDS};

  const localStyles = StyleSheet.create({
    bottomSheetContainer: {
      backgroundColor: "#ecedf2",
      flex: 1,
      padding: 10,
      borderRadius: 10,
      borderWidth: 0.3,
      borderColor: "#52525a",
    },
    bottomSheetHeader: {
      fontSize: 20,
      fontFamily: "Montserrat-Bold",
      marginLeft: 20,
      marginBottom: 20,
    },
    bottomSheetSubheader:{
      fontFamily: "Montserrat-Regular", 
      color: '#000',  
      fontSize: 12,
      marginBottom: 15,
      marginLeft: 20,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
      marginHorizontal: -15,
    },
    rowContainer3: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      paddingRight: 50,
    },
    settingsContainer: {
      backgroundColor: "white",
      borderRadius: 16,
      elevation: 5,
      marginBottom: 15,
      paddingHorizontal: 25, // Add padding to separate elements
      marginHorizontal: 15,
      marginVertical: 15,
    },
  });