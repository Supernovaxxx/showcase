const { withContentlayer } = require('next-contentlayer')


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.licdn.com',
                port: '',
                pathname: '/dms/image/**'
            }
        ]
    }
}

module.exports = withContentlayer(nextConfig)
