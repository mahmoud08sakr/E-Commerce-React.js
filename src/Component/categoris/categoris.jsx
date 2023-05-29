import React, { useEffect, useState } from 'react'
import styel from './categoris.module.css'
import Slider from "react-slick";
import axios from 'axios';
import {Helmet} from "react-helmet";



export default function Categoris() {




    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
    
    return ;
    
    }






    var settings = {
        dots: true,
        infinite: true,
        button:false,
        autoplay: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplaySpeed: 2000,
        arrows:false,
        nextArrow: <SampleNextArrow />,
        cssEase: "linear"


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
            <Slider className='w-100  '  {...settings}>
                {categores.map((category) => <div className=' slider text-white' key={category} >

                    <img  height={250}  className='w-75 rounded-3 mt-3   '  src={category.image} alt="" />
                    <h4 className='h6 ps-5 ms-4 text-dark ' > {category.name} </h4>
                </div>
                )}
            </Slider></>
    )
}
