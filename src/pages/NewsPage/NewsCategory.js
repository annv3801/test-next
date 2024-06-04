'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Link from "next/link";
import CustomPagination from "@/components/Pagination";
export default function NewsCategory() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 30;

    useEffect(() => {
        axios.post(`http://localhost:4444/LiquorExchange/News/Get-List-News`, {
            pageSize: pageSize,
            currentPage: currentPage,
            searchByFields: [],
            sortByFields: []
        })
            .then(response => {
                setProducts(response.data?.data.data);
                setTotal(response.data?.data.total);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div>
            <div className="relative">
                <div className="py-3 md:py-5 container mx-auto px-3 md:px-0">
                    <h1 className="font-bold text-2xl">
                        Tin tức
                    </h1>
                    <div>Blogs là nơi Rượu Duty sân bay đăng tải, chia sẻ các nội dung, kiến thức về rượu và mọi thứ xung quanh chúng. Nhằm mục đích giúp mọi người có thêm các hiểu biết mới về rượu..</div>
                    <div className="px-5 text-right">
                        {total > currentPage * pageSize ? (
                            <div className="my-auto">
                                Hiển thị {currentPage * pageSize} tin tức | {total} tin tức
                            </div>
                        ) : (
                            <div className="my-auto">
                                Hiển thị tất cả {total} tin tức
                            </div>
                        )}
                    </div>
                    <div className="">
                        {products.map((product) => (
                            <Link href={`/tin-tuc/${product?.slug}`} className="flex gap-5 hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                                <div className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                                    <img className="rounded-xl" src={`http://localhost:4444/Uploads/${product?.image}?height=250&width=400`} alt={product.name} title={product.name}/>
                                </div>
                                <div className="my-auto">
                                    <div className="mt-3 text-base lg:text-lg font-bold text-center">{product?.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-right">
                        {total >  pageSize ? (
                                <CustomPagination
                                    currentPage={currentPage}
                                    total={total}
                                    pageSize={pageSize}
                                    handlePageChange={handlePageChange}
                                />
                        ) : ''}
                    </div>
                    {/*<div className="py-5 text-center">*/}
                    {/*    <a href="" className="underline">Xem tất cả</a>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}