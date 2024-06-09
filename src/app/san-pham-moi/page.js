import NewProductsPage from "@/pages/NewProduct/NewProductsPage";

export async function generateMetadata() {
    return {
        title: `RƯỢU DUTY SÂN BAY - SẢN PHẨM MỚI`,
        description: `Chuyên mua bán rượu - SẢN PHẨM MỚI`,
        siteName: "RƯỢU DUTY SÂN BAY",
        url: "https://ruoudutysanbay.com/",
        type: "website",
        openGraph: {
            images: `https://api.thumuaruouhn.online/Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg`,
        },
    }
}

export default async function NewProducts() {
    return (
        <div>
            <NewProductsPage></NewProductsPage>
        </div>
    );
}
