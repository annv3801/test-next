export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ["/admin", '/private/'],
        },
        sitemap: 'http://localhost:3000/sitemap.xml',
    }
}