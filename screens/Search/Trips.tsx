import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { TripProps } from '../../utils/NavigationType';
import { getAllTrips } from '../../utils/Storage';
import { Feather } from '@expo/vector-icons';
import { TripContext } from '../../utils/Context';



export default function Trips({navigation,route}:TripProps) {
  const {tripUpdated}=route.params
  const {colors} = useTheme()

  const [refreshing, setRefreshing] = useState(false)
  const {setTrips,activeTrips,pastTrips}=useContext(TripContext)
  const [activeTrip ,setActiveTrip] = useState<boolean>(true)


  
  
  useEffect(() => {
      if(tripUpdated){
          getAllTrips().then((data) => setTrips(data))
          navigation.setParams({tripUpdated:false})
      }
  }, [tripUpdated])






  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getAllTrips().then((data) => setTrips(data))
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Pressable onPress={()=>setActiveTrip(true)} 
      style={{borderBottomWidth:activeTrip?3:0,borderBottomColor:colors.primary}}>
      <Text style={[styles.tripsText,{color:colors.text}]}>Current & Upcoming</Text>
      </Pressable>
      <Pressable onPress={()=>{setActiveTrip(false)}} 
      style={{borderBottomWidth:activeTrip?0:3,borderBottomColor:colors.primary}}>
      <Text style={[styles.tripsText,{color:colors.text}]}>Past</Text>
      </Pressable>
      </View>
      <FlatList
      data={activeTrip? activeTrips:pastTrips}
      renderItem={({item})=>
      <View style={[{alignItems:'center'}]}>
      <View style={[styles.card,{backgroundColor:colors.background}]}>
      <Pressable onPress={()=>navigation.navigate('TripSingle',{key:item.key,singleTrip:item.value,title:item.value.title})}>
        <View style={{gap:20}}>
          <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
          <View style={styles.cardTitle}>
          <Feather name="map-pin" size={24} color={colors.text}/>
          <Text style={[styles.titleText,{color:colors.text}]}>{item.value.title}</Text> 
          </View>
        </View>
          <Text style={[styles.cardText,{color:colors.text}]}>{item.value.duration} {item.value.duration===1?'Day':'Days'}</Text>
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
  header:{
    flexDirection:'row',
    gap:20,
    justifyContent:'flex-start',
    padding:20,
    marginVertical:10,

  },
  card:{
    padding:20,
    width:'90%',
    borderRadius:5,
    shadowOffset:{
      width:0,
      height:1
    },
    shadowOpacity:0.10,
    shadowRadius:5,
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
})
