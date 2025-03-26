
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "antd";

async function getData() {
    try {
        const res = await axios.post(
            "https://api.ruoudutysanbay.com/LiquorExchange/Brand/Get-List-Brands",
            {
                pageSize: 99,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    Accept: "text/plain",
                    "Content-Type": "application/json",
                }
            }
        );
        return res.data?.data.data;
    } catch (error) {
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export default function HomeBrand() {
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        const fetchBrand = async () => {
            const data = await getData();
            setBrand(data);
        };

        fetchBrand();
    }, []);

    const CarouselSettings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
                arrows: false,
            },
        ],
    };

    return (
        <div className="bg-[#edf0f3]">
            <div className="mx-auto container py-5 px-3">
                <div className="heading text-center">
                    <h2 className="py-4 md:pt-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-[#edf0f3] px-5 md:px-10">
                        Thương hiệu
                    </h2>
                </div>
                <div className="w-full">
                    <div className="slider-container z-18">
                        <Carousel {...CarouselSettings}>
                            {brand.map((item) => (
                                <div key={item.category.slug} className="px-2">
                                    <a
                                        href={`/category/${item.category.slug}`}
                                        className="border-2 border-blue-400 rounded-lg items-center flex justify-center h-[120px] bg-white"
                                    >
                                        <img loading="lazy"
                                            src={`https://api.ruoudutysanbay.com/Uploads/${item.image}?height=800`}
                                            alt={item.category.slug}
                                            title={item.category.slug}
                                            className="mx-auto py-3"
                                            style={{
                                                height: '110px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </a>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}
