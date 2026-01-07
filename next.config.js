/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    output: 'export',
    distDir: 'docs',
    assetPrefix: './',
}

module.exports = nextConfig
