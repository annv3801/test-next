'use client'
import axios from "axios";
import {useEffect, useState} from "react";


export default function ProductConfigData() {
    const [configData, setConfigData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4444/Config/View-Config', {
                    headers: {
                        'Accept': 'text/plain',
                    },
                });

                setConfigData(response.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="flex gap-3">
            <div className="font-bold my-auto">Mua hàng liên hệ:</div>
            <div className="flex gap-3 my-auto">
                <a href={`${configData?.urlFacebook}`} className="border-[1px] border-gray-500 my-3 p-2 rounded-lg hover:bg-blue-800 group transition duration-500 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5 fill-current text-blue-700 group-hover:text-white transition-colors duration-500 ease-in-out">
                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
                    </svg>
                </a>
                <a href="#" className="border-[1px] border-gray-500 my-3 p-2 rounded-lg hover:bg-blue-800 group transition duration-500 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-blue-700 group-hover:text-white transition-colors duration-500 ease-in-out">
                        <path d="M256.6 8C116.5 8 8 110.3 8 248.6c0 72.3 29.7 134.8 78.1 177.9 8.4 7.5 6.6 11.9 8.1 58.2A19.9 19.9 0 0 0 122 502.3c52.9-23.3 53.6-25.1 62.6-22.7C337.9 521.8 504 423.7 504 248.6 504 110.3 396.6 8 256.6 8zm149.2 185.1l-73 115.6a37.4 37.4 0 0 1 -53.9 9.9l-58.1-43.5a15 15 0 0 0 -18 0l-78.4 59.4c-10.5 7.9-24.2-4.6-17.1-15.7l73-115.6a37.4 37.4 0 0 1 53.9-9.9l58.1 43.5a15 15 0 0 0 18 0l78.4-59.4c10.4-8 24.1 4.5 17.1 15.6z"/>
                    </svg>
                </a>
                <a href={`mailto:${configData?.email}`} className="border-[1px] border-gray-500 my-3 p-2 rounded-lg hover:bg-blue-800 group transition duration-500 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-blue-700 group-hover:text-white transition-colors duration-500 ease-in-out">
                        <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                    </svg>
                </a>
                <a href={`tel:${configData?.phoneNumber}`} className="border-[1px] border-gray-500 my-3 p-2 rounded-lg hover:bg-blue-800 group transition duration-500 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-blue-700 group-hover:text-white transition-colors duration-500 ease-in-out">
                        <path
                            d="M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 295.2 175.2 485.6 400.1 509.5c9.8 1 19.6 1.8 29.6 2.2c0 0 0 0 0 0c0 0 .1 0 .1 0c6.1 .2 12.1 .4 18.2 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM441.5 464C225.8 460.5 51.5 286.2 48.1 70.5l99.2-21.3 43 100.4L154.4 179c-18.2 14.9-22.9 40.8-11.1 61.2c30.9 53.3 75.3 97.7 128.6 128.6c20.4 11.8 46.3 7.1 61.2-11.1l29.4-35.9 100.4 43L441.5 464zM48 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0s0 0 0 0"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}
