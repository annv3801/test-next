import {Carousel} from "antd";
//
// async function getData() {
//     try {
//         const res = await axios.post('https://api.thumuaruouhn.online/Slide/View-List-Slides', {
//                 pageSize: 10,
//                 currentPage: 1,
//                 searchByFields: [],
//                 sortByFields: [],
//             },
//             {
//                 headers: {
//                     'Accept': 'text/plain',
//                     'Content-Type': 'application/json'
//                 }
//             })
//         return res.data?.data.data;
//     } catch (error) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error(`There was an error retrieving the data: ${error}`);
//     }
// }

export default async function HomeIntroduce() {
    return (
        <div className="relative bg-[#edf0f3]">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0 z-10 relative">
                <div className="heading text-center">
                    <h1 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-[#edf0f3] px-5 md:px-10 z-10">Rượu Duty sân bay</h1>
                </div>
                <div className="text-center mx-5 pb-5">Shop Rượu – là đơn vị chuyên cung cấp rượu ngoại chính hãng, giá tốt tại Hà Nội. Được thành lập từ năm 1999, với hơn 20 năm kinh nghiệm chúng tôi luôn tự hào mang đến cho khách hàng từ trải nghiệm mua sắm đến chất lượng sản phẩm bậc nhất!</div>
            </div>
        </div>
    );
}
