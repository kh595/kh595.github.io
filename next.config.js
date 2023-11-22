/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,    
    basePath: process.env.NODE_ENV === 'production' ? '/kh595.github.io' : '',
    trailingSlash: true,
}

module.exports = nextConfig
