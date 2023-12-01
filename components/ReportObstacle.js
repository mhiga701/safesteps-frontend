import { React, useState } from "react";
import { styles } from "./styles";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { SelectList } from "react-native-dropdown-select-list";

export default function ReportObstacle() {
    const [intersection, setSelectedIntersection] = useState("");
    const [reports, setreports] = useState([]);
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
        reports: reports,
        intersection: intersection,
        message: message,
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

  const [objectonRoad, setObjectPressed] = useState(true);
  const [potholesPressed, setPotholesPressed] = useState(true);
  const [roadKillPressed, setRoadKillPressed] = useState(true);
  const [foodPressed, setFoodPressed] = useState(true);
  const [icePressed, setIcePressed] = useState(true);
  const [puddlesPressed, setPuddlesPressed] = useState(true);
  const [otherPressed, setOtherPressed] = useState(true);

  const resetForm = () => {
    setObjectPressed(true);
    setPotholesPressed(true);
    setRoadKillPressed(true);
    setFoodPressed(true);
    setIcePressed(true);
    setPuddlesPressed(true);
    setOtherPressed(true);
    setMessage("");
    setSelectedIntersection("");
  }

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
  <SelectList
    setSelected={handleDropdownSelect}
    selected={intersection}
    fontFamily='Montserrat'
    data={Data}
    search={false}
    save="value"
    placeholder="Choose Intersection"
    inputStyles ={{marginRight:100}}
    dropdownItemStyles={{marginHorizontal:90, marginVertical:10, backgroundColor:'#F2F2F7', borderRadius: 10,}}
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
            <View style={{flexDirection:'row',top:-50}}>
                <TouchableOpacity style={styles.cancelButton}><Text style={{color:'#7E678F', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}><Text style={{color:'white', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Submit</Text></TouchableOpacity>
            </View>
           
      
      </View>
    </>
  );
}
