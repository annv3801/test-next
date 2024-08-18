'use client'
import axios from "axios";
import React, {useEffect, useState} from "react";
import CustomPagination from "@/components/Pagination";
import CustomSelect from "@/components/Select";

export default function ProductsListPage() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(30);
    const [sortOption, setSortOption] = useState('asc');
    const [searchValue, setSearchValue] = useState(''); // Add searchValue state
    const [inputValue, setInputValue] = useState(''); // Add inputValue state to track input field
    const [isExpanded, setIsExpanded] = useState(true);
    const pageSize = 30;

    useEffect(() => {
        axios.post(`https://api.ruoudutysanbay.com/LiquorExchange/Product/Get-List-Products`, {
            pageSize: pageSize,
            currentPage: currentPage,
            searchByFields: [
                {
                    searchFieldName: "name",
                    searchValue: searchValue // Use searchValue in the API call
                }
            ],
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
    }, [currentPage, sortOption, searchValue]); // Add searchValue as a dependency

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearchInputChange = (e) => {
        setInputValue(e.target.value); // Update inputValue when user types
    }

    const handleSearch = () => {
        setSearchValue(inputValue); // Set searchValue when search button is clicked
    }

    useEffect(() => {
        // Set initial expanded state based on window size
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsExpanded(true); // Expanded on larger screens
            } else {
                setIsExpanded(false); // Collapsible on smaller screens
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleExpand = () => {
        // Only toggle expand on smaller screens
        if (window.innerWidth < 1024) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="relative section-bg border-t">
            <div className="container mx-auto">
                <div className="flex flex-col py-5 lg:py-20 px-3 lg:px-8 gap-8 lg:gap-20">
                    <div className={`border-[1px] rounded-3xl px-[24px] pb-[18px] transition-all duration-300 ${isExpanded ? 'pt-[20px]' : 'pt-[20px]'}`}>
                        <div className="flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
                            <p className="text-center lg:text-[36px] text-[18px] font-bold text-gray-700">Tìm kiếm sản phẩm</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6 mt-6">
                                <label className="relative py-4 px-5 rounded-3xl border-[1px] border-gray-300 bg-white shadow-md flex items-center gap-2 fill-white flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="border-gray-300">
                                        <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Nhập tên rượu cần tìm"
                                        className="flex-grow w-0 height-[24px] text-base leading-6 border-none outline-none"
                                        style={{border: "none"}}
                                        value={inputValue}
                                        onChange={handleSearchInputChange}
                                    />
                                </label>
                                <button
                                    className="py-3 px-8 border-[1px] rounded-3xl border-gray-400 bg-blue-400 text-white text-[18px]"
                                    onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
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
                                    <img className="rounded-xl" src={`${product?.productImages[0]?.image}?width=530`} alt={product?.name} title={product?.name}/>
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
        </div>
    );
}
