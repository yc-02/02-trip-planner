import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Haptics from 'expo-haptics'
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { DateRange, TripData } from "../../utils/Types";
import { RootProps } from "../../utils/NavigationType";
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { storeData } from "../../utils/Storage";





export default function AddScreen({navigation}:RootProps) {
  const {colors} = useTheme()


  const [date,setDate]=useState<DateRange>()
  const [showCalendar,setShowCalendar]=useState<boolean>(false)
  const [title,setTitle] = useState<string>()


  //format date
  const formatStartDate = dayjs(date?.startDate).format('ddd, MMM D')
  const formatEndDate = dayjs(date?.endDate).format('ddd, MMM D')
  const rawStartDate = date?.startDate
  const rawEndDate = date?.endDate


  //duration
 const duration = dayjs(date?.endDate).diff(dayjs(date?.startDate),'d')+1
  //untilTrip
 const today = dayjs()
 const hoursUntilTrip = (dayjs(date?.startDate)).diff(today,'h')
 const daysUntilTrip =  (dayjs(date?.startDate)).diff(today,'day')
// untilEnd
const hoursUntilEnd = (dayjs(date?.endDate)).diff(today,'h')
const daysUntilEnd = (dayjs(date?.endDate)).diff(today,'day')



  
//get all days
let days:string[] =[]
const start = dayjs(date?.startDate)
const end=dayjs(date?.endDate)
if(date && date?.endDate && date.startDate){
  for (let i=start; i<end; i=i.add(1,'day')){
    days.push(i.format('ddd, MMM D'))
  }
}
if(dayjs().isSame(start,'day') && start.isSame(end,'day')){
  days.push(start.format('ddd, MMM D'))
}


  const onSubmit = ()=>{
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    if(title === undefined||null){
      Alert.alert('Destination is required.')
    }else{
      const newData = {
        title:title,
        startDate:formatStartDate,endDate:formatEndDate,
        duration:duration,days:days,
        rawStartDate:rawStartDate,rawEndDate:rawEndDate,
        hoursUntilTrip:hoursUntilTrip,
        daysUntilTrip:daysUntilTrip,
        hoursUntilEnd:hoursUntilEnd,
        daysUntilEnd:daysUntilEnd
      }
      const key = `${title},${formatStartDate}`
      storeData(key,newData)
      setTitle(undefined)
      navigation.navigate('Search',{screen:'Trips',params:{newTripAdded:true}
      })}
}


  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
        <View style={{paddingLeft:20}}>
        <FontAwesome6 name="magnifying-glass-location" size={24} color={colors.text} />
        </View>
        <TextInput
        style={[styles.input,{color:colors.text}]}
        placeholder='Where to go'
        placeholderTextColor={'lightgray'}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={Keyboard.dismiss}
        />
        </View>
      <Pressable onPress={()=>setShowCalendar(!showCalendar)}>
        <View style={styles.datePicker}>
          <Feather name="calendar" size={25} color={colors.text} />
         <Text style={{color:colors.text,fontSize:18}}>{formatStartDate}</Text>
         <AntDesign name="arrowright" size={20} color={colors.text} />
         <Text style={{color:colors.text,fontSize:18}}>{formatEndDate}</Text>
        </View>
      </Pressable>
      <Pressable style={({pressed})=>[styles.button,{backgroundColor:pressed?'darkseagreen':colors.primary}]} onPress={onSubmit}>
        <View style={{flexDirection:'row',gap:10,alignItems:"center"}}>
        <FontAwesome6 name="person-walking-luggage" size={24} color='white' />
        <Text style={{color:'white',fontWeight:'bold'}}>Add Trip</Text>
        </View>
      </Pressable>
      
      {/* calendar modal */}
      <Modal visible={showCalendar} presentationStyle='pageSheet' animationType='slide'>
      <View style={{flex:1,backgroundColor:colors.card,padding:20}}>
        <Pressable style={{alignSelf:'flex-end',paddingBottom:20}} onPress={()=>setShowCalendar(false)}>
        <AntDesign name="close" size={27} color={colors.text} />
        </Pressable>
        <DateTimePicker 
        mode='range'
        startDate={date?.startDate}
        endDate={date?.endDate}
        onChange={(dates)=>setDate(dates)}
        headerButtonColor='#2e8b57'
        selectedItemColor='#2e8b57'
        headerTextStyle={{color:colors.text,fontSize:18}}
        headerButtonSize={18}
        calendarTextStyle={{color:colors.text}}
        weekDaysTextStyle={{color:colors.text}}
        />
      <Pressable style={[styles.selectButton,{backgroundColor:colors.primary}]} onPress={()=>setShowCalendar(!showCalendar)}>
        <Text style={{color:'white',fontWeight:'bold'}}>Select dates</Text>
      </Pressable>
      </View>
      </Modal>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    paddingHorizontal:20,
    paddingVertical:40,
    gap:20,
  },
  inputContainer:{
    flexDirection:'row',
    borderWidth:2,
    borderRadius:10,
    borderColor:'#ccc',
    alignItems:'center'
  },
  input:{
    fontSize:20,
    width:'100%',
    padding:20,
  },
  button:{
    padding:10,
    alignSelf:'center',
    borderRadius:10,
  },
  selectButton:{
    padding:10,
    marginTop:30,
    alignSelf:'center',
    borderRadius:10,
  },
  datePicker:{
    padding:20,
    borderWidth:2,
    borderRadius:10,
    borderColor:'#ccc',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
  },

})