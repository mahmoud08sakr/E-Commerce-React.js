import React, { createContext, useContext } from 'react'
import styel from './Product.module.css'
import {CounterContext} from '../../Context/CounterContext'

export default function Product() {

let x = useContext(CounterContext)
console.log(x);

    return (
        <div>
            Product
        </div>
    )
}
