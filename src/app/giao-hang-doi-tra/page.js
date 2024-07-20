import DeliveryPage from "@/pages/Delivery/DeliveryPage";

export async function generateMetadata() {
    return {
        title: `Rượu Duty Sân Bay - Sản phẩm mới`,
        description: `Chuyên mua bán rượu - Sản phẩm mới`,
        siteName: "Rượu Duty Sân Bay",
        url: "https://ruoudutysanbay.com/",
        type: "website",
        openGraph: {
            images: `https://api.ruoudutysanbay.com/Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg`,
        },
    }
}

export default async function Delivery() {
    return (
        <div>
            <DeliveryPage></DeliveryPage>
        </div>
    );
}
