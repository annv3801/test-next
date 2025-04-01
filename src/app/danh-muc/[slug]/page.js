import CategoryImage from "@/pages/CategoryPage/CategoryImage";
import CategoryProduct from "@/pages/CategoryPage/CategoryProduct";
import axios from "axios";
import NewsCategory from "@/pages/NewsPage/NewsCategory";

async function getCategory(slug) {
    try {
        const response = await axios.get(`https://api.ruoudutysanbay.com/LiquorExchange/Category/Get-Category-By-Slug/${slug}`, {
            headers: {
                'Accept': 'text/plain',
            },
        });

        return response?.data?.data;
    }
    catch (error) {
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

async function getProducts(slug) {
    try {
        const response = await axios.post(
            `https://api.ruoudutysanbay.com/LiquorExchange/Category/Get-Product-Category-By-Slug/${slug}`,
            {
                pageSize: 30,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [{
                    "colName": "price",
                    "sortDirection": "asc"
                }]
            },
            {
                headers: {
                    'Accept': 'text/plain',
                }
            }
        );

        return response?.data?.data;
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return { data: [], total: 0 };
    }
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

export async function generateMetadata(params) {
    let data;
    let title;
    let description;
    let images;
    if (params.params.slug === 'tin-tuc') {
        title = 'Rượu Duty Sân Bay - Tin tức';
        description = 'Rượu Duty Sân Bay - Tin tức';
        images = 'https://api.ruoudutysanbay.com/Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg';
    } else {
        data = await getCategory(params.params.slug);
        const categoryName = data?.name ? capitalizeWords(data.name) : "";
        title = `Rượu ${categoryName} - Rượu Duty Sân Bay`;
        description = `Rượu Duty Sân Bay - chuyên bán rượu ${categoryName}`;
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
        return <NewsCategory />;
    }

    // Fetch initial products data on the server
    const productsData = await getProducts(params.params.slug);

    return (
        <div>
            {/*<CategoryImage slug={params.params.slug}></CategoryImage>*/}
            <CategoryProduct
                slug={params.params.slug}
                initialData={{
                    products: productsData.data,
                    total: productsData.total
                }}
            />
        </div>
    );
}