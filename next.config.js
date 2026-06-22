/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BUILD_TRIGGER: "force_rebuild_v2"
  }
};

export default nextConfig;
