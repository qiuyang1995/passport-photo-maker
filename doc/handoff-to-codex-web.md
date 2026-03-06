# Codex Web 接力上下文

请先读取并理解以下文件：

- `doc/PRD.md`
- `doc/TDD.md`
- `doc/development-plan.md`

项目仓库：

- `passport-photo-maker`
- GitHub 已推送到 `origin/main`

当前状态总结：

1. 项目已经完成 Phase 0 和 Phase 1。
2. 技术栈为 `Next.js 16 + App Router + TypeScript + Tailwind + Vitest`。
3. 站点已支持双语，首期语言为：
   - `en`
   - `zh`
4. 路由已改为 locale 结构：
   - `/en/...`
   - `/zh/...`
5. 未带语言前缀的访问会通过 `proxy.ts` 自动重定向到语言路径。
6. 当前已完成：
   - 双语首页
   - 双语 FAQ / Privacy / Terms
   - 4 个双语核心内容页
   - 内容页模板增强：quick facts、key takeaways、FAQ、CTA、免责声明、相关推荐
   - FAQ JSON-LD 结构化数据
   - sitemap / robots / locale-aware metadata
7. 当前工具页还只是骨架，尚未实现真正的图片上传、裁切和导出逻辑。

关键文件位置：

- 路由入口：
  - `app/[locale]/page.tsx`
  - `app/[locale]/passport-photo-maker/page.tsx`
- 内容配置：
  - `features/content/content-pages/en.ts`
  - `features/content/content-pages/zh.ts`
  - `features/content/content.config.ts`
  - `features/content/faq.config.ts`
- 国际化：
  - `lib/i18n/config.ts`
  - `lib/i18n/messages.ts`
- SEO：
  - `lib/seo/metadata.ts`
  - `lib/seo/schema.ts`
  - `components/seo/json-ld.tsx`
- 内容模板：
  - `components/content/content-page-shell.tsx`

已验证通过的命令：

- `npm run format`
- `npm run lint`
- `npm run test`
- `npm run typecheck`
- `npm run build`

当前 Git 状态：

- 分支：`main`
- 远程：`origin`
- 最新提交：`41c6475`
- 提交信息：`Initialize bilingual Phase 0 and Phase 1 foundation`

建议下一步：

- 进入 Phase 2
- 实现图片上传、预览、拖拽、缩放、数字版导出、4x6 打印模板导出

执行要求：

1. 先阅读 PRD / TDD / development plan，再开始编码。
2. 保持当前双语架构不被破坏，新页面和功能继续兼容 `en` / `zh`。
3. 优先在现有结构中扩展，不要推翻当前路由和内容组织。
4. 每完成一批修改后，运行：
   - `npm run lint`
   - `npm run test`
   - `npm run typecheck`
   - `npm run build`

如果直接进入开发，请从 Phase 2 开始实现真实的 passport photo editor MVP。
