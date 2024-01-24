import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from "../../assets/logo.png";
import './authLayout.css'

function AuthLayout() {
  return (
    <div className='authuser'>
      <span className="purple_bg"></span>
      <div className="authuserLogo">
        <img src={logo} alt="logo-img" />
        <h3>Invoice-Box</h3>
      </div>
      <Outlet/>
    </div>
  )
}

export default AuthLayout
