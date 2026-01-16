/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    distDir: process.env.NODE_ENV === 'production' ? 'docs' : '.next',
}

module.exports = nextConfig
