import { TripDataType } from "./Types"

export const TripStartsEnds = (trip:TripDataType)=>{
    if(trip.hoursUntilTrip < 0 && trip.hoursUntilEnd > 24 && trip.hoursUntilTrip < -24 && trip.hoursUntilEnd > 48){
      return 'Your Trip started.'
    }else if(trip.hoursUntilTrip <= 0 && trip.hoursUntilTrip > -24 ){
      return 'Your Trip Starts today.'
    }else if(trip.hoursUntilTrip < 24 && trip.hoursUntilTrip > 0){
      return 'Your Trip Starts tomorrow.'
    }else if(trip.hoursUntilTrip > 24){
      return `Your trip starts in ${trip.daysUntilTrip+1} days`
    }else if(trip.hoursUntilTrip < 0 && trip.hoursUntilEnd < 24){
      return 'Your Trip ends today.'
    }else if (trip.hoursUntilTrip < 0 && trip.hoursUntilEnd > 24 && trip.daysUntilEnd < 48){
      return'Your Trip ends tomorrow'
    }else {
      return 'Your Trip is ongoing.';
  }
}