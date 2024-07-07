'use client'
import axios from "axios";
import {useEffect, useState} from "react";
import CustomPagination from "@/components/Pagination";

export default function IntroducePage() {
    const [products, setProducts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 30;

    useEffect(() => {
        axios.get('https://api.ruoudutysanbay.com/Blog/View-Blog/INTRODUCE')
            .then((res) => {
                const listConfig = res.data?.data;
                setProducts(listConfig);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(`There was an error retrieving the data: ${error}`);
            });
    }, []);
    if (isLoading) {
        return <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div style={{
                border: '4px solid #f3f3f3',
                borderRadius: '50%',
                borderTop: '4px solid #3498db',
                width: '30px',
                height: '30px',
                animation: 'spin 2s linear infinite'
            }}/>
        </div>
    }
    return (
        <div className="relative">
            <div className="container mx-auto my-10">
                <div className="text-center text-3xl font-medium">{products.name}</div>
                <div className="bg-white rounded-3xl custom-font ck-content" dangerouslySetInnerHTML={{__html: products.content}}></div>
            </div>
        </div>
    );
}
