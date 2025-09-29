import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import useUsersStore from '../store/usersStore'

function Navbar() {
  const [userRole,setUserRole] = useState("")
  const logOutUser = useUsersStore((state)=>state.logOutUser)
  const userDetail = useUsersStore((state)=>state.userDetail)
  
  const navigate =useNavigate()
  useEffect(() => {
  if (userDetail) {
    console.log("the user DEtal ", userDetail);
    setUserRole(userDetail.role);
  } else {
    setUserRole(""); // or null if you prefer
  }
}, [userDetail]);

  
  const logout= async()=>{
   await logOutUser()
  }
  return (
    <div>
       <nav className='w-full h-16 flex  items-center justify-between px-4 md:px-6 bg-slate-800 text-white rounded-xl'>
        <div className='text-2xl text-teal-400 font-bold'>Product Management App</div>

        <ul className='md:flex hidden gap-6 text-lg text-teal-400 font-semibold'>
            <li><a href="/home">Home</a></li>
            <li><a href="/products"> Product</a></li>
           {userRole === 'admin'?
            <li><a href="/addProduct">Add Product</a></li>:
            null}
            


        </ul>
        <div>
            <button onClick={logout} className='bg-teal-400 text-slate-950 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 hover:shadow-lg transition duration-300'>LogOut</button>
        </div>
       </nav>
    </div>
  )
}

export default Navbar