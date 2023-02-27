import ProductItem from '@/components/ProductItem';
// import data from '@/utils/data';
import { Store } from '@/utils/Store';
import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import db from '@/utils/db';
import Product from '@/models/Product';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  // console.log(products);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((item) => item.slug === product.slug);
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
    toast.success('Корзина обновлена');
  };

  return (
    <>
      <Layout title="Home page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              key={product.slug}
              product={product}
              addToCartHandler={addToCartHandler}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  console.log(products);
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
