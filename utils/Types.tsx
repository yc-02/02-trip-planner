import dayjs from 'dayjs';

type DateType = dayjs.Dayjs | undefined | null | string | number| Date


export type DateRangeType = {
  startDate: DateType
  endDate: DateType
}

export type TripDataType = {
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

export type TripsType = {
    key: string;
    value: TripDataType;
  }

export type TodoDataType= {
    date:string
    todo: any
    tripKey:string
    icon:number
    iconName:string
    iconColor:string
};

export type TodosType={
  key:string
  value:TodoDataType
}