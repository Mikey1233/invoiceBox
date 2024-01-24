import React from 'react';
import google from "../../assets/googleSvg.svg";
import apple from "../../assets/apple-logo.svg";
import { Link } from 'react-router-dom';
// import './signup.css'
import '../cssForAuthPage.css'

function Signup() {
  return (
     <div>
      



      <div className="authuser_auth">
        <form className="authuser_auth_box" method="post">
          <h3>Create account</h3>

          <div>
            <div>
              <label htmlFor='email'>Email address:</label>
            </div>
            <input type="email" id='email' name="email" required autocomplete="email"/>
          </div>

          <div>
            <div>
              <label htmlFor='password'>Password:</label>
            </div>

            <input type="password" id='password' name="password" required />
          </div>

          <div>
            <div>
              <label htmlFor="username"> re-enter Password:</label>
            </div>

            <input type="password" id='username' name="password" required />
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
