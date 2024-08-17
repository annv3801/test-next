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
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0 z-10 relative w-full flex flex-col gap-10">
                <div className="flex flex-grow gap-2">
                    <h2 className="font-bold text-[36px] relative bg-white flex flex-col flex-1 gap-6">Sản phẩm bán chạy</h2>
                    <div className="text-xl flex-shrink-0 text-[#475467] w-[300px]">Các sản phẩm được người dùng mua nhiều nhất</div>
                </div>
                <div className="w-full">
                    <ProductCarousel products={products}></ProductCarousel>
                </div>
            </div>
        </div>
    );
}