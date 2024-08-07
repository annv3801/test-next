import axios from "axios";
import ProductData from "@/pages/ProductPage/ProductData";

async function getData(params) {
    try {
        const slug = params.params.slug;
        const response = await axios.get(`https://api.ruoudutysanbay.com/LiquorExchange/Product/Get-Product-By-Slug/${slug}`, {
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
    const imageUrl = data?.productImages[0]?.image || "";

    return {
        title: `Rượu Duty Sân Bay - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
        description: `Chuyên mua bán rượu ngoại - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
        siteName: "Rượu Duty Sân Bay",
        url: "https://ruoudutysanbay.com/",
        type: "website",
        openGraph: {
            title: `Rượu Duty Sân Bay - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
            description: `Chuyên mua bán rượu - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
            url: "https://ruoudutysanbay.com/",
            site_name: "Rượu Duty Sân Bay",
            type: "website",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: data?.name || "Product Image",
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `Rượu Duty Sân Bay - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
            description: `Chuyên mua bán rượu - ${data?.name != null ? data?.name.toUpperCase() : ""}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 600,
                    alt: data?.name || "Product Image",
                }
            ],
        }
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
