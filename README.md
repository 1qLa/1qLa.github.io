# 金島拓矢 Portfolio

ポートフォリオサイトです。React(Vite)で作り、GitHub Actions で確認してから GitHub Pages に公開します。

## 開発

```
npm ci          # 依存パッケージを、ロックファイルどおりに入れる
npm run dev     # 開発サーバー(http://localhost:5173)
npm run lint    # ESLint
npm test        # Vitest
npm run build   # dist/ に本番用ファイルを出力
npm run preview # ビルドしたものを手元で確認
```

Node.js は 22 を使います(`.nvmrc`)。

## 構成

- `src/components/` … 画面の部品(Hero、Cat、About、Skills、Works、Contact)。
- `src/data/` … 制作物とスキルのデータ。ここを書き換えるだけで、表示が増減します。
- `src/lib/` … 画面から切り離した計算(背景の座標、毛糸玉の動き)。テストがあります。
- `src/assets/` … 画像と3Dモデル。ビルド時に内容のハッシュが付くので、差し替えても古い画像が残りません。
- `tools/` … 猫と背景のドット絵を作る Python スクリプト(標準ライブラリのみ)。

## CI/CD

- **CI**(`.github/workflows/ci.yml`): プルリクエストと、main 以外のブランチへの push で、lint、テスト、ビルドを実行します。
- **CD**(`.github/workflows/deploy.yml`): main に push すると、同じ確認を行ってから GitHub Pages に公開します。確認が1つでも失敗すると、公開されません。
- 使っている GitHub Actions は、タグではなく、コミットの SHA で固定しています。更新は Dependabot(`.github/dependabot.yml`)が週に1回、プルリクエストで知らせます。
- 各ジョブの権限は最小にしています。公開のための `pages: write` と `id-token: write` は、公開のジョブだけに付けています。

### 初めて公開するとき(1回だけ)

GitHub の Settings → Pages → Build and deployment → Source を、「GitHub Actions」に変えます。変えないまま main に取り込むと、ビルド前のファイルが公開されてしまうので、先に変えてください。
