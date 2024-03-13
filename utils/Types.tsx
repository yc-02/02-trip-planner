import dayjs from 'dayjs';

type DateType = dayjs.Dayjs | undefined | null | string | number| Date


export type DateRange = {
  startDate: DateType
  endDate: DateType
}

export type TripData = {
    title: string;
    startDate: string;
    endDate: string;
    duration: number;
    days:string[],
    rawStartDate:DateType
    rawEndDate:DateType
    hoursUntilTrip:number
    daysUntilTrip:number
    hoursUntilEnd:number
    daysUntilEnd:number
  }

export type MyTrips = {
    key: string;
    value: TripData;
  }

 