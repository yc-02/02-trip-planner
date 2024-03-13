import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { ItineraryProps } from '../../utils/NavigationType'
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { storeData, storeTodo } from '../../utils/Storage';



type TodoType= {
        date:string,
        title: any;
        id: string;
    };

export default function Itinerary({route}:ItineraryProps) {
    const {myTrip}=route.params
    const [todo,setTodo]=useState(Array(myTrip?.days.length))
    const [todoList,setTodoList] = useState<TodoType[]>([])

console.log('todo',todo)


    const handleTodoChange = (index:number, value:string) => {
        const newTodo= [...todo];
        newTodo[index] = value;
        setTodo(newTodo);
      };


    const handleAdd=(index:number)=>{
        const days=myTrip?.days
        if (days){
            const newList={
                date:days[index],
                title:todo[index],
                id:Date.now().toString()
            }
            setTodoList(prev=>[...prev,newList])

        }
    }

console.log('this is todo list',todoList)

  return (
    <View style={styles.container}>
        <FlatList
        data={myTrip?.days}
        renderItem={({item,index})=>(
            <View style={styles.datesContainer}>
                <View>
                    <View style={styles.datesContents}>
                        <Text>{item}</Text>
                        <Pressable>
                            <Entypo name="add-to-list" size={24} color="black" />
                        </Pressable>
                    </View>
            
                    </View>
                <View>
                <TextInput
                style={styles.input}
                placeholder='add'
                value={todo[index]}
                onChangeText={(value)=>handleTodoChange(index,value)}
                />
                <Button title='add' onPress={()=>handleAdd(index)}/>
                </View>
            </View>
        )}
        keyExtractor={(item)=>item}
        />

    </View>
  )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    datesContainer:{

    },
    datesContents:{
        padding:20,
        borderWidth:2,
        borderColor:'#ccc',
        borderRadius:10,    
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10,
    },
    input:{
        borderWidth:2,
        padding:10,
        fontSize:18,
        borderColor:'#ccc',
        borderRadius:10
    }
})