import React, { useState } from 'react'
import Layout from './Component/Layout/Layout'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import Cart from './Component/Cart/Cart'
import Login from './Component/Login/Login'
import Home from './Component/Home/Home'
import Register from './Component/Register/Register'
import About from './Component/About/About'
import NotFound from './Component/NotFound/NotFound'
import jwtDecode from 'jwt-decode'
import ProtectedRoutes from './Component/protectedRoutes/protectedRoutes'
import Product from './Component/Product/Product.jsx'



export default function App() {

  let [userData, setUserData] = useState(null);

  function saveUserData() {
    let encode = localStorage.getItem("userToken")
    // console.log(encode);
    let decoded = jwtDecode(encode)
    // console.log(decoded);
    setUserData(decoded)
    // data = {

    //   username:

    // }
  }





  let routes = createBrowserRouter([

    {
      path: "", element: <Layout userData={userData} setUserData={setUserData} />, children: [


        { path: "register", element: <Register /> },
        {
          path: "cart", element:
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
        },
        {
          path: "home", element:
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
        },
        {
          path: "about", element:

            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>

        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        {
          path: "product", element:

            <ProtectedRoutes>
              <Product />I
            </ProtectedRoutes>

        },

        { path: "*", element: <NotFound /> },





      ]


    }


  ])





  return (
    <RouterProvider router={routes} >

    </RouterProvider>
  )
}
