<h1 align="center">DeepSeek Exporter</h1>

<p align="center">
Export your <a href="https://chat.deepseek.com/">DeepSeek</a> conversations with one click.
</p>

<div align="center">

[![license][license-image]][license-url]
[![release][release-image]][release-url]

[license-image]: https://img.shields.io/github/license/yuki-inaho/deepseek-exporter?color=red
[license-url]: https://github.com/yuki-inaho/deepseek-exporter/blob/main/LICENSE
[release-image]: https://img.shields.io/github/v/release/yuki-inaho/deepseek-exporter?color=blue
[release-url]: https://github.com/yuki-inaho/deepseek-exporter/releases/latest

English &nbsp;&nbsp;|&nbsp;&nbsp; [简体中文](./README_zh-Hans.md) &nbsp;&nbsp;|&nbsp;&nbsp; [繁體中文](./README_zh-Hant.md)

<img src="./assets/screenshot_cn.png" width="720" alt="DeepSeek Exporter menu on chat.deepseek.com" />

</div>

## ✨ Features

- 📝 **Every format you need** — Markdown, HTML, PNG screenshot, plain text, and raw JSON
- 🧠 **DeepThink included** — optionally export the reasoning process, not just the final answer
- 🔍 **Web-search sources** — citations from DeepSeek's search results are preserved
- 📦 **Batch export** — select multiple (or all) conversations and download them at once, even as a single ZIP
- 🖼️ **Images kept** — attachments are embedded in Markdown and HTML exports
- 🎭 **Roleplay-friendly** — export to TavernAI / SillyTavern JSONL and text-generation-webui JSON

## 📦 Install

**1.** Install a userscript manager — [Tampermonkey][link-tampermonkey] (or [Violentmonkey][link-violentmonkey]):

[<img src="https://user-images.githubusercontent.com/3750161/214147732-c75e96a4-48a4-4b64-b407-c2402e899a75.PNG" height="60" alt="Chrome" valign="middle">][link-chrome] &nbsp;&nbsp; [<img src="https://user-images.githubusercontent.com/3750161/214148610-acdef778-753e-470e-8765-6cc97bca85ed.png" height="60" alt="Firefox" valign="middle">][link-firefox] &nbsp;&nbsp; [<img src="https://user-images.githubusercontent.com/3750161/233201810-d1026855-0482-44c8-b1ec-c7247134473e.png" height="60" alt="Edge" valign="middle">][link-edge]

[link-tampermonkey]: https://www.tampermonkey.net/
[link-violentmonkey]: https://violentmonkey.github.io/
[link-chrome]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo 'Chrome Web Store'
[link-firefox]: https://addons.mozilla.org/firefox/addon/tampermonkey 'Firefox Add-ons'
[link-edge]: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd 'Edge Add-ons'

**2.** Install the built userscript from this repository, then open [chat.deepseek.com](https://chat.deepseek.com/) — the export menu appears on the page.

[![Install][install-image]](https://raw.githubusercontent.com/yuki-inaho/deepseek-exporter/main/dist/deepseek.user.js)

[install-image]: https://img.shields.io/badge/-Install-blue

> [!TIP]
> On Chrome, make sure [`Allow User Scripts` is enabled](https://www.tampermonkey.net/faq.php?q=Q209) for Tampermonkey.

## 🔐 Hardened fork

This repository is a fork of [pionxzh/deepseek-exporter](https://github.com/pionxzh/deepseek-exporter). On top of upstream it pins the CDN dependencies (`jszip`, `html2canvas`) with Subresource Integrity, adds SRI to the CDN assets of exported HTML, and sanitizes links and images in Markdown exports to match the HTML export policy.

## 🔒 Privacy

Everything runs locally in your browser. The script only talks to `chat.deepseek.com` using your existing login session — your conversations are never uploaded anywhere else.

## 💬 Using ChatGPT too?

Check out [**ChatGPT Exporter**](https://github.com/pionxzh/chatgpt-exporter) — the sister project that does the same for ChatGPT.

## 🤝 Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

## 📄 License

[MIT](./LICENSE)

Based on [pionxzh/deepseek-exporter](https://github.com/pionxzh/deepseek-exporter) (MIT).
