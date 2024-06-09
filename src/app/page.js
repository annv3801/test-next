import Carousel from "@/pages/HomePage/HomeCarousel";
import HomeIntroduce from "@/pages/HomePage/HomeIntroduce";
import HomeBestSelling from "@/pages/HomePage/HomeBestSelling";
import HomeNews from "@/pages/HomePage/HomeNews";
import HomeBrand from "@/pages/HomePage/HomeBrand";

export async function generateMetadata() {
    return {
        title: "Rượu Duty Sân Bay",
        description: "Rượu Duty Sân Bay - Chuyên mua bán thu mua rượu tại khu vực Hà Nội, phân phối rượu whisky chính hãng từ các thương hiệu nổi tiếng trên thế giới.",
        siteName: "Rượu Duty Sân Bay",
        url: "https://ruoudutysanbay.com/",
        type: "website",
        openGraph: {
            images: "https://api.thumuaruouhn.online/Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg",
        },
    }
}

export default async function Home() {
  return (
    <div>
        <Carousel></Carousel>
        <HomeIntroduce></HomeIntroduce>
        <HomeBestSelling></HomeBestSelling>
        <HomeNews></HomeNews>
        <HomeBrand></HomeBrand>
    </div>
  );
}
