import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TabBarIcon(props) {
  return <FontAwesome size={32} style={{ paddingVertical: 4 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: "#B164E8",
        // tabBarActiveBackgroundColor: "#efe0fb",
        tabBarInactiveTintColor: "#B9B9BC",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderRadius: 20, // Adjust the radius as needed
          position: "absolute", // Ensure the tabs float over the rest of the screen
          bottom: -10, // Adjust the position as needed
        },

        tabBarLabelStyle: {
          fontFamily: "Montserrat-Regular",
          fontSize: 12,
          lineHeight: 14,
          paddingTop: -10,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          display: "flex",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reporting"
        options={{
          title: "Reporting",
          display: "flex",
          tabBarIcon: ({ color }) => <TabBarIcon name="flag" color={color} />,
        }}
      />
    <Tabs.Screen
    name="bluetooth"
    options={{
      title: "BTLE",
      display: "flex",
      tabBarIcon: ({ color }) => <TabBarIcon name="bluetooth-b" color={color} />,
    }}
  />
</Tabs>
  );
}

//
