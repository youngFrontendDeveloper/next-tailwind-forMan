import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Logo from './Logo';
import SearchForm from './SearchForm';
import { Store } from '@/utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';
import Locale from './Locale';

export default function Header() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // console.log(session);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="h-16 shadow">
      <div className="container h-full mx-auto">
        <nav className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 h-full px-4">
          <Logo />
          <SearchForm />
          <div className="flex item-center gap-3">
            <CartIcon cartItemsCount={cartItemsCount} />

            {status === 'loading' ? (
              'Loading'
            ) : session?.user ? (
              <UserMenu
                session={session}
                logoutClickHandler={logoutClickHandler}
              />
            ) : (
              // <Menu as="div" className="relative flex">
              //   <Menu.Button className="text-green-600 text-[16px] ">
              //     {session.user.name}
              //   </Menu.Button>
              //   <Menu.Items className="absolute right-0 top-12 w-56 origin-top-right bg-white  shadow-lg z-10">
              //     <Menu.Item>
              //       <DropdownLink className="dropdown-link " href="/profile">
              //         Профиль
              //       </DropdownLink>
              //     </Menu.Item>
              //     <Menu.Item>
              //       <DropdownLink
              //         className="dropdown-link"
              //         href="/order-history"
              //       >
              //         История заказов
              //       </DropdownLink>
              //     </Menu.Item>
              //     {session.user.isAdmin && (
              //       <Menu.Item>
              //         <DropdownLink
              //           className="dropdown-link"
              //           href="/admin/dashboard"
              //         >
              //           Панель администратора
              //         </DropdownLink>
              //       </Menu.Item>
              //     )}
              //     <Menu.Item>
              //       <a
              //         className="dropdown-link hover:text-red-600"
              //         href="#"
              //         onClick={logoutClickHandler}
              //       >
              //         Выйти
              //       </a>
              //     </Menu.Item>
              //   </Menu.Items>
              // </Menu>
              // session.user.name
              <Link href="/login" className="w-[30px] flex items-center">
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
           <Locale />
        </nav>
      </div>
    </header>
  );
}
