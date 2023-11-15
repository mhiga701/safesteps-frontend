import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Image } from "react-native";
import Svg, { G, Path } from "react-native-svg";

// const ProfileIcon = require("../../assets/favicon.png");
// const MainPageIcon = require("../../assets/favicon.png");
// const ReportingIcon = require("../../assets/favicon.png");
// import { BellIcon } from "../../assets/bell.svg";
// import { AlertIcon } from "../../assets/flag.svg";
// import { HomeIcon } from "../../assets/house.svg";

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
          tabBarIcon: ({ size }) => (
            <Svg width={size}
            height={size} >
              <G transform='matrix(1,0,0,1,-0.0000000000000002220446049250313,0)'>
                <Path d="M1.89125 19.5961H20.1088C21.2822 19.5961 22 18.9581 22 18.001C22 16.7934 20.9063 15.7566 19.8809 14.7768C19.072 13.9907 18.8897 12.3501 18.7416 10.8348C18.5593 6.66494 17.3402 3.72553 14.3894 2.66598C13.9223 1.16209 12.6805 0 10.9943 0C9.31952 0 8.07768 1.16209 7.59917 2.66598C4.65976 3.72553 3.42931 6.66494 3.25842 10.8348C3.11031 12.3501 2.91662 13.9907 2.11911 14.7768C1.09373 15.7566 0 16.7934 0 18.001C0 18.9581 0.717763 19.5961 1.89125 19.5961ZM10.9943 24.29C13.0223 24.29 14.492 22.8431 14.6401 21.1911H7.35992C7.50803 22.8431 8.97773 24.29 10.9943 24.29Z" fill="#B9B9BC"/>
              </G>
            </Svg>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Main Page",
          tabBarIcon: ({ size }) => (
            <Svg width={size}
            height={size} >
              <G transform='matrix(1,0,0,1,-0.0000000000000002220446049250313,0)'>
                <Path d="M0 11.3315C0 11.9145 0.441537 12.419 1.148 12.419C1.49019 12.419 1.79926 12.2284 2.07522 12.0042L13.0253 2.66542C13.3344 2.39636 13.6877 2.39636 13.9967 2.66542L24.9358 12.0042C25.2007 12.2284 25.5098 12.419 25.852 12.419C26.5033 12.419 27 12.0042 27 11.354C27 10.9728 26.8565 10.6701 26.5695 10.4234L23.4677 7.77765V3.11386C23.4677 2.60937 23.1476 2.29546 22.6509 2.29546H21.1276C20.6419 2.29546 20.3107 2.60937 20.3107 3.11386V5.07579L15.0785 0.613804C14.1182 -0.204601 12.9039 -0.204601 11.9436 0.613804L0.441537 10.4234C0.1435 10.6701 0 11.0064 0 11.3315ZM3.58749 21.4103C3.58749 23.0246 4.58095 24 6.22567 24H20.7854C22.4191 24 23.4235 23.0246 23.4235 21.4103V12.8899L14.1844 5.03095C13.7539 4.64977 13.2351 4.66098 12.8156 5.03095L3.58749 12.8899V21.4103ZM16.4031 21.8923H10.6079V14.7173C10.6079 14.1904 10.9501 13.854 11.4689 13.854H15.5531C16.072 13.854 16.4031 14.1904 16.4031 14.7173V21.8923Z" fill="#B9B9BC"/>
              </G>
            </Svg>
            
          ),
        }}
      />
      <Tabs.Screen
        name="reporting"
        options={{
          title: "Reporting",
          display: 'flex',
          tabBarIcon: ({ size }) => (
            <Svg width={size}
            height={size} >
              <G transform='matrix(1,0,0,1,-0.0000000000000002220446049250313,0)'>
                <Path d="M1.04329 22.0089C1.60932 22.0089 2.07547 21.5538 2.07547 20.9767V14.9057C2.38624 14.7947 3.31853 14.4617 4.72808 14.4617C8.76803 14.4617 11.4761 16.4817 15.3829 16.4817C17.0921 16.4817 17.8801 16.2708 18.7347 15.8713C19.5338 15.5161 20 14.8613 20 13.8402V2.78579C20 2.05327 19.434 1.59822 18.6792 1.59822C18.0466 1.59822 17.0477 2.01998 15.2719 2.01998C11.4095 2.01998 8.64595 0 4.61709 0C2.94118 0 2.17536 0.210877 1.27636 0.610433C0.488346 0.976692 0 1.55383 0 2.56382V20.9767C0 21.5427 0.477247 22.0089 1.04329 22.0089Z" fill="#B9B9BC"/>
              </G>
            </Svg>
          ),
        }}
      />
    </Tabs>
  );
}

//
