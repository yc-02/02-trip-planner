import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { TripData } from '../../utils/Types'
import { TripSingleProps } from '../../utils/NavigationType';
import { TripStartsEnds} from '../../utils/TripStartsEnds';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function TripSingle({route,navigation}:TripSingleProps) {
  const {colors} = useTheme()
  const {key}=route.params
  const [myTrip,setMyTrip]=useState<TripData>()
  const getMyTrip = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        jsonValue != null ? setMyTrip(JSON.parse(jsonValue)) : null
      } catch(e) {
          console.log('Error getting trip',e)
      }
    }


  useEffect(()=>{
      getMyTrip()
    },[])




  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.title}>{myTrip!=undefined && TripStartsEnds(myTrip)}</Text>
      <Text style={styles.title}>{myTrip?.title}</Text>
      <Text style={styles.title}>{myTrip?.duration} days</Text>
        <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
          <Text style={{color:colors.text,fontSize:16}}>{myTrip?.startDate}</Text>
          <Feather name="arrow-right" size={16} color={colors.text} />
          <Text style={{color:colors.text,fontSize:16}}>{myTrip?.endDate}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={()=>navigation.navigate('Itinerary',{myTrip:myTrip,key:key})}>
      <MaterialCommunityIcons name="map-check-outline" size={24} color="black" />
      <Text>Itinerary</Text>
      </Pressable>
      <Pressable style={styles.button}>
      <FontAwesome6 name="list-check" size={24} color="black" />
      <Text>Checklist</Text>
      </Pressable>
      </View>

    </View>
  )
}



const styles=StyleSheet.create({
 container:{
  flex:1,
  alignItems:'center',
  paddingVertical:20,
  gap:20,
 },
 content:{
  width:'90%',
  padding:20,
  gap:20,
  borderWidth:2,
  borderColor:'#ccc',
  borderRadius:20
 },
 title:{
  textTransform:'uppercase',
  fontSize:18,
  fontWeight:'bold'
 },
 buttonContainer:{
  width:'90%',
  flexDirection:'row',
  justifyContent:'space-between',

 },
 
 button:{
  flexDirection:'row',
  justifyContent:'space-between',
  width:"45%",
  padding:20,
  borderWidth:2,
  borderColor:'#ccc',
  borderRadius:20,
  alignItems:'center'
 }

})