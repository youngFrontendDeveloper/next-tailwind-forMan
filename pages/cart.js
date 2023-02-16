import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Корзина покупок</h1>
      {cartItems.length === 0 ? (
        <div>
          Корзина пуста.{' '}
          <Link href="/" className="text-sm italic">
            Перейти к покупкам
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Link href="/" className="text-sm italic">
              Перейти к покупкам
            </Link>
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Название товара</th>
                  <th className="p-5 text-right">Количество</th>
                  <th className="p-5 text-right">Цена</th>
                  <th className="p-5">Удалить товар</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          loading="lazy"
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((item) => (
                          <option key={item + 1} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :{' '}
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} руб.
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-full"
                >
                  Оформление покупок
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
