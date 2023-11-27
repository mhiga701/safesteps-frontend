import { React, startTransition, useState } from "react";
import { Text, View ,TextInput,TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../../../components/styles";
import { SvgXml } from "react-native-svg";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";
import ReportForm from "../../../components/ReportForm";
export default function AccidentScreen() {
  const ARROW_SVG = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.34863 13.6543C8.34863 13.9619 8.46289 14.2256 8.70898 14.4541L15.5469 21.1514C15.7402 21.3447 15.9863 21.4502 16.2764 21.4502C16.8564 21.4502 17.3223 20.9932 17.3223 20.4043C17.3223 20.1143 17.1992 19.8594 17.0059 19.6572L10.8447 13.6543L17.0059 7.65137C17.1992 7.44922 17.3223 7.18555 17.3223 6.9043C17.3223 6.31543 16.8564 5.8584 16.2764 5.8584C15.9863 5.8584 15.7402 5.96387 15.5469 6.15723L8.70898 12.8457C8.46289 13.083 8.34863 13.3467 8.34863 13.6543Z" fill="#1C1C1E"/>
  </svg>`

  const [selected, setSelected] = useState("");
 
  const history = useRouter();
  return (
    <> 
    
    <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
<TouchableOpacity onPress={() => history.back()} ><View style={styles.ArrowSVGContainer}><SvgXml xml={ARROW_SVG}/></View></TouchableOpacity>

      <ReportForm />
  {/* <View style={styles.MessageContainer}>
        <TextInput
        style={{top:10 ,fontSize: 16, fontFamily: 'Bitter', fontWeight: '400', lineHeight: 20, letterSpacing: 0.50}}
        placeholder="Enter Message"
        />
  </View>
  <View style={{flexDirection:'row'}}>
    <TouchableOpacity style={styles.cancelButton}><Text style={{color:'#7E678F', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Cancel</Text></TouchableOpacity>
    <TouchableOpacity style={styles.SubmitButton}><Text style={{color:'white', fontSize: 15, fontFamily: 'Montserrat', fontWeight: '500', lineHeight: 20}}>Submit</Text></TouchableOpacity>
  </View> */}
    
</ScrollView>
    
    </>
    
  );
}