---
name: deepseek-exporter-dev
description: DeepSeek Exporter (yuki-inaho fork) の開発・テスト・検証ワークフロー。トリガー: deepseek-exporter, deepseek exporter, userscript のビルド, BDD/E2E を走らせる, Tampermonkey で SRI 検証, 作業書, just コマンド, エクスポートの安全性を確認したいとき。
---

# DeepSeek Exporter 開発スキル

`~/Project/deepseek-exporter`（GitHub: `yuki-inaho/deepseek-exporter`）専用。

## 前提

- リポジトリは `pnpm@11.21.0`（corepack 経由）。`just` は `/home/inaho-omen/.cargo/bin/just`。
- `temp/` は gitignore 済み。プロファイル（OAuth ログイン）や作業書は `temp/` に置く。
- `dist/deepseek.user.js` はコミット対象。ソース変更後は `just build` で再生成してコミットする。

## よく使うコマンド（justfile）

```bash
just            # レシピ一覧
just install    # corepack pnpm install
just build      # dist/deepseek.user.js を生成
just test       # tsc --noEmit + vitest
just test-file tests/export-safety.test.ts
just lint
just check      # test + lint + build
just e2e        # build して BDD E2E（headless）
just e2e-headed # 同上（headed / デバッグ）
just ci         # check + e2e（CI 相当）
just serve-dist # dist を 127.0.0.1:8766 で配信（Tampermonkey 手動インストール用）
```

## テスト構成

- ユニット: `tests/*.test.ts`（vitest）。セキュリティ回帰は `tests/export-safety.test.ts` に集約。
- BDD E2E: `e2e/features/*.feature`（Gherkin）+ `e2e/steps/*.ts`（playwright-bdd 9）。
  - ハーネス `e2e/support/userscript.ts` が「GM スタブ + jszip + html2canvas + dist」を結合し `addInitScript` で注入する。
  - `e2e/support/fixtures.ts` が `https://chat.deepseek.com/**` の document と `/api/v0/chat/history_messages` をモックする。`userToken` はスタブ内で seed 済み。
  - したがって E2E は**ログイン不要・ネットワーク不要**。実行前に `just build` が必須。
  - シナリオ追加は feature に追記し、steps を追加する。ダウンロード内容は `lastDownload` fixture 経由で検査する。
- CI: `.github/workflows/check.yml` が build 後に `pnpm exec playwright install --with-deps chromium` → `pnpm run test:e2e` を実行。

## 秘匿情報のステージ防止

- pre-commit（`.husky/pre-commit`）が `scripts/check-private-staged.mjs` を実行し、`temp/`、`.playwright-cli/`、`test-results/`、`.env`、Cookies、storageState、トークン/秘密鍵らしき内容をブロックする。
- 例外は `git commit --no-verify` を明示的に使う（監査対象）。テストデータは `e2e/fixtures/` に置く（`temp/` からコピーしてコミットする）。

## Tampermonkey 実機での SRI 検証（手動・自動化の要点）

CI では TM をロードしないため、必要時に以下を再現する（詳細ログは過去セッションの手順に準拠）:

1. Chrome Web Store から CRX を取得して展開: `https://clients2.google.com/service/update2/crx?...x=id%3Ddhdgffkkebhmkfjojejmpbldmpobfkfo%26uc`（CRX3 ヘッダを除去して zip 展開）。
2. Playwright 同梱 Chromium（`--disable-extensions-except` + `--load-extension`）で headed 起動。ブランド版 Chrome は 137+ で `--load-extension` が無効。
3. MV3 の「Allow User Scripts」はプロファイルの Preferences に `extensions.settings.<ext-id>.user_scripts_allowed = true` を書いて有効化（ext-id は拡張パス依存）。
4. TM の Utilities →「URL からインポート」で `http://127.0.0.1:8766/deepseek.user.js` を入れ、確認ダイアログの「インストール」を押す。
5. 検証済み事実: `#sha384=` は TM が window.crypto で検証し、不一致は SRI エラーで拒否。Violentmonkey は SRI 非対応（fragment 無視）。
6. 注意: unpacked “非公式” TM はブラウザ再起動後に登録が復元されないことがある（テスト環境要因）。検証は同一セッションで行う。

## リリース・マージ運用

- 作業ブランチ → `main` へ fast-forward。push で `Check` と `release-please` が走り、release-please がリリース PR を作る（マージ判断はユーザー）。
- conventional commits 必須（commitlint + husky）。`--no-verify` は原則使わない。
