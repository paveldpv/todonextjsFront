import React, { useReducer, useState } from 'react'
import axios from 'axios'
import {validaterEmail} from './../../function/validaterEmail'

type Props = {}

export default function auth({}: Props) {

  

  const [email, setEmail] = useState<string>(``)
  const [password, setPassword] = useState<string>(``)
  const [error, setError] = useState<boolean>(false)
  const [registrateMessage, setRegistrateMessage] = useState(`TO DO`)


  const registrate = async(e:React.MouseEvent)=>{
    e.preventDefault() 
    if(validaterEmail(email)){
       let res = await axios.post(`http://localhost:3200/registrate`,{email,password})              
       setRegistrateMessage(res.data)
       setTimeout(() => {
        setRegistrateMessage(`TO DO`)
        setEmail(``)
        setPassword(``)
       }, 1000);
    }
    else{
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 1000);
    }

  }
  const auth = async (e:React.MouseEvent)=>{
    e.preventDefault()    
    try {
        if(validaterEmail(email)){
          let res = await axios.post(`http://localhost:3200/auth`,{email,password})
          console.log(res.data);          
        }
        else{
          setError(true)
          setTimeout(() => {
            setError(false)
          }, 1000);
        }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className=' w-2/3  mx-auto text-4xl p-8 border-2 rounded-md border-gray-500 border-solid my-28'>
      <div className=' text-center text-5xl p-4 font-bolder'>
        {registrateMessage}
      </div>
        <hr />
      <form className=' flex flex-col'>
        <input type="text" placeholder='email' value={email}
        className={`${error&& "bg-red-400"} my-4 p-6 rounded-md`}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}/>
        <hr />
        <input type="password" placeholder='password' value={password}
        className=' my-4 p-6 rounded-sm'
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
        <button className='w-full bg-green-400 p-5 text-4xl font-bold rounded-md hover:bg-green-500'
        onClick={(e:React.MouseEvent<Element, MouseEvent>)=>registrate(e)}>
          Registrate
        </button>
        <button className='w-full bg-blue-400 p-5 text-4xl font-bold my-4 rounded-md hover:bg-blue-500'
        onClick={(e:React.MouseEvent<Element, MouseEvent>)=>auth(e)}>
          Login
        </button>
      </form>
    </div>
  )
}