'use client'
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import CustomPagination from "@/components/Pagination";
import CustomSelect from "@/components/Select";

// Create axios instance with default config
const api = axios.create({
    baseURL: 'https://api.ruoudutysanbay.com',
    timeout: 5000
});

// Separate ProductCard component for better rendering performance
const ProductCard = React.memo(({ product }) => {
    const formattedPrice = useMemo(() => {
        const price = product?.promotionPrice == 0 || product?.promotionPrice == null
            ? product?.price
            : product?.promotionPrice;
        return price !== 0 ? Intl.NumberFormat('de-DE').format(price) + 'đ' : "Liên hệ";
    }, [product?.price, product?.promotionPrice]);

    return (
        <a
            href={`/product/${product?.slug}`}
            className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out"
        >
            <img
                className="rounded-xl"
                src={product?.productImages[0]?.image}
                alt={product?.name}
                title={product?.name}
                loading="lazy"
            />
            <div className="mt-3 text-base lg:text-lg font-bold text-center capitalize">
                {product?.name}
            </div>
            {product?.dutyFrom && (
                <div className='text-base font-bold pb-2 text-center'>
                    {`(Duty sân bay ${product?.dutyFrom})`}
                </div>
            )}
            <div className="flex justify-center text-xs lg:text-sm gap-1 mx-auto text-center text-gray-500 mb-3">
                <div>{product?.bottle}ml</div>
                <div>/</div>
                <div>{product?.alcoholPercentage}%</div>
            </div>
            <div className="text-sm lg:text-base text-center font-bold mt-auto pb-0.5">
                {formattedPrice}
            </div>
        </a>
    );
});

ProductCard.displayName = 'ProductCard';

export default function CategoryProduct({slug}) {
    const [state, setState] = useState({
        products: [],
        currentPage: 1,
        total: 30,
        sortOption: 'asc',
        isLoading: true
    });
    const pageSize = 30;

    const fetchProducts = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await api.post(`/LiquorExchange/Category/Get-Product-Category-By-Slug/${slug}`, {
                pageSize,
                currentPage: state.currentPage,
                searchByFields: [],
                sortByFields: [{
                    colName: "price",
                    sortDirection: state.sortOption
                }]
            });

            setState(prev => ({
                ...prev,
                products: response.data?.data.data || [],
                total: response.data?.data.total || 0,
                isLoading: false
            }));
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [slug, state.currentPage, state.sortOption]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handlePageChange = useCallback((page) => {
        setState(prev => ({ ...prev, currentPage: page }));
    }, []);

    const handleSortChange = useCallback((value) => {
        setState(prev => ({ ...prev, sortOption: value, currentPage: 1 }));
    }, []);

    const displayText = useMemo(() => {
        if (state.total > state.currentPage * pageSize) {
            return `Hiển thị ${state.currentPage * pageSize} sản phẩm | ${state.total} sản phẩm`;
        }
        return `Hiển thị tất cả ${state.total} sản phẩm`;
    }, [state.total, state.currentPage, pageSize]);

    if (state.isLoading) {
        return <div className="container mx-auto px-3 py-5">Đang tải...</div>;
    }

    return (
        <div className="relative">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0">
                <div className="flex justify-between mb-3">
                    <CustomSelect
                        defaultValue="asc"
                        onChange={handleSortChange}
                        options={[
                            { value: 'asc', label: 'Giá tăng dần' },
                            { value: 'desc', label: 'Giá giảm dần' },
                        ]}
                    />
                    <div className="px-5 text-right my-auto">
                        {displayText}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-5">
                    {state.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {state.total > pageSize && (
                    <div className="text-right">
                        <CustomPagination
                            currentPage={state.currentPage}
                            total={state.total}
                            pageSize={pageSize}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}