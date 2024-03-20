import { ItineraryDetailsProps } from '../../utils/NavigationType'
import { Modal, Pressable, StyleSheet, Text, View,} from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TripContext } from '../../utils/Context';
import { NestableDraggableFlatList, NestableScrollContainer, RenderItem, RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ReorderTodos, getAllTodos, removeItem, } from '../../utils/Storage';
import TodoModal from '../../components/TodoModal';
import { ActivityIcons } from '../../utils/ActivityIcons';
import { TodosType } from '../../utils/Types';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { AddToItinerary } from '../../components/ AddToItinerary';



export default function ItineraryDetails({route}:ItineraryDetailsProps) {
    const {title,tripKey}=route.params
    const {colors} = useTheme()
    const {sortedTodos,setTodoList}=useContext(TripContext)
    const [todoUpdated,setTodoUpdated]=useState<boolean>(false)
    const [modalVisible,setModalVisible]=useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<string>('');

    const filteredTodos = sortedTodos?.filter(a=>a.value.tripKey === tripKey && a.value.date===title)

    //update when todochange
    useEffect(()=>{
        getAllTodos().then((data)=>{
            setTodoList(data)
            setTodoUpdated(false)
        })
    },[todoUpdated])


    //open modal
    const handleModalOpen = ()=>{
        setModalVisible(true)
        setSelectedDate(title)
    }
     

    //header
    
   

    //delete todo
    const handleDeleteTodo=(todoKey:string)=>{
        removeItem(todoKey)
        setTodoUpdated(true)
    }

    //swipe to press delete button

    const rightSwipeActions = (todoKey:string) => {
     return (
       <View style={styles.swipeRightContainer}>
         <Pressable onPress={()=>handleDeleteTodo(todoKey)}>
         <View style={[styles.swipeRightIcon,{backgroundColor:colors.notification}]}>
         <MaterialCommunityIcons name="delete-outline" size={25} color="white" />
         </View>
         </Pressable>
       </View>
     );
};


    //render todos
    const RenderTodo = ()=>{
        const initialData: TodosType[] = (filteredTodos || []).map((d) => ({
              key: d.key,
              value:{
                  date:d.value.date,
                  todo: d.value.todo,
                  tripKey:d.value.tripKey,
                  icon:d.value.icon,
                  iconName:d.value.iconName,
                  iconColor:d.value.iconColor
              }
          }));
          const [draggableData, setDraggableData] = useState(initialData)
          const oldKeys = filteredTodos?.map(k=>k.key)
    
    
          return(
          <NestableDraggableFlatList
          data={draggableData}
          renderItem={({item,drag,isActive})=>(
              <ScaleDecorator>
              <Pressable onLongPress={drag}
              disabled={isActive}
              >
              <Swipeable renderRightActions={()=>rightSwipeActions(item.key)}>
                <View 
                style={[styles.draggableContainer,{backgroundColor:colors.card}]}>
                <ActivityIcons name={null} icon={item.value.icon} iconName={item.value.iconName} 
                iconColor={item.value.iconColor}/>
                <Text style={{color:colors.text,fontSize:17}}>{item.value.todo}</Text>
              </View>
               </Swipeable>
               </Pressable>
               </ScaleDecorator>

          )}
          onDragEnd={({ data }) => {
              setDraggableData(data)
              const reorderedValues = data.map(v=>v.value)
              oldKeys&& oldKeys?.length>0 && ReorderTodos(oldKeys,reorderedValues)
          }}
          keyExtractor={(item)=>item.key}
          />
          )
      }
    

    

    //scroll
    const flatListRef = useRef<ScrollView>(null);
    const handleScroll=()=>{
        setTimeout(()=>{
            flatListRef.current?.scrollToEnd()
        },1000)
    }

  
  return (
    <View style={styles.container}>
    <NestableScrollContainer ref={flatListRef}>
    <RenderTodo/>
    </NestableScrollContainer>
    <Modal visible={modalVisible} presentationStyle='formSheet' animationType='slide'>
        <TodoModal 
        tripKey={tripKey} 
        date={selectedDate}
        setTodoUpdate={setTodoUpdated}
        setModalVisible={setModalVisible}
        handleScroll={handleScroll}
        />
     </Modal>
     <AddToItinerary handleModalOpen={handleModalOpen}/>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        justifyContent:'space-between'
    },
    draggableContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginTop:10,
        padding:15,
        borderRadius:5
    },
    swipeRightContainer:{
      justifyContent:'flex-end',
      width:'20%',

    },
    swipeRightIcon:{
      padding:14,
      borderRadius:5,
      alignItems:'center',
      overflow:'hidden'
    },

})