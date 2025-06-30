import 'dotenv/config'
import linebot from 'linebot'
import commandArt from './commands/art.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', (event) => {
  if (event.message.type === 'text') {
    const userText = event.message.text.trim()
    if (userText === 'hello') {
      event.reply('測試測試')
      return
    }

    commandArt(event, userText)
    return
  } else if (event.message.type === 'location') {
    commandArt(event)
  }
})

bot.on('postback', async (event) => {
  console.log('postback:', event.postback.data)
  await event.reply(`收到 postback 資料：${event.postback.data}`)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動成功')
})
