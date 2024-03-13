import { useTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'

export default function MyStatusBar() {
    const {colors} =useTheme()
  return (
    <SafeAreaView style={{backgroundColor:colors.background}}>
        <StatusBar/>
    </SafeAreaView>
  )
}
