import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e5ea",
    padding: 20,
    textAlign: "left",
  },
  map_container: {
    flex: 1,
  },
  locationButton: {
    position: "absolute",
    right: 20,
    bottom: 90,
    padding: 6,
    backgroundColor: "white",
    borderRadius: 300,
    elevation: 10, // for Android
    shadowColor: "#000000", // for iOS
    shadowOffset: { width: 0, height: 1 }, // for iOS
    shadowOpacity: 0.8, // for iOS
    shadowRadius: 3, // for iOS
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e5ea",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  navContainer: {
    height: 50, // Adjust the height as needed
    backgroundColor: "blue", // Change the background color
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  mainHeadingText: {
    color: "black",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 35,
    fontFamily: "Montserrat-Bold",
  },
  subheadingText: {
    color: "#52525a",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    fontFamily: "Montserrat-Regular",
  },
  centerheadingText:{
    // Report
    color: 'black',
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    lineHeight: 50,
    letterSpacing: 0.40,
    marginTop: 45,
    textAlign:'center',
  },
  ReportText:{
   color: '#52525A',
   fontSize: 15,
   fontFamily: 'Bitter',
   fontWeight: '400',
   lineHeight: 22.5,
   letterSpacing: 0.4,
   textAlign: 'center',
  },
  ReportContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 10,
    
    paddingHorizontal: 20, // Adjust this value for horizontal padding
    paddingVertical: 30, // Adjust this value for vertical padding
    // Shadow/elevation for iOS and Android respectively
    shadowColor: '#000',
    
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  
  settingsContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 5,
    marginBottom: 15,
    paddingHorizontal: 15, // Add padding to separate elements
  },
  boundary: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: -15,
  },
  rowContainer3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  buttonContainer: {
    flexDirection: "row", // Make buttons horizontal
    justifyContent: "center", // Center buttons horizontally
    marginTop: 50, // Add spacing
  },
  button: {
    backgroundColor: "#7e678f",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonHomeScreen: {
    backgroundColor: "#7e678f",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    bottom: "-800%", // Adjust this value as needed
  },
  CarSVGcontainer:{
    top:-10,
    left: -40,
  },
  CarSubText:{
    color: '#52525A',
    fontSize: 13,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.40,
    right:-16,
    top:-20,

  },
  ObstacleSVGcontainer:{
    top:5,
    left: -40,
  },
  ObstacleSubText:{
    left:20,
    top:-20,
  },
  ArrowSVGContainer:{
    bottom: -30,
    left: 0
  },
  MessageContainer:{
    top:50,
    width: '100%',
    height: '20%',
    background: 'white', 
    borderRadius: 10,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 5,
    marginBottom: 15,
    paddingHorizontal: 15, // Add padding to separate elements

  },
  ReportAccident:{
    color: 'black',
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.40,
    bottom: -60,
    left:5,
  },
  Intersection:{
    color: '#52525A',
    fontSize: 17,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    lineHeight: 25,
    bottom: -90,
    left:5,

  },
  Present:{
    color: '#52525A',
    fontSize: 17,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    lineHeight: 25,
    bottom: -130,
    left:5,
  },
  Options:{
    color: '#52525A',
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.40,
    bottom: -150,
    left:5,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  audioButtonText: {
    textAlign: "center",
    color: "#7e678f",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  ackButtonText: {
    textAlign: "center",
    color: "#ad5459",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  ackButtonText2: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  alert2Text: {
    textAlign: "center",
    color: "#F9FAFB",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
    fontFamily: "Montserrat-Bold",
  },
  toggleText: {
    fontFamily: "Bitter-Regular",
    color: "black",
  },
  alert2Container: {
    backgroundColor: "#ad5459",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  alert2Image: {
    height: 118,
    width: 120,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  alert1Text: {
    textAlign: "center",
    color: "black",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
    fontFamily: "Montserrat-Bold",
  },
  button1: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 50,
  },
  button2: {
    backgroundColor: "#ad5459",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  button3: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  audiobutton1: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    borderColor: "#ad5459",
    borderWidth: 1,
  },
  changeAudioConfirm: {
    backgroundColor: "#7e678f",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  changeAudioCancel: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    borderColor: "#7e678f",
    borderWidth: 1,
  },
  audiobutton2: {
    backgroundColor: "#ad5459",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#e8e5ea",
    padding: 20,
    textAlign: "left",
  },
  mainHeadingText: {
    color: "black",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 35,
    fontFamily: "Montserrat-Bold",
  },
  carText:{
    color: '#52525A',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.4,
    left: 15, 
    top: 5
  },
  obstacleText:{
    color: '#52525A',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.4,
    left: 20, 
    top: 15
  },
  input: {
    flex: 1,
    marginLeft: 10,
    textAlign: "right",
    fontFamily: "Bitter-Regular",
  },
  subheadingText: {
    color: "#52525a",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    fontFamily: "Montserrat-Regular",
  },
  settingsContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 5,
    marginBottom: 15,
    paddingHorizontal: 15, // Add padding to separate elements
  },
  boundary: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: -15,
  },
  rowContainer3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row", // Make buttons horizontal
    justifyContent: "center", // Center buttons horizontally
    marginTop: 50, // Add spacing
  },
  button: {
    backgroundColor: "#7e678f",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  audioButtonText: {
    textAlign: "center",
    color: "#7e678f",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  ackButtonText: {
    textAlign: "center",
    color: "#ad5459",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  ackButtonText2: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  alert2Text: {
    textAlign: "center",
    color: "#F9FAFB",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
    fontFamily: "Montserrat-Bold",
  },
  toggleText: {
    fontFamily: "Bitter-Regular",
    color: "black",
  },
  alert2Container: {
    backgroundColor: "#ad5459",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  alert2Image: {
    height: 118,
    width: 120,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  alert1Text: {
    textAlign: "center",
    color: "black",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
    fontFamily: "Montserrat-Bold",
  },
  button1: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 50,
  },
  button2: {
    backgroundColor: "#ad5459",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  audiobutton1: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    borderColor: "#ad5459",
    borderWidth: 1,
  },
  changeAudioConfirm: {
    backgroundColor: "#7e678f",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  changeAudioCancel: {
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    borderColor: "#7e678f",
    borderWidth: 1,
  },
  audiobutton2: {
    backgroundColor: "#ad5459",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  Collisionbutton: {
    backgroundColor: "#808080",
    color:'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:140,
    marginBottom: 10,
    top:159
  },
  Rolloverbutton:{
    backgroundColor: "#808080",
    color:'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:140,
    marginBottom: 10,
    right:-150,
    top:115
  },
  Subwaybutton:{
    backgroundColor: "#808080",
    color:'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:140,
    marginBottom: 10,
    top:120
  },
  Pedestrianbutton:{
    backgroundColor: "#808080",
    color:'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:170,
    marginBottom: 10,
    right:-150,
    top:75
  },SingleCar:{
    backgroundColor: "#808080",
    color:'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:160,
    marginBottom: 10,
    top:80
  },
  Other:{
    backgroundColor: "#808080",
    color:'white',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:75,
    marginBottom: 10,
    right:-170,
    top: 35

  },
  AccidentOptions:{
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row', // Arrange items horizontally
  },
  SubmitButton:{
    backgroundColor: '#7E678F',
    borderRadius: 50,
    width:'45%',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 50,
    marginRight:30,
    height: 44,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#7E678F',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },cancelButton:{
    borderRadius: 50,
    width:'45%',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 50,
    marginRight:30,
    height: 44,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#7E678F',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },emergencyButton:{
    backgroundColor:'#AD5459',
    borderRadius: 50,
    width:'105%',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 50,
    marginRight:30,
    height: 44,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#7E678F',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
