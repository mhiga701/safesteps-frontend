import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e8e5ea',
      padding: 20,
      textAlign: 'left',
    },
    mainHeadingText: {
      color: 'black',
      fontSize: 30,
      fontWeight: '700',
      marginBottom: 20,
      marginTop: 35,
      fontFamily: 'Montserrat-Bold'
    },
    subheadingText: {
      color: '#52525a',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 15,
      fontFamily: 'Montserrat-Regular'
    },
    settingsContainer: {
      backgroundColor: 'white',
      borderRadius: 16,
      elevation: 5,
      marginBottom: 15,
      paddingHorizontal: 15, // Add padding to separate elements
    },
    boundary: {
      height: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      marginVertical: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      marginHorizontal: -15
    },
    rowContainer3: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    buttonContainer: {
      flexDirection: 'row', // Make buttons horizontal
      justifyContent: 'center', // Center buttons horizontally
      marginTop: 50, // Add spacing
    },
    button: {
      backgroundColor: '#7e678f',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 14,
      fontFamily: 'Montserrat-Regular'
    },
    ackButtonText: {
      textAlign: 'center',
      color: '#ad5459',
      fontSize: 14,
      fontFamily: 'Montserrat-Regular'
    },
    ackButtonText2: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 14,
      fontFamily: 'Montserrat-Regular'
    },
    alert2Text: {
      textAlign: 'center',
      color: '#F9FAFB',
      fontSize: 30,
      fontWeight: '700',
      marginTop: 5,
      fontFamily: 'Montserrat-Bold'
    },
    toggleText: {
      fontFamily: 'Bitter-Regular',
      color: 'black'
    },
    alert2Container: {
      backgroundColor: '#ad5459',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    alert2Image: {
      height: 118,
      width: 120,
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 50,
    },
    alert1Text: {
      textAlign: 'center',
      color: 'black',
      fontSize: 30,
      fontWeight: '700',
      marginTop: 5,
      fontFamily: 'Montserrat-Bold'
    },
    button1: {
      backgroundColor: '#fff',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 24,
      marginBottom: 10,
      marginTop: 50,
    },
    button2: {
      backgroundColor: '#ad5459',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 24,
      marginBottom: 10,
    },
    audiobutton1: {
      backgroundColor: '#fff',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 24,
      marginBottom: 10,
      borderColor: '#ad5459',
      borderWidth: 1,
    },
    audiobutton2: {
      backgroundColor: '#ad5459',
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 24,
      marginBottom: 10,
    },
  });