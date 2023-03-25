import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import { toast } from "react-toastify";
import Image from "next/image";


export default function Contacts() {
  const [ name, setName ] = useState( "" );
  const [ phone, setPhone ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ message, setMessage ] = useState( "" );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function sendFormHandler() {
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

    setName( "" );
    setPhone( "" );
    setEmail( "" );
    setMessage( "" );
    toast.success( "Ваше сообщение отправлено" );

  }

  const ClickTelegramHandler=()=>{
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Привет, Друг!');
    });
  }


  return (
    <Layout>
      <>
        <h2  className="h2 my-4 font-bold text-green-700 text-[30px] mb-2">Напишите нам</h2>
        <form
          className="mx-auto max-w-screen-md mb-3"
          onSubmit={ handleSubmit( sendFormHandler ) }
        >
          <p>Имя</p>
          <p>{ name }</p>
          <input type="text" value={ name } onChange={ event => setName( event.target.value ) } />
          <p>Телефон</p>
          <p>{ phone }</p>
          <input type="text" value={ phone } onChange={ event => setPhone( event.target.value ) } />
          <p>E-mail</p>
          <p>{ email }</p>
          <input type="text" value={ email } onChange={ event => setEmail( event.target.value ) } />
          <p>Сообщение</p>
          <p>{ message }</p>
          <input type="text" value={ message } onChange={ event => setMessage( event.target.value ) } /><br />
          <button type="submit" className=" primary-button text-[16px] text-green-600 font-[500]">Отправить</button>
        </form>
        <h2  className="h2 my-4 font-bold text-green-700 text-[30px] mb-2">Отправить сообщение через мессенджеры</h2>
        <div className="flex items-center justify-start gap-3 mb-3 p-2">
          <a title="Whatsapp" href="whatsapp://send?phone=79870118923" className="hover:scale-125 ease-in-out duration-300">
            <Image
              src="images/whatsapp-icon.svg" alt="Написать в Whatsapp" width={ 48 } height={ 48 }
            />
          </a>
          {/*<a title="Telegram" href="https://telegram.me/ShopForMan_bot" target="_blank" rel="noreferrer" className="hover:scale-125 ease-in-out duration-300">*/}
            <Image
              src="images/telegram-icon.svg" alt="Написать в Telegram" width={ 48 } height={ 48 } onClick={ClickTelegramHandler}
            />
          {/*</a>*/}
          <a title="Viber" href="viber://chat?number=79870118923" className="hover:scale-125 ease-in-out duration-300">
            <Image src="images/viber-icon.svg" alt="Написать в Viber" width={ 48 } height={ 48 } />
          </a>
        </div>
      </>


    </Layout>
  );
}