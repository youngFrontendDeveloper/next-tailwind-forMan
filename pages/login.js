import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Электронная почта</label>
          <input
            type="email"
            className="w-full"
            id="email"
            autoFocus
            {...register('email', {
              required: 'Пожалуйста, введите электронную почту',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Пожалуйста, введите корректную электронную почту',
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
              minLength: {
                value: 6,
                message: 'Должно быть больше 6 знаков',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Войти</button>
        </div>
        <div className="mb-4">
          Нет аккаунта? &nbsp;
          <Link
            href={`/register?redirect=${redirect || '/'}`}
            className="text-sm italic"
          >
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </Layout>
  );
}
