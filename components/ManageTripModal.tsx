import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { useTheme } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

export default function ManageTripModal({modalVisible,setModalVisible,handleRemove}:{
  modalVisible:boolean
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>
  handleRemove:() => void
}) {
  const deviceWidth = Dimensions.get("window").width;
  const {colors} = useTheme()
  return (
    <Modal 
    isVisible={modalVisible}
    swipeDirection='down'
    onSwipeComplete={() => setModalVisible(false)}
    deviceWidth={deviceWidth}
    style={{margin:0,justifyContent:'flex-end'}}
    backdropTransitionOutTiming={500}
    
    >
      <View style={[styles.modalContainer,{backgroundColor:colors.background}]}>
      <View style={styles.rule}>
        <Octicons name="horizontal-rule" size={40} color='gray'/>
        </View>
      <Pressable style={[styles.pressableContainer,{backgroundColor:colors.background}]}>
          <Text style={[{color:colors.primary},styles.pressableText]}>Edit</Text>
       </Pressable>
        <Pressable style={[styles.pressableContainer,{backgroundColor:colors.background}]} onPress={handleRemove}>
          <Text style={[{color:colors.notification},styles.pressableText]}>Delete</Text>
       </Pressable>
      </View>

   </Modal>
  )
}


const styles=StyleSheet.create({
  modalContainer:{
    height:'50%',
    paddingHorizontal:20,
    borderRadius:10,
    shadowOffset:{
      width:0,
      height:1
    },
    shadowOpacity:0.5,
    gap:10,

  },
  pressableContainer:{
    padding:20,
    borderRadius:10,
    alignItems:'center',
    shadowOffset:{
      width:0,
      height:1
    },
    shadowOpacity:0.1,
    shadowRadius:10
  },
  pressableText:{
    fontSize:18,
    fontWeight:'bold'

  },
  rule:{
    alignSelf:'center',
    marginBottom:10,
  }
})