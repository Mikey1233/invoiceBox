
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
//layouts
import Rootlayout from './layouts/rootLayout/Rootlayout';
import AuthLayout from './layouts/authLayout/AuthLayout';
//pages
// import AuthUser from './pages/authPage/AuthUser';
import LoginUser from './pages/authPage/LoginUser';
import Signup from './pages/signupPage/Signup';
import Home from './pages/homePage/Home';
const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Rootlayout/>}>
      <Route path='authUser' element={<AuthLayout/>}>
         <Route index element={<LoginUser/>}/>
        <Route path='signup' element={<Signup/>}/> 
      </Route>
      <Route index element={<Home/>}>

      </Route>
    </Route>
  ))



function App() {
  return (
  <RouterProvider router={router}/>
  )
}

export default App
