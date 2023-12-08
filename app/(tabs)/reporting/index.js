import { Text, View, TouchableOpacity, Linking} from "react-native";
import { Link, useRouter } from "expo-router";
import { styles } from "../../../components/styles";
import ReportHeader from '../../../assets/ReportHeader.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicon from 'react-native-vector-icons/Octicons';


export default function RPage() {

    const router = useRouter();
    return(
        <>
         
         <View style={styles.reportHeaderContainer}>
      <ReportHeader style={styles.alertHeader}/>
        </View>
        
        <Text style={{color: '#f2f2f2', fontSize: 20,
    fontWeight: "700",
    marginTop: 80,
    marginLeft: 20,
    marginBottom: 20,
    fontFamily: "Montserrat-Bold",
    position: "absolute"}}>Report</Text>

    <Text 
    style={{fontFamily: "Bitter-Regular",  marginTop: 120, marginLeft: 20, marginBottom: 10,color: '#f2f2f2', position: 'absolute', fontSize: 15}}>
        Help alert other users by reporting 
    </Text>
    <Text 
    style={{fontFamily: "Bitter-Regular",  marginTop: 135, marginLeft: 20, color: '#f2f2f2', position: 'absolute', fontSize: 15}}>
       a traffic accident or road obstacle
    </Text>
       <View style={styles.reportingContainer}>
        <View style={styles.callButtonContainer}>
        <TouchableOpacity style={styles.callButton}
            onPress={() => {
              console.log("calling 311");
              const phone_number = "123456789";
              Linking.openURL(`tel:${phone_number}`)}}>

            <Ionicon name="ios-chatbox-ellipses" size={25} color="#5787f5" />
            <Text style={styles.callButtonText}>BOS:311</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.callButton}
         onPress={() => {
          console.log("calling 911");
          const phone_number = "123456789";
          Linking.openURL(`tel:${phone_number}`);
        }}>
        <Icon name="phone" size={25} color="#5787f5" />
            <Text style={styles.callButtonText}>Call 911</Text>
        </TouchableOpacity>
        </View>
       
       <Text style={styles.reportContainerText}>FILE A REPORT</Text>
       <Text style={styles.reportSubText}>Dial 9-1-1 for emergencies. The reporting forms are only for non-emergencies.</Text>

        <View style={[styles.ReportContainer,{top:15,height:120},]}>
             <Ionicon name='car' size={30} color="#5787f5" />
            <TouchableOpacity onPress={() => router.push("/reporting/accident")}>
                <Text style={styles.callButtonText}>Traffic Accident</Text>
                <Text style={[styles.trafficText,{right:-12}]}>Notify other users about an accident</Text>
            </TouchableOpacity>
        </View>
        
        <View style={[styles.ReportContainer,{bottom:-25, height:120}]}> 
            <View style={{left:-12}}>
                <Ionicon name='trail-sign' size={30} color="#5787f5" />
            </View>
            
        <TouchableOpacity onPress={() => router.push("/reporting/obstacle")}>
            <Text style={[styles.callButtonText, {left:-10}]}>File a Report</Text> 
            <Text style={styles.trafficText}>Help Keep Other Users Notified</Text>
        </TouchableOpacity> 
        </View>
        <View style={styles.contactButtonContainer}>
            <View style={{top:-20}}>
            <TouchableOpacity style={styles.contactButton}>
                <Ionicon name="chatbubbles" size={25} color="#5787f5" />
                <Text style={styles.callButtonText}>Contact Us</Text>
            </TouchableOpacity>
            </View>
        </View>
       
       </View>

        </>
    );
}