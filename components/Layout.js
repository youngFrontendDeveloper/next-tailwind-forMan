import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header.js';
import Footer from './Footer.js';

export default function Layout({ title, children, description, keywords }) {
  return (
    <>
      <Head>
        <title>{title ? title + '- For Man' : 'For Man'}</title>
        <meta name="description" content={description ? description : ''} />
        <meta
          name="keywords"
          content={`интернет-магазин ForMan, одежда для мужчин, купить рубашки, купить брюки, свитшоты, стильная одежда, купить онлайн, купить одежду не выходя из дома, ${
            keywords ? keywords : ''
          }`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <Header />
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
}
