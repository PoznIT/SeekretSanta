/** @type {import('next').NextConfig} */

const backendApiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://83.228.210.115:8080'}/api`;

module.exports =  {
  output: 'standalone',
  env: {
    BFF_API_URL: backendApiUrl,
  }
}
