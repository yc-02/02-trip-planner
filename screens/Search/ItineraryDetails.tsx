import { ItineraryDetailsProps } from '../../utils/NavigationType'
import { Pressable, StyleSheet, View } from 'react-native'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { TripContext } from '../../utils/Context';
import { NestableScrollContainer} from 'react-native-draggable-flatlist';
import { ReorderTodos, getAllTodos, removeItem } from '../../utils/Storage';
import { TodosType } from '../../utils/Types';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { ItineraryDraggableList } from '../../components/ItineraryDraggableList';



export default function ItineraryDetails({route,navigation}:ItineraryDetailsProps) {
    const {title,tripKey,todoUpdated,todoAdded}=route.params
    const {colors} = useTheme()
    const {sortedTodos,setTodoList}=useContext(TripContext)
    const filteredTodos = sortedTodos?.filter(a=>a.value.tripKey === tripKey && a.value.date===title)


    //update when todochange
    useEffect(()=>{
      if(todoUpdated){
        getAllTodos().then((data)=>{
          setTodoList(data)
          navigation.setParams({todoUpdated:false})
      })
      }
    },[todoUpdated])


    //header
    useLayoutEffect(()=>{
        navigation.setOptions({
          headerRight: () => (
            <Pressable onPress={()=>navigation.navigate('AddItinerary',{title:title,tripKey:tripKey})}>
            <Entypo name="add-to-list" size={25} color={colors.primary} />
            </Pressable>
          )
        })
      },[navigation])
    
   

    const handleDeleteTodo=(todoKey:string)=>{
        removeItem(todoKey)
        navigation.setParams({todoUpdated:true})
    }


    const rightSwipeActions = (todoKey:string) => {
      return (
          <Pressable onPress={()=>handleDeleteTodo(todoKey)} style={[styles.swipeRightIcon,{backgroundColor:colors.notification}]}>
          <View>
          <MaterialCommunityIcons name="delete-outline" size={30} color="white" />
          </View>
          </Pressable>
      );
  };

    const handleUpdateTodoData=()=>{
      navigation.setParams({todoUpdated:true})
    }



  //reorder Todos

    const handleDragEnd=(data:TodosType[])=>{
      const oldKeysSequence = filteredTodos?.map(k=>k.key)
      const reorderedValues = data.map(v=>v.value)
      oldKeysSequence&& oldKeysSequence?.length>0 && ReorderTodos(oldKeysSequence,reorderedValues)
      navigation.setParams({todoUpdated:true})
  }


    //scroll
    const flatListRef = useRef<ScrollView>(null);
    useEffect(()=>{
      if(todoAdded){
        setTimeout(()=>{
          flatListRef.current?.scrollToEnd()
      },800)
      navigation.setParams({todoAdded:false})
      }
    },[todoAdded])


  return (
  <View style={styles.container}>
    <NestableScrollContainer ref={flatListRef}>
      <View>
      <ItineraryDraggableList
      filteredTodos={filteredTodos}
      rightSwipeActions={rightSwipeActions}
      handleDragEnd={handleDragEnd}
      handleUpdateTodoData={handleUpdateTodoData}
      />
      </View>
      </NestableScrollContainer>
  </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        marginHorizontal:5
    },
    swipeRightIcon:{
      alignSelf:'center',
      width:'25%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center'
    },
})