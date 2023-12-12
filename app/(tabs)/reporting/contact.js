import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from '../../../components/styles';
import ContactUs from '../../../components/ContactUs';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function ContactScreen() {
    return (
     <View style={styles.container}>
        <TouchableOpacity style={{top: 40, left: 0}}>
            <Ionicon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <ContactUs />
    </View>
    )
   
}