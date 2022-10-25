import React from 'react'
import { useState } from 'react'
import ListTask from './ListTask'

export interface propsToDo{
   dragLeaveHeandler: (e:any)=>void,
   dragOverHeandler : (e:any)=>void,
   onDrop           : (e:any,day:{day:string,tasks:{task:string,id:string}[],number:number})=>void,
   dragEndHeandler  : (e:any)=>void,
   tasksWeek        : {day:string,tasks:{task:string,id:string}[],number:number}[],
   removeTaksWeek   : (id:string,numberDay:number)=>void
}


export default function ToDoList({dragLeaveHeandler,dragOverHeandler,onDrop,dragEndHeandler,tasksWeek,removeTaksWeek}:propsToDo) {

    

    return (
        <div className={`flex `}>
            {tasksWeek.map((day,index)=>{ 
            return(
            <div key={index}
            className={`w-96 m-2 border-solid border-2 border-black rounded-md `}>
                    <div  className='text-2xl font-bold text-center bg-blue-500 text-white py-4'>
                        {day.day}
                    </div>
                    <hr />             
                     
                    {day.tasks.map((task,index)=>{
                        return (<ListTask task={task} index={index} key={index} 
                        removeTaksWeek={removeTaksWeek}
                        onDrop={onDrop}
                        day={day}
                        dragEndHeandler={dragEndHeandler}
                        dragLeaveHeandler={dragLeaveHeandler}
                        dragOverHeandler={dragOverHeandler} tasksWeek={[]}/>  )
                    })}
                </div>
            )
            })}
        </div>
    )
}
