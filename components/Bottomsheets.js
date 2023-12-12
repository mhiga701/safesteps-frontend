import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from "./styles";
//import { CollapsibleView } from '@eliav2/react-native-collapsible-view';
import Icon2 from "react-native-vector-icons/Octicons";
import {BuBridge_numreports,CCDS_numreports,MarshPlaza_numreports} from '../app/(tabs)/index.js';

const RedDot = () => {
  return (
    <Icon2 name="dot-fill" size={20} color="#fe2d01" /> 
  )
}

export default DefaultMap = () => {
  return (
    <View>
    <Text style={localStyles.bottomSheetHeader}>Nearby Beacons</Text>
    <View style={localStyles.settingsContainer}>
      <View style={localStyles.rowContainer}>
        <Text style={styles.toggleText}>Marsh Plaza</Text>
      </View>
      <View style={localStyles.rowContainer3}>
        { MarshPlaza_numreports ? <RedDot /> : null}
        <TouchableOpacity onPress={() => {}}>
        
            {<Text style={styles.toggleText}>{MarshPlaza_numreports} New Reports Since Yesterday</Text> ? <Text style={styles.toggleText}>{MarshPlaza_numreports} New Reports Since Yesterday</Text> : <Text style={styles.toggleText}>0 new Reports Since Yesterday</Text>}
    
        </TouchableOpacity>
      </View>
    </View>
    <View style={localStyles.settingsContainer}>
      <View style={localStyles.rowContainer}>
        <Text style={styles.toggleText}>CCDS</Text>
      </View>
      <View style={localStyles.rowContainer3}>
      { CCDS_numreports ? <RedDot /> : null}
        <TouchableOpacity onPress={() => {}}>
         
          {<Text style={styles.toggleText}>{CCDS_numreports} New Reports Since Yesterday</Text> ? <Text style={styles.toggleText}>{CCDS_numreports} New Reports Since Yesterday</Text> : <Text style={styles.toggleText}>0 new Reports Since Yesterday</Text>}        
   
        </TouchableOpacity>
      </View>
    </View>
    <View style={localStyles.settingsContainer}>
      <View style={localStyles.rowContainer}>
        <Text style={styles.toggleText}>BU Bridge</Text>
      </View>
      <View style={localStyles.rowContainer3}>
      { BuBridge_numreports ? <RedDot /> : null}
        <TouchableOpacity onPress={() => {}}>
        
          {<Text style={styles.toggleText}>{BuBridge_numreports} New Reports Since Yesterday</Text> ? <Text style={styles.toggleText}>{BuBridge_numreports} New Reports Since Yesterday</Text> : <Text style={styles.toggleText}>0 new Reports Since Yesterday</Text>}
            
        
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
  <CollapsibleView title="Black Ice">
   <Text>Watch out for black ice near the curbs around Marsh Plaza. It's very slippery!</Text> 
  </CollapsibleView>
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