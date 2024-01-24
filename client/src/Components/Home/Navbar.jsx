import React from 'react'
import logo from '../../assets/logo.png'
import './navbar.css'


function Navbar() {
  return (
    <div className='navbar'>
        <div className="logo">
            <img src={logo} alt=''/>
        </div>
        <div className="register-login-btns">
            <button className='sign-in'>Sign in</button>
            <button className='get-started'>Get started</button>
        </div>
    </div>
    
  )
}

export default Navbar