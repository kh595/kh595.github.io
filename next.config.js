/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    output: 'export',
    distDir: process.env.NODE_ENV === 'production' ? 'docs' : '.next',
}

module.exports = nextConfig
