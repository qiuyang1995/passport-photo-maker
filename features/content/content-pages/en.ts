import { type ContentPage } from "@/features/content/types";

export const enContentPages: Record<string, ContentPage> = {
  "passport-photo-requirements-us": {
    slug: "passport-photo-requirements-us",
    title: "U.S. Passport Photo Requirements",
    navLabel: "U.S. requirements",
    description:
      "Learn the core U.S. passport photo rules for size, framing, background, expression, and recent-photo expectations before exporting.",
    h1: "Understand the U.S. passport photo requirements before you crop.",
    eyebrow: "Requirements",
    adSlotLabel: "Inline requirements ad slot",
    quickFacts: [
      { label: "Target size", value: "2 x 2 inches" },
      { label: "Framing", value: "Square crop with face centered" },
      { label: "Background", value: "Plain white or off-white" },
      { label: "Promise", value: "Guidance only, not official approval" },
    ],
    keyTakeaways: [
      "Use the tool to prepare a clean square crop, not to claim guaranteed acceptance.",
      "The most common user mistakes are background shadows, weak lighting, and incorrect head size.",
      "Requirements content should always link back to the tool and FAQ so users can move from research to action.",
    ],
    sections: [
      {
        id: "size-and-crop",
        heading: "Start with size, crop, and head positioning",
        body: [
          "For the MVP, the single most important rule is that the output must be prepared as a clean square image that maps to the standard U.S. passport photo format. That is why the editor is intentionally locked to a square crop rather than exposing arbitrary aspect ratios.",
          "Users usually do not fail because they misunderstand inches in theory. They fail because the face is too small, too large, or sitting too low in the frame. This page should repeatedly translate the rule into practical guidance the user can apply while adjusting the crop.",
        ],
      },
      {
        id: "background-and-lighting",
        heading: "Background quality matters as much as dimensions",
        body: [
          "A compliant crop still will not help if the source photo has harsh shadows, mixed color casts, or a busy background. The tool can guide framing, but it should never imply that background purity or lighting quality has been automatically validated.",
          "That is also why the product must keep a clear disclaimer posture. It helps users prepare files more confidently, but it does not replace a review against the latest official guidance.",
        ],
      },
      {
        id: "expression-and-recency",
        heading: "Explain expression, pose, and recency in plain language",
        body: [
          "Users often search for sizing rules first, then realize the bigger issue is whether their selfie is usable at all. This page should explain that a neutral expression, forward-facing pose, and a recent photo are part of the same acceptance story as dimensions.",
          "The value of this route is not just SEO traffic. It also reduces support burden by absorbing the questions users ask before they commit to exporting a file.",
        ],
      },
      {
        id: "how-to-use-this-page",
        heading: "Turn the requirements page into a conversion step",
        body: [
          "A strong requirements page should end with a direct transition back into the editor. The user should leave with a mental checklist: crop square, center the face, review the background, then export.",
          "That means ending with a clear CTA today: return to the editor, apply the square crop, and review the final image before submission.",
        ],
      },
    ],
    faqItems: [
      {
        question: "Can a selfie work for a U.S. passport photo?",
        answer:
          "A selfie can work if the framing, lighting, background, and expression all match the official expectations. The tool helps with framing and export, but the user still needs to review the source image quality carefully.",
      },
      {
        question: "Does this page replace the official requirements?",
        answer:
          "No. It summarizes the practical rules users most often need, but the product should always tell users to double-check the latest official guidance before submission.",
      },
      {
        question:
          "Why is the crop tool square if passport photos are discussed in inches?",
        answer:
          "Because the practical editing task is still a square crop. The print size and digital export requirements are easier for users to follow when the editor enforces a consistent square frame.",
      },
    ],
    cta: {
      title: "Ready to apply the rules to your photo?",
      description:
        "Open the browser-based tool, keep the face centered, and export a clean digital file or 4x6 print sheet without uploading the original image to a server.",
      primaryLabel: "Open passport photo maker",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "Read the FAQ first",
      secondaryHref: "/faq",
    },
    disclaimer:
      "This page is a practical guide. It does not certify compliance or guarantee acceptance.",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "Open the tool" },
      { href: "/2x2-photo-size", label: "Read the 2x2 guide" },
      {
        href: "/digital-passport-photo-checker",
        label: "Check digital photo rules",
      },
    ],
  },
  "2x2-photo-size": {
    slug: "2x2-photo-size",
    title: "2x2 Photo Size Guide",
    navLabel: "2x2 size guide",
    description:
      "Understand what 2x2 inches means in practice for cropping, digital exports, print layouts, and user expectations.",
    h1: "Explain the 2x2 photo size in a way normal users can actually apply.",
    eyebrow: "Sizing",
    adSlotLabel: "Inline size guide ad slot",
    quickFacts: [
      { label: "Print target", value: "2 x 2 inches" },
      { label: "Editor crop", value: "1:1 square" },
      { label: "Digital output", value: "High-resolution JPG" },
      { label: "Print output", value: "4x6 multi-photo sheet" },
    ],
    keyTakeaways: [
      "Most users need a practical explanation of crop behavior, not a lecture on print theory.",
      "The digital export and print template serve different end states and should stay separate in the product model.",
      "This route is a high-intent bridge between informational search traffic and the editor.",
    ],
    sections: [
      {
        id: "what-2x2-means",
        heading: "Translate 2x2 into an editing decision",
        body: [
          "Users search 2x2 because they want to know whether their current photo can be made usable. The page should therefore explain the size in terms of crop shape, face placement, and output expectations rather than only repeating the numeric requirement.",
          "That is also why the editor and the content strategy align so well. The route explains the rule, and the tool enforces a square editing surface that makes the rule easier to apply.",
        ],
      },
      {
        id: "digital-versus-print",
        heading: "Separate digital delivery from print delivery",
        body: [
          "A digital passport photo is not the same deliverable as a printable 4x6 sheet, even if both are derived from the same crop. Users need that distinction explained clearly to avoid downloading the wrong output for the wrong step.",
          "The product architecture already reflects this through separate export presets, and this page should reinforce the same mental model.",
        ],
      },
      {
        id: "common-confusion",
        heading: "Address the confusion around inches and pixels",
        body: [
          "Many users start with a phone photo and do not know whether pixel size matters more than print size. This route should explain that the crop, clarity, and final export target matter together, rather than treating dimensions in isolation.",
          "Good content here reduces abandonment because it reassures users that the product has a deliberate output model instead of vague image resizing.",
        ],
      },
      {
        id: "practical-next-step",
        heading: "Move the user from explanation to action",
        body: [
          "The best ending for this page is not another long paragraph. It is a simple prompt: open the editor, frame the face, then choose the right export type for submission or printing.",
        ],
      },
    ],
    faqItems: [
      {
        question: "Is a 2x2 photo always a square photo?",
        answer:
          "For U.S. passport-style use cases, yes. That is why the product uses a square crop surface in the editor instead of offering flexible aspect ratios.",
      },
      {
        question: "Why does the site offer both digital and print exports?",
        answer:
          "Because a submission-ready digital image and a printable 4x6 sheet solve different user tasks. The same crop can serve both, but the outputs should stay separate.",
      },
      {
        question: "Can I just resize any image to 2x2?",
        answer:
          "No. A usable result depends on framing, clarity, face size, and background quality, not just the output dimensions.",
      },
    ],
    cta: {
      title: "See the 2x2 rule in practice",
      description:
        "Open the editor and use the fixed square crop to prepare a digital passport photo or a printable 4x6 sheet.",
      primaryLabel: "Try the editor",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "View print template guide",
      secondaryHref: "/passport-photo-print-template",
    },
    disclaimer:
      "Sizing guidance helps users prepare files, but the final photo still needs to satisfy official quality and composition rules.",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "Try the editor" },
      {
        href: "/passport-photo-print-template",
        label: "See print template details",
      },
      {
        href: "/passport-photo-requirements-us",
        label: "Read requirement basics",
      },
    ],
  },
  "passport-photo-print-template": {
    slug: "passport-photo-print-template",
    title: "Passport Photo Print Template",
    navLabel: "Print template",
    description:
      "Learn how the 4x6 print template works, why multiple 2x2 photos are placed on one sheet, and what users should watch before printing.",
    h1: "Understand the 4x6 print template before you send it to a printer.",
    eyebrow: "Print",
    adSlotLabel: "Inline print guide ad slot",
    quickFacts: [
      { label: "Sheet format", value: "4 x 6 inches" },
      { label: "Photo tiles", value: "Multiple repeated 2x2 crops" },
      { label: "Use case", value: "Home printing or lab printing" },
      { label: "Key warning", value: "Disable auto-fit and scaling" },
    ],
    keyTakeaways: [
      "The print template page turns a technical output into a practical explanation users can trust.",
      "This page should tell users what the 4x6 sheet is for and how not to distort it when printing.",
      "Print-related traffic is high-intent and should always have an immediate path back to the tool.",
    ],
    sections: [
      {
        id: "why-4x6",
        heading: "Explain why the sheet uses a 4x6 format",
        body: [
          "Users do not care about canvas math. They care whether the print output is practical, economical, and easy to use at home or through a print shop. This guide should therefore explain the format in terms of convenience and consistency.",
          "That story matters because the product does not want the editor overloaded with operational printing instructions. This page absorbs that complexity instead.",
        ],
      },
      {
        id: "how-layout-works",
        heading: "Show that the same crop is reused consistently",
        body: [
          "The print template export is valuable because it reuses one carefully adjusted crop across multiple tiles on the same sheet. That keeps every print copy consistent and avoids asking the user to rebuild the same crop repeatedly.",
          "This page should make that benefit explicit. Otherwise the print export can feel arbitrary instead of intentional.",
        ],
      },
      {
        id: "printing-mistakes",
        heading:
          "Warn users about the printing mistakes that ruin a correct template",
        body: [
          "A good 4x6 file can still become unusable if the printer dialog scales it, crops it, or applies auto-fit behavior. That is why the page needs direct instructions about preserving original scale and reviewing printer settings before output.",
          "The product should not make users guess where distortion might happen. It should tell them exactly where the risk is.",
        ],
      },
    ],
    faqItems: [
      {
        question: "Why put several photos on one 4x6 sheet?",
        answer:
          "Because it is a practical print format and lets users get multiple 2x2 photos from one file without repeating the editing process.",
      },
      {
        question: "What setting matters most when printing the template?",
        answer:
          "Users should preserve the original scale and avoid any printer option that auto-fits or resizes the image.",
      },
      {
        question: "Can the print template replace an online digital file?",
        answer:
          "No. The print template is for physical printing. Users who need online submission should choose the digital export instead.",
      },
    ],
    cta: {
      title: "Need a printable passport photo sheet?",
      description:
        "Use the export buttons in the tool after you finish adjusting the square crop to download a 4x6 print-ready layout.",
      primaryLabel: "Open the tool",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "Compare with digital output",
      secondaryHref: "/digital-passport-photo-checker",
    },
    disclaimer:
      "The print template helps with layout. Users should still verify print settings and official photo requirements before use.",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "Open the editor" },
      { href: "/2x2-photo-size", label: "Review 2x2 sizing" },
      {
        href: "/digital-passport-photo-checker",
        label: "Check digital output",
      },
    ],
  },
  "digital-passport-photo-checker": {
    slug: "digital-passport-photo-checker",
    title: "Digital Passport Photo Checker",
    navLabel: "Digital photo rules",
    description:
      "Understand what a digital passport photo export can help with, where automated checking should stop, and what users still need to verify manually.",
    h1: "Set expectations for digital passport photos without pretending to be an official checker.",
    eyebrow: "Digital",
    adSlotLabel: "Inline digital guide ad slot",
    quickFacts: [
      { label: "Primary output", value: "High-resolution JPG" },
      { label: "Core use", value: "Online submission support" },
      { label: "Not included", value: "Official approval or AI certification" },
      {
        label: "User review",
        value: "Background, lighting, expression, sharpness",
      },
    ],
    keyTakeaways: [
      "The digital guide should create confidence without overpromising automation.",
      "Users close to conversion need clarity about what the export helps with and what they must still review manually.",
        "This page is where the product sets the right trust boundary for digital guidance and submission prep.",
    ],
    sections: [
      {
        id: "what-this-checker-is",
        heading: "Define scope before discussing features",
        body: [
          "The most important job of this page is to avoid false expectations. A digital checker guide can explain what to review, where the product helps, and what kinds of mistakes commonly cause rejection, but it should not position itself as an official approval system.",
          "That boundary protects both compliance and user trust. Overclaiming creates short-term conversion risk and long-term credibility damage.",
        ],
      },
      {
        id: "what-users-should-review",
        heading: "Tell users exactly what still needs manual review",
        body: [
          "Even with a clean export, users still need to look at face size, background consistency, expression, shadows, and image sharpness. A good digital guide should turn those into a simple checklist instead of vague warnings.",
          "The product works best when this content page and the tool feel like two parts of one journey: understand the rules here, then act in the editor.",
        ],
      },
      {
        id: "why-no-guarantee",
        heading: "Explain why the product avoids guarantees",
        body: [
          "Guarantee language sounds attractive, but it is the wrong promise for a local browser tool that does not perform deep image validation. The right promise is usefulness, privacy, and clarity.",
          "That is why the page should say what the user gains: a practical crop, a clear export path, and guidance on what to double-check before submission.",
        ],
      },
    ],
    faqItems: [
      {
        question: "Does the checker guarantee acceptance?",
        answer:
          "No. It helps users understand what to review and how the digital export is intended to be used, but it does not guarantee acceptance.",
      },
      {
        question: "What should I check before submitting a digital photo?",
        answer:
          "Review the background, shadows, framing, sharpness, expression, and whether the face appears properly centered in the final crop.",
      },
      {
        question: "Why keep this guide separate from the tool page?",
        answer:
          "Because users searching for checker or digital rules often need explanation before action. The tool page should stay focused on the editing workflow itself.",
      },
    ],
    cta: {
      title: "Use the digital workflow with the right expectations",
      description:
        "Open the tool, prepare a clean crop, export the digital file, then manually review the result against the latest official guidance.",
      primaryLabel: "Open the tool",
      primaryHref: "/passport-photo-maker",
      secondaryLabel: "Review requirements again",
      secondaryHref: "/passport-photo-requirements-us",
    },
    disclaimer:
      "This checker guidance is informational. It should never be interpreted as official approval or guaranteed compliance.",
    relatedLinks: [
      { href: "/passport-photo-maker", label: "Use the tool" },
      {
        href: "/passport-photo-requirements-us",
        label: "Read requirement basics",
      },
      { href: "/passport-photo-print-template", label: "Check print output" },
    ],
  },
};
