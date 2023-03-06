import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Store } from '../utils/Store.js';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink.js';
import SearchForm from './SearchForm.js';
import Image from 'next/image.js';
import Logo from './Logo.js';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + '- For Man' : 'For Man'}</title>
        <meta name="description" content="Ecommerce Website ForChild" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header className="h-12 drop-shadow-md">
          <div className="container h-full mx-auto">
            <nav className="flex items-center justify-between gap-4 h-full px-4">
              <Logo />
              <SearchForm />
              <div className="flex gap-3">
                <Link href="/cart" className="min-w-[40px] relative ">
                  <Image
                    src="/images/cart-icon.svg"
                    alt="Корзина"
                    width={40}
                    height={40}
                    title="Корзина"
                  />
                  {cartItemsCount > 0 && (
                    <div className="absolute top-1 left-2 flex justify-center items-center rounded-full bg-red-600 w-[20px] h-[20px] text-[12px] font-[500] text-white">
                      {cartItemsCount}
                    </div>
                  )}
                </Link>

                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative flex">
                    <Menu.Button className="text-green-600 text-[16px] ">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 top-12 w-56 origin-top-right bg-white  shadow-lg z-10">
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link "
                          href="/profile"
                        >
                          Профиль
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          История заказов
                        </DropdownLink>
                      </Menu.Item>
                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Панель администратора
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <a
                          className="dropdown-link hover:text-red-600"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Выйти
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  // session.user.name
                  <Link href="/login" className="p-2">
                    <Image
                      src="/images/login-icon.svg"
                      alt="Войти"
                      width={30}
                      height={30}
                      title="Войти"
                    />
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="container flex h-10 justify-between items-center shadow-inner px-4">
          <p className="text-[12px] md:text-[16px]">
            Все права защищены &copy;2022
          </p>
          <Logo />
        </footer>
      </div>
    </>
  );
}
