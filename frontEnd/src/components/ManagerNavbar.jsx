import React from 'react'
import useAdminStore from '../store/adminStore'
import useManagerStore from '../store/managerStore'

function ManagerNavbar() {
  const logOutManager = useManagerStore((state)=>state.logOutManager)
  const logout=()=>{
    logOutManager()
  }
  return (
    <div>
       <nav className='w-full h-16 flex  items-center justify-between px-4 md:px-6 bg-slate-950 text-white'>
        <div className='text-2xl text-teal-400 font-bold'>Product Management App</div>

        <ul className='md:flex hidden gap-6 text-lg text-teal-400 font-semibold'>
            <li><a href="/home">Home</a></li>
            <li><a href="/managerDashBoard"> Product</a></li>
            
            


        </ul>
        <div>
            <button onClick={logout} className='bg-teal-400 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-teal-300 hover:shadow-lg transition duration-300'><a href="/login">LogOut</a></button>
        </div>
       </nav>
    </div>
  )
}

export default ManagerNavbar