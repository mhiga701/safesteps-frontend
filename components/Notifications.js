import { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Platform, Switch } from 'react-native';
import { styles } from "./styles";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function PushNotifications() {
  const [notifcationEnabled, setNotificationEnabled] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
return (
    <>
    <Text style={styles.subheadingText}>PUSH NOTIFICATIONS</Text><View style={styles.settingsContainer}>
        <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>Enable Push Notifications</Text>
            <Switch
                value={notifcationEnabled}
                onValueChange={() => setNotificationEnabled(!notifcationEnabled)}
                trackColor={{ false: "#e9e9ea", true: "#B164E8" }} />
        </View>

        <View style={styles.rowContainer}>
            <Text style={styles.toggleText}>Try Notification</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    if (notifcationEnabled) {
                        await schedulePushNotification();
                    }
                } }
            >
                <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>
        </View>
    </View>
    </>
)
}
async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "APPROACHING INTERSECTION! 🚨",
        body: 'Be careful when walking in this area!',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 60, repeats: true },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }