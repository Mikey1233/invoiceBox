import React from "react";
// import "./authUser.css";
import google from "../../assets/googleSvg.svg";
import apple from "../../assets/apple-logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import closedEye from "../../assets/closedEye.svg";
import togglePasswordType from "../../togglePasswordType/toggle";
import googleAuth from "../../googleAuth/googleAuth";
import { sendPasswordResetEmail } from "firebase/auth";
import Error from "../../components/error/Error";
//////////loader component
import SpinLoader from "../../components/spinLoader/SpinLoader";
/////customhook
import useAuthRedirect from "../../checkActive/checkActive";
//modals
import Modal from "../../components/modal/Modal";

///////////auth modules

import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../cssForAuthPage.css";

export default function LoginUser() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [messageToggle, setMessageToggle] = useState(false);

  const [OpenPassword, setOpenPassword] = useState(false);

  const imgRef = useRef(null);
  const ref1 = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  // const [active, setIsActive] = useState(false);

  const navigate = useNavigate();

  /////////////forgotten password

  //
  useAuthRedirect();

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(true);
      setMessageToggle(true);
    } catch (error) {
      setInvalid(true);
      setMessageToggle(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      const user = userLogin;

      if (user.user.emailVerified) {
        navigate("/");
      } else {
        setErrorMessage(true);
      }
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="authuser_auth">
        {successMessage && (
          <Modal
            color={"rgba(209, 255, 186)"}
            textcolor={"green"}
            type={"success"}
            message={`Your message has been sent successfully`}
            setToggle={setMessageToggle}
            toggle={messageToggle}
          />
        )}
        {invalid && (
          <Modal
            color={"rgba(249, 222, 220)"}
            textcolor={"red"}
            type={"error"}
            message={`A problem occurred while submitting your data`}
            setToggle={setMessageToggle}
            toggle={messageToggle}
          />
        )}

        <form className="authuser_auth_box" method="post">
          <h3>Login</h3>
          {errorMessage && <Error setErrorMessage={setErrorMessage} />}

          <div>
            <div>
              <label htmlFor="username">Email address:</label>
            </div>
            <input
              type="email"
              className="signEmail"
              // style={{ border: "1px solid black", margin: "10px 2px 10px 2px" }}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
            />
          </div>

          <div>
            <div>
              <label htmlFor="username">Password:</label>
            </div>

            <div className="input_box">
              <input
              className="signPass"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                ref={ref1}
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

          <button
            type="submit"
            onClick={(e) => {
              handleLogin(e);
            }}
            className="button-login"
          >
            {isLoading ? <SpinLoader /> : "Login"}
          </button>
          <div className="auth_create-acct">
            <Link to={"signup"}>
              <p>Not registered? Create account</p>
            </Link>

            <p onClick={handleForgotPassword}>Lost password</p>
          </div>
        </form>
        <div className="auth_apps">
          <div className="auth_apps_google" onClick={googleAuth}>
            <img src={google} alt="google_logo" />
            <div>sign in with google</div>
          </div>

          <div className="auth_apps_apple">
            <img src={apple} alt="google_logo" />
            <div>sign in with facebook</div>
          </div>
        </div>
      </div>
    </div>
  );
}
