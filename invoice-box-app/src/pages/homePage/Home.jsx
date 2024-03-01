import "./home.css";

import { Outlet } from "react-router-dom";
////sideBar component
import SideBar from "../../components/sideNavBar/SideBar";

function Home({setStar,setInvoice}) {
  
  return (
    <div className="app">
      <div className="Home">
        <div className="Home_nav">
          <SideBar setStar={setStar} setInvoice={setInvoice}/>
        </div>
        <div className="Home_body">
          <Outlet/>
        </div>
      </div>
    
    </div>
  );
}

export default Home;
