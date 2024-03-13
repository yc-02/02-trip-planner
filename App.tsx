import { StatusBar } from 'expo-status-bar';
import { Appearance, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MyDarkTheme, MyLightTheme } from './utils/MyThemes';
import { MyTheme, TripContext } from './utils/Context';
import MyStatusBar from './components/MyStatusBar';
import HomeTabs from './screens/HomeTabs';
import { MyTrips } from './utils/Types';
import dayjs from 'dayjs';
import { getAllTrips } from './utils/Storage';



export default function App() {

  const [colorScheme,setColorScheme] = useState(Appearance.getColorScheme())
  useEffect(()=>{
    const subscription = Appearance.addChangeListener(({colorScheme})=>{
      setColorScheme(colorScheme)
    })
    return ()=>{
      subscription.remove()
    }
  },[])

  const [autoIsDark,setAutoIsDark] = useState(colorScheme==='dark')
 //use trips all screens

  const [trips,setTrips] = useState<MyTrips[]|undefined>()
  useEffect(()=>{
    getAllTrips().then((data)=>setTrips(data))
  },[])
  const sortedTrips = trips?.sort((a, b) => (dayjs(a.value.rawStartDate).isAfter(dayjs(b.value.rawStartDate)) ? 1 : -1))
  const activeTrips = sortedTrips?.filter((t)=>t.value.hoursUntilEnd>=0)
  const pastTrips = sortedTrips?.filter((t)=>t.value.hoursUntilEnd<0)

  return (
    <TripContext.Provider value={{trips,setTrips,activeTrips,pastTrips}}>
      <MyTheme.Provider value={{autoIsDark,setAutoIsDark}}>
      <NavigationContainer theme={autoIsDark?MyDarkTheme:MyLightTheme}>
      <MyStatusBar/>
      <HomeTabs/>
      </NavigationContainer>
      </MyTheme.Provider>
    </TripContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

}});
