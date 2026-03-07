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
          "A practical passport photo site should make privacy, requirements, and export choices obvious at a glance.",
        description:
          "Use the tool for local-only editing, then use the guidance pages to double-check dimensions, print settings, and compliance boundaries before submission.",
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
      phaseBadge: "Local-only editing",
      heroTitle:
        "Create a U.S. passport photo locally, then export a digital JPG or a 4x6 print template.",
      heroDescription:
        "Upload a JPG or PNG, adjust the crop in your browser, and download a digital file or print-ready layout without sending the original image to a server.",
      primaryCta: "Make my photo",
      secondaryCta: "Read U.S. requirements",
      foundationEyebrow: "Why people trust this workflow",
      routeMapEyebrow: "Helpful guidance",
      routeMapTitle:
        "Start with the tool, then use the right guide for the next question.",
      routeMapDescription:
        "Each content route covers one decision clearly: official-style requirements, 2x2 sizing, print templates, or digital submission tips.",
      executionEyebrow: "Simple workflow",
      executionTitle: "The fastest path is upload, adjust, export.",
      executionDescription:
        "The product keeps the editing flow short while the surrounding content pages explain what the tool can and cannot check for you.",
      faqEyebrow: "Common questions",
      faqTitle: "Clear answers reduce mistakes before submission.",
      faqDescription:
        "Read the most common questions about privacy, digital versus print exports, and why official rules still matter after you download the file.",
      promiseEyebrow: "Why this site",
      promiseTitle:
        "A useful passport photo site needs trust, clarity, and practical next steps.",
      promiseDescription:
        "The homepage should show the core promise immediately: local-only processing, clear export options, and plain-language guidance for the rules around your photo.",
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
          title: "Private by default",
          description:
            "The core editing flow runs in the browser so users can crop and export without uploading the original image to this tool.",
        },
        {
          stage: "02",
          title: "Clear requirement guides",
          description:
            "Dedicated pages explain U.S. rules, 2x2 sizing, print templates, and digital submission expectations in plain language.",
        },
        {
          stage: "03",
          title: "Two export outcomes",
          description:
            "Use the digital JPG for online forms or choose the 4x6 print template when you need multiple 2x2 copies on one sheet.",
        },
      ],
      toolSteps: [
        {
          title: "Upload a JPG or PNG",
          description:
            "Choose a recent photo with a plain background and let the browser load it locally for editing.",
        },
        {
          title: "Drag and zoom until the face looks right",
          description:
            "Use the square crop and framing guide to keep the face centered and the full crop covered.",
        },
        {
          title: "Download the right export type",
          description:
            "Pick a digital JPG for online submission or a 4x6 print template for printing several 2x2 photos together.",
        },
      ],
    },
    faqPage: {
      eyebrow: "FAQ",
      title: "Practical answers about privacy, cropping, and export choices.",
      description:
        "Use this page to understand how the tool works, what it can help with, and what you still need to verify against the latest official rules.",
    },
    privacyPage: {
      eyebrow: "Privacy",
      title: "Privacy starts with keeping the photo in your browser.",
      description:
        "The core promise of this site is simple: your photo is processed locally for editing and export, and the tool is not designed to upload the original image to an application server.",
      points: [
        "The editor processes JPG and PNG files in the browser for preview, framing, and export.",
        "Analytics and advertising may measure page usage, but they should never include the uploaded image content itself.",
        "You should refresh or close the page when you are done if you want to clear the local editing session immediately.",
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
        "A successful export does not mean the image will automatically meet every official background, lighting, or recency requirement.",
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
        "Ads stay outside the crop editor so they do not block the task flow.",
      ],
      modules: [
        {
          title: "Upload panel",
          description:
            "Accepts JPG and PNG files, validates them locally, and prepares them for browser-side editing.",
        },
        {
          title: "Photo stage",
          description:
            "Shows the square crop, head framing guide, and drag interactions used to position the face.",
        },
        {
          title: "Export panel",
          description:
            "Lets users download a digital JPG or a 4x6 print layout after they finish adjusting the crop.",
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
        title: "一个实用的护照照片站点，应该让隐私承诺、规格说明和导出选择一眼就看明白。",
        description:
          "先用工具完成本地裁切和导出，再用说明页面复核尺寸、打印设置和免责声明，整个路径都应该足够清楚。",
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
      phaseBadge: "仅本地处理",
      heroTitle: "在浏览器里制作美国护照照片，并导出数字版或 4x6 打印模板。",
      heroDescription:
        "上传 JPG 或 PNG，在当前浏览器里完成裁切调整，然后下载数字版文件或可打印的 4x6 拼版，不需要把原图上传到服务器。",
      primaryCta: "开始制作照片",
      secondaryCta: "查看美国规格要求",
      foundationEyebrow: "为什么这条流程可信",
      routeMapEyebrow: "实用说明",
      routeMapTitle: "先用工具，再根据问题进入对应说明页。",
      routeMapDescription:
        "每个内容页只解决一个核心判断：美国规格、2x2 尺寸、打印模板，或数字版提交注意事项。",
      executionEyebrow: "操作流程",
      executionTitle: "最快的路径就是上传、调整、导出。",
      executionDescription:
        "工具页保持轻量，把编辑动作压缩到最少步骤；说明页则负责解释工具无法自动判断的规则边界。",
      faqEyebrow: "常见问题",
      faqTitle: "把用户最常犯错的地方提前讲清楚。",
      faqDescription:
        "这里集中回答隐私、数字版和打印版区别，以及为什么下载成功后仍需对照官方规则自行复核。",
      promiseEyebrow: "站点价值",
      promiseTitle: "一个工具站要成立，前提是信任、隐私和规则边界都足够清楚。",
      promiseDescription:
        "首页应该马上告诉用户三件事：照片只在本地处理、导出有明确用途区分、工具不是官方审核器。",
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
          title: "默认保护隐私",
          description:
            "核心编辑流程在浏览器内完成，用户可以在不上传原图的前提下完成裁切和导出。",
        },
        {
          stage: "02",
          title: "规则说明足够清楚",
          description:
            "独立内容页分别解释美国规格、2x2 尺寸、打印模板和数字版提交注意事项。",
        },
        {
          stage: "03",
          title: "导出结果明确区分",
          description:
            "数字版 JPG 适合在线提交，4x6 打印模板适合一次打印多张 2x2 照片。",
        },
      ],
      toolSteps: [
        {
          title: "上传 JPG 或 PNG",
          description:
            "选择一张近期拍摄、背景尽量干净的照片，浏览器会在本地完成读取和预览。",
        },
        {
          title: "拖拽和缩放调整构图",
          description:
            "使用正方形裁切区和头部参考框，把脸部调整到更合适的位置。",
        },
        {
          title: "下载适合场景的文件",
          description:
            "在线提交请选择数字版 JPG；需要打印时请选择 4x6 拼版模板。",
        },
      ],
    },
    faqPage: {
      eyebrow: "FAQ",
      title: "围绕隐私、裁切和导出选择的实用答疑。",
      description:
        "如果你想确认工具能做什么、不能做什么，以及下载前后还需要注意哪些规则，这一页会更直接。",
    },
    privacyPage: {
      eyebrow: "隐私",
      title: "隐私能力的起点，是图片只在本地浏览器里处理。",
      description:
        "这个站点最重要的承诺很简单：照片在浏览器内完成编辑和导出，这个工具本身不以上传原图到应用服务器为前提。",
      points: [
        "编辑器会在浏览器里处理 JPG 和 PNG 文件，用于预览、构图和导出。",
        "统计和广告可以记录页面使用情况，但不应包含用户上传图片的内容本身。",
        "如果你希望立即清除本地编辑状态，完成下载后可以直接刷新或关闭页面。",
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
        "导出成功并不代表照片一定满足全部背景、光线或近照要求。",
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
        "广告只会出现在编辑器外侧，不会遮挡裁切操作。",
      ],
      modules: [
        {
          title: "上传面板",
          description:
            "负责接收 JPG / PNG、执行本地校验，并把图片准备为浏览器内编辑状态。",
        },
        {
          title: "照片舞台",
          description: "显示正方形裁切区、头部参考框，以及拖拽调整交互。",
        },
        {
          title: "导出面板",
          description: "完成调整后，可在这里下载数字版 JPG 和 4x6 打印模板。",
        },
      ],
    },
  },
};

export function getSiteMessages(locale: Locale) {
  return siteMessages[locale];
}
