import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
//layouts
import Rootlayout from "./layouts/rootLayout/Rootlayout";
import AuthLayout from "./layouts/authLayout/AuthLayout";
//pages
// import AuthUser from './pages/authPage/AuthUser';
import LoginUser from "./pages/authPage/LoginUser";
import Signup from "./pages/signupPage/Signup";
import Home from "./pages/homePage/Home";
import UserInfo from "./pages/userInfo/UserInfo";
////////routes components
import Setting from "./components/settings/Setting";
import Create from "./components/createInvoice/Create";
import Starred from "./components/starred/Starred";
import InvoiceList from "./components/invoiceList/InvoiceList";
import DynPdf from "./components/dynamicPdfPage/DynPdf";

import { useState } from "react";


function App() {
  const [invoice,setInvoice] = useState([])
  const [starList,setStar] = useState([])
  const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        <Route path="authUser" element={<AuthLayout />}>
          <Route index element={<LoginUser />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="userInfo" element={<UserInfo />} />
        <Route path="/" element={<Home setStar={setStar} setInvoice={setInvoice}/>}>
          <Route index element={<InvoiceList invoiceData={invoice} setInvoice={setInvoice}/>} />
          <Route path="settings" element={<Setting />} />
          <Route path="create" element={<Create />} />
          <Route path="starred" element={<Starred star={starList} setStar={setStar}/>} />
          <Route path="pdf" element={<DynPdf invoiceData={invoice} setStar={setStar} setInvoice={setInvoice}/>} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
