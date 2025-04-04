'use client'
import axios from "axios";
import {useEffect, useState} from "react";


export default function CategoryImage({slug}) {
    const [category, setCategory] = useState({});
    useEffect(() => {
        axios.get(`https://api.ruoudutysanbay.com/LiquorExchange/Category/Get-Category-By-Slug/${slug}`,
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                const productData = res.data?.data;
                setCategory(productData);
            })
            .catch((error) => {
                console.error(`There was an error : ${error}`);
            });
    }, [slug]);
    return (
        <div>
            {category.image != null && category.image != "" ? (
                <div>
                    <img loading="lazy" src={`https://api.ruoudutysanbay.com/Uploads/${category.image}?width=1920&height=700`} className="w-full h-[200px] md:h-[700px] object-cover" alt={category.name} title={category.name}/>
                </div>
            ) : ''}
        </div>
    );
}
