import { MaterialIcons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';



export const AddToItinerary=({handleModalOpen}: {
  handleModalOpen:() => void
})=>{
  const {colors}=useTheme()
  
  // const offset = useSharedValue(50);

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateX: offset.value }],
  // }));


  // useEffect(()=>{
  //   offset.value = withSequence(
  //     // deviate left to start from -ANGLE
  //     withTiming(0, { duration: 250}),
  //     // wobble between -ANGLE and ANGLE 7 times
  //     withRepeat(
  //       withTiming(offset.value, {
  //         duration: 500,
  //       }),
  //       4,
  //       true
  //     ),
  //     // go back to 0 at the end
  //     withTiming(0, { duration: 250 })
  //   );

  // },[])

    return (
      <Animated.View>
      <Pressable onPress={handleModalOpen} style={[styles.Button,{backgroundColor:colors.primary}]}>
      <MaterialIcons name="add" size={35} color="white"/>
      </Pressable>
      </Animated.View> 
    )
  }

  const styles = StyleSheet.create({
    Button:{
      alignSelf:'flex-start',
      borderRadius:30,
      padding:5
    }
  })