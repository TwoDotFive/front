/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: [
			'lgcxydabfbch3774324.cdn.ntruss.com',
			'csct3434.org',
			'fanpool-image-bucket.s3.ap-northeast-2.amazonaws.com',
		],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

export default nextConfig;
