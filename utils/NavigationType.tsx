import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TripData } from './Types';



export type RootTabParamList = {
  Home:undefined
  Add:undefined
  Search:NavigatorScreenParams<SearchStackParamList>
  AccountNav:undefined

}

export type RootProps = BottomTabScreenProps<RootTabParamList>;
export type AddScreenNavigationProps = BottomTabScreenProps<RootTabParamList,'Add'>

export type SearchStackParamList ={
    Trips:{newTripAdded:boolean}
    TripSingle:{key:string,title:string}
    Itinerary:{myTrip:TripData|undefined,key:string}
  }

export type TripSingleProps = NativeStackScreenProps<SearchStackParamList,'TripSingle','Trips'>
export type TripProps = NativeStackScreenProps<SearchStackParamList,'Trips'>
export type ItineraryProps = NativeStackScreenProps<SearchStackParamList,'Itinerary'>

