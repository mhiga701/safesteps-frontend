import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { styles } from "./styles";
const data = [
    { label: 'BU Central', value: '1' },
    { label: "St Mary's Street", value: '2' },
    { label: 'BU East', value: '3' },
  ];

  export default function ReportObstacle1(){
    const [value, setValue] = useState(null);
    const [intersection, setSelectedIntersection] = useState("Choose an Intersection");
    const [reports, setreports] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const date = new Date();
    const day = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    const handleDropdownSelect = async (value) => {
        if (value && value.hasOwnProperty("label")){
            
            const i = value["label"];
            setSelectedIntersection(i);
            
            console.log(intersection);
            return;
        }
       
       
      };
      const handleSubmit = async () => {
        // don't submit if intersection is empty
        if (intersection === "Choose an Intersection") {
          console.log("Intersection not chosen. Returning...");
          let etoast = Toast.show("Error: Please select a location.", {
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
        }//Check to see if message is empty but options are still available to submit
        else{
          
          if (message === "") {
              if (!potholesPressed || !objectonRoad || !roadKillPressed || !foodPressed || !icePressed || !puddlesPressed || !otherPressed){
                try {
                  
                  await setDoc(doc(db, "Obstacle Reports", intersection), {
                    reports: reports,
                    intersection: intersection,
                    message: messages,
                    day:day,
                    time:time,
                  });
                  console.log("Uploaded!");
                  console.log(`Report: ${reports}, ${message} at ${intersection} on ${day}, at ${time}`);
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
              }//Else case is if message is empty and no options are selected
              else{
                console.log("message or options is empty. Returning...");
                let etoast = Toast.show("Error: Please enter a message", {
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
            }//Handles cases for having a message on the text box and options chosen
          else if (message !== ""){
            if (!potholesPressed || !objectonRoad || !roadKillPressed || !foodPressed || !icePressed || !puddlesPressed || !otherPressed){
              try {
                await setDoc(doc(db, "Obstacle Reports", intersection), {
                  reports: reports,
                  intersection: intersection,
                  message: messages,
                  day:day,
                  time:time,
                });
                console.log("Uploaded!");
                console.log(`Report: ${reports}, ${message} at ${intersection} on ${day}, at ${time}`);
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
                await setDoc(doc(db, "Obstacle Reports", intersection), {
                  reports: reports,
                  intersection: intersection,
                  message: messages,
                  day:day,
                  time:time,
                });
                console.log("Uploaded!");
                console.log(`Report: ${reports}, ${message} at ${intersection} on ${day}, at ${time}`);
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
        
        resetForm();
        console.log(reports);
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
    
      const [objectonRoad, setObjectPressed] = useState(true);
      const [potholesPressed, setPotholesPressed] = useState(true);
      const [roadKillPressed, setRoadKillPressed] = useState(true);
      const [foodPressed, setFoodPressed] = useState(true);
      const [icePressed, setIcePressed] = useState(true);
      const [puddlesPressed, setPuddlesPressed] = useState(true);
      const [otherPressed, setOtherPressed] = useState(true);
      console.log(intersection);
      const resetForm = () => {
        setObjectPressed(true);
        setPotholesPressed(true);
        setRoadKillPressed(true);
        setFoodPressed(true);
        setIcePressed(true);
        setPuddlesPressed(true);
        setOtherPressed(true);
        setMessage("");
        setSelectedIntersection("Choose an Intersection");
        setMessages([...messages, message]); 
      }
      const handleReset = () => {
        setSelectedIntersection("Choose an Intersection");
        resetForm();
      };
      const handleObjectPress = () => {
        setObjectPressed(!objectonRoad);
        setreports(
          [...reports, "Object on Road"]
        )
      };
    
      const handlePotHolesPress = () => {
        setPotholesPressed(!potholesPressed);
        setreports(
          [...reports, "Road Potholes"]
        );
      };
    
      const handleRoadKillPress = () =>{
        setRoadKillPressed(!roadKillPressed);
        setreports(
          [...reports, "Road Kill"]
        );
      };
      const handleFoodPress = () => {
        setFoodPressed(!foodPressed);
        setreports(
          [...reports, "Spilled Food"]
        );
      };
    
      const handleIcePress = () => {
        setIcePressed(!icePressed);
        setreports(
          [...reports, "Black Ice/Ice"]
        );
      };
      const handlePuddlePress = () => {
        setPuddlesPressed(!puddlesPressed);
        setreports(
          [...reports, "Puddles"]
        );
      };
    
      const handleOtherPress = () =>{
        setOtherPressed(!otherPressed);
       setreports(
          [...reports, "Other"]
       );
      };
      const objectButtonColor = objectonRoad ? '#808080' : '#5787F5';
      const potholesButtonColor = potholesPressed ? '#808080' : '#5787F5';
      const RoadKillButtonColor = roadKillPressed ? '#808080' : '#5787F5';
      const FoodButtonColot = foodPressed ? '#808080' : '#5787F5';
      const IceButtonColor = icePressed ? '#808080' : '#5787F5';
      const PuddleButtonColor = puddlesPressed ? '#808080' : '#5787F5';
      const otherButtonColor = otherPressed ? '#808080' : '#5787F5';
      
      return (
        <>
        <View>
          <Text style={styles.ReportAccident}>Report Obstacle</Text>
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
            placeholder="Choose an Intersection"
            searchPlaceholder="Search..."
            value={intersection}
            
            onChange={intersection => setSelectedIntersection(intersection.label)}
        />
        
        </View>
        
    <View><Text style={styles.Present}>What Obstacles are Present?</Text></View>
    <Text style={styles.Options}>Add any relevant options</Text>
    
      <TouchableOpacity onPress={handleObjectPress} style={[styles.Collisionbutton,{ backgroundColor: objectButtonColor }]}>
        <Text style={styles.AccidentOptions}>Object on Road</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePotHolesPress} style={[styles.Rolloverbutton,,{ backgroundColor: potholesButtonColor}]}>
        <Text style={styles.AccidentOptions}>Road Potholes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRoadKillPress} style={[styles.Subwaybutton,{backgroundColor:RoadKillButtonColor}]}>
        <Text style={styles.AccidentOptions}>Road Kill</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFoodPress} style={[styles.Pedestrianbutton,{backgroundColor:FoodButtonColot}]}>
        <Text style={styles.AccidentOptions}>Spilled Food</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleIcePress} style={[styles.SingleCar,{backgroundColor:IceButtonColor,width:120}]}>
        <Text style={styles.AccidentOptions}>Black Ice/Ice</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePuddlePress} style={[styles.Other,{backgroundColor:PuddleButtonColor,right:-125}]}>
        <Text style={styles.AccidentOptions}>Puddles</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOtherPress} style={[styles.Other,{backgroundColor:otherButtonColor,top:-9,left:220,width:120}]}>
        <Text style={styles.AccidentOptions}>Other</Text>
      </TouchableOpacity>
        <View style={{top:-50}}>
          <Text style={{color: '#52525A', fontSize: 17, fontFamily: 'Montserrat', fontWeight: '600',lineHeight: 25,bottom: -45,left:5,}}>Any Other Details?</Text>
          </View>
            <View style={[styles.MessageContainer,{top:0}]}>
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
                <View style={{flexDirection:'row',top:-50}}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleReset}><Text style={{color:'#7E678F', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Cancel</Text></TouchableOpacity>
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
      textAlign:'center'
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
        alignItems: 'center',
      },
  });