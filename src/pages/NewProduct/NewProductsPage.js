'use client'
import axios from "axios";
import React, {useEffect, useState} from "react";
import CustomPagination from "@/components/Pagination";

export default function NewProductsPage() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(30);
    const pageSize = 30;
    useEffect(() => {
        axios.post(`https://api.ruoudutysanbay.com/LiquorExchange/Product/Get-List-Products`, {
            pageSize: pageSize,
            currentPage: currentPage,
            searchByFields: [],
            sortByFields: [
                {
                    "colName": "createdTime",
                    "sortDirection": "desc"
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
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="relative">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0">
                <h1 className="text-3xl font-bold">Sản Phẩm Mới</h1>
                <div className="flex justify-between mb-3">
                    <div></div>
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
                            <img loading="lazy" className="rounded-xl" src={`${product?.productImages[0]?.image}?width=530`} alt={product?.name} title={product?.name}/>
                            <div className="mt-3 text-base lg:text-lg font-bold text-center capitalize">{product?.name}</div>
                            {product?.dutyFrom != null ? <div className='text-base font-bold py-2 text-center'>{`(Duty sân bay ${product?.dutyFrom})`}</div> : ""}
                            <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-500 mb-3">
                                <div>{product?.bottle}ml</div>
                                <div>/</div>
                                <div>{product?.alcoholPercentage}%</div>
                            </div>
                            <div className="text-sm lg:text-base text-center font-bold mt-auto pb-0.5">
                                {product?.promotionPrice == 0 || product?.promotionPrice == null ? (product?.price != 0 ? Intl.NumberFormat('de-DE').format(product?.price) + 'đ' : "Liên hệ") :(product?.promotionPrice != 0 ? Intl.NumberFormat('de-DE').format(product?.promotionPrice) + 'đ' : "Liên hệ")}
                            </div>
                        </a>
                    ))}
                </div>
                <div className="text-right">
                    {total > pageSize ? (
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
    );
}
