import React from 'react';
import { Link } from 'react-router-dom';
import "../stylesheets/Navbar.css";

const Navbar = () => {
  return (
    <nav className='flex flex-col justify-around items-center text-white h-[6vh] bg-slate-950 border-b-[1px] border-emerald-800 sm:flex-row'>
      <div className="logo text-xl hidden sm:block">Pass<span className='font-extrabold text-emerald-700'>FGT</span></div>
      <ul className='flex flex-row gap-5 sm:gap-10 lg:gap-15 justify-around items-center'>

        <li className='navlinks'>
          <Link to="/">Home</Link>
        </li>

        <li className='navlinks'>
          <Link to="/passwords">Passwords</Link>
        </li>

        <li className='navlinks'>
          <Link to="/about">About</Link>
        </li>

        <li className='flex items-center justify-center bg-emerald-800 py-[5px] px-[20px] transition-colors duration-200 ease-in-out rounded-2xl hover:text-emerald-400'>
          <Link to="/login">Login</Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
