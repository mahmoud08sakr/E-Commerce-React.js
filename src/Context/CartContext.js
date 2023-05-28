import axios from "axios";
import { useState } from "react";

const { createContext } = require("react");


// https://route-ecommerce-app.vercel.app/



export let CartContext = createContext(0)



export default function CartContextProvider(props) {



    function getAllCart() {
        return axios.get('https://route-ecommerce-app.vercel.app/api/v1/cart',
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }).then(res => res)
            .catch(err => err)

    }


    function createCart(productId) {
        console.log(productId);

        return axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart', { productId: productId },
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }

            }).then(res => res)
            .catch(err => err)
    }





    function updateCart(id, count) {

        return axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`, {count},
            {
                headers: {
                    token: localStorage.getItem('userToken')
                } 

            }).then(res => res)
            .catch(err => err)
    }







    const [cart, setCart] = useState([])
    return <CartContext.Provider value={{ cart, createCart, getAllCart ,updateCart}} >
        {props.children}
    </CartContext.Provider>

}