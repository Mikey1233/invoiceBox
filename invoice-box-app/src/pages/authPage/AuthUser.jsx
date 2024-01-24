import React from "react";
// import "./authUser.css";
import google from "../../assets/googleSvg.svg";
import apple from "../../assets/apple-logo.svg";
import { Link } from "react-router-dom";
import '../cssForAuthPage.css'

export default function AuthUser() {
  return (
    
     <div>
     
      <div className="authuser_auth">
        <form className="authuser_auth_box" method="post">
          <h3>Login</h3>

          <div>
            <div>
              <label htmlFor="username">Email address:</label>
            </div>
            <input type="email"  name="email" required autocomplete="email" />
          </div>

          <div>
            <div>
              <label htmlFor="username">Password:</label>
            </div>

            <input type="password"  name="password" required />
          </div>

          <button type="submit">Login</button>
          <div className="auth_create-acct">
            <Link to={'signup'}>
            <p>create your account in seconds</p>

            </Link>
          </div>
        </form>
        <div className="auth_apps">

           <div className="auth_apps_google">
                 <img src={google} alt="google_logo"/>
                 <div>sign in with google</div>
           </div>

           <div className="auth_apps_apple">
           <img src={apple} alt="google_logo"/>
           <div>sign in with apple</div>      
           </div>
        </div>
      </div>
    </div>
    
   
  );
}
