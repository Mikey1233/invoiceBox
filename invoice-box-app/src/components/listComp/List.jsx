import React from "react";
import { NavLink } from "react-router-dom";
function List({iconClass,routeProp,currentPathname}) {
  return (
    <li>
      <NavLink
        to={routeProp}
        className={currentPathname === `/${routeProp === '/'?'':routeProp}` ? "activeClass" : ""}
      >
        <i className={iconClass}></i>{routeProp === '/' ? 'invoice':routeProp}
      </NavLink>
    </li>
  );
}
// bi bi-star-fill

export default List;
