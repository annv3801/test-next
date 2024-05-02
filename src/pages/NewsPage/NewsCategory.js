'use client'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Link from "next/link";

function Pagination({ total, pageSize, current, onChange }) {
    const totalPages = Math.ceil(total / pageSize);
    const [visiblePages, setVisiblePages] = useState([]);

    const getVisiblePages = (page) => {
        const maxVisiblePages = 7;
        let pages = [];

        // Logic for boundaries and middle pages
        if (totalPages <= maxVisiblePages) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            let start, end;
            if (page >= 4 && page <= totalPages - 3) {
                start = page - 2;
                end = page + 2;
            } else if (page < 4) {
                start = 1;
                end = Math.min(maxVisiblePages, totalPages);
            } else {
                start = Math.max(1, totalPages - maxVisiblePages + 1);
                end = totalPages;
            }

            pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

            // Conditionally add ellipses based on distance from edges
            if (page > 4 && start > 1) pages.unshift('...');
            if (page < totalPages - 3 && end < totalPages) pages.push('...');
        }

        // Always make sure to include the first and the last page
        if (pages[0] !== 1) pages.unshift(1);
        if (pages[pages.length - 1] !== totalPages) pages.push(totalPages);

        return pages;
    };

    const handleClick = (page) => {
        onChange(page);
        setVisiblePages(getVisiblePages(page));
    };

    useEffect(() => {
        setVisiblePages(getVisiblePages(current));
    }, [current, totalPages]); // Also update when totalPages changes

    return (
        <div>
            {visiblePages.map((item) => (
                <button
                    key={item}
                    onClick={() => item !== '...' && handleClick(+item)}
                    className={`border-2 px-3 py-2 mx-1 rounded-lg ${item === current ? 'text-blue-500 border-blue-500' : 'text-gray-500 border-gray-500'}`}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

export default function NewsCategory() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 1;

    useEffect(() => {
        axios.post(`https://api.thumuaruouhn.online/LiquorExchange/News/Get-List-News`, {
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
                                    <img className="rounded-xl" src={`https://api.thumuaruouhn.online/Uploads/${product?.image}?height=250&width=400`} alt={product.name} title={product.name}/>
                                </div>
                                <div className="my-auto">
                                    <div className="mt-3 text-base lg:text-lg font-bold text-center">{product?.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-right">
                        {total >  pageSize ? (
                            <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={handlePageChange}/>
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