import Layout from '@/components/Layout';
import RatingStars from '@/components/RatingStars';
import Product from '@/models/Product';
import db from '@/utils/db';
import { getError } from '@/utils/error';
import { Store } from '@/utils/Store';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function WritereviewScreen({ product }) {
  const router = useRouter();
  const pathOfPage = router.asPath;
  const { dispatch } = useContext(Store);
  const { data: session } = useSession();
  // const { user } = session ? session : 'null';
  // console.log(user ? user.name : 'нет юзера');
  const [ratingValue, setRatingValue] = useState(5);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    dispatch({
      type: 'PATH_SUCCESS',
      payload: pathOfPage,
    });
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('review'));
    if (data) {
      setValue('review', data.review);
      setRatingValue(data.rating);
      localStorage.clear();
    } else {
      return;
    }
  }, [setValue, setRatingValue]);

  console.log(pathOfPage);

  const submitHandler = async ({ review }) => {
    if (!session) {
      let data = {
        review: review,
        rating: ratingValue,
      };
      localStorage.setItem('review', JSON.stringify(data));
      toast.error('Войдите в свой профиль или зарегистрируйтесь');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }

    try {
      const { user } = session;
      await axios.put('/api/writereview', {
        id: product._id,
        name: user.name,
        review,
        rating: ratingValue,
      });
      toast.success('Отзыв успешно добавлен');
      setTimeout(() => {
        router.push(`/product/${product.slug}`);
      }, 1000);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
  };

  return (
    <Layout
      title={`Написать отзыв о товаре ${product.name}`}
      description={`Написать отзыв о товаре ${product.name}`}
      keywords={`написать отзыв о товаре, ${product.name}, ${product.slug}`}
    >
      <Link href={`/product/${product.slug}`} className="text-sm italic">
        Вернуться к описанию товара
      </Link>
      <h1>
        Отзыв о товаре <span>"{product.name}"</span>
      </h1>
      <div>
        <span> Общая оценка</span>
        <RatingStars
          rating={ratingValue}
          editRating={true}
          half={true}
          size={40}
          ratingChanged={ratingChanged}
        />
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto max-w-screen-md"
      >
        <label htmlFor="review">Отзыв</label>
        <textarea
          name="review"
          id="review"
          cols="30"
          rows="10"
          placeholder="Напишите отзыв"
          {...register('review', {
            required: ' Пожалуйста, заполните это поле',
          })}
        ></textarea>
        {errors.review && (
          <div className="text-red-500"> {errors.review.message}</div>
        )}

        <button className="primary-button" type="submit">
          Отправить
        </button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  console.log(product);
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
