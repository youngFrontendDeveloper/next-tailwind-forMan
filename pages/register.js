import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  console.log(redirect);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Создать аккаунт</h1>
        <div className="mb-4">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Пожалуйста, введите имя',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Электронный адрес</label>
          <input
            type="text"
            className="w-full"
            id="email"
            {...register('email', {
              required: 'Пожалуйста, введите электронный адрес',
              pattern: {
                value: /^[a-zA-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Пожалуйста, введите валидный электронный адрес',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="w-full"
            id="password"
            {...register('password', {
              required: 'Пожалуйста, введите пароль',
              minLength: { value: 6, message: 'Должно быть более 5 знаков' },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPasword">Повторите пароль</label>
          <input
            type="password"
            className="w-full"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Пожалуйста, введите пароль повторно',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'Должно быть более 5 знаков',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}

          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">Пароли не совпадают</div>
            )}
        </div>

        <div className="mb-4">
          <button className="primary-button">Зарегистрироваться</button>
        </div>
        <div className="mb-4">
          {/* Don&apos;t have an account? &nbsp; */}
          Уже есть аккаунт?
          {/* <Link href={`/register?redirect=${redirect || '/'}`}>Войти</Link> */}
          <Link href="/login"> &nbsp;Войти</Link>
        </div>
      </form>
    </Layout>
  );
}
