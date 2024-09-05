
function enviaMensaje(mensaje) {
  const { Telegraf } = require('telegraf');
  require('dotenv').config();
  const chatToken = process.env['CHAT_TOKEN']
  const chatId = process.env['CHATID'];
  const app = new Telegraf(chatToken); //
  if (mensaje.length > 2500) { mensaje = "Hay tantos nombramientos que no caben en un mensaje. Por favor, consulta directamente el BOJA."; }

  app.telegram.sendMessage(chatId, mensaje);

}

//enviaMensaje("Este texto debería ser distinto.");

module.exports.enviaMensaje = enviaMensaje;