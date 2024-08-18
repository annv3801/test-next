'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";

async function getData() {
    try {
        const res = await axios.post('https://api.ruoudutysanbay.com/LiquorExchange/Brand/Get-List-Brands', {
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
        <div className="section-bg section-bg-background">
            <div className="mx-auto container flex flex-col gap-4 lg:gap-10 pt-10">
                <div className="heading">
                    <h2 className="font-bold text-[24px] text-center lg:text-left lg:text-[36px] relative flex flex-col flex-1 gap-6">Các thương hiệu mà chúng tôi có</h2>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-5 lg:grid-cols-6 lg:gap-5 mb-16 px-2">
                    {brand.map((s) => (
                        <a href={`/category/${s.category.slug}`} className="border-[1px] rounded-3xl items-center flex justify-center hover:border-blue-300">
                            <img src={`https://api.ruoudutysanbay.com/Uploads/${s.image}?height=800`}
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
        </div>
    );
}