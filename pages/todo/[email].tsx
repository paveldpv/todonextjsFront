import { useEffect, useState } from "react"
import $api from "../../config/axios"
import Head from "next/head"
import { initialDay } from "../../config/config"
import { useRouter } from "next/router"
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
       
    const [toDos, setToDos]             = useState<{task:string,id:string}[]>([])
    const [currentTask, setCurrentTask] = useState(null)
    const [tasksWeek, setTasksWeek]     = useState(initialDay)

      useEffect(()=>{
         const  initalTodo =async()=>{
            const email = window.location.href.split('/').pop()     
            let res= await $api.post(`todos`,{email:email})
            setTasksWeek(res.data)
         }
         initalTodo()
      },[])
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
     const dropHeandler =async(e:any,day:{day:string,tasks:{task:string,id:string}[],number:number})=>{
        e.preventDefault() 
               
        try {
         const email = window.location.href.split('/').pop()   
         let result  = await $api.post(`/settodo/add`,{numberDay:day.number,task:currentTask,email:email})
         if(result.data.success){
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
         else{
            alert(`error`)
         }         
        } catch (error) {   
         console.log(error);              
        }        
     }
     ///===drop====//
     
     const removeTaksWeek= async(id:string,numberDay:number)=>{      
        const email = window.location.href.split('/').pop()  
        try {
         let result = await $api.post(`settodo/remove`,{id,numberDay,email})
         if(result.data.success){
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
          else{
               alert(`error`)
            }
        } catch (error) {
         console.log(error);
         
        }
        
                
     }
     


    return (
        <div >
            <Head>
               <title>TO DO</title>
            </Head>
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

