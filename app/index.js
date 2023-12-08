import Onboarding from 'react-native-onboarding-swiper';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../components/styles';
import Onboarding1 from '../assets/First.svg';
import Onboarding2 from '../assets/Second.svg';
import Onboarding3 from '../assets/Third.svg';
import { useRouter } from 'expo-router'

const Circle = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(254, 45, 1, 1)' : 'rgba(254, 45, 1, 0.3)';
  } else {
    backgroundColor = selected ? '#fe2d01' : 'rgba(254, 45, 1, 0.3)';
  }
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        left: -132,
        top: 20,
        backgroundColor,
      }}
    />
  );
};

const Next = ({ ...props }) => {
  return (
<TouchableOpacity style={styles.nextButton} {...props} >
  <Text style={styles.nextButtonText}>Next</Text>
</TouchableOpacity>
  );
}

const Done = ({ ...props }) => {
  return (
<TouchableOpacity style={styles.nextButton} {...props} >
  <Text style={styles.nextButtonText}>Done</Text>
</TouchableOpacity>
  );
}
export default function OnboardingScreen(){
  const router = useRouter();

  const handleDone = () => {
    router.push("(tabs)");
  };
  return (
    <Onboarding
    onDone={handleDone}
    showSkip={false}
    bottomBarHighlight={false}
    bottomBarHeight={50}
    DotComponent={Circle}
    NextButtonComponent={Next}
    DoneButtonComponent={Done}

  pages={[
    {
      backgroundColor: '#fcfcfc',
      image: (
        <Onboarding1 />
      ),
      title: (
        <Text style={styles.onboarding1Title}>Personalize Your Alerts</Text>
      ),
      subtitle: (
        <>
        <View style={styles.onboardingContainer}>
        <Text style={styles.onboarding1Subtitle}>Prefer being notified with vibrations rather than auditory alerts? No problem.</Text>
        <Text style={styles.onboarding1Subtitle}>Choose and adjust alert types in the alerts page, allowing an easy integration of SafeSteps into your life.</Text>
        </View>
      
        </>
      ),
    },
    {
      backgroundColor: '#fcfcfc',
      image:(
        <Onboarding2 style={styles.slide2}/>
      ),
      title: (
        <Text style={styles.onboarding2Title}>View Intersections and Reports</Text>
      ),
      subtitle: (
        <View style={styles.onboardingContainer}>
           <Text style={styles.onboarding2Subtitle}>Be able to view nearby intersections and its reports on our home page to stay up-to-date.</Text>
        </View>
          ),
       
    },
    {
      backgroundColor: '#fcfcfc',
      image: (
        <Onboarding3 style={styles.wormContainer}/>
      ),
      title: (
        <Text style={styles.onboarding1Title}>Submit Reports</Text>
      ),
      subtitle: (
        <View style={styles.onboardingContainer}>
                    <Text style={styles.onboarding2Subtitle}>Report traffic accidents and road obstacles on the reporting page to help keep other users safe and up-to-date.</Text>

        </View>
      ),
      
    },
  ]}
/>
  );
}

