import Product from '@/models/Product';
import db from '@/utils/db';
// import { getSession } from 'next-auth/react';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const { id, name, rating, review } = req.body;

  if (!rating || !review) {
    res.status(422).json({ message: 'Rating or review error' });
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
  );

  await db.disconnect();
  res.send({ message: 'Reviews updated' });
}

export default handler;
