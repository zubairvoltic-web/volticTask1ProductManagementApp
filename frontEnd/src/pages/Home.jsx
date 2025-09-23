
import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className=' bg-slate-950'>
        
       <Navbar/>
         <div className='h-[90vh] flex flex-col items-center justify-center text-white text-4xl font-bold'>
            Welcome to Product Management App
         </div>
         <div>
            <p className="text-center text-gray-400 mt-4 text-sm pb-4">
                Developed by <span className="text-teal-400 font-semibold">Voltic Emp</span>
            </p>
         </div>
       
    </div>
  )
}

export default Home