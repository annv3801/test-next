export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ["/admin", '/private/'],
        },
        sitemap: 'https://thumuaruouhn.online/sitemap.xml',
    }
}