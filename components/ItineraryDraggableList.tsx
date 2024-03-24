import { Ionicons } from "@expo/vector-icons"
import { useReducer, useState } from "react"
import { Pressable, View, Text, StyleSheet,TextInput } from "react-native"
import { NestableDraggableFlatList, ScaleDecorator } from "react-native-draggable-flatlist"
import { Swipeable } from "react-native-gesture-handler"
import { ActivityIcons } from "../utils/ActivityIcons"
import { useTheme } from "@react-navigation/native"
import { 
  InputUpdateSateType, 
  InputUpdatedActionType, 
  InputVisibleActionType, 
  InputVisibleStateType, 
  TodoDataType, TodosType } from "../utils/Types"
import { storeTodo } from "../utils/Storage"
import { 
  LocationsAreNotEqual, 
  TimesAreNotEqual, 
  titlesAreNotEqual } from "../utils/UpdateItinerayWithoutFlicker"



export function ItineraryDraggableList ({
   filteredTodos,handleDragEnd,rightSwipeActions,handleUpdateTodoData}:{
        filteredTodos:TodosType[] | undefined
        handleDragEnd: (data: TodosType[]) => void
        handleUpdateTodoData: () => void
        rightSwipeActions:(todoKey: string) => React.JSX.Element
    }){
      
    const {colors} = useTheme()
    const [draggableData, setDraggableData] = useState<TodosType[]|undefined>(filteredTodos)
    if(draggableData?.length!==filteredTodos?.length){
      setDraggableData(filteredTodos)
    }


//toggle input visible
    const inputVisibleInitialState:InputVisibleStateType={
      inputTitleVisible: Array(draggableData?.length).fill(false),
      inputTimeVisible: Array(draggableData?.length).fill(false),
      inputLocationVisible:Array(draggableData?.length).fill(false)
    } 
  
    function inputVisibleReducer(state:InputVisibleStateType,action:InputVisibleActionType){
      switch(action.type){
        case'inputTitleVisible':{
          const newInputTitleVisible = [...state.inputTitleVisible];
          const {index} = action.payload;
          newInputTitleVisible[index] = true;
            return{ 
              ...state, 
              inputTitleVisible: newInputTitleVisible }
        }
        case'inputTimeVisible':{
          const newInputTimeVisible=[...state.inputTimeVisible];
          const {index}=action.payload
          newInputTimeVisible[index]=true
          return{
            ...state,
            inputTimeVisible:newInputTimeVisible
          }
        }
        case'inputLocationVisible':{
          const newInputLocationVisible=[...state.inputLocationVisible];
          const {index}=action.payload
          newInputLocationVisible[index]=true
          return{
            ...state,
            inputLocationVisible:newInputLocationVisible
          }
        }
        case'reset':{
          return inputVisibleInitialState
        }
      }
    }
    const [inputVisibleState,inputVisibleDispatch]=useReducer(inputVisibleReducer,inputVisibleInitialState)

    const handleTitleInputVisible = (index:number)=>{
      inputVisibleDispatch({type:'inputTitleVisible',payload:{index:index}})
      setDraggableData(filteredTodos)
    }
    const handleTimeInputVisible = (index:number)=>{
      inputVisibleDispatch({type:'inputTimeVisible',payload:{index:index}})
      setDraggableData(filteredTodos)
    }
    const handleLocationInputVisible=(index:number)=>{
      inputVisibleDispatch({type:'inputLocationVisible',payload:{index:index}})
      setDraggableData(filteredTodos)
    }

//edit todos value
    const updatedTitleArray = draggableData?draggableData?.map(t => t.value.todoTitle):[];
    const updatedTimeArray = draggableData?draggableData?.map(t => t.value.todoTime):[]
    const updatedLocationArray =draggableData?draggableData?.map(t => t.value.todoLocation):[]
    const inputUpdateInitialState={
      updatedTitle:updatedTitleArray,
      updatedTime:updatedTimeArray,
      updatedLocation:updatedLocationArray
    }


    function inputUpdateReducer(state:InputUpdateSateType,action:InputUpdatedActionType){
      switch(action.type){
        case'updateTitle':{
          const newUpdatedTitle=[...state.updatedTitle]
          const {index,nextTitle} = action.payload
          newUpdatedTitle[index]=nextTitle
          return{
            ...state,
            updatedTitle:newUpdatedTitle
          }
        }
        case'updateTime':{
          const newUpdatedTime=[...state.updatedTime]
          const{index,nextTime}=action.payload
          newUpdatedTime[index]=nextTime
          return{
            ...state,
            updatedTime:newUpdatedTime
          }
        }
        case'updateLocation':{
          const newUpdatedLocation=[...state.updatedLocation]
          const{index,nextLocation}=action.payload
          newUpdatedLocation[index]=nextLocation
          return{
            ...state,
            updatedLocation:newUpdatedLocation
          }
        }
        case'update':{
          return inputUpdateInitialState
        }
      }
    }
    const [inputUpdateState,inputUpdateDispatch]=useReducer(inputUpdateReducer,inputUpdateInitialState)

    const handleUpdateTitle=(index:number,nextTitle:string)=>{
      inputUpdateDispatch({type:'updateTitle',payload:{index:index,nextTitle:nextTitle}}) 
    }
    const handleUpdateTime=(index:number,nextTime:string)=>{
      inputUpdateDispatch({type:'updateTime',payload:{index:index,nextTime:nextTime}})
    }
    const handleUpdateLocation=(index:number,nextLocation:string)=>{
      inputUpdateDispatch({type:'updateLocation',payload:{index:index,nextLocation:nextLocation}})
    }

//update data conditionally
  if(filteredTodos && draggableData){
    if(titlesAreNotEqual(filteredTodos,draggableData,inputUpdateState)||
    TimesAreNotEqual(filteredTodos,draggableData,inputUpdateState)||
    LocationsAreNotEqual(filteredTodos,draggableData,inputUpdateState)){
      setDraggableData(filteredTodos)
    }
  }
  //update sate when date deleted or added
  if(draggableData?.length!==inputUpdateState?.updatedTitle.length){
    inputUpdateDispatch({type:'update'})
    inputVisibleDispatch({type:'reset'})
  }




    //store edited todos to storage
    const handleUpdate=(item:TodosType,index:number)=>{
      const newTitle=inputUpdateState.updatedTitle[index]
      const newTime=inputUpdateState.updatedTime[index]
      const newLocation=inputUpdateState.updatedLocation[index]
      const updatedNewTodo:TodoDataType={
        date:item.value.date,
        todoTitle:newTitle,
        todoTime:newTime,
        todoLocation:newLocation,
        tripKey:item.value.tripKey,
        icon:item.value.icon,
        iconName:item.value.iconName,
        iconColor:item.value.iconColor
      }
      storeTodo(item.key,updatedNewTodo)
      inputVisibleDispatch({type:'reset'})
      handleUpdateTodoData()
    }

    //change background onlongpress
    const [longPressed,setLongPressed]=useState<boolean[]>(Array(draggableData?.length).fill(false))
    const handleLongPress = (drag: () => void, index: number) => {
      drag(); // Call the drag function
      setLongPressed(prevState => {
        const updatedLongPressed = [...prevState]
        updatedLongPressed[index] = true
        return updatedLongPressed
      });
    };




//render draggable swipeable list
    const renderItem = ({item,drag,isActive,getIndex}:{
      item:TodosType;
      drag:() => void;
      isActive: boolean;
      getIndex: () => number|undefined
    })=>{
  
      const initialIndex = getIndex()
      const index = initialIndex!==undefined ? initialIndex:0
      return(
        <ScaleDecorator>
        <Swipeable renderRightActions={()=>rightSwipeActions(item.key)}>
        <View style={[
          styles.draggableContainer,
          {borderColor:colors.border,
          backgroundColor:longPressed[index]?colors.border:colors.card
        }
          ]}>
        <Pressable style={styles.draggableItems} 
        onLongPress={()=>handleLongPress(drag,index)} 
        disabled={isActive}
        onPress={()=>{handleTitleInputVisible(index)}}
        >
          <ActivityIcons name={null} 
              icon={item.value.icon} 
              iconName={item.value.iconName} 
              iconColor={item.value.iconColor}/>
            {inputVisibleState.inputTitleVisible[index]?
            <TextInput style={[styles.titleInput,{color:colors.text}]}
            editable
            onSubmitEditing={()=>handleUpdate(item,index)}
            defaultValue={item.value.todoTitle}
            value={inputUpdateState.updatedTitle[index]}
            onChangeText={(e)=>{handleUpdateTitle(index,e)}}
            blurOnSubmit={true}
            multiline={true}
            autoFocus={true}
            />
            :
            <Text style={[styles.titleText,{color:colors.text}]}>{inputUpdateState.updatedTitle[index]}</Text>
            }
        </Pressable>
        <Pressable style={styles.draggableItems} 
        onLongPress={()=>handleLongPress(drag,index)} 
        disabled={isActive}
        onPress={()=>handleTimeInputVisible(index)}
        >
          <Ionicons name="time" size={24} color='#525252'/>
            {inputVisibleState.inputTimeVisible[index]?
            <TextInput style={styles.input}
            onSubmitEditing={()=>handleUpdate(item,index)}
            defaultValue={item.value.todoTime}
            value={inputUpdateState.updatedTime[index]}
            onChangeText={(e)=>{handleUpdateTime(index,e)}}
            blurOnSubmit={true}
            multiline={true}
            autoFocus={true}
            />:
            <Text style={styles.text}>{inputUpdateState.updatedTime[index]}</Text>
              }
        </Pressable>
        <Pressable style={styles.draggableItems}
       onLongPress={()=>handleLongPress(drag,index)} 
        disabled={isActive}
        onPress={()=>handleLocationInputVisible(index)}
        >
          <Ionicons name="location-sharp" size={24} color='#525252' />
            {inputVisibleState.inputLocationVisible[index]?
            <TextInput style={styles.input}
            onSubmitEditing={()=>handleUpdate(item,index)}
            defaultValue={item.value.todoLocation}
            value={inputUpdateState.updatedLocation[index]}
            onChangeText={(e:string)=>{handleUpdateLocation(index,e)}}
            blurOnSubmit={true}
            multiline={true}
            autoFocus={true}
            />:
            <Text style={styles.text}>{inputUpdateState.updatedLocation[index]}</Text> 
            }
        </Pressable>
          </View>
         </Swipeable>
         </ScaleDecorator>
      )
    }

  
    return(
    <NestableDraggableFlatList
    data={draggableData!==undefined?draggableData:[]}
    renderItem={({item,drag,isActive,getIndex})=>renderItem({item,drag,isActive,getIndex})}
    onDragEnd={({ data }:{data:TodosType[]}) => {
        handleDragEnd(data)
        setDraggableData(data)
        inputUpdateDispatch({type:'update'})
        inputVisibleDispatch({type:'reset'})
        setLongPressed(Array(data.length).fill(false))
    }}
    keyExtractor={(item)=>item.key}
    />
    )
}

const styles= StyleSheet.create({
    draggableContainer:{
        paddingHorizontal:20,
        borderBottomWidth:1,
        gap:10,
        paddingVertical:10,
        justifyContent:'flex-start',
    },
    draggableItems:{
      flexDirection:'row',
      alignItems:'center',
      gap:10,
      justifyContent:'flex-start'
    },
    titleText:{
      fontSize:18,
      fontWeight:'500',
      maxWidth:'90%',
      padding:5,
    },
    titleInput:{
      fontSize:18,
      fontWeight:'500',
      maxWidth:'90%',
      padding:5,
    },
    text:{
      fontSize:15,
      maxWidth:'90%',
      color:'#525252',
      padding:5,
    },
    input:{
      fontSize:15,
      maxWidth:'90%',
      color:'#525252',
      padding:5,
    }
})