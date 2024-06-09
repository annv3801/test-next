'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} nextArrow`}
            style={{ ...style, display: "block", color: "black", fontSize: '24px', top: '40%', transform: 'translateY(-50%)' }}
            onClick={onClick}
        >
            <FaChevronRight />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} prevArrow`}
            style={{ ...style, display: "block", color: "black", fontSize: '24px', top: '40%', transform: 'translateY(-50%)' }}
            onClick={onClick}
        >
            <FaChevronLeft />
        </div>
    );
}
export default function ProductCarousel({products}) {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
        <div className="slider-container z-18">
            <Slider {...settings}>
                {products?.map((_, index) => (
                    <div key={index}>
                        <a href={`/product/${_?.slug}`} className="bg-white flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out mx-1 md:mx-3">
                            <img className="rounded-xl" src={`${_?.productImages[0]?.image}?height=375`} alt=""/>
                            <div style={{minHeight: '7rem'}}>
                                <h1 className="mt-3 text-lg lg:text-lg font-bold text-center line-clamp-2 capitalize">{`${_?.name}`}</h1>
                                <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-500 mb-3">
                                    <div>{_?.bottle}ml</div>
                                    <div>/</div>
                                    <div>{_?.alcoholPercentage}%</div>
                                </div>
                            </div>
                            <div className="text-base text-center font-bold pb-0.5" style={{marginBottom: '5px'}}>{_?.price != 0 ? Intl.NumberFormat('de-DE').format(_?.price) + 'đ' : "Liên hệ"}</div>
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
};