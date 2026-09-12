# Changelog

## [0.2.0](https://github.com/yuki-inaho/deepseek-exporter/compare/v0.1.1...v0.2.0) (2026-09-12)


### Features

* initialize DeepSeek Exporter ([32e3cfa](https://github.com/yuki-inaho/deepseek-exporter/commit/32e3cfa9cd279df8eccff879d881cfc4f4fc808a))


### Bug Fixes

* close Markdown export sanitization gaps found in review ([8f5c0e9](https://github.com/yuki-inaho/deepseek-exporter/commit/8f5c0e91492bad5d836083ba23963e5aae025a37))
* keep filename and metadata placeholders verbatim ([7fe97dd](https://github.com/yuki-inaho/deepseek-exporter/commit/7fe97ddee53a5d8b7103fd40c000273ad9d697a1))
* pin CDN deps with SRI and harden HTML template substitution ([9e27274](https://github.com/yuki-inaho/deepseek-exporter/commit/9e27274b128e355ac187b40a49d81701149061a0))
* sanitize Markdown export links and close the export menu ([24f1286](https://github.com/yuki-inaho/deepseek-exporter/commit/24f128617b6435e24056fdbdf484e1accdf70e18))

## 0.1.1

- Fixed DeepSeek image attachments in Markdown and HTML exports.
- Integrated the exporter into DeepSeek's navigation with a floating fallback.
- Isolated exporter styles and improved dialogs, toggles, dark mode, scrolling, and sticky actions.
- Improved batch selection, cancellation, failure handling, localization, and generated filenames.
- Added browser-native single and batch downloads, with JSZip pinned to the Tampermonkey-compatible 3.9.1 release.
- Improved DeepThink, current search citations and source metadata, mixed LaTeX/code output, import validation, and standalone export safety.
- Upgraded the build, test, localization, and UI dependency stack.

## 0.1.0

- Initial DeepSeek userscript implementation.
- Added current-conversation and batch exports.
- Added selected-branch, DeepThink, attachment, and search-source support.
- Isolated the exporter UI from host-page styles with Shadow DOM.
