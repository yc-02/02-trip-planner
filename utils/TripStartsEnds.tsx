import { useTheme } from "@react-navigation/native"
import { TripDataType } from "./Types"
import { StyleSheet, Text, View} from "react-native"
import { FontAwesome6} from "@expo/vector-icons"



export const TripStartsEnds = ({trip}:{trip:TripDataType})=>{
  const {colors} = useTheme()
    if(trip.hoursUntilTrip < 0 && trip.hoursUntilEnd > 24 && trip.hoursUntilTrip < -24 && trip.hoursUntilEnd > 48){
      return (
        <View style={styles.container}>
          <FontAwesome6 name="face-laugh" size={24} color={colors.primary} />
          <Text style={[styles.text,{color:colors.text}]}>Your Trip is ongoing.</Text>
        </View>
      )
    }else if(trip.hoursUntilTrip <= 0 && trip.hoursUntilTrip > -24 ){
      return (
        <View style={styles.container}>
          <FontAwesome6 name="face-laugh-squint" size={24} color={colors.primary} />
          <Text style={[styles.text,{color:colors.text}]}>Your Trip Starts today.</Text>
        </View>
      )
    }else if(trip.hoursUntilTrip < 24 && trip.hoursUntilTrip > 0){
      return (
        <View style={styles.container}>
          <FontAwesome6 name="face-laugh-squint" size={24} color={colors.primary} />
          <Text style={[styles.text,{color:colors.text}]}>Your Trip Starts tomorrow.</Text>
        </View>
      )
    }else if(trip.hoursUntilTrip > 24){
      return(
        <View style={styles.container}>
          <FontAwesome6 name="laugh" size={24} color={colors.primary} />
          <Text style={[styles.text,{color:colors.text}]}>Your trip starts in {trip.daysUntilTrip+1} days.</Text>
        </View>
      )
    }else if(trip.hoursUntilTrip < 0 && trip.hoursUntilEnd < 24){
      return (
        <View style={styles.container}>
          <FontAwesome6 name="face-meh" size={24} color={colors.primary} />
          <Text style={[styles.text,{color:colors.text}]}>Your Trip ends today.</Text>
        </View>
      )
    }else if (trip.hoursUntilTrip < 0 && trip.hoursUntilEnd > 24 && trip.hoursUntilEnd < 48){
      return (
        <View style={styles.container}>
         <FontAwesome6 name="face-meh" size={24} color={colors.primary} />
         <Text style={[styles.text,{color:colors.text}]}>Your Trip ends tomorrow.</Text>
        </View>
      )
    }else {
      return (
        <View style={styles.container}>
          <FontAwesome6 name="face-laugh" size={24} color={colors.primary} />
          <Text style={[styles.text, { color: colors.text }]}>Your trip started.</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
 container:{
  flexDirection:'row',
  alignItems:'center',
  gap:5
 },
 text:{
  fontSize:20,
  fontWeight:'700',
  textTransform:'capitalize'
 }
})