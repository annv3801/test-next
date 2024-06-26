import axios from "axios";
import ProductData from "@/pages/ProductPage/ProductData";

async function getData(params) {
    try {
        const slug = params.params.slug;
        const response = await axios.get(`https://api.thumuaruouhn.online/LiquorExchange/Product/Get-Product-By-Slug/${slug}`, {
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
    const data = await getData(params);
    return {
        title: `Rượu Duty Sân Bay - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
        description: `Chuyên mua bán rượu - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
        siteName: "Rượu Duty Sân Bay",
        url: "https://ruoudutysanbay.com/",
        type: "website",
        openGraph: {
            images: `${data?.productImages[0].image != null ? data?.productImages[0].image : ""} `,
        },
    }
}

export default async function Category(params) {
    const data = await getData(params);
    return (
        <div>
            <ProductData slug={params.params.slug}></ProductData>
        </div>
    );
}
