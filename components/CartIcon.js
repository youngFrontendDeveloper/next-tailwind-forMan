import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from "@/styles/Nav.module.css"

export default function CartIcon({ cartItemsCount }) {
  return (
    <Link href="/cart"
          className={`${styles.cart} w-[40px] relative justify-self-end`}
    >
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
  );
}
