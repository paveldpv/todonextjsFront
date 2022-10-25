import React, { useState } from 'react'
import $api from '../config/axios'
import { propsToDo } from './ListTodo'

interface Props extends propsToDo {
   index:number,
   day:{day:string,tasks:{task:string,id:string}[],number:number},
   task:{
      task:string,
      id:string      
   }
   
}

export default function ListTask({
   task,index,
   dragEndHeandler,
   dragOverHeandler,
   dragLeaveHeandler,
   onDrop,day,
   removeTaksWeek}: Props) {

   const [currentTask,setCurrentTask]=useState(task.task)
   
   const redactTask=async(id:string,text:string,day:{day:string,tasks:{task:string,id:string}[],number:number})=>{
      let redactMessage = {
         id,text,
         numberday:day.number,
         email:window.location.href.split('/').pop()
      }          
     let response= await $api.post('settood/redact',redactMessage)
     if(!response){
      setCurrentTask(task.task)
     }     
      
   }
   
  return (
   <div  key={index}
   onDragLeave={(e)=>dragLeaveHeandler(e)}
   onDragOver={(e)=>dragOverHeandler(e)}
   onDrop={(e)=>onDrop(e,day)}
   onDragEnd={(e)=>dragEndHeandler(e)}
   className=' h-14 text-xl border-solid border-2 border-blue-500 m-2 rounded-sm '>                            
       <div className='flex justify-between p-2'>                                
           <input type="text" value={currentTask} className=" outline-none " 
           onChange={(e)=>setCurrentTask(e.target.value)}
           onBlur={()=>redactTask(task.id,currentTask,day)}/>
           {task.task&&<span
           onClick={()=>removeTaksWeek(task.id,day.number)}
           className=' cursor-pointer p-1 border-solid border-blue-500 border-2 '
           >&#10008;</span>}                                 
       </div>
       </div>
  )
}