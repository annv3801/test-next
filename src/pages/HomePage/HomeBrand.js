'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";

async function getData() {
    try {
        const res = await axios.post('http://localhost:4444/LiquorExchange/Brand/Get-List-Brands', {
                pageSize: 99,
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

export default function HomeBrand() {
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        const fetchBrand = async () => {
            const data = await getData();
            setBrand(data);
        };

        fetchBrand();
    }, []);

    return (
        <div className="mx-auto container py-5 px-3">
            <div className="heading text-center">
                <h2 className="py-4 md:pt-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10">Thương hiệu</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-5 lg:grid-cols-6 lg:gap-5 pt-5">
                {brand.map((s) => (
                    <a href={`/category/${s.category.slug}`} className="border-2 border-blue-400 rounded-lg items-center flex justify-center">
                        <img src={`http://localhost:4444/Uploads/${s.image}?height=100`}
                             alt={s.category.slug}
                             title={s.category.slug}
                             style={{
                                 minWidth: '141px',
                                 maxWidth: '145px',
                                 minHeight: '77.83px',
                                 maxHeight: '106.03px',
                                 objectFit: 'contain'
                             }}
                             className="mx-auto py-3"/>
                    </a>
                ))}
            </div>
        </div>
    );
}