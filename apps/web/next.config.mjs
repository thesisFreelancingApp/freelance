/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)", // Matches all routes
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*", // Replace '*' with a specific domain if needed
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,POST,PUT,DELETE,OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With, Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
