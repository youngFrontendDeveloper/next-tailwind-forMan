import sendEmail from "@/lib/mail";

export default async function handler(req, res) {

  if( req.method !== "POST" ) {
    res.status( 400 ).send( { message: `${ req.method } not supported` } );
    return;
  }


  const { name, email, phone, message, } = req.body;

  if( !name ) {
    res.status( 422 ).json( { message: "Name error" } );
    return;
  } else if( !email ) {
    res.status( 422 ).json( { message: "Email error" } );
    return;
  } else if( !phone ) {
    res.status( 422 ).json( { message: "Phone error" } );
    return;
  } else if( !message ) {
    res.status( 422 ).json( { message: "Message error" } );
    return;
  }

  const sendMessage = {
    to: "video-rm@yandex.ru",   // email, куда будут отправляться сообщения
    subject: `Письмо с сайта ForMan от ${ req.body.name }`,
    text: `
      Имя: ${ name }, 
      Телефон: ${ phone },
      E-mail: ${ email },
      Сообщение: ${ message },
`,
  };

  sendEmail( sendMessage );

  res.send( `Thank you, ${ name }!` );
}
