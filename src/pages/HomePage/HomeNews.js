'use client';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Carousel} from "antd";

async function getData() {
    try {
        const res = await axios.post('https://api.ruoudutysanbay.com/LiquorExchange/News/Get-List-News', {
                pageSize: 4,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
        return res.data?.data.data;
    } catch (error) {
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export default function HomeNews() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getData();
            setNews(data);
        };

        fetchNews();
    }, []);

    const CarouselSettings = {
        infinite: true,
        slidesToShow: Math.min(4, news.length),
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // For large screens
                settings: {
                    slidesToShow: Math.min(4, news.length),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // For medium screens
                settings: {
                    slidesToShow: Math.min(2, news.length),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // For small screens
                settings: {
                    slidesToShow: Math.min(1, news.length),
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="relative">
            <div className="pb-6 lg:pt-4 pt-6 md:py-5 container mx-auto px-3 md:px-0 z-10 relative w-full flex flex-col gap-4 lg:gap-10">
                <div className="heading text-center">
                    <h2 className="text-[24px] lg:text-[36px] font-bold">Tin Tức</h2>
                </div>
                <Carousel {...CarouselSettings}>
                    {news.map((newsItem, index) => {
                        let createdTime = newsItem.createdTime; // "21-04-2024 15:47:49"
                        let date = new Date(createdTime.split(" ")[0].split("-").reverse().join("-") + "T" + createdTime.split(" ")[1]);

                        // Manually format the date and time
                        let formattedDate = ("0" + date.getDate()).slice(-2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);

                        return (
                            <div key={index}>
                                <a href={`/tin-tuc/${newsItem.slug}`} className="bg-white flex flex-col rounded-xl lg:rounded-3xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out mx-1 md:mx-3 border-[1px]">
                                    <img className="lg:rounded-3xl rounded-xl" src={`https://api.ruoudutysanbay.com/Uploads/${newsItem.image}?height=300&width=500`} alt={newsItem.name} title={newsItem.name}/>
                                    <div style={{minHeight: '7rem'}}>
                                        <h3 className="mt-3 text-base lg:text-lg font-bold text-center line-clamp-2 text-[#475467] px-1">{newsItem.name}</h3>
                                        <div className="my-2 text-center text-sm text-gray-500 px-1">{formattedDate}</div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </Carousel>
                <div className="text-center mx-auto">
                    <a href="/category/tin-tuc" className="rounded-full gap-2 border-[1px] px-5 py-4 text-black h-fit w-fit flex justify-center items-center hover:bg-gray-100 cursor-pointer">
                        <p className="text-[16px] font-medium">Xem tất cả Tin tức</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}