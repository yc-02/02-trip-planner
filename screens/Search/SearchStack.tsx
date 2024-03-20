import {createNativeStackNavigator } from '@react-navigation/native-stack';

import Trips from './Trips';
import TripSingle from './TripSingle';
import { useTheme } from '@react-navigation/native';
import { SearchStackParamList } from '../../utils/NavigationType';
import Itinerary from './Itinerary';
import ItineraryDetails from './ItineraryDetails';
import React from 'react';

const Stack = createNativeStackNavigator<SearchStackParamList>();


export default function SearchStack() {
  const {colors} = useTheme()
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:colors.background,
      },
      headerBackTitleVisible:false,
      headerTintColor:colors.text
      

    }}
    initialRouteName='Trips'
    >
    <Stack.Screen name='Trips' component={Trips} initialParams={{newTripAdded:false}} options={{title:"TRIPS"}}/>
    <Stack.Screen name='TripSingle' 
    component={TripSingle} 
    options={({route})=>({title:decodeURIComponent(route.params.title.toUpperCase())})}
    />
    <Stack.Screen name='Itinerary' component={Itinerary} options={{title:'ITINERARY'}}/>
    <Stack.Screen name='ItineraryDetails' 
    component={ItineraryDetails} 
    options={({route})=>({title:route.params.title})}
    />
  </Stack.Navigator>
  )
}
