import React, { useEffect, useState } from 'react'
import styel from './categoris.module.css'
import Slider from "react-slick";
import axios from 'axios';


export default function Categoris() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1
    };

    const [categores, setCategores] = useState([]);

    async function Categores() {
        let data = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/categories')
        console.log(data.data.data);
        setCategores(data.data.data)
    }

    useEffect(() => {
        Categores()
    }, [])
    return (
        <>
            <Slider {...settings}>
                {categores.map((category) => <div className='bg-dark text-white' key={category} >

                    <img  height={300}  className='w-100'  src={category.image} alt="" />
                    <h3 className='h6' > {category.name} </h3>
                </div>
                )}
            </Slider></>
    )
}
