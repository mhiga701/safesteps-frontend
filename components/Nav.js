import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Page from '../app/main';
import Profile from '../app/profile';
import { Text, View } from 'react-native';
import RPage from '../app/reporting';
import {styles} from './styles';

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator style={styles.navContainer}>
      <Tab.Screen name="Home" component={Page} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Reporting" component={RPage} />
      {/* Add more Tab.Screen components for additional tabs */}
    </Tab.Navigator>
  );
}