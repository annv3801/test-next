import "./globals.css";
import Header from "@/components/Header";
import axios from "axios";
import Footer from "@/components/Footer";
import Script from "next/script";

async function getData() {
    try {
        const response = await axios.get(`https://api.ruoudutysanbay.com/Config/View-Config?timestamp=${new Date().getTime()}`, {
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
    <html lang="vi">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"/>
        <link rel="preload" href="https://api.ruoudutysanbay.com/Uploads/99c8a4c2-4b07-4996-bb24-b166918e7963.webp?height=700&width=1920" as="image" crossOrigin="anonymous"/>
    </head>
    <body>
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-DFR575JZTN`}/>
    <Script strategy="lazyOnload">
        {`
                window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-DFR575JZTN');
            `}
        </Script>

        <Header configData={data}></Header>
        {children}
        <Footer configData={data}></Footer>
    </body>
    </html>
  );
}
