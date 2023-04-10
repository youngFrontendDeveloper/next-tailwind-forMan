import axios from "axios";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "@/utils/Store";
import { toast } from "react-toastify";
import db from "@/utils/db";
import Product from "@/models/Product";
import ButtonAddToCart from "@/components/ButtonAddToCart";
import RatingStars from "@/components/RatingStars";
import UserRating from "@/components/UserRating";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ProductScreen(props) {
  const { product } = props;
  const { locale } = props;
  const { index } = props;
  const { state, dispatch } = useContext( Store );
  const { t } = useTranslation( "common" );

  if( !product ) {
    return (
      <Layout title="Product not found">
        <p>
          { t( "product not found" ) }
          {/*Продукт не найден*/ }
        </p>
        <Link href="/" className="text-sm italic">
          { t( "link-back" ) }
          {/*Вернуться к продуктам*/ }
        </Link>
      </Layout>
    );
  }

  const addToCartHandler = async() => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
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
    <Layout title={ product.name }>
      <div className="py-2">
        <Link href="/" className="text-sm italic">
          { t( "link-back" ) }
          {/*Вернуться к товарам*/ }
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 mb-2">
          <Image
            src={ product.image }
            alt={ product.name }
            width={ 640 }
            height={ 640 }
            loading="lazy"
          />
        </div>
        <div className="mb-3">
          <h1 className="text-lg font-[500] text-green-600">
            {
              t( `productNames`, { returnObjects: true } )[ index ]
              // product.name
            }
          </h1>

          <div className="text-[18px]">
            <span className="italic mr-3 font-[500]">
              { t( "description" ) }
              {/*Описание:*/ }
            </span>{ " " }
            {
              ( t( `productDescriptions`, { returnObjects: true } )[ index ] ).slice( 0, 50 ) + "..."
              // product.description.slice( 0, 50 ) + "..."
            }
          </div>
          <RatingStars rating={ product.totalRating } editRating={ false } half={ true } />
          {/* <div> */ }
          {/* <span className="text-sm italic mr-3 font-[500]"> Рейтинг:</span>{' '} */ }
          {/* {product.rating} из {product.numReviews} просмотров */ }
          {/* </div> */ }
          {/* </ul> */ }
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              {/* <div className="font-[500]">Цена</div> */ }
              <div className="font-[500]">{
                locale === "en" ? "$" + ( product.price * 0.0132 ).toFixed( 2 ) :
                  locale === "fr" ? "€" + ( product.price * 0.012365 ).toFixed( 2 ) :
                    locale === "ja" ? "¥" + ( product.price * 1.78 ).toFixed( 2 ) :
                      product.price + " руб."
              } </div>
            </div>
            <div className="mb-2 flex justify-between">
              {/* <div className="font-[500]">Статус</div> */ }
              <div>
                { product.countInStock > 0 ? t( "inStock" ) : t( "outStock" ) }
              </div>
            </div>
            <ButtonAddToCart
              action={ addToCartHandler }
              product={ product }
              index={index}
              text={ t( "addToCart" ) }
              // text="Добавить в корзину"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <h2 className="text-lg italic mr-3 mb-1 font-[500]">
            { t( `category` ) }
            {/*Категория:*/ }
          </h2>
          <p>{ t( `productCategories`, { returnObjects: true } )[ index ] }</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg italic mr-3 mb-1 font-[500]">
            { t( "brand" ) }
            {/*Бренд:*/ }
          </h2>
          <p> { product.brand }</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg italic mr-3 mb-1 font-[500]">
            { t( "description" ) }
            {/*Описание:*/ }
          </h2>
          <p>{ t( "productDescriptions", { returnObjects: true } )[ index ] }</p>
        </div>
        <div>
          <div className="mb-4">
            <h2 className="text-lg italic mr-3 mb-1 font-[500]">
              { t( "reviews" ) }
              {/*Отзывы:*/ }
            </h2>
            <UserRating userRatings={ product.userRatings } i={ 2 } />
            <Link
              href={ `/product/${ product.slug }/review` }
              className="text-sm italic"
            >
              { t( "go-to-reviews" ) }
              {/*Перейти к отзывам*/ }
            </Link>
          </div>
          <div className="mb-4">
            <Link
              href={ `/product/${ product.slug }/writereview` }
              className="primary-button text-[16px] text-green-600 font-[500]"
            >
              { t( "write-review" ) }
              {/*Написать отзыв*/ }
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { locale } = context;
  const { slug } = params;

  await db.connect();
  const data = await Product.find().lean();
  const products = data.map( db.convertDocToObj );
  const product = await Product.findOne( { slug } ).lean();
  const index = products.map( item => {
    return item.slug;
  } ).indexOf( slug );

  await db.disconnect();

  return {
    props: {
      index,
      locale,
      product: product ? db.convertDocToObj( product ) : null,
      ...( await serverSideTranslations( locale, [ "common", "footer", "product", ] ) ),
    },
  };
}
