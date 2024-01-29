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
////////routes components
import Setting from "./components/settings/Setting";
import Create from "./components/createInvoice/Create";
import Starred from "./components/starred/Starred";
import InvoiceList from "./components/invoiceList/InvoiceList";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>

      <Route path="authUser" element={<AuthLayout />}>
        <Route index element={<LoginUser />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/" element={<Home />}>
        <Route index element={<InvoiceList/>}/>
        <Route path="settings" element={<Setting />} />
        <Route path="create" element={<Create />} />
        <Route path="starred" element={<Starred />} />
        {/* <Route /> */}
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
