import { React, useState } from "react";
import { styles } from "./styles";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { SelectList } from "react-native-dropdown-select-list";

export default function ReportForm() {
    const [intersection, setSelectedIntersection] = useState("Choose an intersection");
    const [report, setReport] = useState([]);
    const Data = [
      {key:'1',value:'BU Central'},
      {key:'2',value:"St Mary's Street"},
      {key:'3',value:'BU East'},
    ]
    const handleDropdownSelect = (value) => {
      setSelectedIntersection(value);
    };
//   const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();
  const handleSubmit = async () => {
    // don't submit if name or message is empty
    if (intersection === "") {
      console.log("Name or message is empty. Returning...");
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
      setSinglePressed(true)
      const singleButtonColor = singlePressed ? '#808080' : '#5787F5';
      return;
    }

    // Post name and message to Firebase with auto-generated doc name

    // try {
    //   const docRef = await addDoc(collection(db, "Feedback"), {
    //     name: name,
    //     message: message,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }

    // Post name and message to Firebase with custom doc name
    
    try {

      await setDoc(doc(db, "Reports", intersection), {
        report: report,
        intersection: intersection,
        message: message,
        day:day,
        time:time,
      });
      console.log("Uploaded!");
      console.log(`Report: ${report}, ${message} at ${intersection} on ${day}, at ${time}`);
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

    resetForm();

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
  const resetForm = () => {
    setCollisionPressed(true);
    setRolloverPressed(true);
    setSubwayPressed(true);
    setPedestrianPressed(true);
    setSinglePressed(true);
    setOtherPressed(true);
    setMessage("");
    setSelectedIntersection("");
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
  const collisionButtonColor = collisionPressed ? '#808080' : '#5787F5';
  const rolloverButtonColor = rolloverPressed ? '#808080' : '#5787F5';
  const subwayButtonColor = subwayPressed ? '#808080' : '#5787F5';
  const pedestrianButtonColor = pedestrianPressed ? '#808080' : '#5787F5';
  const singleButtonColor = singlePressed ? '#808080' : '#5787F5';
  const otherButtonColor = otherPressed ? '#808080' : '#5787F5';

  
  return (
    <>
    
      <View>

<Text style={styles.ReportAccident}>Report Traffic Accident</Text>
<Text style={styles.Intersection}>Which Intersection Are You Closest To?</Text>
<View style={{top:110}}>
  <SelectList
    setSelected={handleDropdownSelect}
    fontFamily='Montserrat'
    data={Data}
    search={false}
    save="value"
    value={intersection}
    inputStyles ={{marginRight:100}}
    dropdownItemStyles={{marginHorizontal:90, marginVertical:10, backgroundColor:'#F2F2F7', borderRadius: 10,}}
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
          {/* <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name here"
              maxLength={100}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              blurOnSubmit={false}
            />
          </View> */}
          
          {/* <View style={styles.MessageContainer}> */}
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
        {/* </View> */}
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.cancelButton}><Text style={{color:'#7E678F', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}><Text style={{color:'white', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Submit</Text></TouchableOpacity>
            </View>
      
      </View>
    </>
  );
}
