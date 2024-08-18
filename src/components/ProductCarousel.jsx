'use client'
import React from "react";
import {Carousel} from "antd";

export default function ProductCarousel({products}) {
    const CarouselSettings = {
        infinite: true,
        slidesToShow: Math.min(4, products.length),
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // For large screens
                settings: {
                    slidesToShow: Math.min(4, products.length),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // For medium screens
                settings: {
                    slidesToShow: Math.min(3, products.length),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // For small screens
                settings: {
                    slidesToShow: Math.min(1, products.length),
                    slidesToScroll: 1,
                }
            }
        ]
    };
    return (
        <div className="slider-container z-18 block">
            <Carousel {...CarouselSettings} arrows >
                {products?.map((_, index) => (
                    <div key={index}>
                        <a href={`/product/${_?.slug}`} className="bg-white flex flex-col lg:rounded-3xl rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out mx-1 md:mx-3 border-[1px]">
                            <div className="lg:p-3">
                                <img className="lg:rounded-3xl rounded-xl w-full" src={`${_?.productImages[0]?.image}?height=700`} alt=""/>
                                <div style={{minHeight: '7rem'}}>
                                    <h1 className="mt-3 text-[18px] text-[#475467] font-bold text-center line-clamp-2 capitalize px-1">{`${_?.name}`}</h1>
                                    {_?.dutyFrom != null ? <div className='text-base text-[#475467] font-bold pb-2 text-center px-1'>{`(Duty sân bay ${_?.dutyFrom})`}</div> : ""}
                                    <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-600 px-1">
                                        <div>{_?.bottle}ml</div>
                                        <div>/</div>
                                        <div>{_?.alcoholPercentage}%</div>
                                    </div>
                                </div>
                                <div className="lg:text-[18px] text-[16px] text-[#0E4F4F] text-center font-bold pb-0.5 px-1" style={{marginBottom: '5px'}}>
                                    {_?.promotionPrice == 0 || _?.promotionPrice == null ? (_?.price != 0 ? Intl.NumberFormat('de-DE').format(_?.price) + 'đ' : "Liên hệ") : (_?.promotionPrice != 0 ? Intl.NumberFormat('de-DE').format(_?.promotionPrice) + 'đ' : "Liên hệ")}
                                </div>
                            </div>

                        </a>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};