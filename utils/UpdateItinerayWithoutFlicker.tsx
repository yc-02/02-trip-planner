import { InputUpdateSateType, TodosType } from "./Types"

export function titlesAreNotEqual(filtered:TodosType[],draggable:TodosType[],inputUpdated:InputUpdateSateType){
    const sortedFiltered=filtered.map(a=>a.value.todoTitle).slice().sort()
    const sortedDraggable=draggable.map(a=>a.value.todoTitle).slice().sort()
    const sortedInputUpdated=inputUpdated.updatedTitle.slice().sort()
    
    return (
    JSON.stringify(sortedInputUpdated) === JSON.stringify(sortedFiltered) && 
    JSON.stringify(sortedInputUpdated)!==JSON.stringify(sortedDraggable)
    )
  }

export function TimesAreNotEqual(filtered:TodosType[],draggable:TodosType[],inputUpdated:InputUpdateSateType){
    const sortedFiltered=filtered.map(a=>a.value.todoTime).slice().sort()
    const sortedDraggable=draggable.map(a=>a.value.todoTime).slice().sort()
    const sortedInputUpdated=inputUpdated.updatedTime.slice().sort()
    
    return (
    JSON.stringify(sortedInputUpdated) === JSON.stringify(sortedFiltered) && 
    JSON.stringify(sortedInputUpdated)!==JSON.stringify(sortedDraggable)
    )
  }

export function LocationsAreNotEqual(filtered:TodosType[],draggable:TodosType[],inputUpdated:InputUpdateSateType){
    const sortedFiltered=filtered.map(a=>a.value.todoLocation).slice().sort()
    const sortedDraggable=draggable.map(a=>a.value.todoLocation).slice().sort()
    const sortedInputUpdated=inputUpdated.updatedLocation.slice().sort()
    
    return (
    JSON.stringify(sortedInputUpdated) === JSON.stringify(sortedFiltered) && 
    JSON.stringify(sortedInputUpdated)!==JSON.stringify(sortedDraggable)
    )
  }
