const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
require('dotenv').config()
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true
})
const base_url = process.env.BASE_URL


bot.onText(/\/start/, msg => {
	bot.sendMessage(msg.chat.id, "Welcome", {
		reply_markup: {
      resize_keyboard: true,
			keyboard: [[{text: "Password reset"}]]
		}
	})
	//bot.sendMessage(msg.chat.id, "Welcome")
})

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = match[1]

  bot.sendMessage(chatId, resp)
})

bot.on('Password reset', msg => {
  const chatId = msg.chat.id;
  
  axios.post(`${base_url}forgot-password`, {
    social: 'vgontsov03@gmail.com',
  }).then(r => {
    console.log(r)
    let token = r
    bot.sendMessage(chatId, token)
  }).catch(console.error)
})

bot.on('message', msg => {
  const chatId = msg.chat.id;

  axios.post(`${base_url}forgot-password`, {
    social: 'vgontsov03@gmail.com',
  }).then(r => {
    let token = `Код для сброса: ${r.data.data}`
    bot.sendMessage(chatId, token)
  }).catch(console.error)
})
