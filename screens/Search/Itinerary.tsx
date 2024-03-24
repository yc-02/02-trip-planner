import { FlatList, Pressable, StyleSheet, Text, View,} from 'react-native'
import { ItineraryProps } from '../../utils/NavigationType'
import { useTheme } from '@react-navigation/native';
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
          onPress={()=>navigation.navigate('ItineraryDetails',{title:item,tripKey:key,todoUpdated:false,todoAdded:false})}>
            <Text style={[styles.datesText,{color:colors.text}]}>{item}</Text>
            <Feather name="chevron-right" size={24} color={colors.text} />
          </Pressable>
        </View>
        }
        ItemSeparatorComponent={()=><View style={{marginBottom:15}}/>}
        />
    </View>
  )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
    },
    dateContents:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
    },
    datesText:{
        fontSize:18,
        fontWeight:'bold',
    },
})