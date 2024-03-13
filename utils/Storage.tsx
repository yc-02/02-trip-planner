import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyTrips, TripData } from './Types';



export const storeData = async (key:string,newData:TripData) => {
  try {
    await AsyncStorage.setItem(key,JSON.stringify(newData))
  } catch (error) {
    console.error('Error storing data:', error);
  }
}

export const getAllTrips = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const values = await AsyncStorage.multiGet(keys)
      const myTrips :MyTrips[] = values.map(([key,value])=>({key,value: typeof value === 'string' ? JSON.parse(value):null}))
      return myTrips
    } catch(e) {
     console.log('Error getting trips',e)
    }
  }

  export const removeTrip = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log(e)
    }
  
    console.log('Done.')
  }


  export const storeTodo = async (key:string,data:any) => {
    try {
      await AsyncStorage.setItem(key,JSON.stringify(data))
    } catch (error) {
      console.error('Error storing data:', error);
    }
  }