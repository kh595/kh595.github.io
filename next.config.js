/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    output: 'export',
    distDir: 'docs',
    assetPrefix: 'https://kh595.github.io',
}

module.exports = nextConfig
