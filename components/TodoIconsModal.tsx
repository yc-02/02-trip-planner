import React from 'react'
import { FlatList, Modal, ScrollView, StyleSheet, View } from 'react-native'
import { Food, Indoor, Others, Outdoor, PressableActivityIcons, Transportation, Water, Winter, renderIconType } from '../utils/ActivityIcons'
import GestureRecognizer from 'react-native-swipe-gestures';
import { Octicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';


export default function TodoIconsModal({setSelectedIcon,setIconModalVisible, iconModalVisible}:{
    setSelectedIcon:React.Dispatch<React.SetStateAction<{
        iconName: any;
        icon: number;
        iconColor: string;
    }>>
    setIconModalVisible:React.Dispatch<React.SetStateAction<boolean>>
    iconModalVisible:boolean
}) {
    const{colors}=useTheme()
    //render icons
    const renderItem=({item}:{item:renderIconType})=>{
        return(
        <View style={[styles.iconItem]}>
         <PressableActivityIcons 
            name={item.name} 
            iconName={item.iconName} 
            icon={item.icon} 
            iconColor={item.iconColor}
            handlePressIcon={handlePressIcon} />
        </View>
        )}

    const separator =()=>{
        return(
            <View style={{marginRight:5}}/>
        )
    }
    const handlePressIcon=(iconName:string,icon:number,iconColor:string)=>{
        setSelectedIcon({iconName,icon,iconColor})
        setIconModalVisible(false)
        
    }

    //swipe down to close modal
    const onSwipeDown = () => {
        setIconModalVisible(false);
      };
    
    const config = {
      velocityThreshold:0.3,
      directionalOffsetThreshold: 80
    };
  return (
    <GestureRecognizer
    style={{ flex: 1}}
    onSwipeDown={onSwipeDown}
    config={config}
    >
    <Modal visible={iconModalVisible} animationType='slide' presentationStyle='overFullScreen' transparent={true}>
    <View style={[styles.container,{backgroundColor:colors.background}]}>
        <View style={styles.rule}>
        <Octicons name="horizontal-rule" size={40} color='gray'/>
        </View>
      <ScrollView>
      <FlatList
      data={Transportation}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item)=>item.iconName}
      ItemSeparatorComponent={separator}
      />
      <FlatList
      data={Indoor}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item)=>item.iconName}
      ItemSeparatorComponent={separator}
      />
      <FlatList
      data={Outdoor}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item)=>item.iconName}
      ItemSeparatorComponent={separator}
      />
      <FlatList
      data={Water}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item)=>item.iconName}
      ItemSeparatorComponent={separator}
      />
      <FlatList
      data={Winter}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item)=>item.iconName}
      ItemSeparatorComponent={separator}
      /> 
      <FlatList
      data={Food}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item)=>item.iconName}
      ItemSeparatorComponent={separator}
      /> 
      <FlatList
      data={Others}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item)=>item.iconName}
      ItemSeparatorComponent={separator}
      /> 
    </ScrollView>
    </View>
    </Modal>
    </GestureRecognizer>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:20,
        marginTop:70,
        borderRadius:20,
        shadowOpacity:0.5,
        shadowOffset:{
            width:1,
            height:2,
        },

    },
    iconItem:{
        width:75,
        height:75,
        justifyContent:'center'
    },
    rule:{
        alignSelf:'center',
        marginBottom:20,
    },
})