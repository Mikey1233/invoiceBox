import React from "react";
import "./sideBar.css";
import avatar from "../../assets/avatar.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import List from "../listComp/List";
function SideBar({setStar,setInvoice}) {
  const location = useLocation();
  const currentPathname = location.pathname;
  const [userActive, setUserActive] = useState(false);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(false);
  const [userName, setUserName] = useState("");

  /////////////checks if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserActive(true);
        setUserName(
          auth?.currentUser?.displayName ||
            auth?.currentUser?.email.split("@")[0]
        );

        setUserProfile(auth?.currentUser?.photoURL);
      } else {
        navigate("authuser");
      }
    });

    return unsubscribe;
  }, []);

  const signUserOut = async () => {
    try {
      await signOut(auth);
      console.log("signed out");
      navigate("/authUser");
      /////update data states back to empty
      setStar([])
      setInvoice([])
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="sideBar">
      <div className="sideBar_Profile">
        <div>
          <img src={userProfile || avatar} alt="user-pic" />
          
            <h4 className="name-tag">{userName || "no name"}</h4>
            <p className="name-tag">frontend developer</p>
          
        </div>

        <ul className="sideBar_list">
          <List
            routeProp={"/"}
            iconClass={"bi bi-receipt"}
            currentPathname={currentPathname}
          />
          <List
            routeProp={"create"}
            iconClass={"bi bi-tools"}
            currentPathname={currentPathname}
          />
          <List
            routeProp={"starred"}
            iconClass={"bi bi-star-fill"}
            currentPathname={currentPathname}
          />
          <List
            routeProp={"settings"}
            iconClass={"bi bi-gear"}
            currentPathname={currentPathname}
          />

          <li>
            <a>
              <i className="bi bi-brightness-high-fill"></i> <span className="log-text">Theme</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sideBar_Aside">
        <ul>
          <li onClick={signUserOut}>
            <i className="bi bi-box-arrow-right"></i> <span className="log-text">logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
