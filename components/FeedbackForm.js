import { React, useState } from "react";
import { styles } from "./styles";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const date = new Date();
  let day = date.toLocaleDateString();
  day = day.replace(/\//g, "-");
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    // don't submit if name or message is empty
    if (name === "" || message === "" || contact === "") {
      console.log("One or more of the fields is empty. Returning...");
      let etoast = Toast.show("Error: One of the fields is empty.", {
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
      const docRef = doc(db, "Feedback", name);

      const subcollectionRef = collection(docRef, "History");

      setData([...data, {name:name, message: message }]);
      //Update the firstore database
      // await setDoc(docRef, {message: message, contact:contact});

      // Add a new document to the subcollection with contact and message data
      await addDoc(subcollectionRef, {
        name: name,
        message: message,
        date: day
      }, { id: day});

      console.log("Uploaded!");
      console.log(`Name: ${name}, Message: ${message}`);

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

    setName("");
    setMessage("");
    setContact("");
  
   
    let toast = Toast.show("Thanks for your feedback!", {
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
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
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
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>Contact</Text>
            <TextInput
              ref={(input) => {
                this.thirdTextInput = input;
              }}
              style={styles.input}
              value={contact}
              onChangeText={setContact}
              placeholder="Enter your contact here"
              multiline={true}
              maxLength={500}
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>Message</Text>
            <TextInput
              ref={(input) => {
                this.thirdTextInput = input;
              }}
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Enter your message here"
              multiline={true}
              maxLength={500}
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
