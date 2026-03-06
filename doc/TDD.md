# Passport Photo Maker TDD

## 1. 文档信息

- 文档版本：v1.0
- 文档日期：2026-03-06
- 适用范围：MVP 技术设计与实现约束
- 说明：当前仓库尚无现成代码，本 TDD 同时承担首版技术选型决策文档

## 2. 技术目标

- 在无后端依赖的前提下完成护照照片编辑与导出
- 保证内容页 SEO 可索引
- 兼顾移动端体验与实现成本
- 为后续扩展更多国家规格、更多内容页和更多工具能力预留结构
- 为中英文双语站点预留统一路由和内容配置机制

## 3. 技术选型

### 3.1 选型结论

- 框架：Next.js 15+（App Router）
- 语言：TypeScript
- 样式：Tailwind CSS 4 或稳定版 Tailwind CSS 3.x
- 组件策略：优先自研轻量组件，不引入重型 UI 框架
- 图片处理：Canvas API + 原生 `ImageBitmap` / `HTMLImageElement`
- 状态管理：React 本地状态 + Context，仅在必要处共享
- 内容组织：本地 Markdown 或 TS 配置驱动的静态内容
- 部署：Vercel 优先，亦可兼容 Cloudflare Pages / Netlify
- 分析：GA4 或 Plausible
- 广告：Google Adsense
- 国际化策略：基于 App Router 的 locale segment，首期支持 `en` / `zh`

### 3.2 选型理由

- Next.js 适合 SEO、静态页面生成和工具页共存场景
- App Router 便于按路由组织营销页、内容页和工具页
- TypeScript 有助于降低图片编辑与导出流程中的参数错误
- Canvas API 足以覆盖裁切、导出、打印模板渲染需求，无需引入沉重图像库

## 4. 系统边界

### 4.1 MVP 边界

- 前端单体应用
- 无用户登录
- 无数据库
- 无图片上传服务
- 无服务端图片处理

### 4.2 可选外部依赖

- Vercel Analytics / GA4
- Google Adsense
- Search Console

## 5. 总体架构

### 5.1 架构原则

- 页面以静态输出优先
- 图片处理严格在浏览器端执行
- 工具能力与内容能力解耦
- 业务规则通过配置集中管理

### 5.2 逻辑分层

1. `app/` 路由层
2. `lib/i18n/` 语言配置、路径生成、站点文案
3. `features/editor/` 工具编辑能力
4. `features/export/` 数字版与打印版导出能力
5. `features/content/` 内容页数据与渲染
6. `components/` 通用 UI
7. `lib/` 工具函数、配置、SEO、分析封装

## 6. 建议目录结构

```text
app/
  [locale]/
    (marketing)/
      page.tsx
      faq/page.tsx
      privacy/page.tsx
      terms/page.tsx
    (content)/
      passport-photo-requirements-us/page.tsx
      2x2-photo-size/page.tsx
      passport-photo-print-template/page.tsx
      digital-passport-photo-checker/page.tsx
    passport-photo-maker/page.tsx
  sitemap.ts
  robots.ts
  layout.tsx

lib/
  i18n/
    config.ts
    messages.ts

components/
  layout/
  marketing/
  content/
  ads/
  ui/

features/
  editor/
    components/
    hooks/
    utils/
    types.ts
  export/
    digital/
    print/
  content/
    content.config.ts
    faq.config.ts

lib/
  seo/
  analytics/
  ads/
  image/
  constants/

public/
  images/
  icons/

content/
  pages/
```

## 7. 路由设计

### 7.1 页面路由

- `/[locale]`
- `/[locale]/passport-photo-maker`
- `/[locale]/passport-photo-requirements-us`
- `/[locale]/2x2-photo-size`
- `/[locale]/passport-photo-print-template`
- `/[locale]/digital-passport-photo-checker`
- `/[locale]/faq`
- `/[locale]/privacy`
- `/[locale]/terms`

### 7.2 路由实现原则

- 首页和内容页默认使用 Server Components
- 工具页编辑器使用 Client Component
- 页面元信息通过 `generateMetadata` 或静态 metadata 输出
- 未带 locale 前缀的路径通过中间层重定向到匹配语言路径

## 8. 核心数据模型

### 8.1 编辑器状态

```ts
type EditorImage = {
  file: File;
  objectUrl: string;
  naturalWidth: number;
  naturalHeight: number;
};

type EditorTransform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

type ExportPreset = "digital" | "print-4x6";
```

### 8.2 内容页配置

```ts
type ContentPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  sections: Array<{
    id: string;
    heading: string;
    body: string[];
  }>;
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};
```

### 8.3 FAQ 模型

```ts
type FaqItem = {
  question: string;
  answer: string;
  category?: string;
};
```

## 9. 编辑器技术设计

### 9.1 交互模块

- `UploadPanel`：文件选择、格式校验、错误提示
- `PhotoStage`：预览区域、裁切边界、辅助框
- `ZoomSlider`：缩放控制
- `ExportPanel`：导出按钮、提示文案、免责声明

### 9.2 渲染方案

- 预览阶段使用 DOM + CSS transform 提升交互流畅性
- 导出阶段使用离屏 Canvas 重新绘制高质量结果
- 打印模板导出时在新 Canvas 内按固定网格重复绘制照片

### 9.3 头部辅助框

- 仅作为视觉参考层，不参与自动判断
- 使用绝对定位覆盖在裁切区域上方
- 在移动端保持清晰可见，但避免遮挡主要预览内容

### 9.4 状态流转

1. 用户上传文件
2. 系统校验格式与基础大小
3. 生成 object URL
4. 初始化默认缩放与居中偏移
5. 用户交互修改 transform
6. 用户触发导出
7. Canvas 根据 transform 生成输出
8. 释放不再使用的资源

## 10. 导出技术设计

### 10.1 数字版导出

- 输出格式：JPG
- 输出尺寸：MVP 可先输出标准正方形高分辨率图，如 `1200 x 1200`
- 背景：沿用原图结果，不做抠图或自动补白
- 文件命名：`passport-photo-digital.jpg`

### 10.2 4x6 打印模板导出

- 输出格式：JPG
- 画布比例：4:6
- 画布尺寸：建议 `1200 x 1800` 或更高整数倍
- 照片布局：按统一边距排列多张 2x2 照片
- 文件命名：`passport-photo-print-4x6.jpg`

### 10.3 导出算法要点

- 计算裁切区域在原图上的映射关系
- 使用高分辨率 Canvas 防止导出模糊
- 打印模板复用同一裁切结果，不重复计算用户交互状态

## 11. 内容页技术设计

### 11.1 内容来源

MVP 阶段建议采用本地配置或 Markdown 文件驱动，避免引入 CMS。

### 11.2 内容渲染

- 每个页面输出唯一 metadata
- 页面主体包含目录、正文、FAQ、CTA、相关页面入口
- 可在内容块之间插入广告占位组件

### 11.3 SEO 设计

- 语义化标题结构
- FAQ 页支持 FAQ 结构化数据
- 生成 sitemap 与 robots
- 为关键页面设置 canonical

## 12. 广告与分析设计

### 12.1 Adsense 接入原则

- 广告组件独立封装，避免散落在业务页面
- 使用保底高度避免 CLS
- 客户端按页面类型决定是否渲染广告位

### 12.2 埋点建议

- `upload_started`
- `upload_succeeded`
- `upload_failed`
- `export_digital_clicked`
- `export_print_clicked`
- `export_succeeded`
- `content_cta_clicked`

## 13. 性能设计

### 13.1 前端性能

- 图片解码优先使用浏览器原生能力
- 上传后仅保留必要状态，及时释放 object URL
- 预览和导出逻辑分离，避免每次拖动都重绘 Canvas

### 13.2 移动端优化

- 限制编辑区最大尺寸
- 滑块与拖动交互做触屏适配
- 对超大图执行降采样，避免内存峰值过高

## 14. 异常与边界处理

### 14.1 上传异常

- 文件类型不支持
- 文件损坏无法解码
- 文件尺寸过大导致内存压力过高

### 14.2 编辑异常

- 图片尚未加载完成即触发导出
- 极端缩放值导致预览越界
- 移动端手势与页面滚动冲突

### 14.3 导出异常

- Canvas 创建失败
- 浏览器下载被拦截
- 移动端内存不足导致导出失败

### 14.4 处理策略

- 所有异常统一展示可理解的用户提示
- 导出按钮在资源未就绪时禁用
- 对缩放值和偏移量进行边界钳制

## 15. 安全与合规

- 不上传原始图片到服务器
- 不在日志中记录图片内容
- 页面显式声明“结果仅供参考，请以官方要求为准”
- 隐私页说明本地处理机制

## 16. 测试方案

### 16.1 单元测试

- 图片参数计算函数
- 裁切映射算法
- 打印模板布局算法
- metadata / 内容配置校验

建议工具：Vitest

### 16.2 组件测试

- 上传组件状态切换
- 编辑器控制组件交互
- 导出按钮禁用 / 启用条件

建议工具：React Testing Library

### 16.3 E2E 测试

- 首页进入工具页
- 上传图片并完成导出
- 内容页 CTA 跳转到工具页
- 移动端关键路径可用

建议工具：Playwright

## 17. 发布与运维

### 17.1 部署流程

1. Push 到主分支
2. 执行构建与测试
3. 预览环境验收
4. 发布生产环境

### 17.2 上线前检查项

- sitemap 与 robots 正常
- 所有页面 metadata 完整
- 广告位不影响主要操作
- 工具页导出在桌面端和移动端均可用
- 隐私与免责声明可见

## 18. 后续扩展预留

- 多国家规格配置化
- 自动背景检测
- 更精细的人头比例提示
- 更多导出模板
- 程序化内容页批量生成

## 19. 技术决策摘要

- 决定使用 Next.js 而不是 Vite + React，原因是本项目从第一天就以 SEO 和静态内容页为核心
- 决定 MVP 不引入后端，原因是核心价值在本地编辑与内容页流量验证
- 决定不做 AI 检测与自动换底，原因是实现成本高且存在误导风险
