'use client'
import axios from "axios";
import React, {useEffect, useState, useMemo, useCallback} from "react";
import CustomPagination from "@/components/Pagination";
import CustomSelect from "@/components/Select";
import Image from "next/image";
import Link from "next/link";
import debounce from 'lodash/debounce';

const DEBOUNCE_DELAY = 300;

export default function CategoryProduct({slug}) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(30);
    const [sortOption, setSortOption] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const pageSize = 30;

    // Memoize the fetch function to prevent unnecessary re-renders
    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `https://api.ruoudutysanbay.com/LiquorExchange/Category/Get-Product-Category-By-Slug/${slug}`,
                {
                    pageSize: pageSize,
                    currentPage: currentPage,
                    searchByFields: [],
                    sortByFields: [
                        {
                            "colName": "price",
                            "sortDirection": sortOption
                        }
                    ]
                },
                {
                    // Add caching headers
                    headers: {
                        'Cache-Control': 'max-age=3600'
                    }
                }
            );
            setProducts(response.data?.data.data || []);
            setTotal(response.data?.data.total || 0);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [slug, currentPage, sortOption]);

    // Debounce sort changes to prevent rapid API calls
    const debouncedSort = useMemo(
        () => debounce((value) => {
            setSortOption(value);
        }, DEBOUNCE_DELAY),
        []
    );

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    // Memoize display text
    const displayText = useMemo(() => {
        if (total > currentPage * pageSize) {
            return `Hiển thị ${currentPage * pageSize} sản phẩm | ${total} sản phẩm`;
        }
        return `Hiển thị tất cả ${total} sản phẩm`;
    }, [total, currentPage, pageSize]);

    if (error) {
        return <div className="text-center text-red-500 py-5">{error}</div>;
    }

    return (
        <div className="relative">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0">
                <div className="flex justify-between mb-3">
                    <CustomSelect
                        defaultValue="asc"
                        onChange={debouncedSort}
                        options={[
                            { value: 'asc', label: 'Giá tăng dần' },
                            { value: 'desc', label: 'Giá giảm dần' },
                        ]}
                    />
                    <div className="px-5 text-right my-auto">{displayText}</div>
                </div>

                <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5">
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: pageSize }).map((_, index) => (
                            <div key={`skeleton-${index}`} className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
                        ))
                    ) : (
                        products.map((product) => (
                            <Link
                                href={`/product/${product?.slug}`}
                                key={product.id || product.slug}
                                className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out"
                            >
                                <img className="rounded-xl" src={product?.productImages[0]?.image} alt={product?.name} title={product?.name}/>
                                <div className="mt-3 text-base lg:text-lg font-bold text-center capitalize">{product?.name}</div>
                                {product?.dutyFrom != null ? <div className='text-base font-bold pb-2 text-center'>{`(Duty sân bay ${product?.dutyFrom})`}</div> : ""}
                                <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-500 mb-3">
                                    <div>{product?.bottle}ml</div>
                                    <div>/</div>
                                    <div>{product?.alcoholPercentage}%</div>
                                </div>
                                <div className="text-sm lg:text-base text-center font-bold mt-auto pb-0.5">
                                    {product?.promotionPrice == 0 || product?.promotionPrice == null ? (product?.price != 0 ? Intl.NumberFormat('de-DE').format(product?.price) + 'đ' : "Liên hệ") : (product?.promotionPrice != 0 ? Intl.NumberFormat('de-DE').format(product?.promotionPrice) + 'đ' : "Liên hệ")}
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                {total > pageSize && (
                    <CustomPagination
                        currentPage={currentPage}
                        total={total}
                        pageSize={pageSize}
                        handlePageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}
