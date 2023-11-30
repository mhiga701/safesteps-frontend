import { React, useState } from "react";
import { styles } from "./styles";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { SelectList } from "react-native-dropdown-select-list";

export default function ReportForm() {
    const [intersection, setSelectedIntersection] = useState("");
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
    if (message === "") {
      console.log("Name or message is empty. Returning...");
      let etoast = Toast.show("Error: Name or message is empty.", {
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
        
        intersection: intersection,
        message: message,
        day:day,
        time:time,
      });
      console.log("Uploaded!");
      console.log(`Report: ${message} at ${intersection} on ${day}, at ${time}`);
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

    setMessage("");

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
    placeholder="Choose Intersection"
    inputStyles ={{marginRight:100}}
    dropdownItemStyles={{marginHorizontal:90, marginVertical:10, backgroundColor:'#F2F2F7', borderRadius: 10,}}
    />
</View>

<View><Text style={styles.Present}>What Traffic Accident Is Present?</Text></View>
<Text style={styles.Options}>Add any relevant options</Text>

  <TouchableOpacity style={styles.Collisionbutton}>
    <Text style={styles.AccidentOptions}>Vehicle Collision</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.Rolloverbutton}>
    <Text style={styles.AccidentOptions}>Vehicle Rollover</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.Subwaybutton}>
    <Text style={styles.AccidentOptions}>Subway Related</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.Pedestrianbutton}>
    <Text style={styles.AccidentOptions}>Pedestrian and Vehicle</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.SingleCar}>
    <Text style={styles.AccidentOptions}>Single Car Accident</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.Other}>
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
