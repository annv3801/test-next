import "./globals.css";
import Header from "@/components/Header";
import axios from "axios";
import Footer from "@/components/Footer";

async function getData() {
    try {
        const response = await axios.get('https://api.thumuaruouhn.online/Config/View-Config', {
            headers: {
                'Accept': 'text/plain',
            },
        });

        return response.data.data;
    } catch (error) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`There was an error retrieving the data: ${error}`);
    }
}

export default async function RootLayout({ children }) {
    const data = await getData()
  return (
    <html lang="en">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"/>
    </head>
    <body>
        <Header configData={data}></Header>
        {children}
        <Footer></Footer>
    </body>
    </html>
  );
}
