import axios from 'axios';
import ProductCarousel from "@/components/ProductCarousel";

async function getData() {
    try {
        const res = await axios.post('https://api.thumuaruouhn.online/LiquorExchange/Product/Get-List-Products-Best-Selling', {
                pageSize: 10,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
        return res.data?.data.data;
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export default async function HomeBestSelling() {
    const products = await getData()
    return (
        <div className="relative">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0 z-10 relative">
                <div className="heading text-center">
                    <h1 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10 z-10">Sản phẩm bán chạy</h1>
                </div>
                <ProductCarousel products={products}></ProductCarousel>
            </div>
        </div>
    );
}
