import google from "../../assets/googleSvg.svg";
import apple from "../../assets/apple-logo.svg";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import closedEye from "../../assets/closedEye.svg";
import togglePasswordType from "../../togglePasswordType/toggle";
import Error from "../../components/error/Error";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "../cssForAuthPage.css";
import { useState, useRef } from "react";
import googleAuth from "../../googleAuth/googleAuth";
import SpinLoader from "../../components/spinLoader/SpinLoader";
import useAuthRedirect from "../../checkActive/checkActive";
function Signup() {
  //toggle states
  const [OpenPassword, setOpenPassword] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  //////img ref
  const imgRef = useRef(null);
  const imgRef2 = useRef(null);
  ////loading state animation
  const [isLoading, setIsLoading] = useState(false);


  //////
  const [errorMessage,setErrorMessage] = useState(false)
  ////states
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(false);
  /////////change eye icon and password input type

  ///////////regex function for password validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  useAuthRedirect('userInfo')
  /////////////signin or signUp with google

  const Handle_EmailReg = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    if (isValidPassword && confirmPassword === password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await sendEmailVerification(user);
        setPasswordMatch(false);
        
      } catch (error) {
        
        setErrorMessage(true)
      
      }finally{
        setIsLoading(false)
      }
    } else {
      setPasswordMatch(true);
      setIsLoading(false)
    }
  };
  return (
    <div>
      <div className="authuser_auth">
        <form className="authuser_auth_box" method="post">
          {errorMessage && <Error setErrorMessage={setErrorMessage}/>}
          
          
          <h3>Create account</h3>

          <div>
            <div>
              <label htmlFor="email">Email address:</label>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: "1px solid black", margin: "10px 2px 10px 2px" }}
              type="email"
              id="email"
              name="email"
              required
              placeholder="name@example.com"
            />
          </div>

          <div>
            <div>
              <label htmlFor="password">Password:</label>
            </div>
            {!isValidPassword && (
              <p className="error">
                Password must be at least 8 characters, contains a number, and
                an uppercase letter.
              </p>
            )}
            <div className="input_box">
              <input
                aria-describedby="password-error"
                ref={ref1}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsValidPassword(validatePassword(e.target.value));
                }}
                type="password"
                id="password"
                name="password"
                required
              />
              <img
                src={closedEye}
                ref={imgRef}
                onClick={() =>
                  togglePasswordType(
                    OpenPassword,
                    ref1,
                    imgRef,
                    setOpenPassword
                  )
                }
                alt="password icon svg"
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="username"> Confirm Password:</label>
            </div>
            <div className="input_box">
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordMatch(false);
                }}
                ref={ref2}
                id="username"
                name="password"
                required
                type="password"
              />
              <img
                src={closedEye}
                ref={imgRef2}
                onClick={() =>
                  togglePasswordType(
                    OpenPassword,
                    ref2,
                    imgRef2,
                    setOpenPassword
                  )
                }
                alt="password icon svg"
              />
            </div>

            {passwordMatch && (
              <div className="alert_modal">
                <p>Make sure both passwords are the same and try again.</p>
              </div>
            )}
          </div>

          <button type="submit" onClick={Handle_EmailReg} className="button-login">
            {isLoading?<SpinLoader/>:'create account'}
            
          </button>
          <div className="auth_create-acct">
            <Link to={-1}>
              <p>Login your account in seconds</p>
            </Link>
          </div>
        </form>

        <div className="auth_apps">
          <div className="auth_apps_google" onClick={googleAuth}>
            <img src={google} alt="google_logo" />
            <div>sign up with google</div>
          </div>

          <div className="auth_apps_apple">
            <img src={apple} alt="google_logo" />
            <div>sign up with facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
