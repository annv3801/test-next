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
        title: `${data?.name != null ? capitalizedProductName : ""} - Rượu Duty Sân Bay`,
        description: plainTextDescription,
        siteName: "Rượu Duty Sân Bay",
        keywords: keywords.join(", "),
        url: `https://ruoudutysanbay.com/product/${params.params.slug}`,
        type: "website",
        openGraph: {
            title: `${data?.name != null ? capitalizedProductName : ""} - Rượu Duty Sân Bay`,
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
    return (
        <div>
            <ProductData slug={params.params.slug}></ProductData>
        </div>
    );
}
