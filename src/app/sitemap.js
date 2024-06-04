
export default async function sitemap() {
    const response = await fetch("http://localhost:4444/LiquorExchange/Product/Get-List-Products-Without-Pagination");
    const data = await response.json();

    const productEntries = data.data.map((data) => ({
        url: `https://thumuaruouhn.online/product/${data.slug}`
    }))
    return [
        ...productEntries
    ]
}