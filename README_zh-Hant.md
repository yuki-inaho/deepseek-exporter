<h1 align="center">DeepSeek Exporter</h1>

<p align="center">
一鍵匯出你的 <a href="https://chat.deepseek.com/">DeepSeek</a> 對話。
</p>

<div align="center">

[![license][license-image]][license-url]
[![release][release-image]][release-url]
[![GreasyFork][greasyfork-image]][greasyfork-url]

[license-image]: https://img.shields.io/github/license/pionxzh/deepseek-exporter?color=red
[license-url]: https://github.com/pionxzh/deepseek-exporter/blob/main/LICENSE
[release-image]: https://img.shields.io/github/v/release/pionxzh/deepseek-exporter?color=blue
[release-url]: https://github.com/pionxzh/deepseek-exporter/releases/latest
[greasyfork-image]: https://img.shields.io/static/v1?label=%20&message=GreasyFork&style=flat-square&labelColor=7B0000&color=960000&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=
[greasyfork-url]: https://greasyfork.org/scripts/591297-deepseek-exporter

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

**2.** 從 GreasyFork 或 GitHub 安裝腳本，接著開啟 [chat.deepseek.com](https://chat.deepseek.com/)，匯出選單就會出現在頁面上。

| GreasyFork | GitHub |
| :---: | :---: |
| [![安裝][install-image]](https://greasyfork.org/scripts/591297-deepseek-exporter) | [![安裝][install-image]](https://raw.githubusercontent.com/pionxzh/deepseek-exporter/main/dist/deepseek.user.js) |

[install-image]: https://img.shields.io/badge/-%E5%AE%89%E8%A3%9D-blue

> [!TIP]
> Chrome 使用者請確認已為 Tampermonkey 啟用 [`允許使用者指令碼`](https://www.tampermonkey.net/faq.php?q=Q209)。

## 🔒 隱私

一切都在你的瀏覽器本機執行。腳本只會使用你已登入的工作階段與 `chat.deepseek.com` 通訊——你的對話不會被上傳到任何其他地方。

## 💬 也在用 ChatGPT？

看看 [**ChatGPT Exporter**](https://github.com/pionxzh/chatgpt-exporter) —— 為 ChatGPT 提供同樣功能的姊妹專案。

## 🤝 參與貢獻

歡迎貢獻 — 請參閱 [CONTRIBUTING.md](./CONTRIBUTING.md) 開始上手。

## 📄 授權條款

[MIT](./LICENSE)
