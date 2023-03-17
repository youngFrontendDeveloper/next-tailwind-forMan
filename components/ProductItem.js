import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ButtonAddToCart from "./ButtonAddToCart";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import RatingStars from "./RatingStars";
import { useTranslation } from "next-i18next";

export default function ProductItem({ product, index, addToCartHandler, locale }) {
  const [ editRating, setEditRating ] = useState( true );
  const [ rating, setRating ] = useState( product.rating );
  const { data: session } = useSession();
  const { t } = useTranslation( "common" );

  const ratingChanged = (newRating) => {
    if( session?.user ) {
      setRating( rating + newRating );
    } else {
      return toast.error( "Войдите в систему" );
    }
    console.log( editRating );
    setEditRating( false );
  };

  return (
    <div className="card">
      <Link href={ `/product/${ product.slug }` } className="grow-0">
        <Image
          src={ product.image }
          alt={ product.name }
          width={ 640 }
          height={ 640 }
          loading="lazy"
          className="rounded shadow object-cover h-64 w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-between p-3 grow">
        <Link href={ `/product/${ product.slug }` } className="mb-auto">
          <h2 className="text-lg text-center font-[500] text-green-600">
            {/*{ product.name }*/ }
            { t( `productNames`, { returnObjects: true } )[ index ] }
          </h2>
        </Link>
        <p className="mb-2 text-sm italic ">{ product.brand }</p>
        <RatingStars
          size={ 20 }
          rating={ rating }
          editRating={ false }
          ratingChanged={ ratingChanged }
        />

        <p className="mb-3 font-[500]">{
          locale === "en" ? "$" + ( product.price * 0.0132 ).toFixed( 2 ) :
            locale === "fr" ? "€" + ( product.price * 0.012365 ).toFixed( 2 ) :
              locale==="ja" ? "¥" + ( product.price * 1.78).toFixed(2) :
                product.price + " руб."
        }
        </p>
        <ButtonAddToCart
          action={ addToCartHandler }
          product={ product }
          text={ t( "button" ) }
        />
      </div>
    </div>
  );
}
