import axios from "axios";
import TagProduct from "@/pages/TagPage/TagProduct";

async function getData(params) {
    try {
        const slug = params.params.slug;
        const response = await axios.get(`https://api.ruoudutysanbay.com/LiquorExchange/Tag/Get-Tag-By-Slug/${slug}`, {
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
    data = await getData(params);
    title = `RƯỢU DUTY SÂN BAY - ${data?.name != null ? data?.name.toUpperCase() : ""}`;
    description = `Chuyên mua bán rượu - ${data?.name != null ? data?.name.toUpperCase() : ""}`;
    images = data ? `https://api.ruoudutysanbay.com/Uploads/${data?.image != null ? data?.image : ""}?width=1920&height=700` : '';
    return {
        title: title,
        description: description,
        siteName: "RƯỢU DUTY SÂN BAY",
        url: "https://ruoudutysanbay.com/",
        type: "website",
        openGraph: {
            images: images,
        },
    }
}

export default async function Tag(params) {
    return (
        <div>
            <TagProduct slug={params.params.slug}></TagProduct>
        </div>
    );
}
