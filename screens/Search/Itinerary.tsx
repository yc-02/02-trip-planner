import { FlatList, Pressable, StyleSheet, Text, View,} from 'react-native'
import { ItineraryProps } from '../../utils/NavigationType'
import { useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import { TripContext } from '../../utils/Context';
import { Feather } from '@expo/vector-icons';


export default function Itinerary({route,navigation}:ItineraryProps) {
  
    const {myTrip,key}=route.params
    const {colors} = useTheme()



  return (
    <View style={styles.container}>
        <FlatList
        data={myTrip?.days}
        renderItem={({item})=>
        <View>
          <Pressable style={[styles.dateContents,{backgroundColor:colors.card}]} 
          onPress={()=>navigation.navigate('ItineraryDetails',{title:item,tripKey:key})}>
            <Text style={[styles.datesText,{color:colors.text}]}>{item}</Text>
            <Feather name="list" size={24} color={colors.text} />
          </Pressable>
        </View>
        }
        ItemSeparatorComponent={()=><View style={{marginBottom:20}}/>}
        />
    </View>
  )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    dateContents:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
        borderRadius:10,
    },
    datesText:{
        fontSize:18,
        fontWeight:'bold',
    },
})