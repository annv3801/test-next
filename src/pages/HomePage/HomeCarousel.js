'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Carousel} from "antd";

async function getData() {
    try {
        const res = await axios.post('https://api.thumuaruouhn.online/Slide/View-List-Slides', {
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

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setData(data);
        };

        fetchData();
    }, []);

    return (
        <Carousel autoplay>
            {data.map((s) => {
                return (
                    <img src={`https://api.thumuaruouhn.online/Uploads/${s.image}?height=700&width=1920`} className="lg:h-full object-cover" alt={s.name} key={s.id} title={s.name}/>
                );
            })}
        </Carousel>
    );
}