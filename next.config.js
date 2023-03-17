/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  i18n,
  // i18n: {
  //   locales: ['ru', 'en', ],
  //   defaultLocale: 'ru',
  // },
  // domains: [
  //   {
  //     domain: 'http://localhost:3000/',
  //     defaultLocale: 'ru',
  //   },
  //   {
  //     domain: 'http://localhost:3000/en',
  //     defaultLocale: 'en',
  //   },
  //   {
  //     domain: 'http://localhost:3000/fr',
  //     defaultLocale: 'fr',
  //   },
  //   {
  //     domain: 'http://localhost:3000/ja',
  //     defaultLocale: 'ja',
  //   },
  // ],
};

module.exports = nextConfig;
