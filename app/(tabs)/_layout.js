import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TabBarIcon(props) {
  return <FontAwesome size={32} style={{ marginTop: 5 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#7E678F",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderRadius: 25, // Adjust the radius as needed
          position: "absolute", // Ensure the tabs float over the rest of the screen
          bottom: -10, // Adjust the position as needed
        },
        tabBarLabelStyle: {
          fontFamily: "Montserrat-Regular",
          fontSize: 12,
          lineHeight: 14,
        },
    
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Main Page",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reporting"
        options={{
          title: "Reporting",
          display: 'flex',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="flag" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

//