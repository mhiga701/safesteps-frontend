import { React, useState } from "react";
import { styles } from "./styles";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
//Accident Report Form
export default function ReportForm() {

    const [intersection2, setSelectedIntersection2] = useState("Choose an intersection");
    const [report, setReport] = useState([]);
    const [message, setMessage] = useState("");
    const date = new Date();
    const day = date.toLocaleDateString();
    const time = date.toLocaleTimeString();

    const data = [
      { label: 'BU Central', value: '1' },
      { label: "St Mary's Street", value: '2' },
      { label: 'BU East', value: '3' },
    ];

  //   const handleDropdownSelect = async (value) => {
  //     if (value && value.hasOwnProperty("label")){
          
  //         const i = value["label"];
  //         setSelectedIntersection2(i);
          
  //         console.log(intersection2);
  //         return;
  //     } 
  // };

  const handleSubmit = async () => {
    // don't submit if name or message is empty
    if (intersection2 === "Choose an intersection") {
      console.log("Please select an intersection. Returning...");
      let etoast = Toast.show("Error: Please enter a location.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      setTimeout(function hideToast() {
        Toast.hide(etoast);
      }, 3000);
      return;
    }else{
      if (message === ""){
        if (!collisionPressed || !rolloverPressed || !subwayPressed || !pedestrianPressed || !singlePressed || !otherPressed){
          try {
            await setDoc(doc(db, "Accident Reports", intersection2), {
              reports: report,
              intersection: intersection2,
              message: message,
              day:day,
              time:time,
            });
            console.log("Uploaded!");
            console.log(`Report: ${report}, ${message} at ${intersection2} on ${day}, at ${time}`);
          } catch (e) {
            console.error("Error adding document: ", e);
            let etoast = Toast.show(
              "Error submitting feedback: please try again later.",
              {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              }
            );

            setTimeout(function hideToast() {
              Toast.hide(etoast);
            }, 3000);
          }
        }else{
          console.log("message or options is empty. Returning...");
          let etoast = Toast.show("Error: Please enter a message or select an option", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          setTimeout(function hideToast() {
            Toast.hide(etoast);
          }, 3000);
          return;
        }
      }else if (message !== ""){
        if (!collisionPressed || !rolloverPressed || !subwayPressed || !pedestrianPressed || !singlePressed || !otherPressed){
          try {
            await setDoc(doc(db, "Accident Reports", intersection2), {
              reports: report,
              intersection: intersection2,
              message: message,
              day:day,
              time:time,
            });
            console.log("Uploaded!");
            console.log(`Report: ${report}, ${message} at ${intersection2} on ${day}, at ${time}`);
          } catch (e) {
            console.error("Error adding document: ", e);
            let etoast = Toast.show(
              "Error submitting feedback: please try again later.",
              {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              }
            );
            setTimeout(function hideToast() {
              Toast.hide(etoast);
            }, 3000);
          }
        }else{
          try {
            await setDoc(doc(db, "Accident Reports", intersection2), {
              reports: report,
              intersection: intersection2,
              message: message,
              day:day,
              time:time,
            });
            console.log("Uploaded!");
            console.log(`Report: ${report}, ${message} at ${intersection2} on ${day}, at ${time}`);
          } catch (e) {
            console.error("Error adding document: ", e);
            let etoast = Toast.show(
              "Error submitting feedback: please try again later.",
              {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              }
            );
            setTimeout(function hideToast() {
              Toast.hide(etoast);
            }, 3000);
          }
        }
      }
    }
    resetForm1();

    let toast = Toast.show("Thank you for your report!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const [collisionPressed, setCollisionPressed] = useState(true);
  const [rolloverPressed, setRolloverPressed] = useState(true);
  const [subwayPressed, setSubwayPressed] = useState(true);
  const [pedestrianPressed, setPedestrianPressed] = useState(true);
  const [singlePressed, setSinglePressed] = useState(true);
  const [otherPressed, setOtherPressed] = useState(true);

  const resetForm1 = () => {
    setCollisionPressed(true);
    setRolloverPressed(true);
    setSubwayPressed(true);
    setPedestrianPressed(true);
    setSinglePressed(true);
    setOtherPressed(true);
    setMessage("");
    setSelectedIntersection2("Choose an intersection");

  }
  const handlePress = () => {
    setCollisionPressed(!collisionPressed);
    setReport(
      [...report, 'Vehicle Collision']
    );
  };

  const handleRolloverPress = () => {
    setRolloverPressed(!rolloverPressed);
    setReport(
      [...report, 'Vehicle Rollover']
    );
  };

  const handleSubwayPress = () =>{
    setSubwayPressed(!subwayPressed);
    setReport(
      [...report, 'Subway Related']
    );
  };
  const handlePedestrianPress = () => {
    setPedestrianPressed(!pedestrianPressed);
    setReport(
      [...report, 'Pedestrian and Vehicle']
    );
  };

  const handleSinglePress = () => {
    setSinglePressed(!singlePressed);
    setReport(
      [...report, 'Single Car Accident']
    );
  };

  const handleOtherPress = () =>{
    setOtherPressed(!otherPressed);
    setReport(
      [...report, 'Other']
    );
  };
  const handleReset1 = () => {
    resetForm1();
  };
  const collisionButtonColor = collisionPressed ? '#808080' : '#5787F5';
  const rolloverButtonColor = rolloverPressed ? '#808080' : '#5787F5';
  const subwayButtonColor = subwayPressed ? '#808080' : '#5787F5';
  const pedestrianButtonColor = pedestrianPressed ? '#808080' : '#5787F5';
  const singleButtonColor = singlePressed ? '#808080' : '#5787F5';
  const otherButtonColor = otherPressed ? '#808080' : '#5787F5';

  console.log(intersection2);
  return (
    <>
    <View>
      <Text style={styles.ReportAccident}>Report Traffic Accident</Text>
      <Text style={styles.Intersection}>Which Intersection Are You Closest To?</Text>
      <View style={{top:110}}>
      <Dropdown
            mode='default'
            style={styles1.dropdown}
            placeholderStyle={styles1.placeholderStyle}
            selectedTextStyle={styles1.selectedTextStyle}
            inputSearchStyle={styles1.inputSearchStyle}
            iconStyle={styles1.iconStyle}
            data={data}
            search={false}
            showsVerticalScrollIndicator={true}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={intersection2}
            searchPlaceholder="Search..."
            value={intersection2}
            
            onChange={intersection2 => setSelectedIntersection2(intersection2.label)}
        />
    </View>
    <View><Text style={styles.Present}>What Traffic Accident Is Present?</Text></View>
    <Text style={styles.Options}>Add any relevant options</Text>
    <TouchableOpacity onPress={handlePress} style={[styles.Collisionbutton,{ backgroundColor: collisionButtonColor }]}>
      <Text style={styles.AccidentOptions}>Vehicle Collision</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleRolloverPress} style={[styles.Rolloverbutton,,{ backgroundColor: rolloverButtonColor}]}>
      <Text style={styles.AccidentOptions}>Vehicle Rollover</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleSubwayPress} style={[styles.Subwaybutton,{backgroundColor:subwayButtonColor}]}>
      <Text style={styles.AccidentOptions}>Subway Related</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePedestrianPress} style={[styles.Pedestrianbutton,{backgroundColor:pedestrianButtonColor}]}>
      <Text style={styles.AccidentOptions}>Pedestrian and Vehicle</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleSinglePress} style={[styles.SingleCar,{backgroundColor:singleButtonColor}]}>
      <Text style={styles.AccidentOptions}>Single Car Accident</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleOtherPress} style={[styles.Other,{backgroundColor:otherButtonColor}]}>
      <Text style={styles.AccidentOptions}>Other</Text>
    </TouchableOpacity>
      <Text style={{color: '#52525A', fontSize: 17, fontFamily: 'Montserrat', fontWeight: '600',lineHeight: 25,bottom: -45,left:5,}}>Any Other Details?</Text>
        <View style={styles.MessageContainer}>
        <TextInput
        style={{top:10 ,fontSize: 16, fontFamily: 'Bitter', fontWeight: '400', lineHeight: 20, letterSpacing: 0.50}}
        ref={(input) => {
            this.secondTextInput = input;
          }}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your message here"
          multiline={true}
          maxLength={500}
          returnKeyType="done"
          blurOnSubmit={true}
        />
          </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleReset1}><Text style={{color:'#7E678F', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}><Text style={{color:'white', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Submit</Text></TouchableOpacity>
            </View>
      
      </View>
    </>
  );
}
const styles1 = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    //textAlign:'center'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignItems: 'center',
    },
});