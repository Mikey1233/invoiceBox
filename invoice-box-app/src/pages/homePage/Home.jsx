import "./home.css";
import { auth } from "../../config/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

function Home() {
  const [userActive, setUserActive] = useState(false);
  const navigate = useNavigate();

  /////////////checks if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserActive(true);
      }
    });

    return unsubscribe;
  }, []);

  const signUserOut = async () => {
    try {
      await signOut(auth);
      console.log("signed out");
      navigate("/authUser");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Welcome to Home page</h2>
      <p>Home page</p>
      {userActive && <button onClick={signUserOut}>Sign Out</button>}
      {userActive === false && (
        <div>
          <Link to={"/authUser"}>
            <button>Login</button>
          </Link>
          <Link to={"/authUser/signup"}>
            <button>create an account</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
