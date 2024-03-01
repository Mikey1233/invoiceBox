import React, { useState } from "react";
import "./userInfo.css";
import { auth } from "../../config/firebaseConfig";
import { db } from "../../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../../components/spinLoader/SpinLoader";
import { hasEmptyInputs } from "../../components/submitData";
import { fetchdata } from "../../components/submitData";

function UserInfo() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [tel1, setTel1] = useState("");
  const [tel2, setTel2] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  /////////////
  const [loader, setLoader] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);

  const user = auth?.currentUser?.uid;
  const [userData,setUserData] = useState([])
  
  const sendDataToDB = async () => {
    setLoader(true)
    if (
      hasEmptyInputs({ username, email, tel1, tel2, add1, add2, businessName })
    ) {
      setError(true);
      setToggle(true);
      setLoader(false
        )
    } else {
      try {
        await addDoc(collectionRef, {
          addressOne: add1,
          addressTwo: add2,
          BusinessName: businessName,
          email: email,
          telOne: tel1,
          telTwo: tel2,
          Name: username,
          userId: user,
        });
        // const userData2 =await fetchdata('UserInfo','userId',setUserData)
        navigate("/");
      } catch (err) {
        setError(true);
        setToggle(true);
        setLoader(false)

        console.log(err);
      } finally{
        setLoader(false)
      }
    }
  };

  const addState = (e, setState) => {
    setState(e.target.value);
  };
  const collectionRef = collection(db, "UserInfo");
  return (
    <div className="user_form">
      {error && (
        <Modal
          color={"rgba(249, 222, 220)"}
          textcolor={"red"}
          type={"error"}
          message={`error occurred while sumitting form data`}
          setToggle={setToggle}
          toggle={toggle}
        />
      )}

      <form method="post">
        <h3>User info</h3>
        <div className="form-grid">
          <div>
            <div>
              <label htmlFor="username">
                <i className="bi bi-envelope-check-fill"></i> email address
              </label>
            </div>
            <input
              type="email"
              style={{ border: "1px solid black", margin: "10px 2px 10px 2px" }}
              onChange={(e) => addState(e, setEmail)}
              placeholder="enter email address"
              name="email"
              required
            />
          </div>

          <div>
            <div>
              <label htmlFor="name">
                <i className="bi bi-person-circle"></i> name
              </label>
            </div>

            <div className="input_box">
              <input
                type="text"
                placeholder="first name   last name"
                name="name"
                onChange={(e) => addState(e, setUsername)}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="business">
                <i className="bi bi-briefcase-fill"></i> business name
              </label>
            </div>

            <div className="input_box">
              <input
                type="text"
                placeholder="business name"
                name="business"
                onChange={(e) => addState(e, setBusinessName)}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="address">
                <i className="bi bi-house-door-fill"></i> address
              </label>
            </div>

            <div className="input_box">
              <input
                type="text"
                placeholder="enter address"
                name="address"
                onChange={(e) => addState(e, setAdd1)}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="address">
                <i className="bi bi-geo-alt-fill"></i> business address:
              </label>
            </div>

            <div className="input_box">
              <input
                type="text"
                placeholder="enter address 2"
                name="address"
                onChange={(e) => addState(e, setAdd2)}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="tel-1">
                {" "}
                <i className="bi bi-phone-fill"></i> mobile
              </label>
            </div>

            <div className="input_box">
              <input
                type="number"
                name="tel-1"
                onChange={(e) => addState(e, setTel1)}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="tel-1">
                <i className="bi bi-telephone-fill"></i> telephone
              </label>
            </div>

            <div className="input_box">
              <input
                type="number"
                onChange={(e) => addState(e, setTel2)}
                name="tel-2"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            sendDataToDB();
          }}
          className="button-login"
        >
          {loader ? <SpinLoader /> : "submit"}
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
