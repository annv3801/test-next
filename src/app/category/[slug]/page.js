import CategoryImage from "@/pages/CategoryPage/CategoryImage";
import CategoryProduct from "@/pages/CategoryPage/CategoryProduct";
import axios from "axios";
import NewsCategory from "@/pages/NewsPage/NewsCategory";

async function getData(params) {
    try {
        const slug = params.params.slug;
        const response = await axios.get(`https://api.ruoudutysanbay.com/LiquorExchange/Category/Get-Category-By-Slug/${slug}`, {
            headers: {
                'Accept': 'text/plain',
            },
        });

        return response?.data?.data;
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export async function generateMetadata(params) {
    let data;
    let title;
    let description;
    let images;
    if (params.params.slug === 'tin-tuc') {
        title = 'Rượu Duty Sân Bay - Tin tức';
        description = 'Chuyên mua bán rượu - Tin tức';
        images = 'https://api.ruoudutysanbay.com/Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg';
    } else {
        data = await getData(params);
        title = `Rượu Duty Sân Bay - ${data?.name != null ? data?.name.autoCapitalize : ""}`;
        description = `Chuyên mua bán rượu - ${data?.name != null ? data?.name.autoCapitalize : ""}`;
        images = data ? `https://api.ruoudutysanbay.com/Uploads/${data?.image != null ? data?.image : ""}?width=1920&height=700` : '';
    }
    return {
        title: title,
        description: description,
        siteName: "Rượu Duty Sân Bay",
        url: "https://ruoudutysanbay.com/",
        type: "website",
        openGraph: {
            images: images,
        },
    }
}

export default async function Category(params) {
    if (params.params.slug === 'tin-tuc') {
        return <NewsCategory />; // Render the News component if slug is 'tin-tuc'
    }
    return (
        <div>
            <CategoryImage slug={params.params.slug}></CategoryImage>
            <CategoryProduct slug={params.params.slug}></CategoryProduct>
        </div>
    );
}
