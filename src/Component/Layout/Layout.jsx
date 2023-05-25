import React from 'react'
import './Layout.module.css'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'


export default function Layout({userData ,setUserData }) {


    let navigate = useNavigate()


    function LogOut() {
        localStorage.removeItem("userToken");
        setUserData(null);
        navigate("/login")
    }




    return (
        <div>
            <>
                <NavBar userData={userData} LogOut={LogOut} />
                <Outlet />
                <Footer />
            </>
        </div>
    )
}

