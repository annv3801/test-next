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
        title = `Rượu Duty Sân Bay - ${data?.name != null ? data?.name.toUpperCase() : ""}`;
        description = `Chuyên mua bán rượu - ${data?.name != null ? data?.name.toUpperCase() : ""}`;
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
    let data = await getData(params);
    if (params.params.slug === 'tin-tuc') {
        return <NewsCategory />; // Render the News component if slug is 'tin-tuc'
    }
    return (
        <div>
            <div className="border-t">
                <div className="flex container px-8 py-4 gap-4">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20} height={20}>
                            <path fill="#bdbdbd"
                                  d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                        </svg>
                    </a>
                    <div className="my-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={20} height={20}>
                            <path fill="#bdbdbd" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </svg>
                    </div>
                    <a href={`${params.params.slug}`} className="my-auto font-bold hover:text-blue-500 line-clamp-2">{data.name}</a>
                </div>
            </div>
            {/*<CategoryImage slug={params.params.slug}></CategoryImage>*/}
            <CategoryProduct slug={params.params.slug}></CategoryProduct>
        </div>
    );
}
