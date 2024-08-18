'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductCarousel from "@/components/ProductCarousel";

async function getData() {
    try {
        const res = await axios.post('https://api.ruoudutysanbay.com/LiquorExchange/Product/Get-List-Products-Best-Selling', {
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

export default function HomeBestSelling() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getData();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="relative lg:pt-[220px]">
            <div className="pb-6 lg:pt-4 pt-6 md:py-5 container mx-auto px-3 md:px-0 z-10 relative w-full flex flex-col gap-4 lg:gap-10">
                <div className="block lg:flex lg:flex-grow gap-2">
                    <h2 className="font-bold text-[24px] lg:text-[36px] relative bg-white flex flex-col flex-1 gap-6 text-center lg:text-left">Sản phẩm bán chạy</h2>
                    <div className="lg:text-[18px] text-[16px] flex-shrink-0 text-[#475467] lg:w-[300px] text-center lg:text-left w-full">Các sản phẩm được người dùng mua nhiều nhất</div>
                </div>
                <div className="w-full">
                    <ProductCarousel products={products}></ProductCarousel>
                </div>
                <div className="text-center mx-auto">
                    <a href="/product" className="rounded-full gap-2 border-[1px] px-5 py-4 text-black h-fit w-fit flex justify-center items-center hover:bg-gray-100 cursor-pointer">
                        <p className="text-[16px] font-medium">Xem tất cả Sản phẩm</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}