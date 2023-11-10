import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Page from '../app/main';
import Profile from '../app/profile';
import { Text, View } from 'react-native';
import RPage from '../app/reporting';
import {styles} from './styles';

const Tab = createBottomTabNavigator();

function BarTabs() {
  return (
    <Tab.Navigator style={styles.navContainer} initialRouteName='Home'>
      <Tab.Screen name="Home" component={Page}/>
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="Reporting" component={RPage}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={BarTabs} />
        {/* Add more Stack.Screen components for additional pages */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}