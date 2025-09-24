/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://lh4.googleusercontent.com/**')]
    },
    serverExternalPackages: [
        'sequelize',
        'mysql2',
        'mariadb',
        'pg',
        'pg-hstore',
        'tedious',
        'sqlite3'
    ]
};

export default nextConfig;