# README

これはShuのポートフォリオの、Digital Ichibaのフロントエンドのリポジトリです。

## 概要
Digital Ichiba は、  
ハンドメイド作家や小規模ブランド、  
セレクトショップのオーナー向けに設計された  
オンライン販売プラットフォームです。

初期設定を最小限に抑え、  
最短5分で商品ページを公開し、販売を開始できます。  
シングルページアプリケーション（SPA）によるスムーズな操作性と、  
Stripeを利用した安全で信頼性の高い決済機能を備えています。

スマートフォン・パソコン・タブレットなど、  
デバイスを問わず快適に利用できるUIにより、  
商品ページの閲覧から購入までをスムーズに行えます。

複雑な設定や運用に悩むことなく、  
「作る・伝える・売る」ことに集中できる環境を提供します。

## 主な機能
- マルチテナント対応のショップ管理
- JWT（Auth.js）によるAPI認証
- Stripe Checkout / Connectによる決済・分配
- 商品管理
- 注文情報の管理

## バージョン情報
- TypeScript 5.9.3
- React 19.1.0
- Next.js 15.5.7
- Auth.js 5.0.0-beta.30
- TailwindCSS 4.1.17

## リソース表

### Pages（Public）
| Method | Path | 説明 |
| --- | --- | --- |
| GET | / | トップ（新着商品/新着ショップ） |
| GET | /about | Aboutページ |
| GET | /privacy | プライバシーポリシー |
| GET | /terms | 利用規約 |
| GET | /cart | カート |
| GET | /cart/success | 決済完了ページ |
| GET | /products/[id] | 商品詳細 |
| GET | /shops | ショップ一覧 |
| GET | /shops/[id] | ショップ詳細（商品一覧含む） |
| GET | /shops/[id]/profile | ショッププロフィール（公開） |

### Pages（Dashboard）
| Method | Path | 説明 |
| --- | --- | --- |
| GET | /dashboard | ダッシュボードTOP（ユーザー注文一覧など） |
| GET | /dashboard/orders/[id] | 注文詳細（ユーザー） |
| GET | /dashboard/shop | ショップ管理TOP（受注一覧など） |
| GET | /dashboard/shop/profile | ショッププロフィール編集 |
| GET | /dashboard/shop/orders/[id] | 受注詳細（ショップ） |
| GET | /dashboard/shop/products/new | 商品作成（ショップ） |
| GET | /dashboard/shop/products/[id]/edit | 商品編集（ショップ） |

### Route Handlers（API/内部処理）
| Method | Path | 説明 |
| --- | --- | --- |
| GET/POST | /api/auth/[...nextauth] | Auth.jsハンドラ |
| GET | /api/auth/callback | Auth後にRailsへ /api/login → Cookie(di_data)セット |
| GET/POST/PUT/PATCH/DELETE | /api/[...proxy] | Rails API へのプロキシ転送（内部API） |
| POST | /dashboard/setup_shop | 認可後に /api/shop(POST) → /dashboard/shop へリダイレクト |
| GET | /dashboard/shop/refresh | /api/shop を取り直してCookie反映 → /dashboard/shop |

## 認証フロー

![認証フロー](docs/nextjs_rails_auth_architecture.webp)

## Setup
```
npm install
npm run dev
```

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

# Google OAuth
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
