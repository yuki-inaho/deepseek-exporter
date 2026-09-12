<h1 align="center">DeepSeek Exporter</h1>

<p align="center">
一鍵匯出你的 <a href="https://chat.deepseek.com/">DeepSeek</a> 對話。
</p>

<div align="center">

[![license][license-image]][license-url]
[![release][release-image]][release-url]

[license-image]: https://img.shields.io/github/license/yuki-inaho/deepseek-exporter?color=red
[license-url]: https://github.com/yuki-inaho/deepseek-exporter/blob/main/LICENSE
[release-image]: https://img.shields.io/github/v/release/yuki-inaho/deepseek-exporter?color=blue
[release-url]: https://github.com/yuki-inaho/deepseek-exporter/releases/latest

[English](./README.md) &nbsp;&nbsp;|&nbsp;&nbsp; [简体中文](./README_zh-Hans.md) &nbsp;&nbsp;|&nbsp;&nbsp; 繁體中文

<img src="./assets/screenshot_cn.png" width="720" alt="DeepSeek Exporter 在 chat.deepseek.com 上的匯出選單" />

</div>

## ✨ 功能特色

- 📝 **多種匯出格式** — Markdown、HTML、PNG 截圖、純文字、原始 JSON
- 🧠 **包含深度思考** — 可選擇匯出推理過程，而不只是最終回答
- 🔍 **保留搜尋來源** — DeepSeek 網路搜尋的引用來源會一併保留
- 📦 **批次匯出** — 勾選多個（或全部）對話一次下載，還可打包成單一 ZIP
- 🖼️ **保留圖片** — 附件會嵌入到 Markdown 和 HTML 匯出中
- 🎭 **角色扮演友善** — 支援匯出 TavernAI / SillyTavern JSONL 和 text-generation-webui JSON

## 📦 安裝

**1.** 安裝使用者腳本管理器 — [Tampermonkey][link-tampermonkey]（或 [Violentmonkey][link-violentmonkey]）：

[<img src="https://user-images.githubusercontent.com/3750161/214147732-c75e96a4-48a4-4b64-b407-c2402e899a75.PNG" height="60" alt="Chrome" valign="middle">][link-chrome] &nbsp;&nbsp; [<img src="https://user-images.githubusercontent.com/3750161/214148610-acdef778-753e-470e-8765-6cc97bca85ed.png" height="60" alt="Firefox" valign="middle">][link-firefox] &nbsp;&nbsp; [<img src="https://user-images.githubusercontent.com/3750161/233201810-d1026855-0482-44c8-b1ec-c7247134473e.png" height="60" alt="Edge" valign="middle">][link-edge]

[link-tampermonkey]: https://www.tampermonkey.net/
[link-violentmonkey]: https://violentmonkey.github.io/
[link-chrome]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo 'Chrome Web Store'
[link-firefox]: https://addons.mozilla.org/firefox/addon/tampermonkey 'Firefox Add-ons'
[link-edge]: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd 'Edge Add-ons'

**2.** 從本倉庫安裝最新構建的使用者腳本，接著開啟 [chat.deepseek.com](https://chat.deepseek.com/)，匯出選單就會出現在頁面上。

[![安裝][install-image]](https://raw.githubusercontent.com/yuki-inaho/deepseek-exporter/main/dist/deepseek.user.js)

[install-image]: https://img.shields.io/badge/-%E5%AE%89%E8%A3%9D-blue

> [!TIP]
> Chrome 使用者請確認已為 Tampermonkey 啟用 [`允許使用者指令碼`](https://www.tampermonkey.net/faq.php?q=Q209)。

## 🔐 加固分支

本倉庫是 [pionxzh/deepseek-exporter](https://github.com/pionxzh/deepseek-exporter) 的分支。在上游基礎上，對 CDN 依賴（`jszip`、`html2canvas`）固定版本並附加子資源完整性（SRI）校驗，為匯出 HTML 中的 CDN 資源加上 SRI，並讓 Markdown 匯出的連結與圖片採用與 HTML 匯出相同的淨化策略。

## 🔒 隱私

一切都在你的瀏覽器本機執行。腳本只會使用你已登入的工作階段與 `chat.deepseek.com` 通訊——你的對話不會被上傳到任何其他地方。

## 💬 也在用 ChatGPT？

看看 [**ChatGPT Exporter**](https://github.com/pionxzh/chatgpt-exporter) —— 為 ChatGPT 提供同樣功能的姊妹專案。

## 🤝 參與貢獻

歡迎貢獻 — 請參閱 [CONTRIBUTING.md](./CONTRIBUTING.md) 開始上手。

## 📄 授權條款

[MIT](./LICENSE)

基於 [pionxzh/deepseek-exporter](https://github.com/pionxzh/deepseek-exporter)（MIT）。
