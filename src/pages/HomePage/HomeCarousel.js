'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Carousel} from "antd";

async function getData() {
    try {
        const res = await axios.post('https://api.ruoudutysanbay.com/Slide/View-List-Slides', {
                pageSize: 10,
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

export default function HomeCarousel() {
    const [data, setData] = useState([]);
    const [windowDimensions, setWindowDimensions] = useState({height: 700, width: 1920});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setData(data);
        };

        fetchData();

        // Set window dimensions
        if (typeof window !== 'undefined') {
            setWindowDimensions({
                height: window.innerWidth > 768 ? 700 : 500,
                width: window.innerWidth > 768 ? 1920 : 800
            });
        }
    }, []);

    return (
        <Carousel autoplay>
            {data.map((s) => {
                return (
                    <img src={`https://api.ruoudutysanbay.com/Uploads/${s.image}?height=${windowDimensions.height}&width=${windowDimensions.width}`} width={windowDimensions.width} height={windowDimensions.height} className="lg:h-full object-cover" alt={s.name} key={s.id} title={s.name}/>
                );
            })}
        </Carousel>
    );
}