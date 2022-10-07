import { useState } from "react"
import React from 'react'
import NewToDo from '../../components/NewToDo'
import ListToDo from '../../components/ListTodo'

interface dayTasks{
   day:string,
   tasks:[string],
   number:number
}

type Props = {}

export default function ({}: Props) {
   const [toDos, setToDos] = useState([])    
    const [currentTask, setCurrentTask] = useState(null)
    const [tasksWeek, setTasksWeek] = useState([
        {day:`Monday`,tasks:[{task:``,id:``}],number:0},
        {day:`Tuesday`,tasks:[{task:``,id:``}],number:1},
        {day:`Wednesday`,tasks:[{task:``,id:``}],number:2},
        {day:`Thursday`,tasks:[{task:``,id:``}],number:3},
        {day:`Friday`,tasks:[{task:``,id:``}],number:4},
        {day:`Saturday`,tasks:[{task:``,id:``}],number:5},
        {day:`Sunday`,tasks:[{task:``,id:``}],number:6}
    ])
     ///===drop====//
     const dragStartHeandler =(e:React.MouseEvent,task:any)=>{   
        setCurrentTask(task)
     }
     const dragLeaveHeandler =(e:any)=>{
       
        e.target.style.background=`white`
     }
     const dragOverHeandler =(e:any)=>{        
        e.preventDefault()
        e.target.style.background=`#3b82f6`
     }  
     const dragEndHeandler =(e:any)=>{        
        e.target.style.background=`white`
     }  
     const dropHeandler =(e:any,day:any)=>{
        e.preventDefault()        
        let curentDay=day.day
        setTasksWeek(tasksWeek.map(el=>{
            if(el.day===curentDay&&currentTask){                
               return {...el,tasks:[...el.tasks,currentTask]}
            }
            return el
        }))         
        setToDos(state=>state.filter(todo=>todo!=currentTask))  
        setCurrentTask(null)  
        e.target.style.background=`white`
     }
     ///===drop====//

     const removeTaksWeek=(id:string,numberDay:number)=>{       
       
        let removeTask = tasksWeek[numberDay].tasks.filter(task=>task.id!=id)  
         setTasksWeek(prev=>prev.map((objWeek,index)=>{           
           if(index==numberDay){
            return {...objWeek,tasks:removeTask}
           }
           else {
            return objWeek
           }           
         }))
                
     }



    return (
        <div >
            <NewToDo toDos={toDos} setToDos={setToDos} dragStartHeandler={dragStartHeandler} />
            <div className=' h-1 bg-black block w-full my-4' ></div>
            <ListToDo 
            dragLeaveHeandler = {dragLeaveHeandler}
            dragOverHeandler  = {dragOverHeandler}
            dragEndHeandler   = {dragEndHeandler}
            onDrop            = {dropHeandler}
            tasksWeek         = {tasksWeek}
            removeTaksWeek    = {removeTaksWeek}/>
            
        </div>
    )
}

