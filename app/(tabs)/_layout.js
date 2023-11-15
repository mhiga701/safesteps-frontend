import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Image } from "react-native";
import { SvgUri } from "react-native-svg";

const ProfileIcon = require("../../assets/favicon.png");
const MainPageIcon = require("../../assets/favicon.png");
const ReportingIcon = require("../../assets/favicon.png");

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7E678F",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderRadius: 25, // Adjust the radius as needed
          position: "absolute", // Ensure the tabs float over the rest of the screen
          bottom: -10, // Adjust the position as needed
          // left: 10, // Adjust the position as needed
          // right: 10, // Adjust the position as needed
          // height: 75,
          // borderColor: "#7E678F",
          // borderWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: "Montserrat-Regular",
          fontSize: 12,
          lineHeight: 14,
          // marginBottom: 10,
        },
        // tabBarItemStyle: {
        //   act: "#7E678F",
        // },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          // tabBarIcon: ({ size }) => (
          //   <Image
          //     source={ProfileIcon}
          //     style={{
          //       width: size,
          //       height: size,
          //       resizeMode: "contain",
          //     }}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Main Page",
          // tabBarIcon: ({ size }) => (
          //   <Image
          //     source={MainPageIcon}
          //     style={{
          //       width: size,
          //       height: size,
          //       resizeMode: "contain",
          //     }}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="reporting"
        options={{
          title: "Reporting",
          // tabBarIcon: ({ size }) => (
          //   <Image
          //     source={MainPageIcon}
          //     style={{
          //       width: size,
          //       height: size,
          //       resizeMode: "contain",
          //     }}
          //   />
          // ),
        }}
      />
    </Tabs>
  );
}

//
