import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView,FlatList, Pressable, Button, Easing } from 'react-native';
import { storeTodo } from '../utils/Storage';
import { TodoDataType } from '../utils/Types';
import { Food, Indoor, Others, Outdoor, PressableActivityIcons, Transportation, Water, Winter, renderIconType,} from '../utils/ActivityIcons';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function TodoModal({
    date,tripKey,
    setTodoUpdate,
    handleAnimated,
    setModalVisible,
    modalVisible,

    }:{
    date:string,
    tripKey:string,
    setTodoUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    setModalVisible:React.Dispatch<React.SetStateAction<boolean>>,
    handleAnimated:(key: string) => void,
    modalVisible:boolean

}) {

    const [todo,setTodo]=useState('')
    const {colors}=useTheme()
    //add new todo  3/15 add color to todos
    const handleAdd = (icon:number,iconName:string,iconColor:string) => {
        const id = Date.now().toString();
        const todoKey = `Todo:${id}`
        const newTodo:TodoDataType= {
                date: date,
                todo: todo,
                tripKey:tripKey,
                icon:icon,
                iconName:iconName,
                iconColor:iconColor
            };
            storeTodo(todoKey,newTodo)
            setTodoUpdate(true)
            setModalVisible(false)
            handleAnimated(todoKey)


    }
    //display input and icon
    const [showInput,setShowInput]=useState(false)
    const [selectIcon,setSelectIcon]=useState<{ iconName: any, icon: number,iconColor:string}>({ iconName:'', icon:0,iconColor:'saddlebrown'})

    const handlePressIcon=(iconName:string,icon:number,iconColor:string)=>{
        setShowInput(true)
        setSelectIcon({iconName,icon,iconColor})
    }


    //render icons
    const renderItem=({item}:{item:renderIconType})=>{
        return(
        <View style={[styles.iconItem]}>
         <PressableActivityIcons 
            name={item.name} 
            iconName={item.iconName} 
            icon={item.icon} 
            iconColor={item.iconColor}
            handlePressIcon={handlePressIcon} />
        </View>
        )}

    const separator =()=>{
        return(
            <View style={{marginRight:5}}/>
        )
    }


    // const flatListRef = useRef<FlatList>(null);

    // useEffect(()=>{
    //   setTimeout(()=>{
    //     flatListRef.current?.scrollToOffset({ offset: 350, animated: true })
    //   },1000)
    //   setTimeout(()=>{
    //     flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
    //   },1800)
    // },[modalVisible]) 




  return (
    <View style={styles.container}>
        <Pressable style={{alignSelf:'flex-end'}} onPress={()=>setModalVisible(false)}>
        <AntDesign name="close" size={27} color="black" />
        </Pressable>
        <View style={[{flexDirection:'row',gap:20,justifyContent:'center',alignItems:'center'},]}>
        <Text style={{textTransform:'uppercase',fontWeight:'bold',fontSize:18,color:colors.text}}>activities</Text>
        <Text style={{textTransform:'uppercase',fontWeight:'500',color:colors.text}}>{date}</Text>
        </View>
        <View style={{display:showInput?'flex':'none'}}>
        <View style={styles.inputContainer}>
            <PressableActivityIcons name={null} iconName={selectIcon.iconName} 
            icon={selectIcon.icon} handlePressIcon={()=>{setShowInput(false)}} 
            iconColor={selectIcon.iconColor}/>
            <TextInput
                style={styles.input}
                placeholder='Enter your plans'
                value={todo}
                onChangeText={(e:string)=>setTodo(e)}
                onSubmitEditing={()=>handleAdd(selectIcon.icon,selectIcon.iconName,selectIcon.iconColor)}
                />
        </View>
        </View>
        <ScrollView style={[styles.iconContainer]}>
            <View>
            <FlatList
            data={Transportation}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item)=>item.iconName}
            ItemSeparatorComponent={separator}
            />
            </View>
            <View>
            <FlatList
            data={Indoor}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item)=>item.iconName}
            ItemSeparatorComponent={separator}
            />
            </View>
            <FlatList
            data={Outdoor}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item)=>item.iconName}
            ItemSeparatorComponent={separator}
            />
            <FlatList
            data={Water}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item)=>item.iconName}
            ItemSeparatorComponent={separator}
            />
            <FlatList
            data={Winter}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item)=>item.iconName}
            ItemSeparatorComponent={separator}
            /> 
            <FlatList
            data={Food}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item)=>item.iconName}
            ItemSeparatorComponent={separator}
            /> 
            <FlatList
            data={Others}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={(item)=>item.iconName}
            ItemSeparatorComponent={separator}
            /> 
        </ScrollView>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        gap:20
    },
    iconContainer:{
  
    },
    iconItem:{
        width:95,
        height:80,
        justifyContent:"center",
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'flex-end',
        gap:20,
    },
    input:{
        borderBottomWidth:1,
        fontSize:18,
        borderColor:'gainsboro',
        width:'80%',
        padding:10,
    }
})