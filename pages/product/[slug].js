import axios from 'axios';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '@/utils/Store';
import { toast } from 'react-toastify';
import db from '@/utils/db';
import Product from '@/models/Product';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  if (!product) {
    return <Layout title="Product not found">Продукт не найден</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Извините, продукт на складе закончился');
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        quantity,
      },
    });
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/" className="text-sm italic">
          Вернуться к товарам
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            loading="lazy"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg font-bold">{product.name}</h1>
            </li>
            <li>
              {' '}
              <span className="italic"> Категория:</span> {product.category}{' '}
            </li>
            <li>
              <span className="italic"> Бранд:</span> {product.brand}
            </li>
            <li>
              <span className="italic"> Описание:</span> {product.description}
            </li>
            <li>
              {product.rating} из {product.numReviews} просмотров
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div className="font-bold">Цена</div>
              <div>{product.price} руб.</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div className="font-bold">Статус</div>
              <div>
                {product.countInStock > 0 ? 'В наличии' : 'Нет в наличии'}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
