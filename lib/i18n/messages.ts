import { type Locale } from "@/lib/i18n/config";

type SiteMessageDictionary = {
  chrome: {
    tagline: string;
    primaryNav: {
      home: string;
      tool: string;
      requirements: string;
      faq: string;
    };
    footer: {
      eyebrow: string;
      title: string;
      description: string;
      navHeading: string;
      contentHeading: string;
      languageHeading: string;
    };
    languageSwitcherLabel: string;
  };
  shared: {
    openTool: string;
    readFaq: string;
    openRoute: string;
    onThisPage: string;
    quickFacts: string;
    keyTakeaways: string;
    faqSection: string;
    ctaBlock: string;
    disclaimer: string;
    relatedRoutes: string;
    reservedAdSlot: string;
  };
  home: {
    phaseBadge: string;
    heroTitle: string;
    heroDescription: string;
    primaryCta: string;
    secondaryCta: string;
    foundationEyebrow: string;
    routeMapEyebrow: string;
    routeMapTitle: string;
    routeMapDescription: string;
    executionEyebrow: string;
    executionTitle: string;
    executionDescription: string;
    faqEyebrow: string;
    faqTitle: string;
    faqDescription: string;
    promiseEyebrow: string;
    promiseTitle: string;
    promiseDescription: string;
    promiseCards: Array<{
      title: string;
      description: string;
    }>;
    complianceTitle: string;
    complianceDescription: string;
    adLabel: string;
    phaseZeroChecklist: Array<{
      stage: string;
      title: string;
      description: string;
    }>;
    toolSteps: Array<{
      title: string;
      description: string;
    }>;
  };
  faqPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  privacyPage: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  termsPage: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  toolPage: {
    eyebrow: string;
    title: string;
    description: string;
    canvasEyebrow: string;
    canvasTitle: string;
    canvasDescription: string;
    exportEyebrow: string;
    rulesEyebrow: string;
    rules: string[];
    modules: Array<{
      title: string;
      description: string;
    }>;
  };
};

export const siteMessages: Record<Locale, SiteMessageDictionary> = {
  en: {
    chrome: {
      tagline: "Local-first photo workflow",
      primaryNav: {
        home: "Home",
        tool: "Tool",
        requirements: "Requirements",
        faq: "FAQ",
      },
      footer: {
        eyebrow: "Passport Photo Maker",
        title:
          "Built for an SEO-led utility site where the tool stays simple and the content does the scaling.",
        description:
          "This multilingual foundation keeps the future tool, content pages, and compliance copy in one codebase without introducing a backend too early.",
        navHeading: "Navigate",
        contentHeading: "Content routes",
        languageHeading: "Languages",
      },
      languageSwitcherLabel: "Language",
    },
    shared: {
      openTool: "Open the tool",
      readFaq: "Read the FAQ",
      openRoute: "Open route",
      onThisPage: "On this page",
      quickFacts: "Quick facts",
      keyTakeaways: "Key takeaways",
      faqSection: "Page FAQ",
      ctaBlock: "Next step",
      disclaimer: "Disclaimer",
      relatedRoutes: "Related routes",
      reservedAdSlot: "Reserved ad slot",
    },
    home: {
      phaseBadge: "Phase 0 ready",
      heroTitle:
        "Build a credible passport-photo tool before scaling the content engine.",
      heroDescription:
        "The project skeleton now reflects the PRD and TDD direction: locale-aware routes, static-first content architecture, SEO plumbing, and a clean structure for browser-side image editing.",
      primaryCta: "Open tool scaffold",
      secondaryCta: "Review content routes",
      foundationEyebrow: "Foundation board",
      routeMapEyebrow: "Route map",
      routeMapTitle:
        "The information architecture is already encoded in the app router.",
      routeMapDescription:
        "The locale segment keeps marketing, content, and tool flows aligned across English and Chinese without duplicating framework work later.",
      executionEyebrow: "Execution order",
      executionTitle: "Phase 0 keeps the project honest.",
      executionDescription:
        "The stack is intentionally small: Next.js, TypeScript, Tailwind, and browser-native imaging primitives.",
      faqEyebrow: "FAQ preview",
      faqTitle: "Support content starts with structured data, not ad hoc copy.",
      faqDescription:
        "The FAQ route already has seed content and can expand into schema-backed search pages in both languages during Phase 1.",
      promiseEyebrow: "Why this site",
      promiseTitle:
        "A utility site only works when trust, privacy, and clarity are obvious.",
      promiseDescription:
        "The homepage should quickly tell users what the site does, what it does not do, and why the experience is structured around guidance plus local processing.",
      promiseCards: [
        {
          title: "Local-first handling",
          description:
            "Users should immediately understand that the photo workflow is designed around browser-side processing rather than server uploads.",
        },
        {
          title: "Practical requirement guidance",
          description:
            "The surrounding content pages reduce confusion around dimensions, background rules, and print versus digital outputs.",
        },
        {
          title: "Clear compliance boundary",
          description:
            "The product helps users prepare files. It does not present itself as an official checker or guaranteed approval system.",
        },
      ],
      complianceTitle: "The trust model is simple",
      complianceDescription:
        "Prepare the file locally, use content pages to understand the rules, then verify the final image against the latest official guidance before submission.",
      adLabel: "Home intro ad slot",
      phaseZeroChecklist: [
        {
          stage: "01",
          title: "Project shell",
          description:
            "Next.js, TypeScript, Tailwind, linting, formatting, and unit test hooks are wired up for immediate development.",
        },
        {
          stage: "02",
          title: "Content foundation",
          description:
            "Content routes and route data already live behind shared locale config, ready for Phase 1 copywriting and SEO refinement.",
        },
        {
          stage: "03",
          title: "Tool reservation",
          description:
            "The tool route is scaffolded with feature placeholders so the editor can land without another structural refactor.",
        },
      ],
      toolSteps: [
        {
          title: "Build static marketing routes first",
          description:
            "The app router is split for marketing, content, and tool paths so Phase 1 can focus on content quality instead of infrastructure.",
        },
        {
          title: "Keep image processing local",
          description:
            "The architecture reserves browser-only image work for the editor while SEO pages stay server-rendered and cache-friendly.",
        },
        {
          title: "Add monetization without harming task flow",
          description:
            "Ad slots are encapsulated and optional, which keeps the future editing flow clean and avoids layout instability.",
        },
      ],
    },
    faqPage: {
      eyebrow: "FAQ",
      title: "Practical answers for the first release.",
      description:
        "This route is already wired into the project skeleton and can expand into schema-backed SEO content during Phase 1.",
    },
    privacyPage: {
      eyebrow: "Privacy",
      title: "Privacy starts with local image handling.",
      description:
        "This is Phase 0 placeholder copy, but it already encodes the core promise from the product documents: photos should stay in the browser unless the product direction changes explicitly.",
      points: [
        "The planned editor processes photos in the local browser rather than sending originals to an application server.",
        "Analytics and advertising can be added later, but they should not include the uploaded image data itself.",
        "This page exists in Phase 0 so the future product has a visible trust surface from the beginning.",
      ],
    },
    termsPage: {
      eyebrow: "Terms",
      title:
        "The product can guide users, but it cannot replace official review.",
      description:
        "The wording here is intentionally conservative because the MVP should never imply guaranteed acceptance.",
      points: [
        "The tool is intended to help users prepare photos, not to provide official approval or legal guarantees.",
        "Users remain responsible for checking the latest government guidance before submitting a photo.",
        "This route is present in the scaffold so compliance language is part of the product from the start instead of an afterthought.",
      ],
    },
    toolPage: {
      eyebrow: "Passport photo editor",
      title: "Upload, adjust, and export your passport photo in-browser.",
      description:
        "Use local image processing to generate a digital JPG and a 4x6 print sheet. Your photo stays in your browser and is never uploaded by this tool.",
      canvasEyebrow: "Editor canvas",
      canvasTitle: "Preview with drag and zoom controls.",
      canvasDescription:
        "Upload your image, drag to position the face, then export digital and print-ready outputs.",
      exportEyebrow: "Export",
      rulesEyebrow: "Important notes",
      rules: [
        "Photos stay local to the browser.",
        "No claim of official acceptance is made.",
        "Ads will eventually sit below the export area, not inside the editor.",
      ],
      modules: [
        {
          title: "Upload panel",
          description:
            "Will handle JPG and PNG input, local decoding, validation, and object URL lifecycle management.",
        },
        {
          title: "Photo stage",
          description:
            "Reserved for the square crop surface, head-safe overlay, and drag interactions defined in the TDD.",
        },
        {
          title: "Export panel",
          description:
            "Will expose digital and print presets after the editor state and Canvas rendering pipeline are added.",
        },
      ],
    },
  },
  zh: {
    chrome: {
      tagline: "本地优先的证件照工作流",
      primaryNav: {
        home: "首页",
        tool: "工具",
        requirements: "规格说明",
        faq: "常见问题",
      },
      footer: {
        eyebrow: "Passport Photo Maker",
        title: "这是一个以 SEO 驱动的工具站，工具保持轻量，内容负责放大流量。",
        description:
          "这套多语言骨架把未来的工具页、内容页和合规文案放在同一个代码库里，同时避免过早引入后端。",
        navHeading: "站点导航",
        contentHeading: "内容页面",
        languageHeading: "语言切换",
      },
      languageSwitcherLabel: "语言",
    },
    shared: {
      openTool: "打开工具",
      readFaq: "查看 FAQ",
      openRoute: "进入页面",
      onThisPage: "本页目录",
      quickFacts: "快速要点",
      keyTakeaways: "核心结论",
      faqSection: "本页 FAQ",
      ctaBlock: "下一步",
      disclaimer: "免责声明",
      relatedRoutes: "相关页面",
      reservedAdSlot: "广告位预留",
    },
    home: {
      phaseBadge: "Phase 0 已完成",
      heroTitle: "先把可信的证件照工具站骨架搭好，再去放大内容流量。",
      heroDescription:
        "当前项目骨架已经对齐 PRD 和 TDD：支持 locale 的路由、静态优先的内容结构、SEO 基础能力，以及后续浏览器端图片编辑的扩展位。",
      primaryCta: "查看工具页骨架",
      secondaryCta: "查看内容页路由",
      foundationEyebrow: "基础看板",
      routeMapEyebrow: "路由结构",
      routeMapTitle: "信息架构已经落到了 App Router 里。",
      routeMapDescription:
        "locale 分段让中文和英文的营销页、内容页和工具页共享同一套框架，后续不会因为国际化再做一次结构改造。",
      executionEyebrow: "执行顺序",
      executionTitle: "Phase 0 的价值，是把工程方向先锁定。",
      executionDescription:
        "技术栈保持克制：Next.js、TypeScript、Tailwind，以及浏览器原生图片处理能力。",
      faqEyebrow: "FAQ 预览",
      faqTitle: "支持型内容先结构化，再逐步扩写。",
      faqDescription:
        "FAQ 路由已经有中英文种子内容，Phase 1 可以继续扩成带 schema 的 SEO 页面。",
      promiseEyebrow: "站点价值",
      promiseTitle: "一个工具站要成立，前提是信任、隐私和规则边界都足够清楚。",
      promiseDescription:
        "首页不仅要告诉用户这个站点能做什么，也要明确告诉用户不能做什么，以及为什么整个体验会围绕本地处理和规则说明展开。",
      promiseCards: [
        {
          title: "本地优先处理",
          description:
            "用户一进入站点，就应该知道图片处理核心流程会优先在浏览器里完成，而不是默认上传到服务器。",
        },
        {
          title: "规则解释足够实用",
          description:
            "围绕尺寸、背景、数字版和打印版的内容页，负责把官方要求翻译成用户能执行的判断。",
        },
        {
          title: "合规表达足够克制",
          description:
            "产品帮助用户准备文件，不伪装成官方检查器，也不承诺一定通过。",
        },
      ],
      complianceTitle: "这个产品的信任模型很简单",
      complianceDescription:
        "先在本地准备文件，再通过内容页理解规则，最后根据最新官方要求自行复核成图后提交。",
      adLabel: "首页首屏广告位预留",
      phaseZeroChecklist: [
        {
          stage: "01",
          title: "工程底座",
          description:
            "Next.js、TypeScript、Tailwind、lint、format 和单测钩子已经接好，可以直接继续开发。",
        },
        {
          stage: "02",
          title: "内容底座",
          description:
            "内容页与路由数据已经按 locale 配置化，Phase 1 可以直接补中英文文案和 SEO 细节。",
        },
        {
          stage: "03",
          title: "工具预留",
          description:
            "工具页已经有稳定骨架，后续接入编辑器时不需要再重做路由和布局。",
        },
      ],
      toolSteps: [
        {
          title: "先把静态页面路由搭好",
          description:
            "营销页、内容页和工具页先在路由层分清职责，Phase 1 就能专注在内容和转化上。",
        },
        {
          title: "图片处理坚持本地执行",
          description:
            "编辑器保留浏览器端图片处理能力，SEO 页面继续走静态输出和缓存友好路线。",
        },
        {
          title: "商业化不破坏核心流程",
          description:
            "广告位通过独立组件封装，后续接入也不会污染工具主流程或引发布局抖动。",
        },
      ],
    },
    faqPage: {
      eyebrow: "FAQ",
      title: "第一版先把用户最关心的问题回答清楚。",
      description:
        "这个路由已经纳入项目骨架，Phase 1 可以继续扩成结构化、可收录的中英文 FAQ 页面。",
    },
    privacyPage: {
      eyebrow: "隐私",
      title: "隐私能力的起点，是图片只在本地浏览器里处理。",
      description:
        "这还是 Phase 0 占位文案，但它已经明确了产品最重要的信任承诺：除非产品方向显式变更，否则原始图片不会离开浏览器。",
      points: [
        "规划中的编辑器会在本地浏览器里处理照片，而不是把原图上传到应用服务器。",
        "后续可以接入统计和广告，但不应采集或传输用户上传的图片内容本身。",
        "这个页面在 Phase 0 就存在，是为了把信任说明作为产品的一部分，而不是上线前临时补充。",
      ],
    },
    termsPage: {
      eyebrow: "条款",
      title: "产品可以帮助用户准备照片，但不能替代官方审核。",
      description:
        "这里的措辞会故意保守，因为 MVP 绝不能暗示“保证通过”或“官方认证”。",
      points: [
        "本工具用于帮助用户裁切和导出照片，不提供官方审批、法律保证或通过承诺。",
        "用户仍需在提交前自行核对最新的政府要求。",
        "这个路由被纳入骨架，是为了让合规表达从一开始就是产品的一部分，而不是后补。",
      ],
    },
    toolPage: {
      eyebrow: "证件照编辑器",
      title: "在浏览器中上传、调整并导出你的护照照片。",
      description:
        "使用本地图片处理生成数字版 JPG 与 4x6 打印模板。照片仅在浏览器内处理，不会被工具上传。",
      canvasEyebrow: "编辑器预览区",
      canvasTitle: "拖拽与缩放实时预览。",
      canvasDescription:
        "上传图片后可拖拽调整脸部位置，再导出数字版与打印版结果。",
      exportEyebrow: "导出",
      rulesEyebrow: "使用说明",
      rules: [
        "照片只保留在本地浏览器中。",
        "不会声称官方一定通过。",
        "广告未来只会放在导出区下方，而不是编辑器内部。",
      ],
      modules: [
        {
          title: "上传面板",
          description:
            "后续负责 JPG / PNG 输入、本地解码、校验和 object URL 生命周期管理。",
        },
        {
          title: "照片舞台",
          description: "后续承接正方形裁切区、头部辅助框，以及拖拽调整交互。",
        },
        {
          title: "导出面板",
          description: "后续在这里接入数字版导出和 4x6 打印模板导出。",
        },
      ],
    },
  },
};

export function getSiteMessages(locale: Locale) {
  return siteMessages[locale];
}
