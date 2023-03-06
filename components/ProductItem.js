import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ButtonAddToCart from './Button';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} className="grow-0">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          loading="lazy"
          className="rounded shadow object-cover h-64 w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-between p-3 grow">
        <Link href={`/product/${product.slug}`} className="mb-auto">
          <h2 className="text-lg text-center font-[500] text-green-600">
            {product.name}
          </h2>
        </Link>
        <p className="mb-2 text-sm italic ">{product.brand}</p>
        <p className="mb-3 font-[500]">{product.price} руб.</p>
        <ButtonAddToCart
          action={addToCartHandler}
          product={product}
          text="Добавить в корзину"
        />
      </div>
    </div>
  );
}
