import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react';
import styles from './featureComponents.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";
import { Canvas, useThree, useFrame } from "@react-three/fiber"; // Removed duplicate import
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";


export default function FeatureComponents() {
    const color = "#111111";

    const Icosahedron = () => (
        <mesh rotation-x={0.35}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial wireframe color={color} />
        </mesh>
    );

    const Star = ({ p }) => {
        const ref = useRef(null);

        useLayoutEffect(() => {
            const distance = mix(2, 3.5, Math.random());
            const yAngle = mix(degreesToRadians(80), degreesToRadians(100), Math.random());
            const xAngle = degreesToRadians(360) * p;
            ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
        }, [p]);

        return (
            <mesh ref={ref}>
                <boxGeometry args={[0.05, 0.05, 0.05]} />
                <meshBasicMaterial wireframe color={color} />
            </mesh>
        );
    };

        function Scene({ numStars = 100 }) {
        const { gl, camera } = useThree();
        const { scrollYProgress } = useScroll();
        const yAngle = useTransform(scrollYProgress, [0, 1], [0.001, degreesToRadians(180)]);
        const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
        const time = useTime();

        useFrame(() => {
            camera.position.setFromSphericalCoords(distance.get(), yAngle.get(), time.get() * 0.0005);
            camera.updateProjectionMatrix();
            camera.lookAt(0, 0, 0);
        });

        useLayoutEffect(() => {
            gl.setPixelRatio(0.3);
        }, []);

        const stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(<Star key={i} p={progress(0, numStars, i)} />);
        }

        return (
            <>
                <Icosahedron />
                {stars}
            </>
        );
    }

    let { createCart, setCartItem } = useContext(CartContext);
    const [allProducts, setAllProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    async function generateCart(productId) {
        let res = await createCart(productId);
        console.log(res, 'from fcomponent');
        console.log(res.data.status);
        if (res.data.status === "success") {
            toast.success(res.data.message, {
                position: 'bottom-right',
                className: 'box-shadow'
            });
            setCartItem(res.data.numOfCartItems);
        } else {
            toast.error(res.data.message, {
                position: 'bottom-right',
                className: 'box-shadow'
            });
        }
    }

    async function getProduct() {
        let data = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setAllProducts(data.data.data);
    }

    useEffect(() => {
        getProduct();
    }, []);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>

            <div className="container vh-100"> <div className="container-fluid" id="">
                <div className="container mt-5 pt-5">
                    <div className="my-5">
                        <label htmlFor="search">Search:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            name="search"
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="row">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="col-md-2 box bg-bg-transparent ">
                                <div className="px-2 py-3">
                                    <Link to={'/ProductDetails' + '/' + product.id}>
                                        <img className="w-100" src={product.imageCover} alt="" />
                                        <p className="p-color">{product.category.name}</p>
                                        <h3 className="h6">{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                                        <div className="d-flex justify-content-between">
                                            <h6>{product.price}EGP</h6>
                                            <div className="d-flex">
                                                <h6>{product.ratingsAverage}</h6>
                                                <i className="fa fa-star text-warning"></i>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="box-2 overflow-hidden text-center">
                                        <div className="sakr sakr-two text-center">
                                            <span onClick={() => generateCart(product.id)}>+ Add</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
                <Canvas className=' position-fixed top-0  animation text-center  ' style={{zIndex:-1}}   gl={{ antialias: false }}>
                    <Scene />
                    <group>

                    </group>
                </Canvas>
            </div>
        </>
    );
}
