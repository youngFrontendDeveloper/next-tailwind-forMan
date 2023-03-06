import ProductItem from '@/components/ProductItem';
import { Store } from '@/utils/Store';
import { useContext } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import db from '@/utils/db';
import Product from '@/models/Product';
import MainCarousel from '@/components/Carousel';

export default function Home({ products, featuredProducts }) {
  console.log(featuredProducts);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  console.log(products);

  const addToCartHandler = async (product, featuredProducts) => {
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
        <MainCarousel featuredProducts={featuredProducts} />
        <h2 className="h2 my-4 font-bold text-green-700 text-[30px]">
          Товары для мужчин
        </h2>
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
  const featuredProducts = await Product.find({ isFeatured: true }).lean();

  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
