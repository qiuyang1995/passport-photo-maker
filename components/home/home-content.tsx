/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { AdSlot } from "@/components/ads/ad-slot";
import { SectionHeading } from "@/components/ui/section-heading";
import { adSlots } from "@/lib/ads/slots";
import { getLocalizedPath, type Locale } from "@/lib/i18n/config";

// Framer motion variants for staggered reveals
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
};

type HomeContentProps = {
    locale: Locale;
    messages: any;
    contentPageList: any[];
    faqItems: any[];
};

export function HomeContent({
    locale,
    messages,
    contentPageList,
    faqItems,
}: HomeContentProps) {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-12 sm:px-8 lg:px-10 lg:py-16">

            {/* 1. HERO SECTION */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-center"
            >
                <div className="z-10 pt-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-muted mb-8 flex flex-wrap items-center gap-3 text-xs tracking-widest uppercase font-semibold"
                    >
                        <span className="ring-1 ring-foreground/10 rounded-full px-4 py-1.5 bg-surface/50 backdrop-blur-sm">
                            {messages.home.phaseBadge}
                        </span>
                        <span>{messages.chrome.tagline}</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="font-display text-foreground max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
                    >
                        {messages.home.heroTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="text-muted mt-8 max-w-2xl text-lg leading-relaxed"
                    >
                        {messages.home.heroDescription}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="mt-10 flex flex-wrap gap-5"
                    >
                        <Link href={getLocalizedPath(locale, "/passport-photo-maker")} passHref legacyBehavior>
                            <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-accent text-white shadow-btn hover:shadow-btn-hover inline-flex items-center rounded-full px-8 py-4 text-base font-semibold transition-colors duration-300"
                            >
                                {messages.home.primaryCta}
                            </motion.a>
                        </Link>
                        <Link href={getLocalizedPath(locale, "/passport-photo-requirements-us")} passHref legacyBehavior>
                            <motion.a
                                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 250, 242, 0.5)" }}
                                whileTap={{ scale: 0.97 }}
                                className="ring-1 ring-line text-foreground hover:ring-accent hover:text-accent inline-flex items-center rounded-full px-8 py-4 text-base font-semibold transition-colors duration-300 backdrop-blur-sm"
                            >
                                {messages.home.secondaryCta}
                            </motion.a>
                        </Link>
                    </motion.div>
                </div>

                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
                    className="rounded-[2.5rem] bg-foreground p-10 text-white shadow-2xl relative overflow-hidden"
                >
                    {/* Subtle elegant gradient inside the dark card */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

                    <p className="text-xs tracking-widest text-white/50 uppercase font-semibold mb-8">
                        {messages.home.foundationEyebrow}
                    </p>
                    <div className="space-y-4">
                        {messages.home.phaseZeroChecklist.map((item: any, i: number) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                className="group rounded-3xl ring-1 ring-white/10 bg-white/5 hover:bg-white/10 p-6 transition-colors duration-300"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-xs tracking-[0.2em] text-accent-soft uppercase font-semibold">
                                        {item.stage}
                                    </span>
                                </div>
                                <h2 className="text-xl font-display tracking-wide">{item.title}</h2>
                                <p className="mt-3 text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.aside>
            </motion.section>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <AdSlot
                    locale={locale}
                    label={messages.home.adLabel}
                    slotId={adSlots.contentInline}
                />
            </motion.div>

            {/* 2. ROUTE MAP */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-start"
            >
                <div className="sticky top-24">
                    <SectionHeading
                        eyebrow={messages.home.routeMapEyebrow}
                        title={messages.home.routeMapTitle}
                        description={messages.home.routeMapDescription}
                    />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    {contentPageList.map((page: any) => (
                        <Link href={getLocalizedPath(locale, `/${page.slug}`)} key={page.slug} passHref legacyBehavior>
                            <motion.a
                                variants={itemVariants}
                                whileHover={{ y: -6, scale: 1.01 }}
                                className="group bg-surface backdrop-blur-md ring-1 ring-line hover:ring-accent rounded-[2rem] p-8 transition-all duration-300 shadow-glass hover:shadow-glass-hover flex flex-col h-full"
                            >
                                <p className="text-accent text-xs tracking-widest uppercase font-semibold">
                                    {page.eyebrow}
                                </p>
                                <h2 className="font-display text-foreground mt-4 text-3xl leading-snug">
                                    {page.h1}
                                </h2>
                                <p className="text-muted mt-4 text-sm leading-relaxed flex-grow">
                                    {page.description}
                                </p>
                                <div className="mt-8 flex items-center text-foreground font-semibold text-sm group-hover:text-accent transition-colors">
                                    <span>{messages.shared.openRoute}</span>
                                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </motion.a>
                        </Link>
                    ))}
                </div>
            </motion.section>

            {/* 3. EXECUTION & FAQ */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
            >
                <motion.div variants={itemVariants} className="ring-1 ring-line shadow-glass bg-surface/80 backdrop-blur-xl rounded-[2.5rem] p-10">
                    <SectionHeading
                        eyebrow={messages.home.executionEyebrow}
                        title={messages.home.executionTitle}
                        description={messages.home.executionDescription}
                    />
                    <div className="mt-10 grid gap-5">
                        {messages.home.toolSteps.map((step: any, index: number) => (
                            <motion.div
                                key={step.title}
                                whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                                className="bg-background/50 ring-1 ring-line/50 flex gap-5 rounded-[2rem] p-5 transition-colors"
                            >
                                <div className="bg-foreground shadow-inner flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
                                    0{index + 1}
                                </div>
                                <div className="pt-1">
                                    <h3 className="text-foreground text-xl font-semibold font-display">
                                        {step.title}
                                    </h3>
                                    <p className="text-muted mt-2 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="ring-1 ring-line rounded-[2.5rem] bg-gradient-to-br from-[#f5ede2] to-background p-10">
                    <SectionHeading
                        eyebrow={messages.home.faqEyebrow}
                        title={messages.home.faqTitle}
                        description={messages.home.faqDescription}
                    />
                    <div className="mt-10 space-y-5">
                        {faqItems.slice(0, 3).map((item: any) => (
                            <motion.div
                                key={item.question}
                                whileHover={{ y: -2 }}
                                className="ring-1 ring-white shadow-sm rounded-[1.75rem] bg-white/60 backdrop-blur-sm p-6"
                            >
                                <h3 className="text-foreground pt-1 text-lg font-semibold leading-snug">
                                    {item.question}
                                </h3>
                                <p className="text-muted mt-3 text-sm leading-relaxed">
                                    {item.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.section>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <AdSlot
                    locale={locale}
                    label={locale === "zh" ? "首页内容广告位" : "Home content ad slot"}
                    slotId={adSlots.contentFooter}
                />
            </motion.div>

            {/* 4. PROMISE CARDS */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-center"
            >
                <SectionHeading
                    eyebrow={messages.home.promiseEyebrow}
                    title={messages.home.promiseTitle}
                    description={messages.home.promiseDescription}
                />
                <div className="grid gap-6 sm:grid-cols-3">
                    {messages.home.promiseCards.map((card: any) => (
                        <motion.article
                            key={card.title}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="ring-1 ring-line shadow-glass bg-surface/80 backdrop-blur-lg rounded-[2.5rem] p-8 flex flex-col justify-center text-center items-center"
                        >
                            <h2 className="font-display text-foreground text-3xl leading-tight">
                                {card.title}
                            </h2>
                            <p className="text-muted mt-4 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </motion.section>

            {/* 5. COMPLIANCE FOOTER */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[3rem] bg-foreground p-12 text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                <p className="text-xs tracking-widest text-white/50 uppercase font-semibold relative z-10">
                    {messages.home.complianceTitle}
                </p>
                <p className="mt-6 max-w-4xl text-xl leading-relaxed text-white/90 font-display relative z-10">
                    {messages.home.complianceDescription}
                </p>
            </motion.section>
        </div>
    );
}
