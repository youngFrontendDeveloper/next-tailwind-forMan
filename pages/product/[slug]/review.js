import Layout from '@/components/Layout';
import UserRating from '@/components/UserRating';
import Product from '@/models/Product';
import db from '@/utils/db';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function ReviewScreen({ product }) {
  const { query } = useRouter();
  const slug = query.slug;
  const userRatings = product.userRatings;

  return (
    <Layout
      title={`Отзывы покупателей о товаре ${product.name}`}
      description={`Отзывы покупателей о товаре ${product.name}`}
      keywords={`отзывы, ${product.name}, ${product.slug}`}
    >
      <Link href={`/product/${slug}`} className="text-sm italic">
        Вернуться к описанию товара
      </Link>
      <h1 className="text-lg font-[500] text-green-600">Отзывы</h1>
      <UserRating i={userRatings.length} userRatings={userRatings} />
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
