import ProductItem from "@/components/ProductItem";
import { Store } from "@/utils/Store";
import { useContext } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import db from "@/utils/db";
import Product from "@/models/Product";
import MainCarousel from "@/components/Carousel";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; // Перевод страницы с помощью next-i18next
import { useTranslation } from "next-i18next";
import SocialNetwork from "@/components/SocialNetwork";


export default function Home({ products, featuredProducts, locale }) {
  const { state, dispatch } = useContext( Store );
  const { cart } = state;
  const { t } = useTranslation( "common" );

  const addToCartHandler = async(product) => {
    const existItem = cart.cartItems.find( (item) => item.slug === product.slug );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get( `/api/products/${ product._id }` );

    if( data.countInStock < quantity ) {
      return toast.error( "Извините, продукт на складе закончился" );
    }

    dispatch( {
      type: "CART_ADD_ITEM",
      payload: {
        ...product,
        quantity,
      },
    } );
    toast.success( "Корзина обновлена" );
  };

  return (
    <>
      <Layout
        title="Home page"
        description="Ecommerce Website ForMan"
        keywords="товары магазина ForMan"
      >
        <MainCarousel featuredProducts={ featuredProducts } />

        <h2 className="h2 my-4 font-bold text-green-700 text-[30px]">
          { t( "title" )
            // Товары для мужчин
          }
        </h2>
        <p><a href="/price.docx" download className="text-sm italic">Скачать прайс формате .doc (14 kb)</a></p>
        <p><a href="/price.xlsx" download className="text-sm italic">Скачать прайс формате .exel (34kb)</a></p>
        <p className="mb-3"><a href="/price.pdf" download className="text-sm italic">Скачать прайс формате .pdf
          (39kb)</a></p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
          { products.map( (product, index) => (
            <ProductItem
              key={ product.slug }
              product={ product }
              index={ index }
              locale={ locale }
              addToCartHandler={ addToCartHandler }
            />
          ) ) }
        </div>
        <SocialNetwork />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find( { isFeatured: true } ).lean();

  await db.disconnect();
  return {
    props: {
      locale,
      ...( await serverSideTranslations( locale, [ "common", "footer", "product", "ProductScreen", "cart" ] ) ),
      featuredProducts: featuredProducts.map( db.convertDocToObj ),
      products: products.map( db.convertDocToObj ),
    },
  };
}

