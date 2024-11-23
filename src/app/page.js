import Carousel from "@/pages/HomePage/HomeCarousel";
import HomeIntroduce from "@/pages/HomePage/HomeIntroduce";
import HomeBestSelling from "@/pages/HomePage/HomeBestSelling";
import HomeNews from "@/pages/HomePage/HomeNews";
import HomeBrand from "@/pages/HomePage/HomeBrand";
import HomeProductNewest from "@/pages/HomePage/HomeProductNewest";

export async function generateMetadata() {
    return {
        title: "Rượu Duty Sân Bay Chính Hãng",
        description: "Rượu Duty Sân Bay - Chuyên mua bán rượu tại khu vực Hà Nội, phân phối rượu whisky chính hãng từ các thương hiệu nổi tiếng trên thế giới. Chuyên phân phối và bán lẻ các dòng rượu ngoại nhập như: Rượu vang, Rượu Whisky, Vodka, Cognac, Tequila, Gin, Rum, Sake, Bia, Soju, Absinthe,...",
        siteName: "Rượu Duty Sân Bay Chính Hãng",
        url: "https://ruoudutysanbay.com/",
        keywords: ["Rượu", "Ruou", "Ruou Duty", "Ruợu Duty", "Rượu Duty Sân Bay", "Ruou Duty San Bay", "Ruou duty san bay chinh hang", "Rượu Duty Sân Bay Chính hãng", "Chivas", "Maccallan", "Ruợu ngoại", "Ruou ngoai", "Ruợu ngoại chính hãng", "Ruou ngoai chinh hang"],
        type: "website",
        openGraph: {
            title: `Rượu Duty Sân Bay`,
            description: "Rượu Duty Sân Bay - Chuyên mua bán rượu tại khu vực Hà Nội, phân phối rượu whisky chính hãng từ các thương hiệu nổi tiếng trên thế giới. Chuyên phân phối và bán lẻ các dòng rượu ngoại nhập như: Rượu vang, Rượu Whisky, Vodka, Cognac, Tequila, Gin, Rum, Sake, Bia, Soju, Absinthe,...",
            url: `https://ruoudutysanbay.com/`,
            site_name: "Rượu Duty Sân Bay",
            type: "website",
            images: [
                {
                    url: "https://api.ruoudutysanbay.com/Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Product Image",
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `Rượu Duty Sân Bay`,
            description: "Rượu Duty Sân Bay - Chuyên mua bán rượu tại khu vực Hà Nội, phân phối rượu whisky chính hãng từ các thương hiệu nổi tiếng trên thế giới. Chuyên phân phối và bán lẻ các dòng rượu ngoại nhập như: Rượu vang, Rượu Whisky, Vodka, Cognac, Tequila, Gin, Rum, Sake, Bia, Soju, Absinthe,...",
            images: [
                {
                    url: "https://api.ruoudutysanbay.com/Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg",
                    width: 1200,
                    height: 600,
                    alt: "Product Image",
                }
            ],
        }
    }
}

export default async function Home() {
  return (
    <div>
        <Carousel></Carousel>
        <HomeIntroduce></HomeIntroduce>
        <HomeBestSelling></HomeBestSelling>
        <HomeProductNewest></HomeProductNewest>
        <HomeNews></HomeNews>
        <HomeBrand></HomeBrand>
    </div>
  );
}
