import React from 'react'
import { useState } from 'react'

interface prorpsToDo{
   dragLeaveHeandler: (e:any)=>void,
   dragOverHeandler : (e:any)=>void,
   onDrop           : (e:any,day:any)=>void,
   dragEndHeandler  : (e:any)=>void,
   tasksWeek        : {day:string,tasks:{task:string,id:string}[],number:number}[],
   removeTaksWeek   : (id:string,numberDay:number)=>void
}


export default function ToDoList({dragLeaveHeandler,dragOverHeandler,onDrop,dragEndHeandler,tasksWeek,removeTaksWeek}:prorpsToDo) {
    
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
                        return (
                            <div draggable={true} key={index}
                         onDragLeave={(e)=>dragLeaveHeandler(e)}
                         onDragOver={(e)=>dragOverHeandler(e)}
                         onDrop={(e)=>onDrop(e,day)}
                         onDragEnd={(e)=>dragEndHeandler(e)}
                         className=' h-14 text-xl border-solid border-2 border-blue-500 m-2 rounded-sm cursor-move'>                            
                             <div className='flex justify-between p-2'>
                                 <span className='text-ellipsis overflow-hidden'>
                                    {task.task}
                                 </span>                                 
                                 {task.task&&<span
                                 onClick={()=>removeTaksWeek(task.id,day.number)}
                                 className=' cursor-pointer p-1 border-solid border-blue-500 border-2 '
                                 >&#10008;</span>}                                 
                             </div>
                             </div>
                        )
                    })}
                </div>
            )
            })}
        </div>
    )
}
