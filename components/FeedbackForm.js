import { React, useState, useRef } from "react";
import { styles } from "./styles";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
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
      await setDoc(doc(db, "Feedback", name), {
        name: name,
        message: message,
      });
      console.log("Uploaded!");
      console.log(`Name: ${name}, Message: ${message}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setName("");
    setMessage("");
  };

  return (
    <>
      <Text style={styles.subheadingText}>Feedback Form</Text>

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
            <Text style={styles.toggleText}>Message</Text>
            <TextInput
              ref={(input) => {
                this.secondTextInput = input;
              }}
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Enter your message here"
              multiline={true}
              maxLength={500}
              returnKeyType="done"
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
