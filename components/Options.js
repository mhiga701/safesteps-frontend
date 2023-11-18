import { React, useState } from "react";
import { Text, View,TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { SvgXml } from "react-native-svg";
import { SelectList } from "react-native-dropdown-select-list";
export default function OptionScreen() {
    const ARROW_SVG = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.34863 13.6543C8.34863 13.9619 8.46289 14.2256 8.70898 14.4541L15.5469 21.1514C15.7402 21.3447 15.9863 21.4502 16.2764 21.4502C16.8564 21.4502 17.3223 20.9932 17.3223 20.4043C17.3223 20.1143 17.1992 19.8594 17.0059 19.6572L10.8447 13.6543L17.0059 7.65137C17.1992 7.44922 17.3223 7.18555 17.3223 6.9043C17.3223 6.31543 16.8564 5.8584 16.2764 5.8584C15.9863 5.8584 15.7402 5.96387 15.5469 6.15723L8.70898 12.8457C8.46289 13.083 8.34863 13.3467 8.34863 13.6543Z" fill="#1C1C1E"/>
    </svg>`

    const REPORT_SVG = `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.5989 29.2213C29.5989 30.9073 30.7829 32.0913 32.4559 32.0913C34.1419 32.0913 35.313 30.9073 35.313 29.2213V8.44965C35.313 6.76372 34.1419 5.57971 32.4559 5.57971C30.7829 5.57971 29.5989 6.76372 29.5989 8.44965V29.2213ZM16.1114 25.3862C19.9981 25.8495 24.0134 27.0335 27.7327 28.964C27.7199 28.8481 27.7199 28.7323 27.7199 28.6165V9.04166C27.7199 8.96444 27.7199 8.88722 27.7199 8.81001C24.0649 10.7276 19.6763 12.0017 16.1114 12.3878V25.3862ZM11.414 12.3878C7.69462 12.3878 5.68695 14.344 5.68695 17.9346V19.8393C5.68695 23.4171 7.69462 25.3733 11.414 25.3733H14.2196V12.3878H11.414ZM16.8965 34.6395C18.621 34.6395 19.8951 33.3654 19.4189 31.2805L18.5566 27.4325C17.7716 27.1236 15.7382 26.9563 14.4126 26.9434H11.1952L13.7305 32.2586C14.4641 33.7772 15.2749 34.6395 16.8965 34.6395Z" fill="#396A93"/>
    </svg>`
    
    return(
        <>
        <TouchableOpacity><View style={styles.ArrowSVGContainer}><SvgXml xml={ARROW_SVG}/></View></TouchableOpacity>
        <Text style={styles.ReportAccident}>Report Traffic Accident</Text>
        <View style={[styles.ReportContainer,{top:70,height:170},]}>
            <View style={{top:-120}}>
                <Text style={[styles.Present,{textAlign:'center',marginTop:0}]}>Are You In Immediate Danger?</Text>
                <Text style={[styles.Options,{top:140}]}>We strongly advise you to call 911 if the issue has not been addressed head-on yet.</Text>
                <TouchableOpacity style={[styles.emergencyButton,{bottom:-100, right:-70,width:150}]}><Text style={[styles.ReportText,{color:'white'}]}>Call 911</Text></TouchableOpacity>
            </View>
        </View>
        
        <View style={[styles.ReportContainer,{bottom:-70,height:80}]}> 
        <TouchableOpacity onPress={() =>{}} >
        <Text style={styles.obstacleText}>File a Report</Text> 
        <View style={styles.ObstacleSVGcontainer}>
            <SvgXml xml={REPORT_SVG} />
        </View>
        <View style={styles.ObstacleSubText}><Text>Help Keep Other Users Notified</Text></View>
        </TouchableOpacity> 
    </View>
        </>
    );
}