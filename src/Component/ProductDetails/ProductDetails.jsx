import React, { useEffect, useState } from 'react';
import styel from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";

export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let { id } = useParams();
    console.log(id);

    const [supCategores, setSupCategores] = useState([]);

    async function supCategoru() {
        let response = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`);
        let data = response.data.data;
        setSupCategores(data);
        console.log(supCategores);
    }

    useEffect(() => {
        supCategoru();
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {supCategores.images && supCategores.images.map((img) => (
                                <div key={img}>
                                    <img className='w-100' src={img} alt="" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <h1>{supCategores.title}</h1>
                        <p>{supCategores.description}</p>
                        <div className="d-flex justify-content-between mt-2">
                            <p>{supCategores.price}EGP</p>
                            <div className="d-flex">
                                <h6>{supCategores.ratingsAverage}</h6>
                                <i className='fa fa-star text-warning '></i>
                            </div>
                        </div>
                        <button className='btn btn-success w-100 text-white mt-2'>+ Add</button>
                    </div>
                </div>
            </div>
        </>
    );
}
