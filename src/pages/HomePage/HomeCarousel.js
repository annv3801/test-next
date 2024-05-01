import axios from 'axios';
import {Carousel} from "antd";

async function getData() {
    try {
        const res = await axios.post('https://api.thumuaruouhn.online/Slide/View-List-Slides', {
                pageSize: 10,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
        return res.data?.data.data;
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export default async function HomeCarousel() {
    const data = await getData()
    return (
        <Carousel autoplay>
            {data.map((s) => {
                return (
                    <img src={`https://api.thumuaruouhn.online/Uploads/${s.image}?height=700&width=1920`} className="lg:h-full object-cover" alt={s.name} key={s.id}/>
                );
            })}
        </Carousel>
    );
}
