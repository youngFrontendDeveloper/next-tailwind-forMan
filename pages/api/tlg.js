// export default async function handler(req, res) {
//   const tgbot = process.env.TELEGRAM_TOKEN;
//   if(req.body.message.text === "/start"){
//     const message = 'Welcome to <i>NextJS News Channel</i> <b>' +
//       req.body.message.from.first_name +
//       '</b>.%0ATo get a list of commands sends /help';
//     const ret = await fetch(`https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}&parse_mode=HTML`)
//   }
//
//   if(req.body.message.text ==="/help"){
//     const message = 'Help for <i>NextJS News Channel</i>.%0AUse /search <i>keyword</i> to search for <i>keyword</i> in my Medium publication';
//
//     const ret = await fetch( `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${message}&parse_mode=HTML`)
//   }
//
//   console.log( "Запрос к телеграм боту ", req.body );
//
//   res.status( 200 ).send( "OK" );
// }