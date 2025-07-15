const isBase = process.env.IS_BASE_PATH

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isBase ? '' : '/hub',
}

module.exports = nextConfig
