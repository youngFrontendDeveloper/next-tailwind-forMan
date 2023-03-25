import React from "react";
import RatingStars from "./RatingStars";

export default function UserRating({ userRatings, i }) {

  return (
    <>
      {
        userRatings.length > 0 ?
          userRatings.slice( 0, i ).map( (item) => (
            <div key={ item.user } className="review p-2">
              <h3 className="text-[16px] font-[500]">{ item.user }</h3>
              <RatingStars
                size={ 20 }
                rating={ item.rating }
                editRating={ false }
                half={ true }
              />
              <p>{ item.review }</p>
            </div>
          ) )
          : <p className="mb-3">К этому товару отзывов пока нет</p>
      }
    </>
  );
}
