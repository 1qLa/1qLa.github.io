# progress

## 決まったこと(2026-10-16)
- 対象はエンジニア(就職・転職)向けで、デザインはシンプル・ミニマルにする。
- 公開先は GitHub Pages(1qLa.github.io)で、完成したら published/ から直下の index.html に反映する。

- デザインは、全画面の背景(画像または動画)と中央の挨拶を最初に置く構成にする。参考は https://tashi.design/(構成のみ参考にし、素材は使わない)。
- index.html と assets/ をリポジトリ直下に置き、https://1qLa.github.io/ の最初のページにする(2026-10-16 に drafts/ から移動)。内容は、制作物・連絡先は実際のもの、About は仮の文章。

- サイトの表記は、見出し・ナビ(About / Skills / Works / Contact)・項目名は英語のまま、トップの自己紹介と各説明文は日本語にする(2026-10-17 に決定。2026-10-16 に一度、全体を英語にしていた)。背景のデモ素材は、猫のSVG画像を作って使う。

- 名前は本名ではなく GitHub のユーザー名 1qLa を使う。連絡先は GitHub とメール。
- 制作物は4つ(networkgame、nfc_light、calendar_epaper、aws_Terraform)。授業の課題は載せない。経歴の項目は、情報がないため外した。
- networkgame は、桃太郎が枠の中を歩く3Dの表示にする(ゲームそのものは動かさず、「Play」で公開版へリンクする)。

## 完了
- デモデータの雛形を drafts/index.html に作成した(1ページ構成: 自己紹介 / スキル / 制作物 / 経歴 / 連絡先。当時は日本語表記)。

- 全画面ヒーロー(背景スロット + 中央の挨拶)を drafts/index.html に作った。
- 表記を英語に直し、背景に猫のSVG(assets/hero-cat.svg)を埋め込んだ。
- 全体を明るい配色に変更した(ダークモード対応を外し、背景の猫は昼の絵に差し替えた)。
- 背景画像が表示されなかった原因は、画像の置き場所が index.html と合っていなかったこと。画像は index.html と同じ階層の assets/ に置く。
- 名前と連絡先を差し替え、制作物4つを実際のリポジトリの内容に置き換えた。画像は nfc_light と calendar_epaper の README のものを使い、aws_Terraform は画像なし。桃太郎は assets/models/momotaro.glb を Three.js(CDN 読み込み)で歩かせた。
- ブラウザ(Chrome)のスクリーンショットで、ヒーローと各制作物の表示を確認した。桃太郎が往復して動くところは、スクリーンショットでは確認できていない。
- 背景の猫を、飼い猫の写真(3枚)を参考にしたドット絵に差し替えた。丘の上を歩いて往復し、ときどき座ってまばたき・しっぽを振る。絵は tools/make_cat_sprite.py で作り、assets/cat-sprite.png に出力する。写真そのものはリポジトリに入れていない。
- ブラウザ(Chrome)のスクリーンショットで、座り・歩き(左右反転)・スマホ幅の表示を確認した。連続して動くところは確認できていない。
- 猫のドット絵に、ノルウェージャンフォレストキャットの特徴(太くふさふさの尻尾、胸のたてがみ、大きな耳と先の房、三角寄りの顔)を足した。猫種は本人から聞いた情報。
- 猫の襟毛を、前に張り出す塊から、あごの下に垂れるぎざぎざの胸当てに直した。
- 背景を屋外(空と丘)から、家の中のドット絵に変えた。キャットタワー、爪研ぎ(ポールと段ボール)、ペットベッド、窓、毛糸玉がある。絵は tools/make_room_bg.py で作り、assets/hero-bg.png に出力する(古い assets/hero-bg.svg は削除)。挨拶文と重ならないよう、家具は左右と床に置いた。スマホ幅では、背景を小さくして下に寄せ、猫も小さくしている。
- ブラウザ(Chrome)のスクリーンショットで、PC幅(1280px)とスマホ幅(500px)の表示を確認した。
- 猫の胸の毛を、塊に見えていたのを直し、あごの下に収まる毛束(尖った房)の形にした。胴の白い胸は外し、白は胸当てと前足の先だけにした。画像を差し替えたときに古い絵が残らないよう、index.html の画像URLに ?v=3 を付けた(画像を変えたら番号を上げる)。
- (取りやめ)時間帯で猫の行動と部屋の色が変わる仕組みは、2026-10-17 に外した。
- 批判的意見(claude.ai、2026-10-17 受領。2次面接は 10/19)への対応のうち、事実が要らない分を行った: 時計の `--:--` を出さない、埋め草の文を削除、ドリフト検知を先頭に移し、構成図(CloudTrail → EventBridge → SNS → SQS → Lambda → Slack)と KMS の記述(README の内容)を追加。
- 上の方針に合わせて、トップ・About・各作品・Contact・時計の行動表示を日本語にした。見出しの大きさは、日本語に合わせて小さくした。内容は今ある情報を日本語にしただけで、志望職種などはまだ入っていない。
- 2026-10-17 の決定: 上部の時計の文字表示と、時間帯で変わる行動・背景はなし。背景の壁に丸い掛け時計(見ている人の現在時刻を指す針つき)を置き、猫はずっと毛糸玉で遊ぶ。窓は昼の景色で固定。背景は assets/hero-bg.png の1枚(tools/make_room_bg.py)。針は index.html の canvas で描く。
- ブラウザ(Chrome)のスクリーンショットで、PC幅とスマホ幅の表示、掛け時計の針の位置(確認時刻 18:56 に合っている)、猫が毛糸玉の前で構える姿を確認した。
- 2026-10-17 の決定(追加): 本名の金島拓矢を、トップの見出し「金島拓矢 Portfolio」、左上のロゴ、タイトル、フッターに使う(以前は GitHub のユーザー名 1qLa のみとしていた。GitHub への連絡先リンクはそのまま)。トップの下の一文は外す。掛け時計は 12:00 で固定にし、針も背景の絵に含めた(canvas と時刻の処理は削除)。About に、通っている学校、卒業年月、簡単な自己紹介を書く(本人から聞いて反映する)。
- ブラウザ(Chrome)のスクリーンショットで、PC幅とスマホ幅の表示を確認した。
- 2026-10-17 の決定(追加): 左上のロゴは削除。About に「ECCコンピュータ専門学校に在学中で、2028年に卒業予定」を記載(28卒と聞いた。卒業月は未確認なので書いていない)。自己紹介の文章は、本人の指示で当面デモのまま(制作物から書いた仮の文章)。
- CI/CD を勉強するため、React に移行する方針(別ブランチ react-migration で進める。移行が済むまでは、公開中の静的サイトを main に保つ)。
- React への移行をブランチ react-migration で作った(2026-10-17)。Vite + React 19、ESLint、Vitest(19件)、Three.js は桃太郎の枠が必要になってから別ファイルで読み込む。見た目は静的版と同じ(PC幅・スマホ幅のトップ、Works の各カードをブラウザで確認)。
- CI/CD を作った: CI(PR・ブランチの push で lint / テスト / ビルド)と、CD(main への push で確認してから GitHub Pages に公開)。Actions は SHA で固定し、Dependabot で更新を知らせる。
- 注意: main に取り込む前に、GitHub の Settings → Pages → Source を「GitHub Actions」に変える必要がある(README に手順あり)。変えずに取り込むと、公開サイトが壊れる。公開前に、面接(10/19)との兼ね合いで、いつ切り替えるかを本人が決める。
- 見出しを2段にした(名前は太く大きく、Portfolio は細く小さく、両脇に短い線)。公開中の静的版(main)と React 版の両方に反映した。
- 事故の記録: 2026-10-17、main に .gitignore がない状態で `git add -A` をして、node_modules(約1万ファイル)と dist を main にコミット・push してしまった。公開サイトの表示には影響しなかったが、リポジトリが汚れた。新しいコミット(36f85e7)で取り除き、.gitignore を追加した。ただし履歴には残っている。履歴から消すには強制 push が必要で、取り消せない操作なので、本人の判断を待つ(消さなくても、動作や安全性には影響しない。容量が増えただけ)。
- 作品を、白いカード(縁・角丸・薄い影)で囲んだ。ページ全体の背景は、真っ白から部屋に近い温かいクリーム色(#fbf5ea)に変え、トップの下端(床)がその色へ溶けるようにぼかして、スクロールしたときの急な色の変化をなくした。公開中の静的版(main)と React 版の両方に反映した。
- Skills の各項目に、言語・技術のアイコンを付けた(Simple Icons、CC0。ページに直接埋め込み、外部サービスには頼らない)。AWS のロゴは Simple Icons に無いので、雲の図形で代用(ロゴには似せていない)。「Git / GitHub」は Git と GitHub に分けた。GitHub のリンク(各作品・Contact)にも GitHub のアイコンを付けた。
- 発表スライド(Canva)のリンクは、各 GitHub の README にあるので、サイトからは外した(Canva の /edit リンクが公開される懸念も、サイト上では解消)。公開中の静的版(main)と React 版の両方に反映。
- 2026-10-17: React 版を公開に切り替えた。GitHub の Pages の Source を「GitHub Actions」に変更(本人が操作)後、react-migration を main に取り込んで push(早送り、衝突なし)。Actions の「Deploy to GitHub Pages」が build・deploy とも成功し、https://1qLa.github.io/ が React 版になった(トップのPC幅・スマホ幅の表示、JS/CSS、3Dと画像のファイルの取得を確認)。以降は、main への push で、lint・テスト・ビルドを通ったものだけが自動で公開される。
- Dependabot が、依存パッケージと Actions の更新のプルリクエストを作り始めた(週に1回)。内容を確認して、CI が通れば取り込む。
- 戻し方: Pages の Source を「Deploy from a branch」に戻し、main を git revert する(旧静的版は履歴に残っている)。
- 作品の GitHub / Play リンクと、Contact のリンク(GitHub・メール)を、Skills と同じ角丸のチップにした(アイコン付き。マウスを乗せると枠が青くなって少し浮く。リンクとして押せる)。Gmail のアイコンも付けた。移行のときに落ちていた「視差効果を減らす」設定のルールを戻した。
- 2026-10-17: Skills から、Kotlin、FastAPI、Nginx、Blender を削除した(本人の指示。自分で書いていない技術を載せない方針)。残りは Python / JavaScript / C++ (Arduino) / HCL (Terraform)、Vue.js 3 / Three.js / PlatformIO、AWS / Terraform / Docker / Git / GitHub。作品カードの「使用技術」の行には、まだこの4つが残っている(下の「次にやること」参照)。
- 2026-10-17: 作品カードに「開発期間」「担当」(LighTouch は「状況」も)を追加した。内容は各 GitHub の README に書かれているものをそのまま使った(networkgame: 約4〜5ヶ月 / 企画発案、フロントエンド(3D描画・UIロジック全般)の実装。nfc_light: 約4〜5ヶ月 / マイコンへの書き込み(NFC認証・BLE通信・ライト制御))。calendar_epaper と aws_Terraform の README には担当・体制の記載がないので、何も書いていない。
- LighTouch の README の「開発状況」が、検証・実装は進行中、仕上げは未着手のため、サイトの説明を「開発しています」に直し、状況に「開発中」と書いた(完成品に見えないようにするため)。
- 2026-10-17(本人から聞いた事実): AWS ドリフト検知は「ゼミでの個人研究」。E-Paper Calendar の担当は「C++による電子ペーパーへの描画」。これを作品カードの「形態」「担当」に反映した。どちらの開発期間も聞いていないので、書いていない。作品カードの role は [項目名, 内容] の組のリストに変えた(項目ごとに自由に書ける)。
- 2026-10-18: claude.ai のデザイン案A「ドット絵の世界観を本文まで通す」を、ブランチ pixel-design に組み込んだ(main にはまだ取り込んでいない。取り込むかは本人が決める)。太い茶色の枠、ずらし影、角のない四角、ドット風フォント(DotGothic16、OFL-1.1、サイトに同梱)、押すと沈むボタン。トップは部屋の中央に名前のカード、About は文章と事実の表、Skills は3つの枠、Works は注目カード(ドリフト検知)+2列、Contact は枠と猫、フッター。
- 案から採用しなかったもの: 左上のロゴ(本人が以前「いらない」と指示)、日本語の見出し(本人が以前「項目名は英語」と指示)、本人に確認していない内容(「チーム開発」「設計・実装すべて」「完成」、ドリフト検知・電子ペーパーの期間、卒業の「3月」、「今は…認証・認可の挙動を測る制作に取り組んでいます」、MCP認可検証のカード[空欄が多い])。案の「クラウドセキュリティ志望」と「志望分野に近い作品」の札は、案の文言のまま入れた(違えば直す。Hero.jsx、About.jsx、works.js の3か所)。
- ブランチの確認方法: `git switch pixel-design && npm ci && npm run dev` で、手元で見られる。問題なければ main に取り込む(CD が自動で公開する)。
- 2026-10-18: pixel-design を main に取り込んだ(本人の指示。早送り、衝突なし)。Actions の「Deploy to GitHub Pages」が成功し、https://1qLa.github.io/ がドット絵のデザインになった(公開側の CSS にフォント、見出し4つ、作品カード4つ、リンク先、トップのスクリーンショットを確認)。ブランチ pixel-design は、そのまま残している(不要なら削除してよい)。
- 2026-10-19: トップの名前を、古いテレビの画面の中に映す案(claude.ai の案A-selection)を、ブランチ tv-hero に組み込んだ(main にはまだ取り込んでいない)。アンテナ、画面(走査線、「CH 01」、名前・志望・学校)、ダイヤル2つ、通気口、電源ランプ、ボタンを置く木の台。テレビが背景の壁掛け時計を隠すので、時計は背景の絵から外し、テレビの左上に CSS で置き直した(12:00 固定)。テレビの飾りは aria-hidden で読み上げから外している。
- 確認: lint、テスト(24件)、ビルドが通った。Chrome のスクリーンショットで、PC幅(1280px)・スマホ幅(500px)の表示を確認した。
- 2026-10-19: テレビが浮いて見えたため、中央の床の段ボール爪研ぎを背景から削除し、PC幅ではテレビ台の脚が床(背景の絵 y=134)に着くよう、Hero.jsx で位置を合わせた。スマホ幅は背景が下の一部だけなので、従来どおり上寄せ(まだ浮いて見える)。ブランチ tv-stand。
- 2026-10-19: 時計をテレビ追加前の絵(丸い壁掛け時計、12:00)に戻し、アンテナの上に置いた(tools/make_room_bg.py が src/assets/clock.png を出力)。右の縦長の爪研ぎは右・下へ、猫用ベッドは下へずらし、テレビと重ならないようにした。ブランチ clock-move(main には未マージ)。

## 次にやること(面接前の優先順。事実は本人から聞く)
1. 各作品の担当範囲は、4作品とも済み。残りは、calendar_epaper と aws_Terraform の開発期間と、チーム人数(どの README にも無い)。両リポジトリの README にも、サイトと同じ内容(形態・担当)を書いておくと、食い違わない。
2. Skills を、使用経験の度合い(メイン / 触った程度)で整理する(自分で書いていない技術の削除は済み)。作品カードの「使用技術」の行(Blender、Kotlin、FastAPI、Nginx)をどうするか決める。
3. About の自己紹介を、本人の言葉に直す(今はデモ)。卒業月と志望職種を入れるか決める。
4. MCP認可検証を「制作中」として載せる(内容を聞く)。
5. 作品説明に「難しかった点 → 切り分け → 結果(数字)」を足す(数字は本人が確認したものだけ)。
7. 各 GitHub の README にある Canva のリンクが、閲覧専用(/view)か確認する(3つが /edit に転送された)。未ログインの別ブラウザで開けるかも確認する。
8. 連絡先メールを就活用に揃える。
9. リポジトリ名 aws_Terraform の変更(変更すると旧URLからは転送されるが、このサイトと README のリンクも直す)と、各 README の整理。
- 公開リポジトリ networkgame に、データベースの接続情報(backend/.env)が含まれている。パスワードの変更と、リポジトリからの削除を検討する。

- 2026-11-17: 自分のドメイン（1qla.com、www.1qla.com）で公開するための Terraform を、ブランチ custom-domain の infra/ に書いた（S3 非公開バケット + CloudFront（OAC）+ us-east-1 の ACM 証明書 + Route 53 の A/AAAA）。state は別プロジェクトと同じバケットの portfolio/terraform.tfstate。init -backend=false と validate は通った。plan と apply は、AWS にログインしてから行う。アカウント ID などは infra/backend.hcl と infra/terraform.tfvars（Git に入れない。.example を用意）。
- 公開は、apply のあと scripts/upload.sh（ビルド、S3 へ同期、キャッシュ削除）を手で実行して行う。GitHub Pages（1qLa.github.io）は、1qla.com が動くことを確認するまで、そのままにする。main には、まだ取り込まない（取り込むと deploy.yml が走る）。
- 2026-11-17(決定): 1qla.com は、別作品(MCP認可検証)の基盤と同居する。向こうは `*.probe.1qla.com`(診断用、ALB 東京)と `authz.1qla.com`(管理画面、CloudFront)を使い、証明書も別々に持つ。ゾーンは両方とも `data` で参照するだけで、作らない(本人が向こうの dns.tf を確認)。そのため、こちらの apply と向こうの base の apply は、順番を問わず別々に進められる。出典: 本人が向こうのディレクトリから貼った内容(2026-11-17)。ドメインは ACTIVE、期限 2027-11-12、自動更新とプライバシー保護オン(2026-11-12 に本人が CLI で確認)。
- 2026-11-17(決定): サブドメインにするのは、Web で動く作品(authz、networkgame の Play)だけ。ほかの作品は GitHub リンクのまま。`*.1qla.com` のワイルドカード証明書と、ワイルドカードの DNS レコードは作らない(作品ごとに個別の名前と証明書にする)。probe は診断IDごとの一時的な名前なので、サイトからはリンクしない。
- 2026-11-17: custom-domain の plan を確認した(プロファイル mcp-personal)。追加17、変更0、削除0。ゾーンの既存レコードは NS・SOA と、向こうの検証用 CNAME(authz、probe)だけで、同名の衝突なし。apply はまだ(本人の許可待ち)。
## 次にやること(1qla.com)
1. infra/ で terraform apply(証明書の DNS 検証と CloudFront の作成に、数分〜十数分かかる)。
2. scripts/upload.sh でビルドと S3 への同期。https://1qla.com と https://www.1qla.com の表示を確認する。
3. 確認できたら、Works に authz.1qla.com へのリンクを足す(authz が動いてから)。GitHub Pages は、1qla.com が動くまでそのまま。
- 2026-11-17(確認): CloudFront の従量課金には、毎月の無料枠(Always Free)がある。インターネットへの転送 1 TB、HTTP/HTTPS リクエスト 1,000 万、CloudFront Functions 200 万回。無効化は、月 1,000 パスまで追加料金なし。出典: https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/(確認日 2026-11-17)。Notion の試算(月1万表示で約1.2ドル)は、無料枠を含めていないので、実際は CloudFront 分がほぼ 0 になる見込み(月10万表示でも、転送約100 GB・リクエスト約50万で、枠内)。
- 同じく確認: CloudFront には、別に「フラット料金プラン」(Free は月0ドル、転送 100 GB・リクエスト 100 万、超過料金なし、ロギングなどは含まれない)がある。出典: https://aws.amazon.com/cloudfront/pricing/(確認日 2026-11-17)。今の Terraform は従量課金のディストリビューションで、フラット料金プランは使っていない。
- 未確認: 無料枠がアカウント全体で合算されるか(authz の CloudFront と共有か)、リージョンごとの扱い。AWS のログイン後、Billing の Free Tier の画面で見られる。
- 2026-11-17: custom-domain の apply を実行した(追加17、変更0、削除0)。scripts/upload.sh でビルドと S3 への同期、キャッシュ削除も済み。確認: https://1qla.com/ と https://www.1qla.com/ が 200(証明書の検証に成功、タイトルは「金島拓矢 | Portfolio」)、JS・CSS・3D モデル(.glb)が 200、http は https へ 301。GitHub Pages(1qLa.github.io)は、そのまま残している。ブラウザでの見た目(PC幅・スマホ幅)は、まだ見ていない。
- 未対応: ブランチ custom-domain は、未コミット(progress.md)・未 push・main 未取り込み。今後の更新は、本人が scripts/upload.sh を手で実行して公開する(main に取り込むと deploy.yml が GitHub Pages へ公開する。両方に出る形になる)。
- 2026-11-17(決定): AWS への公開を、GitHub Actions + OIDC で自動化する(CodePipeline は使わない。既存の CI を活かすため)。infra/ci.tf に、GitHub 用 OIDC プロバイダ(このアカウントには無かった)と、IAM ロール portfolio-github-deploy を追加し、apply した(追加3、変更0、削除0)。ロールを引き受けられるのは、リポジトリ 1qLa/1qLa.github.io の main ブランチだけ。権限は、このバケットへの ListBucket・PutObject・DeleteObject と、このディストリビューションの CreateInvalidation だけ。
- GitHub に登録した値: secret AWS_DEPLOY_ROLE_ARN、variable S3_BUCKET、variable CLOUDFRONT_DISTRIBUTION_ID(リポジトリ 1qLa/1qLa.github.io)。
- .github/workflows/deploy.yml に、ジョブ deploy-aws を追加した(build のあと、Pages への公開と並行して、S3 同期と CloudFront の無効化を行う)。新しく使う Actions は SHA で固定(upload-artifact v7.0.2、download-artifact v8.0.2、configure-aws-credentials v6.3.0。確認日 2026-11-17)。YAML の構文と lint は通った。
- まだ試していない: deploy-aws の実行。信頼条件が main だけなので、ブランチからは試せない。main に取り込んだとき、初めて動く(同時に GitHub Pages にも公開される)。失敗したときは、Pages は影響を受けない(ジョブは別)。直し方は、deploy.yml の修正か、infra/ci.tf の信頼条件の確認。
- 2026-11-19: About の本文を、本人の言葉に書き換えた(src/components/About.jsx)。「授業でクラウド(AWS)を1年学び、インターンで認証・認可を学んでから、セキュリティ方面に関心があり、クラウドセキュリティエンジニアを目指しています。ゼミではTerraformで、AWSの構成ドリフトについての研究をしています。/ ICTトラブルシューティングコンテストやMBSD Cybersecurity Challengesなどのコンテストにも参加した経験があります。」右の表は変えていない。lint、テスト(24件)、ビルドは通った。ブラウザでの見た目は未確認。未コミット(ブランチ custom-domain)。「次にやること」の3番(自己紹介)は、卒業月と志望職種を表に足すかどうかだけが残り。
- 公開しない方針(メモにあるが、サイトには出さない): 内定先と、オファー面談の予定、辞退した会社、インターン先の社名、経歴(高校中退)、最寄り駅、趣味。載せる場合は、本人の許可を得てから。
- 2026-11-19: About の右の表から「受賞」を削除した(本人の指示)。表は、志望・学校・卒業の3項目。
- 2026-11-19: About の本文に「AIのセキュリティにも興味があります。」を追加した(本人の指示)。2文ごとの段落にするため、段落を並べ替えた(1段落目: 志望・授業・インターン・AIのセキュリティ、2段落目: ゼミ・コンテスト)。
- 2026-11-19: About の本文を、本人が選んだ文面に差し替えた(「専門学校の授業でAWSを1年間学び、インターンで認証・認可に触れたことをきっかけに、セキュリティ分野に関心を持つようになりました。現在はクラウドセキュリティエンジニアを目指しており、AIセキュリティにも興味があります。/ ゼミではTerraformを用いて、AWS環境の構成ドリフトに関する研究に取り組んでいます。また、ICTトラブルシューティングコンテストやMBSD Cybersecurity Challengesなどのコンテストにも参加してきました。」)。未コミット(ブランチ custom-domain)。
- 2026-11-19: Works に就職作品「MCP Authorization Checker」を追加した(ドリフト検知の次、2列の先頭)。内容は、リポジトリ 1qLa/mcp-authorization-checker(非公開)の develop ブランチの docs/checklist.md、docs/probe-design.md、progress.md と、本人のメモ(開発期間 2026年9月〜2027年1月、学校の AWS アカウント)から。形態は「就職作品」、状況は「開発中(診断用サーバーの認可の入口まで。認可サーバー、判定、結果画面を作成中)」。担当は、聞いていないので書いていない。リポジトリが非公開のため、リンクなし。カード(WorkCard.jsx)とテスト(works.test.js)を、links が無くてもよい形に直した(テスト26件、通過)。公開したら GitHub のリンクを足す(公開前に docs/ のリソース ID などの確認が要る)。
- 2026-11-19: 作品「Packets of Long Ago (昔々のパケットたち)」の題名を「昔々のパケットたち」に変えた(本人の指示)。
- 決めていない(本人に確認): MCP Authorization Checker の担当(個人かチームか)、カードの位置(今は2列の先頭)。桃太郎のカードの「コンセプト賞を受賞」の記載は、About の表から外したあとも残っている(works.js の本文)。
- 2026-11-19: MCP Authorization Checker のカードを、リポジトリの README(develop、2026-11-19 の版。出典 https://github.com/1qLa/mcp-authorization-checker 、確認日 2026-11-19)に合わせて書き直した。本文は3段落(背景: AIごとに OAuth 2.1 の対応が違う / 診断用サーバーに接続させて全通信を記録し、MCP 2025-06-18 のルールで AI を使わずに合否を付ける / 診断のときだけ Terraform で起動して削除)。使用技術に Starlette を追加(認可サーバーを自作する決定、2026-11-19)。状況は README の表に合わせた(設計、常設基盤、観測用 MCP サーバーの認可の入口まで。認可サーバー、判定、API、管理画面は未実装)。
- 書いていないこと(README にあるが、サイトに出すかは本人の判断): 診断対象の AI の名前(Claude、Copilot、Meta Muse など)、予定の構成(Lambda、API Gateway、Cognito、React、CloudFront)、費用の数字。
- 2026-11-19: About・Works の変更をコミットし(aaa373a)、custom-domain を main に早送りで取り込んで push した。deploy.yml の初回実行(run 44447954269): build 成功、GitHub Pages(deploy)成功、deploy-aws は失敗(configure-aws-credentials で「Not authorized to perform sts:AssumeRoleWithWebIdentity」)。
- 原因: このリポジトリは OIDC の sub が不変の ID 形式(use_immutable_subject: true、sub_claim_prefix は repo:1qLa@170410213/1qLa.github.io@1416528793)で、信頼条件の repo:1qLa/1qLa.github.io:ref:refs/heads/main と一致しなかった。出典: gh api repos/1qLa/1qLa.github.io/actions/oidc/customization/sub(確認日 2026-11-19)。
- 直し方: infra/ci.tf の信頼条件を、変数 github_sub_prefix(上の ID 形式)を使う形に変更した(validate は通った)。apply は、AWS のセッションが切れているため未実施(aws login --profile mcp-personal のあとに、plan を確認して apply)。そのあと、Actions の deploy を再実行する(gh run rerun)。
- 2026-11-19(解決): ci.tf の信頼条件を ID 形式に直して apply した(変更1)。診断用ワークフローで、実際のトークンの sub が repo:1qLa@170410213/1qLa.github.io@1416528793:ref:refs/heads/<ブランチ> の形であることを確認(診断用ブランチ oidc-debug は、確認後に削除)。apply の直後の再実行は同じエラーで失敗し、少し待ってからの再実行(run 44447954269)で、deploy-aws が成功した(IAM のポリシー変更の反映待ちと見られる。原因の断定はしていない)。https://1qla.com で、新しい About、MCP Authorization Checker、題名「昔々のパケットたち」を確認し、「受賞」の行が無いことも確認した。
- 学び: 信頼ポリシーを変えた直後は、数十秒〜数分、反映を待ってから再実行する。このリポジトリの OIDC sub は、名前ではなく ID 形式(変えるときは gh api repos/1qLa/1qLa.github.io/actions/oidc/customization/sub で確認)。
- 次の確認: main への push だけで、deploy-aws が自動で成功すること(再実行ではない、2回目の実行)。
- 2026-11-19: Works の文言を削った(本人の指示)。MCP Authorization Checker の「状況」は「開発中」だけにし、本文の3段落目(診断用の環境を、診断のときだけ Terraform で起動して削除する)を外した。LighTouch の本文から「設定の変更は、本体の物理ボタンを押している間だけできます。」を外した。lint、テスト、ビルドは通った。未コミット。
- 2026-11-19: ブランチ custom-domain を削除した(ローカルとリモート。main に全部入っていることを確認してから)。残っているブランチで、main に無いコミットが0のもの: pixel-design、tv-hero、tv-stand、clock-move、react-migration(削除するかは本人が決める)。
- 2026-11-19(決定、本人の指示): GitHub Pages(1qLa.github.io)は、そのまま残す。桃太郎のカードの「コンセプト賞を受賞」の記載も、そのまま残す。ブランチ pixel-design、tv-hero、tv-stand、clock-move、react-migration を削除した(ローカルとリモート。どれも main に無いコミットは0だった)。残っているのは main と、Dependabot のブランチだけ。
- 2026-11-19: タブに表示される名前(index.html の title)を「金島拓矢 | Portfolio」から「1qla | Portfolio」に変えた(本人の指示)。
