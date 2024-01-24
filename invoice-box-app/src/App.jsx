
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
import AuthUser from './pages/authPage/AuthUser';
import Signup from './pages/signupPage/Signup';
const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Rootlayout/>}>
      <Route path='authUser' element={<AuthLayout/>}>
         <Route index element={<AuthUser/>}/>
        <Route path='signup' element={<Signup/>}/> 
      </Route>
    </Route>
  ))



function App() {
  return (
  <RouterProvider router={router}/>
  )
}

export default App
