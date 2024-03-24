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
    todoTitle:string
    todoLocation:string
    todoTime:string
    tripKey:string
    icon:number
    iconName:string
    iconColor:string
};

export type TodosType={
  key:string
  value:TodoDataType
}

export type TodoInputType={
  title:string,
  location:string,
  time:string
}

export type InputVisibleStateType = {
  inputTitleVisible: boolean[];
  inputTimeVisible: boolean[];
  inputLocationVisible: boolean[];
}

type InputTitleVisible={type:'inputTitleVisible',payload:{index:number}}
type InputTimeVisible = {type:'inputTimeVisible', payload:{index:number}}
type InputLocationVisible={type:'inputLocationVisible',payload:{index:number}}
type Reset={type:'reset'}
export type InputVisibleActionType= InputTitleVisible|InputTimeVisible|InputLocationVisible|Reset


export type InputUpdateSateType={
  updatedTitle: string[];
  updatedTime: string[];
  updatedLocation: string[];

}
type UpdateTitleAction={type:'updateTitle',payload:{index:number,nextTitle:string}}
type UpdateTimeAction={type:'updateTime',payload:{index:number,nextTime:string}}
type UpdateLocationAction={type:'updateLocation',payload:{index:number,nextLocation:string}}
type UpdateAction={type:'update'}
export type InputUpdatedActionType = UpdateTitleAction|UpdateTimeAction|UpdateLocationAction|UpdateAction
