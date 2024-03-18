import { FlatList, Modal, Pressable, ScrollViewBase, StyleSheet, Text, View,} from 'react-native'
import { ItineraryProps } from '../../utils/NavigationType'
import { Entypo } from '@expo/vector-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { TripContext } from '../../utils/Context';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ReorderTodos, getAllTodos, removeItem, } from '../../utils/Storage';
import TodoModal from '../../components/TodoModal';
import { ActivityIcons } from '../../utils/ActivityIcons';
import { TodosType } from '../../utils/Types';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  scrollTo,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';




export default function Itinerary({route}:ItineraryProps) {
  

    const {myTrip,key}=route.params
    const {colors} = useTheme()
    const tripKey = key
    const {sortedTodos,setTodoList}=useContext(TripContext)
    const [todoUpdated,setTodoUpdated]=useState<boolean>(false)
    const [modalVisible,setModalVisible]=useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState<string>('');



    //update when todochange
    useEffect(()=>{
        getAllTodos().then((data)=>{
            setTodoList(data)
            setTodoUpdated(false)
        })
    },[todoUpdated])
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
            <View style={styles.swipeRightIcon}>
            <AntDesign name="delete" size={24} color="white" />
            </View>
            </Pressable>
          </View>
        );
      };

//add todo animation
      const ANGLE = 5;
      const TIME = 300;
      const EASING = Easing.elastic(1.5);
      const rotation = useSharedValue(0);
      const [itemToAnimate,setItemToAnimate] = useState('')
      const addTodoAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${rotation.value}deg` }],
        }));
      const handleAddTodoAnimated = (key:string)=>{
          setItemToAnimate(key)
          rotation.value = withSequence(
            withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
            withRepeat(
              withTiming(ANGLE, {
                duration: TIME,
                easing: EASING,
              }),
              2,
              true
            ),
            withTiming(0, { duration: TIME / 2, easing: EASING })
          );
        };


   
 
    //render todo items
    const RenderTodo = ({date}:{date:string})=>{
      const filteredTodos = sortedTodos?.filter(a=>a.value.tripKey === tripKey && a.value.date===date)
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
        <DraggableFlatList
        data={draggableData}
        renderItem={({item,drag,isActive})=>(
            <ScaleDecorator>
            <Pressable onLongPress={drag}
            disabled={isActive}
            >
            <Swipeable renderRightActions={()=>rightSwipeActions(item.key)}>
              <Animated.View 
              style={item.key === itemToAnimate ? 
                [addTodoAnimatedStyle,styles.draggableContainer]:
                [styles.draggableContainer]}>
              <ActivityIcons name={null} icon={item.value.icon} iconName={item.value.iconName} 
              iconColor={item.value.iconColor}/>
              <Text style={{color:colors.text,fontSize:17}}>{item.value.todo}</Text>
            </Animated.View>
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
        autoscrollThreshold={10}
        />
        )
    }

 //todo modal scroll animation





  return (
    <View style={styles.container}>
        <FlatList
        data={myTrip?.days}
        renderItem={({item})=>
        <View style={styles.datesContainer}>
            <Pressable onPress={()=>{setModalVisible(true),setSelectedDate(item)}}>
                <View style={styles.datesContents}>
                    <Text style={[styles.datesText,{color:colors.text}]}>{item}</Text>
                    <Entypo name="add-to-list" size={24} color={colors.text} />
                </View>
                </Pressable>
            <RenderTodo date={item}/>
        </View>
        }
        keyExtractor={(item)=>item}
        />
        <Modal visible={modalVisible} presentationStyle='formSheet' animationType='slide'>
            <TodoModal 
            tripKey={tripKey} 
            date={selectedDate}
            setTodoUpdate={setTodoUpdated}
            handleAnimated={handleAddTodoAnimated}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            />
        </Modal>
    </View>
  )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    datesContainer:{
        paddingVertical:20, 
    },
    datesContents:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    datesText:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10,
    },
    draggableContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginTop:10,
        padding:15,
        backgroundColor:'whitesmoke',
        borderRadius:10
    },
    swipeRightContainer:{
      justifyContent:'flex-end',
      width:'20%',

    },
    swipeRightIcon:{
      padding:15,
      borderRadius:5,
      backgroundColor:'tomato',
      alignItems:'center'


    },

})