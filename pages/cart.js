import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonAddToCart from "@/components/ButtonAddToCart";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function CartScreen({ locale, index }) {
  const router = useRouter();
  const { state, dispatch } = useContext( Store );
  const {
    cart: { cartItems },
  } = state;
  const { t } = useTranslation( [ "cart", ] );

  console.log(index);
  const removeItemHandler = (item) => {
    dispatch( { type: "CART_REMOVE_ITEM", payload: item } );
    toast.success( t( "cartUpdated" ) );
  };

  const updateCartHandler = async(item, qty) => {
    const quantity = Number( qty );
    const { data } = await axios.get( `/api/products/${ item._id }` );
    if( data.countInStock < quantity ) {
      return toast.error( t( "productIsOut" ) );
    }
    dispatch( { type: "CART_ADD_ITEM", payload: { ...item, quantity } } );
    toast.success( t( "cartUpdated" ) );
  };

  return (
    <Layout
      title="Корзина покупок"
      description="Страница корзины покупок"
      keywords="корзина покупок, покупки,"
    >
      <h1 className="mb-4 text-xl">{ t( "shoppingCart" ) }</h1>
      <Link href="/" className="text-sm italic">
        { t( "goShopping" ) }
      </Link>
      { cartItems.length === 0 ? (
        <div>
          { t( "cartEmpty" ) }{ " " }

        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="overflow-x-auto md:col-span-3 mb-3">
            <table className="min-w-full ">
              <thead className="border-b">
              <tr>
                <th className="p-5 text-left text-sm md:text-lg">
                  { t( `productName` ) }
                </th>
                <th className="p-5 text-right text-sm md:text-lg">
                  { t( "quantity" ) }
                </th>
                <th className="p-5 text-right text-sm md:text-lg">{ t( "price" ) }</th>
                <th className="p-5 text-sm md:text-lg">{ t( "deleteItem" ) }</th>
              </tr>
              </thead>
              <tbody>
              { cartItems.map( (item) => (
                <tr key={ item.slug } className="border-b">
                  <td>
                    <Link
                      href={ `/product/${ item.slug }` }
                      className="flex items-center"
                    >
                      <Image
                        src={ item.image }
                        alt={ item.name }
                        width={ 50 }
                        height={ 50 }
                        loading="lazy"
                        className="mr-5"
                      />

                      <span className="text-sm md:text-lg">{
                        // t( `productNames`, { returnObjects: true } )[index ]
                        item.name
                      }</span>
                    </Link>
                  </td>
                  <td className="p-5 text-right">
                    <select
                      value={ item.quantity }
                      onChange={ (e) =>
                        updateCartHandler( item, e.target.value )
                      }
                    >
                      { [ ...Array( item.countInStock ).keys() ].map( (item) => (
                        <option key={ item + 1 } value={ item + 1 }>
                          { item + 1 }
                        </option>
                      ) ) }
                    </select>
                  </td>
                  <td className="p-5 text-right">
                    {
                      locale === "en" ? "$" + ( item.price * 0.0132 ).toFixed( 2 ) :
                        locale === "fr" ? "€" + ( item.price * 0.012365 ).toFixed( 2 ) :
                          locale === "ja" ? "¥" + ( item.price * 1.78 ).toFixed( 2 ) :
                            ( item.price ).toFixed( 2 ) + " руб."
                      // item.price
                    }
                  </td>
                  <td className="p-2 text-center">
                    <button onClick={ () => removeItemHandler( item ) }>
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ) ) }
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-lg font-bold">
                  <span className="mr-3 font-[500] text-[18px]">{ t( "total" ) }</span>
                  {/* {cartItems.reduce((a, c) => a + c.quantity, 0)} товара
                  на сумму{' '} */ } <p>
                  {

                    locale === "en" ? "$" + cartItems.reduce( (a, c) => a + c.quantity * c.price * 0.0132, 0 ).toFixed( 2 ) :
                      locale === "fr" ? "€" + cartItems.reduce( (a, c) => a + c.quantity * c.price * 0.012365, 0 ).toFixed( 2 )  :
                        locale === "ja" ? "¥" + cartItems.reduce( (a, c) => a + c.quantity * c.price * 1.78, 0 ).toFixed( 2 )  :
                          cartItems.reduce( (a, c) => a + c.quantity * c.price, 0 ).toFixed( 2 ) + " руб."
                  }
                </p>
                </div>
              </li>
              <li>
                <ButtonAddToCart
                  action={ () => router.push( "login?redirect=/shipping" ) }
                  product=""
                  text={ t( "makePurchases" ) }
                />
              </li>
            </ul>
          </div>
        </div>
      ) }
    </Layout>
  );
}

export default dynamic( () => Promise.resolve( CartScreen ), { ssr: false } );

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      locale,
      ...( await serverSideTranslations( locale, [ "common", "cart" , "footer", "product", "ProductScreen", ] ) ),
    }
  };
}
