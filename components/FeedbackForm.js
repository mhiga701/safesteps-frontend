import { React, useState } from "react";
import { styles } from "./styles";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { db } from "../firebase.js";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Toast from "react-native-root-toast";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const date = new Date();
  let day = date.toLocaleDateString();
  day = day.replace(/\//g, "-");
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    // don't submit if name or message is empty
    if (name === "" || message === "" || email === "") {
      console.log("One of the fields is empty. Returning...");
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
      const docRef = doc(db, "Feedback", day);

      setData([...data, { name: name, message: message, email: email }]);
      let add_data = {
        [day]: data,
      };

      await setDoc(docRef, add_data, { merge: true });

      console.log("Uploaded!");
      console.log(`Name: ${name}, Message: ${message}, Email: ${email}`);
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
    setEmail("");
    setData([...data, { name: name, message: message, email: email }]);
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
            <Text style={styles.toggleText}>Email</Text>
            <TextInput
              ref={(input) => {
                this.secondTextInput = input;
              }}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email here"
              maxLength={100}
              returnKeyType="next"
              blurOnSubmit={true}
              onSubmitEditing={() => {
                this.thirdTextInput.focus();
              }}
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
