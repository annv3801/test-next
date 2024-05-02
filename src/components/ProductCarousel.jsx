import React from "react";
import { Carousel } from 'antd';

export default function ProductCarousel({products}) {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 464,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="slider-container">
            <Carousel {...settings}>
                {products?.map((product, index) => (
                    <div key={index}>
                        <a href={`/product/${product?.slug}`} className="bg-white flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out mx-1 md:mx-3">
                            <img className="rounded-xl" src={`${product?.productImages[0]?.image}?height=375`} alt={product.name} title={product.name}/>
                            <div style={{minHeight: '7rem'}}>
                                <h1 className="mt-3 text-lg lg:text-lg font-bold text-center line-clamp-2">{product.name}</h1>
                                <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-500 mb-3">
                                    <div>{product?.bottle}ml</div>
                                    <div>/</div>
                                    <div>{product?.alcoholPercentage}%</div>
                                </div>
                            </div>
                            <div className="text-base text-center font-bold pb-0.5" style={{marginBottom: '5px'}}>{Intl.NumberFormat('de-DE').format(product?.price) + 'đ'}</div>
                        </a>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};