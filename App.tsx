import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { MyDarkTheme, MyLightTheme } from './utils/MyThemes';
import { MyTheme, TripContext } from './utils/Context';
import MyStatusBar from './components/MyStatusBar';
import HomeTabs from './screens/HomeTabs';
import dayjs from 'dayjs';
import { getAllTodos, getAllTrips, parentDeletedTodos } from './utils/Storage';
import { TodosType, TripsType } from './utils/Types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



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

  const [trips,setTrips] = useState<TripsType[]|undefined>()
  const [todoList,setTodoList]=useState<TodosType[]>()

  useEffect(()=>{
    getAllTrips().then((data)=>setTrips(data))
  },[])
  
  useEffect(()=>{
    getAllTodos().then((data)=>setTodoList(data))
    parentDeletedTodos()
},[])
  
  const sortedTrips = trips?.sort((a, b) => (dayjs(a.value.rawStartDate).isAfter(dayjs(b.value.rawStartDate)) ? 1 : -1))
  const activeTrips = sortedTrips?.filter((t)=>t.value.hoursUntilEnd>=0)
  const pastTrips = sortedTrips?.filter((t)=>t.value.hoursUntilEnd<0)
  const sortedTodos = todoList?.sort((a,b)=>{
    const numberPart1 = a.key.split(":")[1]
    const numberPart2 = b.key.split(":")[1]
    return(
      dayjs(parseInt(numberPart1)).isAfter(parseInt(numberPart2))?1:-1
    )
  }
  )


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <TripContext.Provider value={{trips,setTrips,activeTrips,pastTrips,todoList,setTodoList,sortedTodos}}>
      <MyTheme.Provider value={{autoIsDark,setAutoIsDark}}>
      <NavigationContainer theme={autoIsDark?MyDarkTheme:MyLightTheme}>
      <MyStatusBar/>
      <HomeTabs/>
      </NavigationContainer>
      </MyTheme.Provider>
    </TripContext.Provider>
    </GestureHandlerRootView>
  );
}

