'use client'
import axios from "axios";
import React, {useEffect, useState} from "react";
import CustomPagination from "@/components/Pagination";
import CustomSelect from "@/components/Select";

function Select({ options, defaultValue, onChange }) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <select value={value} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default function CategoryProduct({slug}) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(30);
    const [sortOption, setSortOption] = useState('asc');
    const pageSize = 30;
    useEffect(() => {
        axios.post(`https://api.ruoudutysanbay.com/LiquorExchange/Category/Get-Product-Category-By-Slug/${slug}`, {
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
        <div className="relative section-bg border-t">
            <div className="container mx-auto">
                <div className="flex flex-col py-5 lg:py-20 px-3">
                    <div className="flex justify-between">
                        <h1 className="lg:text-[36px] text-[18px] font-bold mb-8 lg:mb-14 my-auto">{`Tìm thấy ${total} sản phẩm`}</h1>
                        <CustomSelect
                            defaultValue="asc"
                            onChange={setSortOption}
                            options={[
                                {value: 'asc', label: 'Giá tăng dần'},
                                {value: 'desc', label: 'Giá giảm dần'},
                            ]}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mb-5">
                        {products.map((product) => (
                            <a href={`/product/${product?.slug}`} className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                                <img className="rounded-xl" src={`${product?.productImages[0]?.image}`} alt={product?.name} title={product?.name}/>
                                <div className="mt-3 text-base lg:text-lg font-bold text-center capitalize">{product?.name}</div>
                                {product?.dutyFrom != null ? <div className='text-base font-bold py-2 text-center'>{`(Duty sân bay ${product?.dutyFrom})`}</div> : ""}
                                <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-500 mb-3">
                                    <div>{product?.bottle}ml</div>
                                    <div>/</div>
                                    <div>{product?.alcoholPercentage}%</div>
                                </div>
                                <div className="text-sm lg:text-base text-center font-bold mt-auto pb-0.5">
                                    {product?.promotionPrice == 0 || product?.promotionPrice == null ? (product?.price != 0 ? Intl.NumberFormat('de-DE').format(product?.price) + 'đ' : "Liên hệ") : (product?.promotionPrice != 0 ? Intl.NumberFormat('de-DE').format(product?.promotionPrice) + 'đ' : "Liên hệ")}
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="flex justify-end lg:justify-between border-t-[1px] pt-5">
                        <div className="px-5 text-right my-auto hidden lg:block">
                            {total > currentPage * pageSize ? (
                                <div className="my-auto flex gap-2">
                                    <label className="my-auto">Đang xem:</label>
                                    <div className="border-[1px] border-gray-400 rounded-full p-2 py-1 my-auto">{currentPage * pageSize}</div>
                                    <label className="my-auto"> của {total} sản phẩm</label>
                                </div>
                            ) : (
                                <div className="my-auto">
                                    Hiển thị tất cả {total} sản phẩm
                                </div>
                            )}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
