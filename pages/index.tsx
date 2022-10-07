import type { NextPage } from 'next'
import Link from 'next/link'
import axios from 'axios'

const Home: NextPage = () => {
  

  return (
    <div className=' flex flex-col fixed w-full h-full overflow-hidden ' >
      <div className=' w-1/4 h-1/4 border-2 border-solid border-black mx-auto my-auto p-12 rounded-md'>
        <span className='text-center text-5xl p-4 font-bolder block '>
          App "TO DO"
        </span>        
      
        <Link href="/home/auth">
          <button className=' bg-green-400 text-center p-5 text-4xl font-bold rounded-md hover:bg-green-500 w-full'>
            Come
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
