import Onboarding from 'react-native-onboarding-swiper';
import React from 'react';
import { Text } from 'react-native';
import { styles } from '../components/styles';
import Onboarding1 from '../assets/onboarding1.svg';
import Onboarding2 from '../assets/onboarding2.svg';
import Onboarding3 from '../assets/onboarding3.svg';
import { useRouter } from 'expo-router'


export default function OnboardingScreen(){
  const router = useRouter();

  const handleDone = () => {
    router.push("(tabs)");
  };
  return (
    <Onboarding
    onDone={handleDone}
    onSkip={handleDone}
  pages={[
    {
      backgroundColor: '#fcfcfc',
      image: (
        <Onboarding1 />
      ),
      title: 'Personalize Your Alerts',
      subtitle: (
        <>
        <Text style={styles.toggleText}>Prefebeing notified with vibrations rather than auditory alerts? No problem.</Text>
        <Text style={styles.toggleText}>Choose and adjust alert types in the alerts page, allowing an easy integration of SafeSteps into your life.</Text>
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
        <Text style={styles.toggleText}>Be able to view nearby intersections and its reports on our home page to stay up-to-date.</Text>
      ),
    },
    {
      backgroundColor: '#fcfcfc',
      image: (
        <Onboarding3 />
      ),
      title: 'Submit Reports',
      subtitle: (
        <Text style={styles.toggleText}>Report traffic accidents and road obstacles on the reporting page to help keep other users safe and up-to-date.</Text>
      ),
      submitButton: (
        <Text style={styles.toggleText}>Get Started</Text>
      ),
    },
  ]}
/>
  )
}

