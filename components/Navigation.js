import Logo from "@/components/Logo";
import SearchForm from "@/components/SearchForm";
import CartIcon from "@/components/CartIcon";
import UserMenu from "@/components/UserMenu";
import Link from "next/link";
import Image from "next/image";
import Locale from "@/components/Locale";
import React, { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import styles from "@/styles/Nav.module.css";

export default function Navigation() {
  const [ cartItemsCount, setCartItemsCount ] = useState( 0 );
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext( Store );
  const { cart } = state;

  // console.log(session);

  useEffect( () => {
    setCartItemsCount( cart.cartItems.reduce( (a, c) => a + c.quantity, 0 ) );
  }, [ cart.cartItems ] );

  const logoutClickHandler = () => {
    Cookies.remove( "cart" );
    dispatch( { type: "CART_RESET" } );
    signOut( { callbackUrl: "/login" } );
  };


  return (

    <nav
      // className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 h-full px-4"
      className={ styles.nav }
    >
      <Logo />

      <div className={`${styles["right-block"]} flex items-center justify-center gap-3`} >
        <CartIcon cartItemsCount={ cartItemsCount } />

        { status === "loading" ? (
          "Loading"
        ) : session?.user ? (
          <UserMenu
            session={ session }
            logoutClickHandler={ logoutClickHandler }
          />
        ) : (
          <Link href="/login" className={ `${ styles.login } w-[30px] h-[30px] flex items-center justify-self-end` }>
            <Image
              src="/images/login-icon.svg"
              alt="Войти"
              width={ 30 }
              height={ 30 }
              title="Войти"
            />
          </Link>
        ) }
        <Locale />
      </div>
      <SearchForm />

    </nav>
  );
}