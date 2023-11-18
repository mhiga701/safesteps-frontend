import { React, useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Car from "../assets/car.fill.svg";
import { SvgUri } from "react-native-svg";
import { SvgXml } from "react-native-svg";
import { AlignStart } from "react-bootstrap-icons";
import { useNavigation } from '@react-navigation/native';
export default function ReportScreen (){
    const CAR_SVG =`<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="car.fill">
    <path id="car.fill_2" d="M6.69078 32.5031H8.24801C9.22611 32.5031 9.98542 31.7438 9.98542 30.7657V28.5393C12.8554 28.7194 17.0895 28.861 20.5 28.861C23.9104 28.861 28.1446 28.7323 31.0016 28.5393V30.7657C31.0016 31.7438 31.761 32.5031 32.7519 32.5031H34.2963C35.2872 32.5031 36.0466 31.7438 36.0466 30.7657V23.134C36.0466 20.8561 35.6219 19.5948 34.425 18.0376L33.2796 16.5962C32.8034 14.2925 31.954 11.8601 31.5036 10.9078C30.7829 9.37629 29.3929 8.47541 27.6169 8.23089C26.6774 8.10219 23.9233 8.03784 20.5 8.03784C17.0766 8.03784 14.3096 8.11506 13.383 8.23089C11.607 8.44967 10.2042 9.37629 9.49637 10.9078C9.04593 11.8601 8.19653 14.2925 7.72035 16.5962L6.57495 18.0376C5.3652 19.5948 4.95337 20.8561 4.95337 23.134V30.7657C4.95337 31.7438 5.71268 32.5031 6.69078 32.5031ZM10.6032 15.4122C10.8992 14.1381 11.4654 12.4393 11.8515 11.7572C12.2247 11.0751 12.6494 10.792 13.4474 10.689C14.3611 10.5603 16.5618 10.4831 20.5 10.4831C24.4252 10.4831 26.6388 10.5346 27.5526 10.689C28.3505 10.8048 28.7623 11.0751 29.1484 11.7572C29.5474 12.4264 30.075 14.1381 30.3839 15.4122C30.5255 15.9656 30.2809 16.223 29.7018 16.1972C27.7199 16.0814 25.2231 15.9527 20.5 15.9527C15.7768 15.9527 13.2801 16.0814 11.2981 16.1972C10.7061 16.223 10.4873 15.9656 10.6032 15.4122ZM11.0665 25.2575C9.84385 25.2575 8.90437 24.3309 8.90437 23.1083C8.90437 21.8728 9.84385 20.9461 11.0665 20.9461C12.2891 20.9461 13.2157 21.8728 13.2157 23.1083C13.2157 24.3309 12.2891 25.2575 11.0665 25.2575ZM29.9335 25.2575C28.698 25.2575 27.7713 24.3309 27.7713 23.1083C27.7713 21.8728 28.698 20.9461 29.9335 20.9461C31.1561 20.9461 32.0827 21.8728 32.0827 23.1083C32.0827 24.3309 31.1561 25.2575 29.9335 25.2575ZM17.0251 24.717C16.0985 24.717 15.455 24.0735 15.455 23.1597C15.455 22.246 16.0985 21.6025 17.0251 21.6025H23.9748C24.8885 21.6025 25.532 22.246 25.532 23.1597C25.532 24.0735 24.8885 24.717 23.9748 24.717H17.0251Z" fill="#396A93"/>
    </g>
    </svg>`;
    const REPORT_SVG = `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.4295 36.3098C22.6837 36.3098 23.051 36.2109 23.4182 36.0273C31.512 31.8604 34.1958 29.6709 34.1958 24.6V14.1049C34.1958 12.4381 33.5461 11.8307 32.1477 11.2516C30.5939 10.6018 25.424 8.77965 23.9126 8.27114C23.4465 8.12988 22.9239 8.03101 22.4295 8.03101C21.9492 8.03101 21.4266 8.12988 20.9604 8.27114C19.4349 8.7514 14.2651 10.6159 12.7254 11.2516C11.327 11.8166 10.6772 12.4381 10.6772 14.1049V24.6C10.6772 29.6709 13.4741 31.6626 21.4548 36.0273C21.8221 36.2251 22.1893 36.3098 22.4295 36.3098ZM22.4436 23.9643C21.6102 23.9643 21.13 23.4982 21.1017 22.6507L20.9039 15.588C20.8757 14.7264 21.4972 14.1049 22.4295 14.1049C23.3335 14.1049 23.9974 14.7264 23.9691 15.6022L23.7431 22.6365C23.7149 23.5123 23.2487 23.9643 22.4436 23.9643ZM22.4436 28.8375C21.4831 28.8375 20.6921 28.1454 20.6921 27.2131C20.6921 26.295 21.469 25.5887 22.4436 25.5887C23.4041 25.5887 24.181 26.2809 24.181 27.2131C24.181 28.1595 23.39 28.8375 22.4436 28.8375Z" fill="#396A93"/>
    </svg>`
    
    const navigation = useNavigation();
    const handlePress = () =>{
        navigation.navigate("AccidentS");
    };
    return(
    <>
    
    <Text style={styles.centerheadingText}> Report </Text>
    <Text style={styles.ReportText}>Help alert other users by reporting a traffic accident or road obstacle</Text>

    <View style={styles.ReportContainer }> 
        <TouchableOpacity >
        <Text style={styles.carText}>Traffic Accident</Text> 
        <View style={styles.CarSVGcontainer}>
            <SvgXml xml={CAR_SVG} />
        </View>
        <View style={styles.CarSubText}><Text>Notify other users about accident</Text></View>
        </TouchableOpacity> 
        
    </View>
      
    <View style={styles.ReportContainer }> 
        <TouchableOpacity onPress={() =>{}} >
        <Text style={styles.obstacleText}>Obstacle</Text> 
        <View style={styles.ObstacleSVGcontainer}>
            <SvgXml xml={REPORT_SVG} />
        </View>
        <View style={styles.ObstacleSubText}><Text>Notify other users about any road/ intersection obstacles</Text></View>
        </TouchableOpacity> 
    </View>
      
    </>
    )  
}