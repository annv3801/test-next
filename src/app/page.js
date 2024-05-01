import axios from 'axios';

async function getData() {
    try {
        const res = await axios.get(
            'https://api.thumuaruouhn.online/LiquorExchange/News/Get-News/1050821045985280',
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            }
        );

        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
        const listSlider = res.data?.data;
        return listSlider;
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export async function generateMetadata() {
    const data = await getData()
    return {
        title: data.name,
        description: "hi",
        openGraph: {
            images: "https://www.google.com",
        },
    }
}

export default async function Home() {
    const data = await getData()
    console.log(data.name)
  return (
    <div>
        {data.name}
    </div>
  );
}
