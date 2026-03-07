import { type FaqItem } from "@/features/content/types";
import { type Locale } from "@/lib/i18n/config";

const faqItemsByLocale: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "Does the passport photo maker upload my photo to a server?",
      answer:
        "No. The product is designed around local browser processing, so the main editing workflow can happen without sending the original image to an application server.",
      category: "privacy",
    },
    {
      question:
        "Can the tool guarantee that my passport photo will be accepted?",
      answer:
        "No. The tool helps users crop and export images more confidently, but it does not guarantee official acceptance and should never present itself as an approval system.",
      category: "compliance",
    },
    {
      question:
        "Why are there separate routes for requirements, size, print, and digital checks?",
      answer:
        "Because users arrive with different search intent. Some need rules, some need sizing help, and some need to understand print or digital outputs before using the tool.",
      category: "product",
    },
    {
      question: "What should I check before exporting a passport photo?",
      answer:
        "Review the background, face position, lighting, sharpness, and whether the overall crop feels centered and natural before you export.",
      category: "usage",
    },
    {
      question:
        "What is the difference between the digital export and the 4x6 print template?",
      answer:
        "The digital export is for submission-friendly file use, while the 4x6 print template is for printing multiple 2x2 copies on a standard print sheet.",
      category: "usage",
    },
    {
      question: "What can I do on this site right now?",
      answer:
        "You can upload a JPG or PNG, adjust the square crop, export a digital JPG, and download a 4x6 print template, then use the guidance pages to review the surrounding requirements.",
      category: "product",
    },
    {
      question: "What does the tool not do automatically?",
      answer:
        "It does not remove the background, guarantee official acceptance, or verify every lighting, recency, and expression rule for you.",
      category: "compliance",
    },
    {
      question: "Should I still check official guidance before submission?",
      answer:
        "Yes. The site is designed to help users prepare files efficiently, but the final authority is always the latest official requirement source.",
      category: "compliance",
    },
  ],
  zh: [
    {
      question: "这个护照照片工具会把照片上传到服务器吗？",
      answer:
        "不会。产品的核心设计就是本地浏览器处理，主要编辑流程可以在不上传原图的前提下完成。",
      category: "隐私",
    },
    {
      question: "这个工具会保证护照照片一定通过吗？",
      answer:
        "不会。它的作用是帮助用户更高效地裁切和导出，而不是提供官方审核或通过保证。",
      category: "合规",
    },
    {
      question: "为什么站点要拆成规格、尺寸、打印和数字版这些页面？",
      answer:
        "因为不同用户带着不同搜索意图进入站点，有人想看规则，有人想看尺寸，有人想确认打印或数字版输出。拆开后内容更清晰，也更利于 SEO。",
      category: "产品",
    },
    {
      question: "导出前最应该检查哪些内容？",
      answer:
        "建议先检查背景是否干净、脸部位置是否居中、光线是否自然、照片是否清晰，以及最终裁切后的整体构图是否合理。",
      category: "使用",
    },
    {
      question: "数字版导出和 4x6 打印模板有什么区别？",
      answer:
        "数字版更适合在线提交场景，4x6 打印模板则用于把多张 2x2 照片排在一张常见打印纸上。",
      category: "使用",
    },
    {
      question: "这个站点现在已经能做什么？",
      answer:
        "你现在可以上传 JPG 或 PNG，调整正方形裁切，导出数字版 JPG，或下载 4x6 打印模板，然后结合说明页继续核对相关要求。",
      category: "产品",
    },
    {
      question: "这个工具不会自动帮我做什么？",
      answer:
        "它不会自动抠图、自动换白底、保证官方通过，也不会替你判断所有光线、近照或表情要求。",
      category: "合规",
    },
    {
      question: "提交前还需要去看官方要求吗？",
      answer:
        "需要。这个站点的目标是帮助用户更高效地准备照片文件，但最终仍然应以最新官方要求为准。",
      category: "合规",
    },
  ],
};

export function getFaqItems(locale: Locale) {
  return faqItemsByLocale[locale];
}
