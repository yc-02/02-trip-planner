import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TripDataType } from './Types';



export type RootTabParamList = {
  Home:undefined
  Add:undefined
  Search:NavigatorScreenParams<SearchStackParamList>
  AccountNav:undefined

}

export type RootProps = BottomTabScreenProps<RootTabParamList>;
export type AddScreenNavigationProps = BottomTabScreenProps<RootTabParamList,'Add'>

export type SearchStackParamList ={
    Trips:{tripUpdated:boolean}
    TripSingle:{key:string,title:string,singleTrip:TripDataType}
    Itinerary:{myTrip:TripDataType|undefined,key:string}
    ItineraryDetails:{todoUpdated:boolean,todoAdded:boolean,title:string, tripKey:string}
    AddItinerary:{title:string, tripKey:string}
    ReadyMadeList:undefined
    CreateList:undefined

  }
export type TripSingleProps = NativeStackScreenProps<SearchStackParamList,'TripSingle'>
export type TripProps = NativeStackScreenProps<SearchStackParamList,'Trips'>
export type ItineraryProps = NativeStackScreenProps<SearchStackParamList,'Itinerary'>
export type ItineraryDetailsProps = NativeStackScreenProps<SearchStackParamList,'ItineraryDetails'>
export type AddItineraryProps = NativeStackScreenProps<SearchStackParamList,'AddItinerary'>
export type ReadyMadeListProps = NativeStackScreenProps<SearchStackParamList,'ReadyMadeList'>