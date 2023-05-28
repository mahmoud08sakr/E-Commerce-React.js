import axios from "axios";
import { useState } from "react";

const { createContext } = require("react");


// https://route-ecommerce-app.vercel.app/



export let CartContext = createContext(0)



export default function CartContextProvider(props) {

    function createCart(productId) {
        console.log(productId);

    return    axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart', { productId: productId },
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }

            }).then(res => res)
            .catch(err =>err )
    }

    const [cart, setCart] = useState([])
    return <CartContext.Provider value={{ cart, createCart }} >
        {props.children}
    </CartContext.Provider>

}