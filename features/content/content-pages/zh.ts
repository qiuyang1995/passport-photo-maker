import { type ContentPage } from "@/features/content/types";

export const zhContentPages: Record<string, ContentPage> = {
  "passport-photo-requirements-us": {
    slug: "passport-photo-requirements-us",
    title: "美国护照照片要求",
    navLabel: "美国规格要求",
    description:
      "围绕美国护照照片最核心的尺寸、构图、背景、表情和近照要求，给用户一份更易执行的实用说明。",
    h1: "先理解美国护照照片要求，再去裁切照片。",
    eyebrow: "规格要求",
    adSlotLabel: "正文中部广告位预留",
    quickFacts: [
      { label: "目标尺寸", value: "2 x 2 英寸" },
      { label: "构图方式", value: "正方形裁切，脸部居中" },
      { label: "背景要求", value: "纯白或接近纯白" },
      { label: "产品边界", value: "提供指导，不提供官方认证" },
    ],
    keyTakeaways: [
      "工具的价值是帮助用户准备更规范的裁切结果，而不是承诺一定通过。",
      "背景阴影、光线不足和头部比例不合适，通常比单纯尺寸问题更容易导致失败。",
      "规格说明页的任务不仅是解释规则，还要把用户引回工具页完成动作。",
    ],
    sections: [
      {
        id: "size-and-crop",
        heading: "先把尺寸、裁切和头部位置讲清楚",
        body: [
          "对 MVP 来说，最重要的一条规则是让用户理解最终照片需要落在标准的美国护照照片尺寸体系里。这也是为什么第一版编辑器会固定使用正方形裁切框，而不是给出任意比例。",
          "大多数用户并不是不知道 2x2 这个数字，而是不知道脸该放多大、该放多高、边距该怎么留。这个页面必须把官方规则翻译成用户在裁切时能直接执行的构图判断。",
        ],
      },
      {
        id: "background-and-lighting",
        heading: "背景和光线质量，和尺寸同样重要",
        body: [
          "就算裁切尺寸是对的，如果原始照片存在重阴影、色偏严重或背景杂乱，也依然可能无法使用。工具能帮助用户完成构图和导出，但绝不能暗示自己已经自动验证了背景纯度或光线质量。",
          "这也是为什么产品在规则页和导出区都必须保持克制的免责声明姿态。它帮助用户更有效地准备文件，但不替代官方审核标准。",
        ],
      },
      {
        id: "expression-and-recency",
        heading: "表情、姿态和近照要求也必须说人话",
        body: [
          "很多用户最开始只搜索尺寸，后来才发现真正的问题是自拍本身能不能用。所以这个页面不能只写尺寸，还要说明自然表情、正面朝向和近照要求同样影响最终可用性。",
          "做好这部分内容的价值也不只是 SEO，它还能提前消化很多用户在导出前会产生的疑问。",
        ],
      },
      {
        id: "how-to-use-this-page",
        heading: "规格页的结尾应该把用户带回工具",
        body: [
          "一个好的规格说明页，不应该停在解释规则，而应该帮助用户形成一套简单清单：方形裁切、脸部居中、检查背景、再去导出。",
          "更直接的做法是让页面结尾回到工具页：重新打开编辑器、应用正方形裁切，并在提交前自行复核最终结果。",
        ],
      },
    ],
    faqItems: [
      {
        question: "自拍可以用于美国护照照片吗？",
        answer:
          "如果自拍在构图、光线、背景和表情上都满足要求，就有可能可用。工具主要帮助裁切和导出，但用户仍需自行检查原图质量。",
      },
      {
        question: "这个页面能代替官方要求吗？",
        answer:
          "不能。它是面向普通用户的实用说明，用来帮助理解规则，但最终仍应以最新官方要求为准。",
      },
      {
        question: "为什么编辑器固定使用正方形裁切？",
        answer:
          "因为用户真正执行的动作依然是方形裁切。用统一的方形裁切框，比让用户自己猜比例更容易得到稳定结果。",
      },
    ],
    cta: {
      title: "准备把这些规则应用到你的照片上？",
      description:
        "打开浏览器端工具，把头像调整到合适位置，然后导出数字版或 4x6 打印模板，全程不需要把原图上传到服务器。",
      primaryLabel: "打开护照照片工具",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "先看 FAQ",
      secondaryHref: "/faq",
    },
    disclaimer: "本页提供的是实用指导，不构成官方审核结论，也不保证通过。",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "打开工具" },
      { href: "/2x2-photo-size", label: "查看 2x2 尺寸说明" },
      { href: "/digital-passport-photo-checker", label: "查看数字版规则" },
    ],
  },
  "2x2-photo-size": {
    slug: "2x2-photo-size",
    title: "2x2 证件照尺寸说明",
    navLabel: "2x2 尺寸指南",
    description:
      "把用户最常搜索的 2x2 尺寸问题翻译成可执行的裁切、导出和打印理解。",
    h1: "把 2x2 尺寸解释成普通用户能直接操作的语言。",
    eyebrow: "尺寸说明",
    adSlotLabel: "正文中部广告位预留",
    quickFacts: [
      { label: "打印尺寸", value: "2 x 2 英寸" },
      { label: "编辑器裁切", value: "1:1 正方形" },
      { label: "数字输出", value: "高分辨率 JPG" },
      { label: "打印输出", value: "4x6 拼版模板" },
    ],
    keyTakeaways: [
      "用户真正需要的是怎么裁、怎么导出，而不是抽象的尺寸定义。",
      "数字版和打印版是两个不同的交付结果，必须在内容和产品里保持区分。",
      "这个页面是信息流量进入工具页的重要桥梁。",
    ],
    sections: [
      {
        id: "what-2x2-means",
        heading: "把 2x2 翻译成用户会操作的裁切动作",
        body: [
          "用户搜索 2x2，往往不是为了研究打印理论，而是想知道自己手上的照片到底能不能处理成可用结果。所以这个页面必须把尺寸要求转译成裁切形状、人头位置和输出结果的说明。",
          "这也是为什么内容页和工具页可以形成很强的配合：内容页解释规则，工具页通过固定正方形裁切框帮助用户执行规则。",
        ],
      },
      {
        id: "digital-versus-print",
        heading: "数字版和打印版必须明确拆开讲",
        body: [
          "数字版护照照片和 4x6 打印模板并不是一回事，即使它们来自同一份裁切结果。用户需要被清楚告知，不同场景要下载不同类型的输出。",
          "产品架构里已经通过两个 export preset 表达了这个区别，这个页面也应该延续同样的认知模型。",
        ],
      },
      {
        id: "common-confusion",
        heading: "英寸和像素的混淆，必须用简单语言拆开",
        body: [
          "很多用户是从手机原图开始的，他们并不确定到底该看英寸还是像素。这个页面要说明的是：真正关键的是裁切、清晰度和最终使用场景，而不是单独盯着一个数字。",
          "当这个逻辑讲清楚之后，用户对产品的信任会更强，因为他会感觉这个站点有明确输出策略，而不是简单做图片缩放。",
        ],
      },
      {
        id: "practical-next-step",
        heading: "页面结尾要把用户导向实际操作",
        body: [
          "这类页面最好的结尾不是继续长篇解释，而是明确告诉用户：打开编辑器，调整人头位置，然后根据场景选择数字版或打印版导出。",
        ],
      },
    ],
    faqItems: [
      {
        question: "2x2 照片一定是正方形吗？",
        answer:
          "对于美国护照照片这个场景，是的。所以产品编辑器固定使用 1:1 正方形裁切。",
      },
      {
        question: "为什么站点要同时提供数字版和打印版？",
        answer:
          "因为在线提交和实体打印是两个不同场景。它们可以共用同一份裁切结果，但输出格式不应该混在一起。",
      },
      {
        question: "把任意照片缩放成 2x2 就够了吗？",
        answer:
          "不够。是否可用还取决于构图、清晰度、背景、表情和人头比例，而不是只看输出尺寸。",
      },
    ],
    cta: {
      title: "直接在工具里体验 2x2 规则",
      description:
        "打开编辑器，使用固定正方形裁切框，先完成构图，再根据场景导出数字版或打印模板。",
      primaryLabel: "试用编辑器",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "查看打印模板说明",
      secondaryHref: "/passport-photo-print-template",
    },
    disclaimer:
      "尺寸说明能帮助用户准备文件，但最终照片是否可用仍取决于官方规则和原始照片质量。",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "试用编辑器" },
      { href: "/passport-photo-print-template", label: "查看打印模板说明" },
      { href: "/passport-photo-requirements-us", label: "查看规格基础" },
    ],
  },
  "passport-photo-print-template": {
    slug: "passport-photo-print-template",
      title: "护照照打印模板说明",
      navLabel: "打印模板",
      description:
        "解释 4x6 打印模板为什么这样排版、适合什么场景，以及用户在打印前必须检查什么。",
    h1: "先理解 4x6 打印模板，再把文件交给打印机或冲印店。",
    eyebrow: "打印模板",
    adSlotLabel: "正文中部广告位预留",
    quickFacts: [
      { label: "纸张格式", value: "4 x 6 英寸" },
      { label: "照片布局", value: "多张重复的 2x2 照片" },
      { label: "适用场景", value: "家庭打印或冲印店" },
      { label: "关键提示", value: "关闭自动缩放和填充" },
    ],
    keyTakeaways: [
      "打印模板说明页能把技术输出变成用户更容易信任的解释页。",
      "这个页面最重要的价值，是告诉用户 4x6 输出是什么、为什么这样排，以及打印时最容易出错的地方。",
      "打印相关搜索意图很强，页面必须始终能把用户带回工具页。",
    ],
    sections: [
      {
        id: "why-4x6",
        heading: "先解释为什么选择 4x6 这个输出格式",
        body: [
          "用户其实并不关心画布计算，他们关心的是这个模板是不是方便打印、是不是省事、是不是能直接拿去冲印。所以这个页面要从实际用途出发解释 4x6，而不是只讲技术细节。",
          "这也正是把这部分信息放在内容页而不是编辑器里的原因。打印规则本身很重要，但不应该占据工具核心操作区。",
        ],
      },
      {
        id: "how-layout-works",
        heading: "让用户知道同一份裁切结果会被稳定复用",
        body: [
          "打印模板的价值之一，是把用户精心调整过的一份裁切结果稳定地复用到多张 2x2 照片中。这样每张照片都一致，也避免用户重复做同样的构图工作。",
          "如果不把这一点说清楚，用户会把打印模板理解成随机拼版，而不是经过设计的导出模式。",
        ],
      },
      {
        id: "printing-mistakes",
        heading: "打印时最常见的错误，必须明确提醒",
        body: [
          "即使导出的 4x6 文件本身是正确的，如果打印对话框自动缩放、裁切或填充，也可能导致最终尺寸失真。所以页面应该明确提醒用户保留原始比例、关闭自动适配，并检查预览结果。",
          "产品不能把这种风险交给用户自己猜，而应提前写清楚可能出问题的步骤。",
        ],
      },
    ],
    faqItems: [
      {
        question: "为什么要把多张照片放进一张 4x6 里？",
        answer:
          "因为 4x6 是实用又常见的打印尺寸，方便用户一次得到多张 2x2 照片，同时不需要重复裁切。",
      },
      {
        question: "打印时最需要注意什么设置？",
        answer:
          "最重要的是保留原始比例，关闭任何自动缩放、自动填充或 auto-fit 设置。",
      },
      {
        question: "打印模板可以替代数字版在线提交吗？",
        answer: "不可以。打印模板用于实体打印，在线提交仍应使用数字版导出。",
      },
    ],
    cta: {
      title: "需要可打印的护照照片模板？",
      description:
        "完成裁切后，直接使用工具里的导出按钮下载 4x6 打印模板，方便你在家打印或交给冲印店处理。",
      primaryLabel: "打开工具",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "对比数字版导出",
      secondaryHref: "/digital-passport-photo-checker",
    },
    disclaimer:
      "打印模板只负责合理排版，用户仍需自行确认打印设置和官方要求是否匹配。",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "打开编辑器" },
      { href: "/2x2-photo-size", label: "回看 2x2 尺寸说明" },
      { href: "/digital-passport-photo-checker", label: "查看数字版说明" },
    ],
  },
  "digital-passport-photo-checker": {
    slug: "digital-passport-photo-checker",
    title: "数字版护照照片检查说明",
    navLabel: "数字版规则",
    description:
      "解释数字版导出能帮助用户做到什么、不能替代什么，以及提交前应手动检查哪些关键点。",
    h1: "为数字版护照照片建立正确预期，而不是伪装成官方检查器。",
    eyebrow: "数字版说明",
    adSlotLabel: "正文中部广告位预留",
    quickFacts: [
      { label: "主要输出", value: "高分辨率 JPG" },
      { label: "主要用途", value: "在线提交辅助" },
      { label: "不包含", value: "官方认证或 AI 保证" },
      { label: "人工复核项", value: "背景、光线、表情、清晰度" },
    ],
    keyTakeaways: [
      "数字版说明页的核心任务，是建立信任边界，而不是夸大自动化能力。",
      "越接近转化的用户，越需要明确知道导出后还要自己检查什么。",
      "这个页面决定了产品未来即使增加检测能力，也不会越界到“保证通过”的错误表达。",
    ],
    sections: [
      {
        id: "what-this-checker-is",
        heading: "先定义清楚这个“检查”到底意味着什么",
        body: [
          "这个页面最重要的工作，是避免用户产生错误期待。数字版检查页可以帮助用户理解需要检查哪些项、产品会帮助到哪里，以及哪些错误最容易导致失败，但不能把自己描述成官方审核系统。",
          "这条边界既是合规要求，也是信任策略。过度承诺也许能换来短期点击，但会损害长期可信度。",
        ],
      },
      {
        id: "what-users-should-review",
        heading: "把用户仍需手动检查的内容明确列出来",
        body: [
          "即使导出结果本身是干净的，用户仍然要关注背景是否均匀、光线是否自然、脸部比例是否合适、表情是否符合要求，以及最终成图是否足够清晰。",
          "当这个页面和工具页形成闭环时，体验才是完整的：先在这里理解风险点，再回到编辑器完成动作。",
        ],
      },
      {
        id: "why-no-guarantee",
        heading: "说明为什么产品不会承诺“保证通过”",
        body: [
          "对一个以浏览器本地处理为核心的工具来说，最合理的承诺不是自动通过，而是更好的隐私、更清晰的导出和更明确的自查指导。",
          "因此页面要强调的是用户真正得到什么：规范的裁切、明确的输出类型，以及提交前应复核的关键点。",
        ],
      },
    ],
    faqItems: [
      {
        question: "这个检查页会保证照片被接受吗？",
        answer:
          "不会。它帮助你理解需要检查哪些项、数字版导出的用途是什么，但不提供通过保证。",
      },
      {
        question: "导出数字版后我还要检查什么？",
        answer:
          "你仍需要检查背景、阴影、构图、清晰度、表情以及脸部在最终裁切中的位置是否合理。",
      },
      {
        question: "为什么不把这部分说明直接塞进工具页？",
        answer:
          "因为搜索“checker”或数字版规则的用户往往先需要解释，再需要操作。把内容页和工具页分开，体验更清晰。",
      },
    ],
    cta: {
      title: "按正确预期使用数字版流程",
      description:
        "打开工具完成裁切，导出数字版文件，再根据最新官方要求手动检查成图质量和构图。",
      primaryLabel: "打开工具",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "重新查看规格说明",
      secondaryHref: "/passport-photo-requirements-us",
    },
    disclaimer:
      "本页中的检查说明仅供参考，不构成官方审核，也不保证照片一定合规。",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "使用工具" },
      { href: "/passport-photo-requirements-us", label: "查看规格基础" },
      { href: "/passport-photo-print-template", label: "查看打印输出" },
    ],
  },
};
