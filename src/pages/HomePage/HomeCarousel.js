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
        <div className="slider-container lg:rounded-3xl mx-auto h-full">
            <Carousel autoplay>
                {data.map((s) => {
                    return (
                        <img src={`https://api.ruoudutysanbay.com/Uploads/${s.image}?height=${windowDimensions.height}&width=${windowDimensions.width}`} className="lg:h-full h-[220px] object-cover lg:rounded-3xl mx-auto" alt={s.name} key={s.id} title={s.name}/>
                    );
                })}
            </Carousel>
            <div className="introduction rounded-3xl bg-white absolute z-10 flex flex-col gap-4 lg:sgap-6 border-2">
                <h1 className="text-[24px] lg:text-[36px] font-bold text-center">Rượu Duty Sân Bay - Mua bán thu mua rượu</h1>
                <div className="text-center opacity-60 text-[16px] lg:text-[18px]">Rượu duty sân bay – là đơn vị chuyên cung cấp rượu ngoại chính hãng, giá tốt tại Hà Nội. Được thành lập từ năm 2010, với hơn 10 năm kinh nghiệm chúng tôi luôn tự hào mang đến cho khách hàng từ trải nghiệm mua sắm đến chất lượng sản phẩm bậc nhất!</div>
            </div>
        </div>
    );
}