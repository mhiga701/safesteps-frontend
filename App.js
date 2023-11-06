import { React, useState } from 'react';
import { Audio } from 'expo-av';
import {Text, View, Modal, TouchableOpacity, Image, Switch, StatusBar} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Font from 'expo-font'
import { styles } from './components/styles'
import { BleManager } from 'react-native-ble-plx';


export default function App() {

  const manager = new BleManager();
  const [soundSelection, setSoundSelection] = useState('Beep (Default)');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [splash, setSplash] = useState(true);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [newAudio, setNewAudio] = useState(false);
  const [confirmAudio, setConfirmAudio] = useState(false);
  const [changeAudio, setChangeAudio] = useState(false);
  const [visualAlertEnabled, setVisualAlertEnabled] = useState(false);
  const [audioAlertEnabled, setAudioAlertEnabled] = useState(false);

  const handleNewAudio = () => {
    setNewAudio(!newAudio);
    setChangeAudio(false);
  };

  const handleConfirmAudio = () => {
    setConfirmAudio(!confirmAudio);
  };

  async function loadFont(){
    await Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
      'Bitter-Regular': require('./assets/fonts/Bitter-Regular.otf'),
    });
    setFontLoaded(true);
  };
loadFont();

const sounds = ['./beep.mp3'];
playSound = async () => {
    const sound = new Audio.Sound();
    try {
      let source = require('./beep.mp3');
      await sound.loadAsync(source);
      await sound
      .playAsync()
      .then(async playbackStatus => {
        setTimeout(() => {
          sound.unloadAsync();
        }, playbackStatus.playableDurationMillis)
      })
      .catch(error => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
  }

 
  if (!fontLoaded) {
    return <Image source={require('./assets/splash.png')}/>
  }
  else {
    if (splash) {
      return <Modal visible={splash} animationType="fade">
      <View style={styles.container}>
        <Image source={require('./assets/sc.png')}/>
        <TouchableOpacity style={styles.buttonText} onPress={() => setSplash(false)}>
          <Text style={styles.ackButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    }
    else {
      return (
        <>
        
        <View style={styles.container}>
          <Text style={styles.mainHeadingText}>Alert Types</Text>
          <Text style={styles.subheadingText}>VISUAL ALERT</Text>
    
          <View style={styles.settingsContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Enable Visual Alerts</Text>
              <Switch
                value={visualAlertEnabled}
                onValueChange={() => setVisualAlertEnabled(!visualAlertEnabled)}
                trackColor={{ false: '#e8e5ea', true: '#7e678f' }} />
            </View>
    
    
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Visual Alert #1</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  if (visualAlertEnabled) {
                    setAlert1(true);
                  }
                } }>
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>
    
            <View style={styles.rowContainer3}>
              <Text style={styles.toggleText}>Visual Alert #2</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  if (visualAlertEnabled) {
                    setAlert2(true);
                  }
                } }>
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>
    
          </View>
    
          <Text style={styles.subheadingText}>AUDIO ALERT</Text>
    
          <View style={styles.settingsContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Enable Audio Alerts</Text>
              <Switch
                value={audioAlertEnabled}
                onValueChange={() => 
                  setAudioAlertEnabled(!audioAlertEnabled)
                }
                trackColor={{ false: '#e8e5ea', true: '#7e678f' }} />
            </View>
    
            <View style={styles.rowContainer}>
              <Text style={styles.toggleText}>Audio Alert</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  if (audioAlertEnabled) {
                    setAlert3(!alert3);
                    playSound();
                  }
                } }>
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowContainer3}>
              <Text style={styles.toggleText}>Change Alert Sound</Text>
              <TouchableOpacity style={styles.button3} onPress={() => setChangeAudio(true)}>
                <Text style={styles.toggleText}>{soundSelection}</Text>
              </TouchableOpacity>
            </View>
    
          </View>

        </View>
        <AwesomeAlert
            show={alert1}
            showProgress={false}
            title="Approaching Intersection"
            titleStyle={styles.alert1Text}
            message="Look Up!"
            messageStyle={styles.alert1Text}
            showConfirmButton={true}
            confirmText="I acknowledge"
            confirmButtonStyle={styles.button1}
            confirmButtonTextStyle={styles.ackButtonText2}
            onConfirmPressed={() => setAlert1(false)} />
    
        <AwesomeAlert
               show={alert3}
               showProgress={false}
               title="Ongoing Auditory Alert"
               titleStyle={styles.alert1Text}
               message="When the auditory alert is enabled, just the audio will play. This pop-up is just to show  that the alert is working."
               messageStyle={styles.toggleText}
               showConfirmButton={true}
               cancelText="Test Again"
               cancelButtonStyle={styles.audiobutton1}
               cancelButtonTextStyle={styles.gotItButton}
               showCancelButton={true}
               confirmText='Got it!'
               confirmButtonStyle={styles.audiobutton2}
               confirmButtonTextStyle={styles.ackButtonText2}
               onConfirmPressed={() => setAlert3(!alert3)} 
               onCancelPressed={() => {
                 if (audioAlertEnabled) {
                   playSound();
                 }
               }} 
           />

          <AwesomeAlert
            show={confirmAudio}
            showProgress={false}
            title="Change Alert Sound?"
            showConfirmButton={true}
            showCancelButton={true}
            confirmText='Confirm'
            cancelText='Cancel'
            confirmButtonStyle={styles.changeAudioConfirm}
            cancelButtonStyle={styles.changeAudioCancel}
            confirmButtonTextStyle={styles.ackButtonText2}
            cancelButtonTextStyle={styles.audioButtonText}
            onConfirmPressed={() => handleConfirmAudio}
            onCancelPressed={() => handleConfirmAudio}  
          />
          <Modal visible={changeAudio} animationType="fade">

              <View style={styles.container}>
                <Text style={styles.mainHeadingText}>Alert Sounds</Text>
                <Text style={styles.subheadingText}>SOUNDS</Text>
                  <View style={styles.settingsContainer}>
                  <TouchableOpacity style={styles.rowContainer} onPress={() => handleNewAudio}>
                      <Text style={styles.toggleText}>Beep (Default)</Text>
                      </TouchableOpacity>
                    <TouchableOpacity style={styles.rowContainer} onPress={() => handleNewAudio}>
                      <Text style={styles.toggleText}>Alert</Text>
                      </TouchableOpacity>
                    <TouchableOpacity style={styles.rowContainer} onPress={() => handleNewAudio}>
                      <Text style={styles.toggleText}>Beacon</Text>
                      </TouchableOpacity>
                    <TouchableOpacity style={styles.rowContainer} onPress={() => handleNewAudio}>
                      <Text style={styles.toggleText}>Bulletin</Text>
                      </TouchableOpacity>
                    {/* <View style={styles.rowContainer}> */}
                      <TouchableOpacity style={styles.rowContainer} onPress={() => handleNewAudio}>
                      <Text style={styles.toggleText}>By The Seaside</Text>
                      </TouchableOpacity>
                    {/* </View> */}
                    <TouchableOpacity style={styles.rowContainer3} onPress={() => handleNewAudio}>
                      <Text style={styles.toggleText}>Chimes</Text>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.settingsContainer}>
                  <TouchableOpacity style={styles.rowContainer3} onPress={() => handleConfirmAudio}>
                      <Text style={styles.ackButtonText}>Save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>

          <Modal visible={alert2} animationType="fade">
            <View style={styles.alert2Container}>
              <Text style={styles.alert2Text}>Approaching</Text>
              <Text style={styles.alert2Text}>Intersection</Text>
              <Image source={require('./assets/alert.png')} style={styles.alert2Image} />
              <Text style={styles.alert2Text}>Look Up!</Text>
              <TouchableOpacity style={styles.visbutton1} onPress={() => setAlert2(false)}>
                <Text style={styles.ackButtonText}>I acknowledge</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <StatusBar style="auto" />
          
          </>
        
      );
    }
    
  }
  
}

