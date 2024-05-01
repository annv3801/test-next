import CategoryImage from "@/pages/CategoryPage/CategoryImage";
import CategoryProduct from "@/pages/CategoryPage/CategoryProduct";
import axios from "axios";

async function getData(params) {
    try {
        const slug = params.params.slug;
        const response = await axios.get(`https://api.thumuaruouhn.online/LiquorExchange/Category/Get-Category-By-Slug/${slug}`, {
            headers: {
                'Accept': 'text/plain',
            },
        });

        return response.data.data;
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export async function generateMetadata(params) {
    const data = await getData(params);
    return {
        title: `RƯỢU DUTY SÂN BAY - ${data.name.toUpperCase()}`,
        description: `Chuyên mua bán rượu - ${data.name.toUpperCase()}`,
        siteName: "RƯỢU DUTY SÂN BAY",
        url: "https://thumuaruouhn.online/",
        type: "website",
        openGraph: {
            images: `https://api.thumuaruouhn.online/Uploads/${data.image}?width=1920&height=700`,
        },
    }
}

export default async function Category(params) {
    const data = await getData(params);
    return (
        <div>
            <CategoryImage slug={params.params.slug}></CategoryImage>
            <CategoryProduct slug={params.params.slug}></CategoryProduct>
        </div>
    );
}
