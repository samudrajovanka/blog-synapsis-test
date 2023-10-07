/** @type {import('next').NextConfig} */

const getHost = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://blog-synapsis-test.vercel.app';
  }
  return process.env.VERCEL ? `https://blog-synapsis-test.vercel.app` : 'http://localhost:3000';
};

const nextConfig = {
  env: {
    BASE_URL: getHost()
  },
}

module.exports = nextConfig
