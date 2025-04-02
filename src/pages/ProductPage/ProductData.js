'use client'
import axios from "axios";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ProductConfigData from "@/pages/ProductPage/ProductConfigData";
import {Spin, Carousel, Image} from "antd";

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export default function ProductData({slug, initialData}) {
    const [isLoading, setIsLoading] = useState(!initialData);
    const [product, setProduct] = useState(initialData || {}); // Use initialData if available
    const [viewedProducts, setViewedProducts] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const largeCarouselRef = useRef(null);
    const smallCarouselRef = useRef(null);

    useEffect(() => {
        // Only add to viewed products since we already have the data
        addViewedProduct({
            name: product.name,
            dutyFrom: product.dutyFrom,
            slug: product.slug,
            image: product.productImages?.[0]?.image,
            price: product.price,
            alcoholPercentage: product.alcoholPercentage,
            bottle: product.bottle,
            promotionPrice: product.promotionPrice
        });
    }, []);
    const addViewedProduct = (product) => {
        setViewedProducts(prevProducts => {
            // Check if the product is already in the list
            const productExists = prevProducts.some(prevProduct => prevProduct.name === product.name);

            // If the product is not in the list, add it
            if (!productExists) {
                let updatedProducts = [...prevProducts, product];

                // If the list has more than 12 items, remove the first one
                if (updatedProducts.length > 12) {
                    updatedProducts = updatedProducts.slice(1);
                }

                // Add the current timestamp to the list
                const timestampedProducts = {
                    timestamp: new Date().getTime(),
                    products: updatedProducts
                };

                localStorage.setItem('viewedProducts', JSON.stringify(timestampedProducts));
                return updatedProducts;
            }

            // If the product is already in the list, return the previous state
            return prevProducts;
        });
    };
    useEffect(() => {
        const loadViewedProducts = () => {
            const saved = localStorage.getItem('viewedProducts');
            const initialValue = JSON.parse(saved) || [];
            setViewedProducts(initialValue);
        };

        loadViewedProducts();
    }, []);


    useEffect(() => {
        // Get the current timestamp
        const now = new Date().getTime();

        // Get the items from the local storage
        const saved = localStorage.getItem('viewedProducts');
        const savedProducts = JSON.parse(saved);

        // If the items exist and are older than one day, clear the storage
        if (savedProducts && now - savedProducts.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('viewedProducts');
            setViewedProducts([]);
        } else if (savedProducts) {
            // Otherwise, if the items exist, set the state with the saved items
            setViewedProducts(savedProducts.products);
        }
    }, []);

    const matchingProducts = viewedProducts.filter(p => p.slug !== product?.slug);
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin />
            </div>
        );
    }

    // Check if there are any product images
    const productImages = product?.productImages || [];

    const handleImageChange = debounce((index) => {
        setCurrentImageIndex(index);
    }, 300);

    const handleSmallImageClick = (index) => {
        setCurrentImageIndex(index);
        largeCarouselRef.current.goTo(index);
    };

    if (productImages.length === 0) {
        return null;
    }

    const smallCarouselSettings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: productImages.length > 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(4, productImages.length),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(3, productImages.length),
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(2, productImages.length),
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div>
            <h1 className="text-[0px]">{product?.name}</h1>
            <div className="container mx-auto lg:my-7">
                {/*Top*/}
                <div className="lg:flex lg:justify-between block gap-8">
                    <div className="lg:w-[30%]">
                        <Carousel
                            ref={largeCarouselRef}
                            arrows
                            infinite
                            className="w-full h-full"
                            effect="fade"
                            autoplay
                            autoplaySpeed={4000}
                            afterChange={handleImageChange}
                            initialSlide={currentImageIndex}
                        >
                            {productImages.map((s, index) => (
                                <div className="w-full flex justify-center items-center" key={index}>
                                    <Image
                                        src={s.image}
                                        alt={`Product image ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="object-cover lg:rounded-lg"
                                    />
                                </div>
                            ))}
                        </Carousel>

                        <div className="w-full mt-4 relative hidden lg:block">
                            <Carousel ref={smallCarouselRef} {...smallCarouselSettings} dots={false}>
                                {productImages.map((s, index) => (
                                    <div
                                        className="flex justify-center cursor-pointer carousel-item"
                                        key={index}
                                        onClick={() => handleSmallImageClick(index)}
                                    >
                                        <div className={`relative ${index === currentImageIndex ? 'border-2 border-blue-500 rounded-lg' : ''} w-full`}>
                                            <img loading="lazy"
                                                src={s.image}
                                                alt={`Thumbnail image ${index + 1}`}
                                                className="object-cover rounded-lg h-full w-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                                {productImages.length < 4 &&
                                    Array.from({length: 4 - productImages.length}).map((_, idx) => (
                                        <div className="flex justify-center cursor-pointer carousel-item" key={`empty-${idx}`}>
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="lg:w-[45%] m-5 lg:m-0">
                        <h1 className="text-2xl font-extrabold uppercase">{product?.name}</h1>
                        {product?.dutyFrom != null ?
                            <div className='text-base font-bold py-2'>
                                {`(Duty sân bay ${product?.dutyFrom})`}
                            </div> : ""
                        }
                        <div className="h-1 border-t-2 w-[75%] border-gray-300 py-1"></div>
                        <div className="flex gap-1 font-bold text-gray-500">
                            <h3>{product?.bottle}ml</h3>
                            /
                            <h3>{product?.alcoholPercentage}%</h3>
                        </div>
                        {product?.promotionPrice == 0 || product?.promotionPrice == null ?
                            (<div className="flex gap-2 my-3 text-red-500 font-bold text-3xl">
                                {product?.price != 0 ? Intl.NumberFormat('de-DE').format(product?.price) + 'đ' : "Liên hệ"}
                            </div>) :
                            (<div className="flex gap-5 my-3 text-red-500 font-bold text-3xl">
                                {product?.promotionPrice != 0 ? Intl.NumberFormat('de-DE').format(product?.promotionPrice) + 'đ' : "Liên hệ"}
                                <div className="text-blue-500 text-xl my-auto line-through">
                                    {product?.price != 0 ? Intl.NumberFormat('de-DE').format(product?.price) + 'đ' : "Liên hệ"}
                                </div>
                            </div>)
                        }
                        <a href="#tasting" className="font-bold hover:text-blue-500">
                            Tasting notes (1)
                        </a>
                        <div className="flex gap-2 my-3">
                            <div className="font-bold">Trạng thái sản phẩm:</div>
                            <div className={`font-bold ${product?.isAvailable == true ? 'text-green-600' : 'text-red-600'} flex gap-1`}>
                                <div className={`${product?.isAvailable == true ? 'text-green-600 bg-green-600' : 'text-red-600 bg-red-600'} w-4 h-4 rounded-full my-auto`}></div>
                                {product?.isAvailable == true ? "Còn hàng" : "Liên hệ"}
                            </div>
                        </div>
                        <ProductConfigData></ProductConfigData>
                        <div className="mt-5 flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-10 h-10 md:w-7 md:h-7 my-auto">
                                <path
                                    style={{opacity: 0.4, fill: '#FC8181'}}
                                    d="M140.6 21.2C154.1 7.7 172.4 .1 191.5 .1h129c19.1 0 37.4 7.6 50.9 21.1L490.8 140.6c13.5 13.5 21.1 31.8 21.1 50.9v129c0 19.1-7.6 37.4-21.1 50.9L371.4 490.8c-13.5 13.5-31.8 21.1-50.9 21.1h-129c-19.1 0-37.4-7.6-50.9-21.1L21.2 371.4C7.7 357.9 .1 339.6 .1 320.5v-129c0-19.1 7.6-37.4 21.1-50.9L140.6 21.2zM256 128c-13.3 0-24 10.7-24 24V264c0 13.3 10.7 24 24 24s24-10.7 24-24V152c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                                />
                                <path
                                    fill="#B91C1C"
                                    className="fa-primary"
                                    d="M280 152c0-13.3-10.7-24-24-24s-24 10.7-24 24V264c0 13.3 10.7 24 24 24s24-10.7 24-24V152zM256 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                                />
                            </svg>
                            <div className="text-red-500 my-auto">
                                Bạn phải từ 18 tuổi trở lên mới được mua rượu ở Việt Nam
                            </div>
                        </div>
                        <div className="mt-5 text-gray-500">
                            Từ khóa:
                            {product?.productTags?.map((tag) => (
                                <div className="hover:text-blue-500 flex gap-1" key={tag?.id}>
                                    <div className="my-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5">
                                            <path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
                                        </svg>
                                    </div>
                                    <a href={`/tag/${tag?.slug}`}>
                                        {tag?.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-[25%] border-2 rounded-xl h-full p-3 m-5 lg:m-0 md:block hidden">
                        <div className="text-center font-bold text-xl">
                            Cam kết từ chúng tôi
                        </div>
                        <div className="flex gap-3 mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8 my-auto">
                                <path
                                    d="M352 48H128c-8.8 0-16 7.2-16 16V96H240c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16H64V64C64 28.7 92.7 0 128 0H352c35.3 0 64 28.7 64 64V96h42.7c14.9 0 29.1 5.9 39.6 16.4l93.3 93.3c10.5 10.5 16.4 24.7 16.4 39.6V368h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H576c0 53-43 96-96 96s-96-43-96-96h-8H352 320 256c0 53-43 96-96 96s-96-43-96-96V368 288h48v44.8c14.1-8.2 30.5-12.8 48-12.8c35.5 0 66.6 19.3 83.2 48H320h32c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16zM557.7 239.6l-93.3-93.3c-1.5-1.5-3.5-2.3-5.7-2.3H416v96H558l-.2-.2-.2-.2zM208 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm272 48a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM48 160H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.8 0-16-7.2-16-16s7.2-16 16-16zM16 224H240c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                            </svg>
                            <div className="my-auto">Giao hàng nhanh chóng</div>
                        </div>
                        <div className="flex gap-4 mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-10 h-10 my-auto">
                                <path
                                    d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/>
                            </svg>
                            <div className="my-auto">Cam kết sản phẩm chính hãng, giá tốt nhất</div>
                        </div>
                    </div>
                </div>
                {/*End Top*/}
            </div>
            <div className="container mx-auto pt-5">
                <div className="heading text-center">
                    <h2 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10">Thông tin</h2>
                </div>
                <div className="grid grid-cols-2 px-4 md:grid-cols-3 gap-10">
                    {product?.productAttributes?.filter(attr => attr.attributeValue && attr.attributeValue.trim() !== "").map((attr) => (
                        <div className="flex gap-4" key={attr?.id}>
                            <div dangerouslySetInnerHTML={{__html: attr.svgIcon}} className="w-11 h-11 my-auto"></div>
                            <div className="flex flex-col my-auto">
                                <div className='uppercase font-bold'>{attr.name}</div>
                                    <div>{attr.attributeValue}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="heading text-center mt-10">
                    <h2 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10">Chi tiết</h2>
                </div>
                <div className="px-4" dangerouslySetInnerHTML={{__html: product?.description}}></div>
            </div>
            {/*End*/}

            {/*End*/}
            <div className="container mx-auto py-4">
                {product?.enjoy == null ? "" : (
                    <div>
                        <div className="heading text-center">
                            <h2 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10">TASTING NOTES</h2>
                        </div>
                        <div className="pt-5 mx-3 md:mx-0" id="tasting" dangerouslySetInnerHTML={{__html: product?.enjoy}}></div>
                    </div>
                )}

                {/*<h1 className="text-center text-xl border-b-[1px] pt-10 pb-3 font-bold">Đánh giá</h1>*/}
                {/*<div className="bg-[#eeece3] rounded-xl mt-5 mx-3 md:mx-0">*/}
                {/*    <form action="" className="p-5" onSubmit={handleSubmit}>*/}
                {/*        <label className="block mb-4">*/}
                {/*        <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">*/}
                {/*            Ý KIẾN CỦA BẠN VỀ SẢN PHẨM*/}
                {/*        </span>*/}
                {/*            <textarea rows='4' name="name" onChange={(e) => setName(e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Nhận xét"/>*/}
                {/*        </label>*/}
                {/*        <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">*/}
                {/*            ĐÁNH GIÁ CỦA BẠN?*/}
                {/*        </span>*/}
                {/*        <div className="flex gap-1 mb-3">*/}
                {/*            {[...Array(5)].map((star, index) => {*/}
                {/*                const ratingValue = index + 1;*/}
                {/*                return (*/}
                {/*                    <label key={index}>*/}
                {/*                        <input*/}
                {/*                            type="radio"*/}
                {/*                            name="rating"*/}
                {/*                            value={ratingValue}*/}
                {/*                            onClick={() => setRating(ratingValue)}*/}
                {/*                            className="hidden"*/}
                {/*                        />*/}
                {/*                        {ratingValue <= (hover || rating) ? (*/}
                {/*                            <svg*/}
                {/*                                xmlns="http://www.w3.org/2000/svg"*/}
                {/*                                viewBox="0 0 576 512"*/}
                {/*                                className="h-6 md:h-8 w-6 md:w-8 cursor-pointer"*/}
                {/*                                fill="#ffc107"*/}
                {/*                                onMouseEnter={() => setHover(ratingValue)}*/}
                {/*                                onMouseLeave={() => setHover(0)}*/}
                {/*                            >*/}
                {/*                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>*/}
                {/*                            </svg>*/}
                {/*                        ) : (*/}
                {/*                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 md:h-8 w-6 md:w-8 cursor-pointer"*/}
                {/*                                 fill="#e4e5e9"*/}
                {/*                                 onMouseEnter={() => setHover(ratingValue)}*/}
                {/*                                 onMouseLeave={() => setHover(0)}>*/}
                {/*                                <path fill="#FFD43B"*/}
                {/*                                      d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>*/}
                {/*                            </svg>*/}
                {/*                        )*/}
                {/*                        }*/}
                {/*                    </label>*/}
                {/*                )*/}
                {/*                    ;*/}
                {/*            })}*/}
                {/*        </div>*/}
                {/*        <button className="rounded-xl bg-blue-400 text-white px-4 py-3">Gửi yêu cầu</button>*/}
                {/*    </form>*/}
                {/*</div>*/}
            </div>
            {product && product?.relatedProduct && product?.relatedProduct?.length > 0 ? (
                <div className="bg-[#edf0f3] py-5">
                    <div className="container mx-auto">
                        <div className="heading text-center">
                            <h2 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-[#edf0f3] px-5 md:px-10">Sản phẩm liên quan</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 px-2 md:px-0 pb-5">
                            {product?.relatedProduct?.map((product) => (
                                <a href={`/san-pham/${product?.slug}`} key={product.id} className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                                    <img loading="lazy" className="rounded-xl" src={product?.image} alt={product?.name} title={product?.name}/>
                                    <div className="mt-3 text-base lg:text-lg font-bold text-center">{product?.name}</div>
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
                    </div>
                </div>
            ) : ''}
            {matchingProducts.length > 0 ? (
                <div className="bg-white py-5">
                    <div className="container mx-auto">
                        <div className="heading text-center">
                            <h2 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10">Sản phẩm đã xem</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 px-2 md:px-0 pb-5">
                            {matchingProducts?.map((product) => (
                                <a href={`/san-pham/${product?.slug}`} key={product?.slug} className="bg-white px-1 py-1 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                                    <img loading="lazy" className="rounded-xl" src={product?.image} alt={product?.name} title={product?.name}/>
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
                    </div>
                </div>
            ) : ''}
        </div>
    );
}
