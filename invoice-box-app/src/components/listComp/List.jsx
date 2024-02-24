import React from "react";
import { NavLink } from "react-router-dom";
import './list.css'
function List({iconClass,routeProp,currentPathname}) {
  return (
    <li>
      <NavLink
        to={routeProp}
        className={currentPathname === `/${routeProp === '/'?'':routeProp}` ? "activeClass" : ""}
      >
        <i className={iconClass}></i>{routeProp === '/' ? <span className="list-text">invoice</span>:<span className="list-text">{routeProp}</span>}
      </NavLink>
    </li>
  );
}
// bi bi-star-fill

export default List;
