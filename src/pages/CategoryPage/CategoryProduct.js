'use client'
import axios from "axios";
import {useEffect, useState} from "react";
import {Pagination} from "antd";
import { Select } from 'antd';

export default function CategoryProduct({slug}) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(30);
    const [sortOption, setSortOption] = useState('asc');
    const pageSize = 30;
    useEffect(() => {
        axios.post(`https://api.thumuaruouhn.online/LiquorExchange/Category/Get-Product-Category-By-Slug/${slug}`, {
            pageSize: pageSize,
            currentPage: currentPage,
            searchByFields: [],
            sortByFields: [
                {
                    "colName": "price",
                    "sortDirection": sortOption
                }
            ]
        })
            .then(response => {
                setProducts(response.data?.data.data);
                setTotal(response.data?.data.total);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }, [slug, currentPage, sortOption]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="relative">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0">
                <div className="flex justify-between">
                    <Select defaultValue="asc" onChange={setSortOption}>
                        <Select.Option value="asc">Giá tăng dần</Select.Option>
                        <Select.Option value="desc">Giá giảm dần</Select.Option>
                    </Select>
                    <div className="px-5 text-right my-auto">
                        {total > currentPage * pageSize ? (
                            <div className="my-auto">
                                Hiển thị {currentPage * pageSize} sản phẩm | {total} sản phẩm
                            </div>
                        ) : (
                            <div className="my-auto">
                                Hiển thị tất cả {total} sản phẩm
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5">
                    {products.map((product) => (
                        <a href={`/product/${product?.slug}`} className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                            <img className="rounded-xl" src={product?.productImages[0]?.image} alt=""/>
                            <div className="mt-3 text-base lg:text-lg font-bold text-center">{product?.name}</div>
                            <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-500 mb-3">
                                <div>{product?.bottle}ml</div>
                                <div>/</div>
                                <div>{product?.alcoholPercentage}%</div>
                            </div>
                            <div className="text-sm lg:text-base text-center font-bold mt-auto pb-0.5">{Intl.NumberFormat('de-DE').format(product?.price) + 'đ'}</div>
                        </a>
                    ))}
                </div>
                <div className="text-right">
                    {total > currentPage * pageSize ? (
                        <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={handlePageChange}/>
                    ) : ''}
                </div>
                {/*<div className="py-5 text-center">*/}
                {/*    <a href="" className="underline">Xem tất cả</a>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const response = await axios.post(`https://api.thumuaruouhn.online/LiquorExchange/Category/Get-Product-Category-By-Slug/${slug}`, {
        pageSize: 30,
        currentPage: 1,
        searchByFields: [],
        sortByFields: [
            {
                "colName": "price",
                "sortDirection": 'asc'
            }
        ]
    });

    const products = response.data?.data.data;
    const total = response.data?.data.total;

    return {
        props: {
            slug,
            products,
            total
        }
    };
}
