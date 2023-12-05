import Onboarding from 'react-native-onboarding-swiper';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Onboarding1 from '../assets/onboarding1.svg';
import Onboarding2 from '../assets/onboarding2.svg';
import Onboarding3 from '../assets/onboarding3.svg';

import { View, Text } from 'react-native'
import React from 'react'

const Onboarding = () => {
  return (
    <Onboarding
  pages={[
    {
      backgroundColor: '#fcfcfc',
      image: (
        <Onboarding1 />
      ),
      title: 'Personalize Your Alerts',
      subtitle: (
        <>
        <Text>Prefer being notified with vibrations rather than auditory alerts? No problem.</Text>
        <Text>Choose and adjust alert types in the alerts page, allowing an easy integration of SafeSteps into your life.</Text>
        </>
      ),
    },
    {
      backgroundColor: '#fcfcfc',
      image:(
        <Onboarding2 />
      ),
      title: 'View Intersections and Reports',
      subtitle: (
        <Text>Be able to view nearby intersections and its reports on our home page to stay up-to-date.</Text>
      ),
    },
    {
      backgroundColor: '#fcfcfc',
      image: (
        <Onboarding3 />
      ),
      title: 'Submit Reports',
      subtitle: (
        <Text>Report traffic accidents and road obstacles on the reporting page to help keep other users safe and up-to-date.</Text>
      ),
    },
  ]}
/>
  )
}

export default Onboarding