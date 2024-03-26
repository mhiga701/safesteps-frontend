import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import { styles } from '../../../components/styles'
import ToastMan from '../../../assets/Toast.svg'

export default function Toast() {
  const router = useRouter();
  return (
    <View style={styles.modalContainer}>
      <View style={styles.toastContainer}>
        <ToastMan />
        <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => router.push('../home')} style={styles.buttonH}>
          <Text>Back to reports</Text>
        </TouchableOpacity>
        </View>
      </View> 
    </View>

  
  )
}