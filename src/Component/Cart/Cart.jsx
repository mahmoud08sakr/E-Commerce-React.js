import React, { useContext } from 'react';
import style from './Cart.module.css';
import { CounterContext } from '../../Context/CounterContext';

export default function Cart() {
    const { increment, decrement } = useContext(CounterContext);

    return (
        <>
            <h3>Cart</h3>
            <button onClick={increment} className='btn btn-primary'>+</button>
            <button onClick={decrement} className='btn btn-danger'>-</button>
        </>
    );
}
