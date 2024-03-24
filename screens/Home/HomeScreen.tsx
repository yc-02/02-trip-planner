import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext,} from "react";
import { RootProps} from "../../utils/NavigationType";
import { TripContext } from "../../utils/Context";
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TripStartsEnds } from "../../utils/TripStartsEnds";


export default function HomeScreen({navigation}:RootProps) {

    const {colors} = useTheme()
    const {activeTrips}=useContext(TripContext)


  return (
    <View style={styles.container}>
        {activeTrips?.length === 0 || activeTrips === undefined ?
        (<View style={styles.noTripContainer}>
          <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <FontAwesome6 name="person-walking-luggage" size={24} color={colors.text} />
            <Text style={[styles.upcomingText,{color:colors.text}]}>Where to next ?</Text>
          </View>
          <Pressable style={[styles.button,{backgroundColor:colors.primary}]} onPress={()=>navigation.navigate('Add')}>
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Add Your Trip</Text>
          </Pressable>
        </View>):

         ( 
          
         <Pressable onPress={()=>navigation.navigate('Search',{screen:'Trips',params:{tripUpdated:false}})}>
         <View style={styles.upcomingContainer}>
            <TripStartsEnds trip={activeTrips[0].value}/>
            <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
              <FontAwesome6 name="person-walking-luggage" size={24} color={colors.text}/>
              <Text style={[styles.upcomingText,{color:colors.text}]}>{activeTrips[0].value.title}</Text>
            </View>
            <View  style={{flexDirection:'row',gap:20,alignItems:'center'}}>
              <Text style={{color:colors.text,fontSize:16}}>{activeTrips[0].value.startDate}</Text>
              <Feather name="arrow-right" size={16} color={colors.text} />
              <Text style={{color:colors.text,fontSize:16}}>{activeTrips[0].value.endDate}</Text>
            </View>
            
          </View>
          </Pressable>
          )}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:20,
      alignItems:'center',
      justifyContent:'center'
    },
    noTripContainer:{
      gap:20

    },
    button:{
      padding:10,
      borderRadius:10,
      alignItems:'center'
    },
    upcomingContainer:{
      gap:10,

    },
    upcomingText:{
      textTransform:'uppercase',
      fontSize:18,
      fontWeight:'bold'
    }
})