import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
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
            autoFocus
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
          <Link href="register" className="text-sm italic">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </Layout>
  );
}
