/** @type {import('next').NextConfig} */

const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

module.exports =  {
  env: {
    BFF_API_URL: backendApiUrl,
  }
}
