// import puppeteer from 'puppeteer'
import axios from 'axios'
import { distance } from '../utils/distance.js'
import template from '../templates/art.js'
import fs from 'fs'
// import { execSync } from 'child_process'

// 先檢查環境裡 Chrome 路徑和版本
// try {
//   const chromePath = execSync('which google-chrome').toString().trim()
//   console.log('Chrome path:', chromePath)
// } catch {
//   console.log('Google Chrome not found')
// }

// try {
//   const chromeVersion = execSync('google-chrome --version').toString().trim()
//   console.log('Chrome version:', chromeVersion)
// } catch {
//   console.log('Cannot get Chrome version')
// }

// async function fetchArtDataWithPuppeteer() {
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     executablePath: puppeteer.executablePath(),
//   })
//   try {
//     const page = await browser.newPage()
//     await page.goto('https://publicartap.moc.gov.tw/data/api/artWork/openData', {
//       waitUntil: 'networkidle2',
//     })
//     const content = await page.evaluate(() => document.body.textContent)
//     return JSON.parse(content)
//   } finally {
//     await browser.close()
//   }
// }

export default async (event, keyword = null) => {
  try {
    const { data } = await axios.get('https://zero630proxy.onrender.com', {
      params: {
        url: 'https://publicartap.moc.gov.tw/data/api/artWork/openData',
      },
    })
    // headers: {
    //         'User-Agent':
    //           'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
    //         Accept: 'application/json, text/plain, */*',
    //         'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8',
    //         Referer: 'https://publicartap.moc.gov.tw/',
    //         Origin: 'https://publicartap.moc.gov.tw',
    //       },
    //     })

    // const data = await fetchArtDataWithPuppeteer()

    let filtered = []

    if (keyword) {
      filtered = data.filter((value) => {
        const fullAddress = (value.縣市 + value.設置地點).toLowerCase()
        return fullAddress.includes(keyword.toLowerCase())
      })
    } else {
      filtered = data
        .map((value) => {
          value.distance = distance(
            value.緯度,
            value.經度,
            event.message.latitude,
            event.message.longitude,
            'K',
          )
          return value
        })
        .sort((a, b) => {
          return a.distance - b.distance
        })
    }

    const bubbles = filtered.slice(0, 5).map((value) => {
      const address = value.縣市 + value.設置地點
      const url = `https://www.google.com/maps/search/?api=1&query=${value['緯度']},${value['經度']}`
      const bubble = template()
      bubble.hero.url = value.主圖
      bubble.hero.action.uri = url
      bubble.body.contents[0].text = value.作品名稱
      bubble.body.contents[1].contents[0].contents[1].text = value.作者
      bubble.body.contents[1].contents[1].contents[1].text = value.作品說明
      bubble.body.contents[1].contents[2].contents[1].text = value.作品材質
      // bubble.body.contents[1].contents[3].contents[1].text = value.設置地點
      bubble.body.contents[1].contents[3].contents[0].contents[1].text = address
      bubble.footer.contents[0].action.uri = url
      // bubble.footer.contents[0].action.uri = `https://www.google.com/maps/search/?api=1&query=${value['緯度']},${value['經度']}`
      return bubble
    })
    if (bubbles.length === 0) {
      await event.reply(`找不到關於「${keyword}」的公共藝術喔～換個地名試試看吧！`)
      return
    }

    const result = await event.reply({
      type: 'flex',
      altText: '文化部公共藝術',
      contents: {
        type: 'carousel',
        contents: bubbles,
      },
    })
    console.log(result)

    if (result.message) {
      await event.reply('發生錯誤')

      if (process.env.DEV === 'true') {
        fs.writeFileSync(
          '../dump/art.json',
          JSON.stringify(
            {
              type: 'carousel',
              contents: bubbles,
            },
            null,
            2,
          ),
        )
      }
    }
  } catch (error) {
    console.error(error)
    await event.reply('發生錯誤')
  }
}
