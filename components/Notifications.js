import { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Platform, Switch } from "react-native";
import { styles } from "./styles";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { save, getValueFor } from "../components/ExpoStorage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function PushNotifications() {
  const [notifcationEnabled, setNotificationEnabled] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    getValueFor("notificationEnabled").then((value) => {
      console.log("Got value: " + value);
      setNotificationEnabled(value == "true" ? true : false);
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <>
      <Text style={styles.subheadingText}>PUSH NOTIFICATIONS</Text>
      <View style={styles.settingsContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Enable Push Notifications</Text>
          <Switch
            value={notifcationEnabled}
            onValueChange={() => {
              setNotificationEnabled(!notifcationEnabled);
              save(
                "notificationEnabled",
                !notifcationEnabled ? "true" : "false"
              );
            }}
            trackColor={{ false: "#e9e9ea", true: "#B164E8" }}
          />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.toggleText}>Try Notification</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (notifcationEnabled) {
                await schedulePushNotification();
              }
            }}
          >
            <Text style={styles.buttonText}>Test</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "APPROACHING INTERSECTION! 🚨",
      body: "Be careful when walking in this area!",
      sound: "beep.mp3",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1, repeats: false },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "9bcd3192-263f-4c4d-afdf-d973ff546705",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
