export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ["/admin", '/private/'],
        },
        sitemap: 'https://ruoudutysanbay.com/sitemap.xml',
    }
}