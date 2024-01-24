import React from 'react';
import logo from "../../assets/logo.png";
import google from "../../assets/googleSvg.svg";
import apple from "../../assets/apple-logo.svg";
import { Link } from 'react-router-dom';
import './signup.css'

function Signup() {
  return (
     <div className="authuser">
      <span className="purple_bg"></span>
      <div className="authuserLogo">
        <img src={logo} alt="logo-img" />
        <h3>Invoice-Box</h3>
      </div>
      <div className="authuser_auth">
        <form className="authuser_auth_box" method="post">
          <h3>Create account</h3>

          <div>
            <div>
              <label for="username">Email address:</label>
            </div>
            <input type="email" id="email" name="email" required />
          </div>

          <div>
            <div>
              <label for="username">Password:</label>
            </div>

            <input type="password" id="password" name="password" required />
          </div>

          <div>
            <div>
              <label for="username"> re-enter Password:</label>
            </div>

            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit">create account</button>
          <div className="auth_create-acct">
            <Link to={-1}>
            <p>Login your account in seconds</p>

            </Link>
          </div>
        </form>
        <div className="auth_apps">

           <div className="auth_apps_google">
                 <img src={google} alt="google_logo"/>
                 <div>sign up with google</div>
           </div>

           <div className="auth_apps_apple">
           <img src={apple} alt="google_logo"/>
           <div>sign up with apple</div>      
           </div>
        </div>
      </div>
    </div>
    
  )
}

export default Signup
