# README

これはShuのポートフォリオの、Digital Ichibaのフロントエンドのリポジトリです。

## 概要
Digital Ichibaは、ハンドメイド作家や衣料品、雑貨、生活用品などの小規模セレクトショップのオーナー向けに、
SNSと直結して5分でオンラインショップを開設できるECプラットフォームです。
シングルページアプリケーション（SPA）によるスムーズな操作性と、Stripeによる信頼性の高い決済機能を搭載。
在庫管理やモバイル最適化も完備し、日常の投稿からそのまま販売につなげられます。
誰でもスムーズに販路を広げ、ブランドの魅力を最大限に発信できる環境を提供します。

## バージョン情報
このリポジトリのバージョン情報です。  
TypeScript 5.9.3  
React 19.1.0  
Next.js 15.5.7  
Auth.js 5.0.0-beta.30  
TailwindCSS 4.1.17  

こちらは同じプロジェクトのバックエンドのリポジトリです。  
Ruby 3.3.9  
Rails 8.0.2.1  
Postgresql 16.10  
Docker 28.4.0  

## Setup
```
npm install
npm run dev
```

## 認証フロー

![認証フロー](docs/nextjs_rails_auth_architecture.webp)

## 環境変数

開発では、以下を設定してください。

```bash
# フロント（Next.js）のURL
NEXT_URL=http://localhost:3001

# バックエンド（Rails API）のURL
RAILS_URL=http://localhost:3000

# Auth.js（NextAuth）用：セッション暗号化・署名に使用（ランダムな長い文字列）
AUTH_SECRET=your-random-secret

# Auth.js（NextAuth）用：このフロントのURL（コールバックURL生成に使用）
AUTH_URL=http://localhost:3001

# Google OAuth（GCPのOAuthクライアント）
AUTH_GOOGLE_ID=xxxx.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=xxxx

# Rails向けJWT署名用の秘密鍵（PKCS8/PEM, 改行は \\n）
# ※Rails側には対応する公開鍵を設定して検証します
APP_JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
```

### ざっくり用途
- **`NEXT_URL`**: サーバー側fetchのベースURL（Next内部の `/api/...` 呼び出しに使用）
- **`RAILS_URL`**: NextのAPIプロキシがRailsへ転送するときのベースURL
- **`AUTH_SECRET` / `AUTH_URL`**: Auth.js（NextAuth）の動作に必須
- **`AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`**: Googleログイン用
- **`APP_JWT_PRIVATE_KEY`**: Next→Rails API通信で使うJWTの署名用（`src/lib/createBackendJwt.ts`）
