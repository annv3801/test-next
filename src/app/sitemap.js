
export default async function sitemap() {
    const response = await fetch("https://api.ruoudutysanbay.com/LiquorExchange/Product/Get-List-Products-Without-Pagination");
    const data = await response.json();

    const productEntries = data.data.map((data) => ({
        url: `https://ruoudutysanbay.com/san-pham/${data.slug}`
    }))
    return [
        ...productEntries,
        { url: 'https://ruoudutysanbay.com' },
        { url: 'https://ruoudutysanbay.com/san-pham-moi' },
    ]
}