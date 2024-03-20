import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { TripProps } from '../../utils/NavigationType';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { getAllTrips, removeItem } from '../../utils/Storage';
import { Feather } from '@expo/vector-icons';
import { TripContext } from '../../utils/Context';


export default function Trips({navigation,route}:TripProps) {
  const {newTripAdded}=route.params
  const {colors} = useTheme()
  const [refreshing, setRefreshing] = useState(false)
  const {setTrips,activeTrips,pastTrips}=useContext(TripContext)
  const [active ,setActive] = useState<boolean>(true)

  useEffect(() => {
      if(newTripAdded){
          getAllTrips().then((data) => setTrips(data))
          navigation.setParams({newTripAdded:false})
      }
  }, [newTripAdded])




  const handleRemove =(key:string)=>{
    removeItem(key)
    getAllTrips().then((data) => setTrips(data))
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getAllTrips().then((data) => setTrips(data))
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);



  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',gap:15,padding:15,justifyContent:'flex-start'}}>
      <Pressable onPress={()=>setActive(true)} 
      style={{borderBottomWidth:active?3:0,borderBottomColor:colors.primary}}>
      <Text style={[styles.tripsText,{color:colors.text}]}>Active</Text>
      </Pressable>
      <Pressable onPress={()=>{setActive(false)}} 
      style={{borderBottomWidth:active?0:3,borderBottomColor:colors.text}}>
      <Text style={[styles.tripsText,{color:colors.text}]}>Past</Text>
      </Pressable>
      </View>
      <FlatList
      data={active? activeTrips:pastTrips}
      renderItem={({item})=>
      <View style={[{alignItems:'center'}]}>
      <View style={[styles.card,{backgroundColor:colors.card}]}>
        <Pressable onPress={()=>handleRemove(item.key)} style={[styles.deleteIcon,{backgroundColor:colors.notification}]}>
          <MaterialIcons name="delete" size={22} color={'white'} />
        </Pressable>
      <Pressable onPress={()=>navigation.navigate('TripSingle',{key:item.key,title:item.value.title})}>
        <View style={{gap:20}}>
          <View style={{flexDirection:'row',justifyContent:"space-between"}}>
          <View style={styles.cardTitle}>
          <FontAwesome6 name="map-location-dot" size={24} color={colors.text} />
          <Text style={[styles.titleText,{color:colors.text}]}>{item.value.title}</Text>
          </View>
        </View>
          <Text style={[styles.cardText,{color:colors.text}]}>{item.value.duration} Days</Text>
          <View style={styles.cardTitle}>
          <Feather name="calendar" size={24} color={colors.text} />
          <Text style={{color:colors.text,fontSize:16}}>{item.value.startDate}</Text>
          <Feather name="arrow-right" size={16} color={colors.text} />
          <Text style={{color:colors.text,fontSize:16}}>{item.value.endDate}</Text>
          </View>
        </View>
      </Pressable>
      </View>
      </View>
      }
      keyExtractor={item=>item.key}
      ItemSeparatorComponent={()=>(<View style={{height:20}}/>)}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
      </View>

  )
}


const styles= StyleSheet.create({
  container:{
    flex:1,
  },
  card:{
    padding:15,
    width:'90%',
    borderRadius:20,
  },
  cardTitle:{
    flexDirection:'row',
    gap:10,
    alignItems:'center'
  },
  titleText:{
    fontSize:18,
    fontFamily:'',
    fontWeight:'bold'
  },
  cardText:{
    fontSize:17,
    fontWeight:'500'
  },
  tripsText:{
    fontSize:18,
    fontWeight:'bold',
  },
  deleteIcon:{
    position:'absolute',
    top:0,
    right:0,
    padding:5,
    borderRadius:20
  }
})
