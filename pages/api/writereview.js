import Product from "@/models/Product";
import db from "@/utils/db";

async function handler(req, res) {
  if( req.method !== "PUT" ) {
    return res.status( 400 ).send( { message: `${ req.method } not supported` } );
  }

  const { id, name, rating, review, } = req.body;

  if( !rating ) {
    res.status( 422 ).json( { message: "Rating error" } );
    return;
  } else if( !review ) {
    res.status( 422 ).json( { message: "Review error" } );
    return;
  }


  await db.connect();

  await Product.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        userRatings: {
          user: name,
          rating: rating,
          review: review,
        },
      },
    }
  ).exec();

  const product = await Product.findOne( { _id: id } );

  const totalRatings = product.userRatings.reduce((acc, item )=>{
    return acc + item.rating;
  }, 0);
  const numberOfRatings = product.userRatings.length;
  const totalRating = Number((totalRatings / numberOfRatings).toFixed(1));

  await Product.updateOne(
    { _id: id },
    {
      $set: { totalRating: totalRating }
    }
  ).exec();

  await db.disconnect();
  res.send( { message: "Reviews updated" } );
}

export default handler;
