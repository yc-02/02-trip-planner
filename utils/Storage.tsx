import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoDataType, TodosType, TripDataType, TripsType } from './Types';
import { Alert } from 'react-native';



export const storeData = async (key:string,newData:TripDataType) => {
  try {
    await AsyncStorage.setItem(key,JSON.stringify(newData))
  } catch (error) {
    console.error('Error storing data:', error);
  }
}


export const storeTodo = async (key:string,todo:TodoDataType) => {
  try {
    await AsyncStorage.setItem(key,JSON.stringify(todo))
  } catch (error) {
    console.error('Error storing data:', error);
  }
}

export const getAllTrips = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const tripKeys = keys.filter(key => key.startsWith('Trip'));
      const values = await AsyncStorage.multiGet(tripKeys)
      const myTrips :TripsType[] = values.map(([key,value])=>({key,value: typeof value === 'string' ? JSON.parse(value):null}))
      return myTrips
    } catch(e) {
     console.log('Error getting trips',e)
    }
  }

  export const getAllTodos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const todoKeys = keys.filter(key => key.startsWith('Todo'));
      const values = await AsyncStorage.multiGet(todoKeys)
      const myTodos:TodosType[]= values.map(([key,value])=>({key,value: typeof value === 'string' ? JSON.parse(value):null}))
      return myTodos
    } catch(e) {
     console.log('Error getting trips',e)
    }
  }

  export const removeItem = async (key:string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log(e)
    }
  
    console.log('Done Remove')
  }



  export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.error(e)
    }
  
    console.log('Done Clear')
  }


export const parentDeletedTodos = async()=>{
  try{
    
    const keys = await AsyncStorage.getAllKeys()
    const tripKeys = keys.filter(key => key.startsWith('Trip'));
    const todoKeys = keys.filter(key => key.startsWith('Todo'));
    const values = await AsyncStorage.multiGet(todoKeys)
    const myTodos:TodosType[]= values.map(([key,value])=>({key,value: typeof value === 'string' ? JSON.parse(value):null}))
    const parentDeleted =myTodos.filter(a=>!tripKeys.includes(a.value.tripKey))
    const parentDeletedKeys = parentDeleted.map(key=>key.key)
    await AsyncStorage.multiRemove(parentDeletedKeys)
  }catch(e){
    console.error(e)
  }
}


export const ReorderTodos = async(keys:string[],values:TodoDataType[])=>{

  const dataToStore:[string, string][] = keys.map((key, index) => [key, JSON.stringify(values[index])]);
if(keys.length>0 && values.length>0){
  try {
    await AsyncStorage.multiSet(dataToStore)
    console.log('done')
  } catch(e) {
    console.error(e)
  }
}
}