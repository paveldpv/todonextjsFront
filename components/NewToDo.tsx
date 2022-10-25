import React from 'react'
import uniqid from 'uniqid'
import { useState} from 'react'

interface propsNewTodo{
    toDos:{task:string,id:string}[];
    setToDos:React.Dispatch<React.SetStateAction<{task:string,id:string}[]>>
    dragStartHeandler:(e:React.MouseEvent,task:{task:string,id:string})=>void
}

export default function NewToDo({ toDos, setToDos, dragStartHeandler }:propsNewTodo) {
   
    const [todo,setTodo]=useState(``)
    const pushToDo = () => {
        todo.length != 0 && setToDos(state => [...state, {task:todo,id:uniqid()}])
       setTodo(``)
    }

    const removeTask = (id:any) => {
        setToDos(state => state.filter(task => task.id !== id))
    }

    return (
        <div>
            <input className=' w-full p-2 text-xl m-2 border-solid border-black border-2 rounded-sm'
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
                type="text"
                placeholder='DO IT' />
            <button className=' text-2xl w-96 font-bold my-3 mx-auto text-center rounded-xl text-white  bg-blue-500 p-4 block'
                onClick={pushToDo}>
                ADD TASK
            </button>
            <hr />
            <div className=' text-4xl font-bold text-center py-3 text-blue-500'>
                {toDos.length === 0 && `Tasks are missing`}
            </div>
            <div className='flex flex-wrap justify-center gap-6'>
                {toDos.map((todo) => {
                    return <div draggable={true}
                        onDragStart={(e) => dragStartHeandler(e, todo)}                        
                        className=' flex justify-between w-96 p-4 text-center text-xl border-2 border-solid border-blue-400 rounded-sm cursor-move'
                        key={todo.id}>
                        <span className=' font-bold text-ellipsis overflow-hidden hover:break-all p-2'>
                            {todo.task}
                        </span>
                        <span
                            className='  border-solid border-2 border-black p-2 cursor-pointer '
                            onClick={() => removeTask(todo.id)}>
                            &#10008;
                        </span>
                    </div>
                })}
            </div>
        </div>
    )
}
