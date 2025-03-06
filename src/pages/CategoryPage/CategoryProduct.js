'use client'
import axios from "axios";
import React, {useEffect, useState, useMemo, useCallback, useTransition} from "react";
import CustomPagination from "@/components/Pagination";
import CustomSelect from "@/components/Select";
import Image from "next/image";
import Link from "next/link";
import debounce from 'lodash/debounce';

// Create axios instance with default config
const api = axios.create({
    baseURL: 'https://api.ruoudutysanbay.com/LiquorExchange',
    headers: {
        'Cache-Control': 'max-age=3600',
    }
});

const DEBOUNCE_DELAY = 300;
const PAGE_SIZE = 30;

export default function CategoryProduct({slug, initialData = null}) {
    const [products, setProducts] = useState(initialData?.products || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(initialData?.total || 30);
    const [sortOption, setSortOption] = useState('asc');
    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState(null);
    const [isPending, startTransition] = useTransition();

    // Pre-calculate the request payload
    const getRequestPayload = useCallback((page, sort) => ({
        pageSize: PAGE_SIZE,
        currentPage: page,
        searchByFields: [],
        sortByFields: [{
            "colName": "price",
            "sortDirection": sort
        }]
    }), []);

    // Optimized fetch function with caching and error handling
    const fetchProducts = useCallback(async () => {
        // Create cache key
        const cacheKey = `products-${slug}-${currentPage}-${sortOption}`;

        // Check session storage first
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
            const parsed = JSON.parse(cachedData);
            setProducts(parsed.data);
            setTotal(parsed.total);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await api.post(
                `/Category/Get-Product-Category-By-Slug/${slug}`,
                getRequestPayload(currentPage, sortOption)
            );

            const responseData = response.data?.data;

            // Store in session storage
            sessionStorage.setItem(cacheKey, JSON.stringify({
                data: responseData.data,
                total: responseData.total
            }));

            startTransition(() => {
                setProducts(responseData.data || []);
                setTotal(responseData.total || 0);
            });

            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [slug, currentPage, sortOption, getRequestPayload]);

    // Optimized debounced sort
    const debouncedSort = useMemo(
        () => debounce((value) => {
            startTransition(() => {
                setSortOption(value);
            });
        }, DEBOUNCE_DELAY),
        []
    );

    useEffect(() => {
        // Only fetch data if we don't have initialData or if sorting/pagination has changed
        if (!initialData || currentPage > 1 || sortOption !== 'asc') {
            fetchProducts();
        }

        // Prefetch next page
        const prefetchNextPage = async () => {
            if (currentPage * PAGE_SIZE < total) {
                const nextPageKey = `products-${slug}-${currentPage + 1}-${sortOption}`;
                if (!sessionStorage.getItem(nextPageKey)) {
                    try {
                        const response = await api.post(
                            `/Category/Get-Product-Category-By-Slug/${slug}`,
                            getRequestPayload(currentPage + 1, sortOption)
                        );
                        sessionStorage.setItem(nextPageKey, JSON.stringify({
                            data: response.data?.data.data,
                            total: response.data?.data.total
                        }));
                    } catch (error) {
                        console.error('Error prefetching next page:', error);
                    }
                }
            }
        };

        // Only prefetch if we're already displaying data
        if (!isLoading) {
            prefetchNextPage();
        }
    }, [fetchProducts, currentPage, total, slug, sortOption, getRequestPayload, initialData, isLoading]);

    const handlePageChange = useCallback((page) => {
        startTransition(() => {
            setCurrentPage(page);
        });
    }, []);

    const displayText = useMemo(() => {
        if (total > currentPage * PAGE_SIZE) {
            return `Hiển thị ${currentPage * PAGE_SIZE} sản phẩm | ${total} sản phẩm`;
        }
        return `Hiển thị tất cả ${total} sản phẩm`;
    }, [total, currentPage]);

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
                    {(isLoading || isPending) ? (
                        Array.from({ length: PAGE_SIZE }).map((_, index) => (
                            <div key={`skeleton-${index}`} className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
                        ))
                    ) : (
                        products.map((product) => (
                            <Link
                                href={`/product/${product?.slug}`}
                                key={product.id || product.slug}
                                className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out"
                            >
                                <div className="relative aspect-square w-full">
                                    <Image
                                        src={product?.productImages[0]?.image}
                                        alt={product?.name}
                                        title={product?.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        className="rounded-xl object-cover"
                                        loading="lazy"
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRoaHx4dHh4eHh4eHh4dHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDABUREhwYHBoXFxobHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                    />
                                </div>
                                <div className="mt-3 text-base lg:text-lg font-bold text-center capitalize">{product?.name}</div>
                            </Link>
                        ))
                    )}
                </div>
                {total > PAGE_SIZE && (
                    <CustomPagination
                        currentPage={currentPage}
                        total={total}
                        pageSize={PAGE_SIZE}
                        handlePageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
}