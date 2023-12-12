import { React, useState } from "react";
import { styles } from "./styles.js";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";

export default function ContactUs() {

    const [subject, setsubject] = useState("");
    const [message, setMessage] = useState("");
    const handleReset1 = () => {
      setsubject("");
      setMessage("");
    }
    const handleSubmit = async () => {
      // don't submit if subject or message is empty
      if (subject === "" || message === "") {
        console.log("subject or message is empty. Returning...");
        let etoast = Toast.show("Error: subject or message is empty.", {
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
      try {
        await setDoc(doc(db, "Contact", subject), {
          subject: subject,
          message: message,
        });
        console.log("Uploaded!");
        console.log(`subject: ${subject}, Message: ${message}`);
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
  
      setsubject("");
      setMessage("");
  
      let toast = Toast.show("Thanks for your feedback! We will reach out to you as soon as possible.", {
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
    
        <Text style={styles.ReportAccident}>Contact Us</Text>
        <Text style={styles.contactUsText2}>Subject: </Text>
        <View style={styles.ContactContainer}>
            <TextInput
            style={{top:10 ,fontSize: 16, fontFamily: 'Bitter', fontWeight: '400', lineHeight: 20, letterSpacing: 0.50}}
            ref={(input) => {
                this.secondTextInput = input;
              }}
              value={subject}
              onChangeText={setsubject}
              placeholder="Enter subject"
              multiline={true}
              maxLength={500}
              returnKeyType="done"
              blurOnSubmit={true}
            />
        </View>
  
        <Text style={styles.contactUsText2}>Message: </Text>
         
        <View style={styles.ContactContainer2}>
              <TextInput style={{top:10 ,fontSize: 16, fontFamily: 'Bitter', fontWeight: '400', lineHeight: 20, letterSpacing: 0.50}}
              ref={(input) => {
                  this.secondTextInput = input;
                }}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter message"
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
    
      </>
    );
  }
  
