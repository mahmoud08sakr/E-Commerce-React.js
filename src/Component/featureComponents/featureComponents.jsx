import React, { useEffect, useState } from 'react'
import styles from './featureComponents.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function FeatureComponents() {


    // const [allProducts, setAllProducts] = useState([]);
    const [allProducts, setallProducts] = useState([]);

    async function getProduct() {
        let data = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/products')
        // console.log(data.data.data);
        setallProducts(data.data.data)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div className="container mt-5 pt-5 ">
                <div className="row">
                    {allProducts.map((product) => <div key={product.id} className="col-md-2 box ">
                        <div className=" px-2 py-3 ">
                            <Link to={'/ProductDetails' + '/' + product.id} >

                                <img className='w-100' src={product.imageCover} alt="" />
                                <p className='p-color'> {product.category.name}</p>
                                <h3 className='h6' >{product.title.split(" ").splice(0, 2).join(" ")}</h3>
                                <div className="d-flex justify-content-between ">
                                    <p>{product.price}EGP</p>
                                    <div className="d-flex">
                                        <h6>{product.ratingsAverage}</h6>
                                        <i className='fa fa-star text-warning ' ></i>

                                    </div>

                                </div>
                            </Link>
                            <button className='btn btn-success w-100 text-white ' >+ Add </button>

                        </div>

                    </div>

                    )}
                </div>
            </div>

        </>
    )

}