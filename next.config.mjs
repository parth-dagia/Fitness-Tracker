/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
  // Disable static rendering for our pages since they rely on context that's only available client-side
  trailingSlash: true,
}

export default nextConfig
