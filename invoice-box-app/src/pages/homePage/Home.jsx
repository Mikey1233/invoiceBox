import "./home.css";

import { Outlet } from "react-router-dom";
////sideBar component
import SideBar from "../../components/sideNavBar/SideBar";

function Home() {
  
  return (
    <div>
      <div className="Home">
        <div className="Home_nav">
          <SideBar/>
        </div>
        <div className="Home_body">
          <Outlet/>
        </div>
      </div>
    
    </div>
  );
}

export default Home;
