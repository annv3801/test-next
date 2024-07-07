/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    images: {
        domains: ['api.ruoudutysanbay.com'],
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /@ant-design[\\/]icons/,
        });
        return config;
    },
};

export default nextConfig;