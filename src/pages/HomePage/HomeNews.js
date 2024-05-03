'use client';
import React, { useState, useEffect } from 'react';
import axios from "axios";

async function getData() {
    try {
        const res = await axios.post('https://api.thumuaruouhn.online/LiquorExchange/News/Get-List-News', {
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

    return (
        <div className="bg-[#edf0f3] relative">
            <div className="py-3 md:py-5 container mx-auto px-4 md:px-0">
                <div className="heading text-center">
                    <h2 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-[#edf0f3] px-5 md:px-10">Tin Tức</h2>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {news.map((newsItem) => {
                        let createdTime = newsItem.createdTime; // "21-04-2024 15:47:49"
                        let date = new Date(createdTime.split(" ")[0].split("-").reverse().join("-") + "T" + createdTime.split(" ")[1]);

                        // Manually format the date and time
                        let formattedDate = ("0" + date.getDate()).slice(-2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);

                        return (
                            <a href={`/tin-tuc/${newsItem.slug}`} className="bg-white px-2 py-2 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                                <img className="rounded-xl" src={`https://api.thumuaruouhn.online/Uploads/${newsItem.image}?height=300&width=500`} alt={newsItem.name} title={newsItem.name}/>
                                <h3 className="mt-3 text-base lg:text-lg font-bold text-center line-clamp-2">{newsItem.name}</h3>
                                <div className="my-2 text-center text-sm text-gray-500">{formattedDate}</div>
                            </a>
                        );
                    })}
                </div>
                <div className="py-5 text-center">
                    <a href="" className="underline">Xem tất cả</a>
                </div>
            </div>
        </div>
    );
}