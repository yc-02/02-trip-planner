import { useLayoutEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TripSingleProps } from '../../utils/NavigationType';
import { TripStartsEnds} from '../../utils/TripStartsEnds';
import { useTheme } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { removeItem } from '../../utils/Storage';
import ManageTripModal from '../../components/ManageTripModal';



export default function TripSingle({route,navigation}:TripSingleProps) {
  const {colors} = useTheme()
  const {singleTrip,key}=route.params
  const [modalVisible,setModalVisible]=useState<boolean>(false)

  
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Pressable onPress={()=>setModalVisible(true)}>
          <Ionicons name="ellipsis-horizontal-sharp" size={24} color={colors.text} />
          </Pressable>
        </View>
      )
    })
  },[navigation])


  const handleRemove =()=>{
    removeItem(key)
    navigation.navigate('Trips',{tripUpdated:true})
  }



  return (
    <View style={[styles.container]}>
      <View style={[styles.content,{borderBottomColor:colors.border}]}>
       <TripStartsEnds trip={singleTrip}/>
        <Text style={{ textTransform:'capitalize',fontSize:17,fontWeight:'700',color:colors.text}}>{singleTrip.title}</Text>
        <Text style={{fontSize:17,color:colors.text}}>
          {singleTrip.duration} {singleTrip.duration===1?'Day':'Days'}
        </Text>
        <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
          <Text style={{color:colors.text,fontSize:16}}>{singleTrip.startDate}</Text>
          <Feather name="arrow-right" size={16} color={colors.text} />
          <Text style={{color:colors.text,fontSize:16}}>{singleTrip.endDate}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button,{borderColor:colors.border}]}
          onPress={()=>navigation.navigate('Itinerary',{myTrip:singleTrip,key:key})}>
          <MaterialCommunityIcons name="briefcase-clock-outline" size={24} color={colors.primary} />
          <Text style={{color:colors.text,fontSize:17,fontWeight:'500'}}>Itinerary</Text>
        </Pressable>
        <Pressable style={[styles.button,{borderColor:colors.border}]} 
          onPress={()=>navigation.navigate('ReadyMadeList')}>
          <MaterialCommunityIcons name="format-list-checks" size={24} color={colors.primary} />
          <Text style={{color:colors.text,fontSize:17,fontWeight:'500'}}>Ready-Made Packing List</Text>
        </Pressable>
        <Pressable 
        style={[styles.button,{borderColor:colors.border}]} 
          onPress={()=>navigation.navigate('CreateList')}>
          <MaterialCommunityIcons name="format-list-checks" size={24} color={colors.primary} />
          <Text style={{color:colors.text,fontSize:17,fontWeight:'500'}}>Create Your Own Packing List</Text>
        </Pressable>
        </View>
      <ManageTripModal
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      handleRemove={handleRemove}/>
    </View>
  )
}



const styles=StyleSheet.create({
  container:{
    flex:1
  },
  content:{
    gap:20,
    padding:30,
    borderBottomWidth:2,
  },
  buttonContainer:{
    gap:20,
    margin:30,
  },
  button:{
    flexDirection:'row',
    padding:20,
    borderWidth:2,
    borderRadius:20,
    gap:10,
    alignItems:'center',
}

})