import { React, useState } from "react";
import { Text, View ,TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { SvgXml } from "react-native-svg";
import { SelectList } from "react-native-dropdown-select-list";
export default function AccidentScreen() {
  const ARROW_SVG = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.34863 13.6543C8.34863 13.9619 8.46289 14.2256 8.70898 14.4541L15.5469 21.1514C15.7402 21.3447 15.9863 21.4502 16.2764 21.4502C16.8564 21.4502 17.3223 20.9932 17.3223 20.4043C17.3223 20.1143 17.1992 19.8594 17.0059 19.6572L10.8447 13.6543L17.0059 7.65137C17.1992 7.44922 17.3223 7.18555 17.3223 6.9043C17.3223 6.31543 16.8564 5.8584 16.2764 5.8584C15.9863 5.8584 15.7402 5.96387 15.5469 6.15723L8.70898 12.8457C8.46289 13.083 8.34863 13.3467 8.34863 13.6543Z" fill="#1C1C1E"/>
  </svg>`

  const [selected, setSelected] = useState("");
  const Data = [
    {key:'1',value:'BU Central'},
    {key:'2',value:"St Mary's Street"},
    {key:'3',value:'BU East'},
  ]
  
  return (
    <> 
    <TouchableOpacity><View style={styles.ArrowSVGContainer}><SvgXml xml={ARROW_SVG}/></View></TouchableOpacity>
    <Text style={styles.ReportAccident}>Report Traffic Accident</Text>
    <Text style={styles.Intersection}>Which Intersection Are You Closest To?</Text>
    <View style={styles.DropDown}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        fontFamily='Montserrat'
        data={Data}
        search={false}
        save="value"
        placeholder="Choose Intersection"
        inputStyles ={{marginRight:100}}
        dropdownItemStyles={{marginHorizontal:90}}
        
      />
    
    </View>
    
    </>
  );
}