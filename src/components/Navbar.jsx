import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className='flex flex-col justify-around items-center text-white h-[6vh] bg-slate-950 border-b-[1px] border-white sm:flex-row'>
        <div className="logo text-xl hidden sm:block">Pass<span className='font-extrabold text-emerald-700'>FGT</span></div>
        <ul className='flex flex-row gap-5 sm:gap-10 lg:gap-15 justify-around'>
            <li className='navlinks'>Home</li>   
            <li className='navlinks'>Passwords</li>
            <li className='navlinks'>About</li>
        </ul>
    </nav>
  )
}

export default Navbar
