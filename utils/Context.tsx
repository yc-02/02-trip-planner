import { createContext } from "react";
import { TodosType, TripsType } from "./Types";


type MyThemeType={
    autoIsDark:boolean,
    setAutoIsDark:(value:boolean)=>void;
}

type MyTripsType={
    trips:TripsType[]|undefined;
    setTrips:(newTrips: TripsType[]|undefined)=>void;
    activeTrips:TripsType[]|undefined;
    pastTrips:TripsType[]|undefined
    todoList:TodosType[]|undefined
    setTodoList:(newTodo: TodosType[]|undefined)=>void;
    sortedTodos:TodosType[]|undefined
}

export const MyTheme = createContext<MyThemeType>({
    autoIsDark:false,
    setAutoIsDark:()=>{}
})




export const TripContext = createContext<MyTripsType>({
    trips: [],
    setTrips:()=>{},
    activeTrips:[],
    pastTrips:[],
    todoList:[],
    setTodoList:()=>{},
    sortedTodos:[]


})
