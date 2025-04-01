'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductNewest from "@/components/ProductNewest";

async function getData() {
    try {
        const res = await axios.post('https://api.ruoudutysanbay.com/LiquorExchange/Product/Get-List-Products', {
                pageSize: 10,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [
                    {
                        "colName": "createdTime",
                        "sortDirection": "desc"
                    }
                ],
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

export default function HomeProductNewest() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getData();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="relative bg-white pb-5">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0 z-10 relative w-full">
                <div className="heading text-center">
                    <h3 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-[#edf0f3] px-5 md:px-10 z-10">Sản phẩm mới nhất</h3>
                </div>
                <div className="w-full">
                    <ProductNewest products={products}></ProductNewest>
                </div>
            </div>
        </div>
    );
}