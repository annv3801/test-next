
export default async function sitemap() {
    const response = await fetch("https://api.thumuaruouhn.online/LiquorExchange/Product/Get-List-Products-Without-Pagination");
    const data = await response.json();

    const productEntries = data.data.map((data) => ({
        url: `https://ruoudutysanbay.com/product/${data.slug}`
    }))
    return [
        ...productEntries,
        'https://ruoudutysanbay.com'
    ]
}