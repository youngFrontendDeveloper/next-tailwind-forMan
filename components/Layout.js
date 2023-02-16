import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store.js';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + '- ForChild' : 'ForChild'}</title>
        <meta name="description" content="Ecommerce Website ForChild" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center justify-between shadow-md px-4">
            <Link href="/" className="text-lg font-bold">
              ForChild
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Корзина
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link href="/login" className="p-2">
                Войти
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-between items-center shadow-inner px-4">
          <p>Все права защищены &copy; 2022</p>
          <p>Электронный магазин &quot;ForChild&quot;</p>
        </footer>
      </div>
    </>
  );
}
