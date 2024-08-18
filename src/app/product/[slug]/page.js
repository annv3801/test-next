import axios from "axios";
import ProductData from "@/pages/ProductPage/ProductData";

function stripHtmlTagsAndLimitWords(html, maxWords = 950) {
    if (!html) return "";

    // Remove all HTML tags, including image tags
    const textContent = html.replace(/<img[^>]*>/g, "").replace(/<[^>]*>/g, "").trim();

    // Split the text into words
    const words = textContent.split(/\s+/);

    // Limit to the specified number of words
    return words.slice(0, maxWords).join(" ");
}


function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function generateSEOKeywords(productName) {
    // Split the product name into words
    const words = productName ? productName.split(" ") : [];

    // Basic keywords: each word and combination of words
    let keywords = [];

    // Add individual words
    keywords.push(...words);

    // Add combinations
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j <= words.length; j++) {
            const phrase = words.slice(i, j).join(" ");
            if (phrase.length > 1) {
                keywords.push(phrase);
            }
        }
    }
    const pageNameVariations = [
        "Rượu Duty Sân Bay",
        "Ruou Duty San Bay",
        "Rượu Duty",
        "Ruou Duty",
        "Rượu",
        "Ruou",
        "Rượu xách tay",
        "Ruou xach tay",
        "Rượu ngoại",
        "Ruou ngoai",
        "Rượu ngoại chính hãng",
        "Ruou ngoai chinh hang",
    ];

    keywords.push(...pageNameVariations);
    // Remove duplicates
    keywords = [...new Set(keywords)];

    // Convert to lowercase for consistency, ensuring each keyword is defined
    keywords = keywords.filter(Boolean).map(keyword => keyword.toLowerCase());

    return keywords;
}

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
    const imageUrl = data?.productImages[0]?.imageJpeg || "";
    const capitalizedProductName = capitalizeFirstLetter(data?.name);
    const keywords = generateSEOKeywords(capitalizedProductName);
    const rawDescription = data?.description || data?.name;
    const plainTextDescription = stripHtmlTagsAndLimitWords(rawDescription);

    return {
        title: `Rượu Duty Sân Bay - ${data?.name != null ? capitalizedProductName : ""}`,
        description: plainTextDescription,
        siteName: "Rượu Duty Sân Bay",
        keywords: keywords.join(", "),
        url: `https://ruoudutysanbay.com/product/${params.params.slug}`,
        type: "website",
        openGraph: {
            title: `Rượu Duty Sân Bay - ${data?.name != null ? capitalizedProductName : ""}`,
            description: plainTextDescription,
            url: `https://ruoudutysanbay.com/product/${params.params.slug}`,
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
            title: `Rượu Duty Sân Bay - ${data?.name != null ? capitalizedProductName : ""}`,
            description: plainTextDescription,
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
    let data = await getData(params)
    return (
        <div>
            <div className="border-t">
                <div className="flex container px-8 py-4 gap-4">
                    <a href="/" className="my-auto">
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
                    <a href={`${data.productCategories[0]?.slug}`} className="my-auto font-bold hover:text-blue-500 line-clamp-2">{data.productCategories[0]?.name}</a>
                    <div className="my-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={20} height={20}>
                            <path fill="#bdbdbd" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
                        </svg>
                    </div>
                    <a href={`${params.params.slug}`} className="my-auto font-bold hover:text-blue-500 line-clamp-2">{data.name}</a>
                </div>
            </div>
            <ProductData slug={params.params.slug}></ProductData>
        </div>
    );
}
