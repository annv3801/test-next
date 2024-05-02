/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.thumuaruouhn.online'],
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /@ant-design[\\/]icons/,
        });

        return config;
    },
};

export default nextConfig;