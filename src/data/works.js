import nfcLight from '../assets/works/nfc_light.png'
import calendarEpaper from '../assets/works/calendar_epaper.png'
import { siGithub } from 'simple-icons'

// リンクの icon があれば、ラベルの前にロゴを表示する。
// 発表スライドのリンクは載せない(各 GitHub リポジトリの README にある)。
// 本文(body)は、文字列なら段落、{ flow } なら構成図。文中の `…` はコード表記になる。
// media.kind: 'scene' は桃太郎の3D表示、'image' は画像。media がなければ文章だけのカード。
export const works = [
  {
    id: 'aws-drift',
    title: 'AWS Drift Detection and Slack Alerts',
    stack: 'Terraform / AWS (CloudTrail, EventBridge, SNS, SQS, Lambda, KMS) / Python',
    body: [
      'Terraformは、AWSコンソールで手作業された変更(例: セキュリティグループの開放)に、次に `terraform plan` を実行するまで気づけません。このシステムは、そうした手動変更をすぐに検知してSlackに通知し、管理外の変更を早く見つけます。',
      {
        flow: {
          label: '構成: CloudTrail、EventBridge、SNS、SQS、Lambda、Slackの順に流れる',
          steps: [
            ['CloudTrail', 'API操作を記録'],
            ['EventBridge', '変更を絞り込む'],
            ['SNS', '通知を振り分ける'],
            ['SQS', 'ためて再送に備える'],
            ['Lambda', 'メッセージを整える'],
            ['Slack', 'チームに通知'],
          ],
        },
      },
      'Lambdaの環境変数に置いたSlack Webhook URLは、AWS KMSで暗号化しています。',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/1qLa/aws_Terraform', icon: siGithub },
    ],
  },
  {
    id: 'packets-of-long-ago',
    title: 'Packets of Long Ago (昔々のパケットたち)',
    stack: 'Vue.js 3 / Three.js / Blender',
    media: { kind: 'scene', label: 'ゲームの主人公の桃太郎が、野原を歩いている', caption: 'ゲームの3Dモデルが、ブラウザ上で動いています' },
    body: [
      '桃太郎の昔話を通して、ネットワークの基礎(IPアドレス、ルータ、スイッチ)を学べる3Dの学習ゲームです。企画を考え、フロントエンド(3D描画、衝突判定、UIロジック)を実装しました。',
      '学内展示でコンセプト賞を受賞し、CEATEC 2026 でも展示しました。',
    ],
    links: [
      { label: 'Play', href: 'https://pingers.tenma.tech/' },
      { label: 'GitHub', href: 'https://github.com/1qLa/networkgame', icon: siGithub },
    ],
  },
  {
    id: 'lightouch',
    title: 'LighTouch',
    stack: 'Kotlin (Android) / ESP32-C3 / PN532 / BLE',
    media: { kind: 'image', src: nfcLight, alt: 'LighTouchのタイトルスライド', width: 1440, height: 810 },
    body: [
      '鍵のように使えるスマートライトで、登録したNFCタグをかざしたときだけ点灯します。AndroidアプリからBLEで接続して、設定と鍵の管理を行います。',
      '設定の変更は、本体の物理ボタンを押している間だけできます。',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/1qLa/nfc_light', icon: siGithub },
    ],
  },
  {
    id: 'epaper-calendar',
    title: 'E-Paper Calendar',
    stack: 'M5Paper (C++) / Python, FastAPI / Docker, Nginx',
    media: { kind: 'image', src: calendarEpaper, alt: '月表示の電子ペーパーカレンダー', width: 577, height: 432, contain: true },
    body: [
      'Googleカレンダーの最新の予定を表示する、M5Paper用のIoT電子ペーパーカレンダーです。サーバーが予定を画像にし、端末はETagで変更の有無を確かめて、変わっていないときは再描画を省いて電力を節約します。',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/1qLa/calendar_epaper', icon: siGithub },
    ],
  },
]
