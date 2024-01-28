import React from "react";
import "./modal.css";
import { useEffect } from "react";
function Modal({ message, color, type, textcolor ,toggle,setToggle}) {
    useEffect(() => {
        if (toggle) {
          const timer = setTimeout(() => {
            setToggle(false)
           
          }, 2000);
    
          return () => clearTimeout(timer);
        }
      }, [2000, toggle]);
  const check = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check-circle success"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
    </svg>
  );
  const x = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-x-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
  return (
    <div
      className={`message ${toggle ? 'show':''}`}
      style={{ backgroundColor: color, color: textcolor,top: toggle ? "10%" : "-100%" }}
    >
      <span className="icon">
       {type === "success" ? check : x}
        </span> 
        <span>
        {message}

        </span>
    </div>
  );
}

export default Modal;
