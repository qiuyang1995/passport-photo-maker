# Passport Photo Maker

Passport Photo Maker 是一个面向美国护照照片场景的双语 Next.js 站点。用户可以在浏览器内上传 JPG / PNG，调整正方形裁切，并导出数字版 JPG 或 4x6 打印模板；同时通过 FAQ、规格说明和尺寸/打印/数字版内容页承接搜索流量。

## 运行环境

- Node.js 20+
- npm 10+

## 本地开发

```bash
npm install
npm run dev
```

默认访问 [http://localhost:3000](http://localhost:3000)。

## 环境变量

复制 `.env.example` 后按需填写：

```bash
NEXT_PUBLIC_SITE_URL=https://passport-photo-maker.vercel.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
NEXT_PUBLIC_ADSENSE_TOOL_SLOT=
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=
NEXT_PUBLIC_ADSENSE_FAQ_SLOT=
```

说明：

- `NEXT_PUBLIC_SITE_URL`：canonical、sitemap、open graph 使用的站点域名。
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`：可选，填写后启用 GA4 `gtag`。
- `NEXT_PUBLIC_ADSENSE_*`：可选，生产环境填写完整后启用对应广告位；未配置时生产环境不渲染广告容器。

## 常用命令

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
npm run start
```

## 测试

- 单元/组件测试：Vitest + Testing Library
- E2E：Playwright

首次运行 E2E 前安装浏览器：

```bash
npx playwright install chromium
```

## 部署

推荐部署到 Vercel。

上线前至少配置：

- `NEXT_PUBLIC_SITE_URL`
- 可选的 GA4 / Adsense 环境变量

构建命令：

```bash
npm run build
```

启动命令：

```bash
npm run start
```

## 上线前检查

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`
- 根路径会重定向到 locale 首页
- 英文/中文首页都能进入工具页
- 数字版文件名为 `passport-photo-digital.jpg`
- 打印版文件名为 `passport-photo-print-4x6.jpg`
- 隐私说明、免责声明和 FAQ 可见
- 广告不会进入裁切编辑区
- 未配置 Adsense 时生产环境不显示占位广告框
