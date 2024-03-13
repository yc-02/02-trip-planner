import { createContext } from "react";
import { MyTrips, TripData } from "./Types";


type MyThemeType={
    autoIsDark:boolean,
    setAutoIsDark:(value:boolean)=>void;
}

type MyTripsType={
    trips:MyTrips[]|undefined;
    setTrips:(newTrips: MyTrips[]|undefined)=>void;
    activeTrips:MyTrips[]|undefined;
    pastTrips:MyTrips[]|undefined
    
}

export const MyTheme = createContext<MyThemeType>({
    autoIsDark:false,
    setAutoIsDark:()=>{}
})




export const TripContext = createContext<MyTripsType>({
    trips: [],
    setTrips:()=>{},
    activeTrips:[],
    pastTrips:[]

})
