/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    // 모든 SCSS 모듈에서 @use 'variables'로 전역 변수에 접근합니다.
    loadPaths: ['src/shared/styles'],
  },
};

export default nextConfig;
