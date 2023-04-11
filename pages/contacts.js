import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import { toast } from "react-toastify";
import Image from "next/image";


export default function Contacts() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm( { mode: "onTouched", } );

  const sendFormHandler = async({ name, phone, email, message }) => {
    try {
      await axios.post( "/api/send-message", {
        name,
        phone,
        email,
        message
      } )
        .then( function(response) {
          console.log( response );
        } )
        .catch( function(error) {
          console.log( error );
        } );

    } catch( error ) {
      console.log( "Sending error", error );
    }

    toast.success( "Ваше сообщение отправлено" );
    reset();

  };

  return (
    <Layout>
      <>
        <h2 className="h2 my-4 font-bold text-green-700 text-[30px] mb-2">Напишите нам</h2>
        <form
          className="mx-auto max-w-screen-md mb-3"
          onSubmit={ handleSubmit( sendFormHandler ) }
        >
          <label htmlFor="name" className="block mb-[8px] font-medium">Имя</label>
          <input
            type="text"
            id="name"
            autoFocus
            placeholder="Иван"
            { ...register( "name", {
              required: "Пожалуйста, введите Ваше имя",
            } ) }
            className="w-full mb-2"
          />
          { errors.name && (
            <div className="mb-3 text-red-500 text-[16px] italic">{ errors.name.message }</div>
          ) }

          <label htmlFor="phone" className="block mb-[8px] font-medium">Телефон</label>
          <input
            type="text"
            id="phone"
            placeholder="+79278951236"
            { ...register( "phone", {
              required: "Пожалуйста, введите Ваш телефон",
              pattern: {
                value: /^(\+?[78])?[- ]?\d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
                message: "Номер телефона должен иметь следующий вид: +79278951236"
              }
            } ) }
            className="w-full mb-2"
          />
          { errors.phone && (
            <div className="mb-3 text-red-500 text-[16px] italic">{ errors.phone.message }</div>
          ) }

          <label htmlFor="email" className="block mb-[8px] font-medium">Электронная почта</label>
          <input
            type="text"
            id="email"
            placeholder="ivan@mail.ru"
            { ...register( "email", {
              required: "Пожалуйста, введите электронную почту",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Пожалуйста, введите корректную электронную почту",
              }
            } ) }
            className="w-full mb-2"
          />
          { errors.email && (
            <div className="mb-3 text-red-500 text-[16px] italic">{ errors.email.message }</div>
          ) }

          <label htmlFor="message" className="block mb-[8px] font-medium">Сообщение</label>
          <textarea
            type="text"
            id="message"
            placeholder="Ваше сообщение"
            { ...register( "message", {
              required: "Пожалуйста, введите Ваше сообщение",
            } ) }
            className="w-full mb-2"
          />
          { errors.message && (
            <div className="mb-3 text-red-500 text-[16px] italic">{ errors.message.message }</div>
          ) }

          <button type="submit" className=" primary-button text-[16px] text-green-600 font-[500]">Отправить</button>
        </form>
        <h2 className="h2 my-4 font-bold text-green-700 text-[30px] mb-2">Отправить сообщение через мессенджеры</h2>
        <div className="flex items-center justify-start gap-3 mb-3 p-2">
          <a
            title="Whatsapp" href="https://wa.me/79870118923" className="hover:scale-125 ease-in-out duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="images/whatsapp-icon.svg" alt="Написать в Whatsapp" width={ 48 } height={ 48 }
            />
          </a>
          <a
            title="Telegram" href="https://telegram.me/ShopForMan_bot" target="_blank" rel="noreferrer"
            className="hover:scale-125 ease-in-out duration-300"
          >
            <Image
              src="images/telegram-icon.svg" alt="Написать в Telegram" width={ 48 } height={ 48 }
            />
          </a>
          <a title="Viber" href="viber://chat?number=79870118923" className="hover:scale-125 ease-in-out duration-300">
            <Image src="images/viber-icon.svg" alt="Написать в Viber" width={ 48 } height={ 48 } />
          </a>
        </div>
      </>


    </Layout>
  );
}