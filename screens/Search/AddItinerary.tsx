import { useLayoutEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { TodoDataType, TodoInputType} from '../../utils/Types';
import { storeTodo } from '../../utils/Storage';
import { AddItineraryProps } from '../../utils/NavigationType';
import { PressableActivityIcons } from '../../utils/ActivityIcons';
import TodoIconsModal from '../../components/TodoIconsModal';


type SelectedIconType={
    iconName: string, 
    icon: number,
    iconColor:string
}

export default function AddItinerary({navigation,route}:AddItineraryProps) {
    const {title,tripKey}=route.params
    const {colors}=useTheme()


    useLayoutEffect(()=>{
        navigation.setOptions({headerTitle:()=>(
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}> add activities</Text>
            <Text style={styles.subTitleText}>{title}</Text>
        </View>
        )
        })
    })

    const [todo,setTodo]=useState<TodoInputType>({
        title: '',
        location: '',
        time: '',
    })


    const [selectedIcon,setSelectedIcon]=useState<SelectedIconType>({ iconName:'cat', icon:1, iconColor:'darkmagenta'})
    
    const [iconModalVisible,setIconModalVisible]=useState<boolean>(false)
    //add new todo 
    const handleAdd = () => {
        const id = Date.now().toString();
        const todoKey = `Todo:${id}`
        const newTodo:TodoDataType= {
                date: title,
                todoTitle: todo.title,
                todoLocation:todo.location,
                todoTime:todo.time,
                tripKey:tripKey,
                icon:selectedIcon.icon,
                iconName:selectedIcon.iconName,
                iconColor:selectedIcon.iconColor
            };
            storeTodo(todoKey,newTodo)
            setTodo( {title: '',location: '',time: ''})
            navigation.navigate('ItineraryDetails',{title:title,tripKey:tripKey,todoUpdated:true,todoAdded:true})
    }


  return (
    <View style={styles.container}>
        <View style={[styles.inputContainer,{borderColor:colors.border}]}>
            <PressableActivityIcons name={null} 
            iconName={selectedIcon.iconName} 
            iconColor={selectedIcon.iconColor}
            icon={selectedIcon.icon} 
            handlePressIcon={()=>setIconModalVisible(true)}/>
            <TextInput
                style={styles.input}
                placeholder={selectedIcon.iconName==='cat'?'← Change Icon':'Enter Your Plan'}
                value={todo.title}
                onChangeText={(e:string)=>setTodo({...todo,title:e})}
                multiline={true}
                blurOnSubmit={true}
                />
        </View>
        {/* add location */}
        <View style={[styles.inputContainer,{borderColor:colors.border}]}>
        <Ionicons name="location-sharp" size={24} color='#424242' />
            <TextInput
                style={[styles.input,{borderColor:colors.border}]}
                placeholder='Somewhere'
                value={todo.location}
                onChangeText={(e:string)=>setTodo({...todo,location:e})}
                multiline={true}
                blurOnSubmit={true}
                />
        </View>
        {/* add time */}
        <View style={[styles.inputContainer,{borderColor:colors.border}]}>
            <Ionicons name="time" size={24} color='#424242'/>
            <TextInput
                style={[styles.input,{borderColor:colors.border}]}
                placeholder='8 AM / Early in the morning'
                value={todo.time}
                onChangeText={(e:string)=>setTodo({...todo,time:e})}
                multiline={true}
                blurOnSubmit={true}
                />
        </View>
        <Pressable style={styles.saveButton} onPress={handleAdd}>
            <Text style={styles.saveText}>Save</Text>
        </Pressable>
    
        <TodoIconsModal 
        setSelectedIcon={setSelectedIcon}
        iconModalVisible={iconModalVisible} 
        setIconModalVisible={setIconModalVisible}/>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20,

    },
    titleContainer:{
        flexDirection:'row',
        gap:20,
        alignItems:'center',
    },
    titleText:{
        textTransform:'uppercase',
        fontWeight:'bold',
        fontSize:16
    },
    subTitleText:{
        textTransform:'uppercase',
        fontWeight:'500',
        fontSize:14
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        paddingVertical:10,
        borderBottomWidth:2,
    },
    input:{
        fontSize:18,
        width:'90%',
        padding:5,
    },
    saveButton:{
        backgroundColor:'#424242',
        paddingVertical:10,
        paddingHorizontal:15,
        alignSelf:'center',
        borderRadius:10,
        marginTop:20,
    },
    saveText:{
        color:'white',
        fontWeight:'bold',
        fontSize:17

    }
})