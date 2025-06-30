# 遊點藝思 LINE 機器人

## 機器人好友 ID: 2007463529

## 連接的公開資料來源

- 文化部公共藝術開放資料 API  
  API 連結：https://publicartap.moc.gov.tw/data/api/artWork/openData

## 使用說明

- 傳送你的定位（位置訊息），機器人會回傳你附近的公共藝術裝置資訊。
- 也可以輸入特定地點名稱（例如「台北」、「泰山」等），查詢該地區的公共藝術。

---
####以下備忘
####  專案架構

- **前端接口**：LINE Bot 互動（文字、定位、選單）
- **後端中繼**：Node.js + Puppeteer Proxy Server ➜ 解決 Cloudflare 封鎖問題 QQ 
- **部署平台**：Render

#### Proxy Server

> Render 部署中，我還在等待 render 成功顯示 `Proxy server running at...`

####  目錄

- `/proxy` ➜ puppeteer server，負責抓取 JSON 資料（含繞過 Cloudflare）
- `/linebot` ➜ LINE webhook，處理文字與位置事件
- `/templates` ➜ Flex Message Bubble 樣式
- `/utils` ➜ 距離計算、地理函式等工具

## ⚠事項

- puppeteer 使用 **v21.3.8** 以確保自動下載 Chrome ➜ 提高 Render 安裝成功率(會成功嗎?
- 本地端測試已成功取得 JSON、完成資料串接與 Flex Message 顯示 (如夢似幻的出現
- Render 部署處於建置中，因 puppeteer 安裝時間較長，請耐心等候 (我等好久 Orz

---

## 備註->待研究的項目...  

若有更多時間將包含：  
- Rich Menu 主選單（地點篩選、分類推薦） 
- 快取優化（減少 proxy reload 成本） 
- 圖文版 Flex Message（封面圖 + 地圖定位按鈕）  
