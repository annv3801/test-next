import React from 'react';
import axios from "axios";
async function getData(params) {
    try {
        const slug = params.params.slug;
        const response = await axios.get(`https://api.thumuaruouhn.online/LiquorExchange/News/Get-News-By-Slug/${slug}`,
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })

        return response?.data?.data;
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}
export default async function NewsDetail(params) {
    const product = await getData(params);
    let formattedDate = '';
    if (product?.createdTime) {
        const createdTime = product.createdTime; // "18-04-2024 14:56:57"
        const date = new Date(createdTime.split(" ")[0].split("-").reverse().join("-") + "T" + createdTime.split(" ")[1]);
        formattedDate = ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + ', ' + ("0" + date.getDate()).slice(-2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
    }
    return (
        <div>
            <div className="bg-[#edf0f3]">
                <div className="container mx-auto py-8">
                    <div className="bg-white px-20 py-9 rounded-xl">
                        <h1 className="font-bold text-3xl">{product?.name}</h1>
                        <div className="my-6 py-3 border-t border-b font-semibold text-base-content-300">
                            <div className="flex items-center space-x-2">
                                <div>Ngày tạo: {formattedDate}</div>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: product?.description}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}