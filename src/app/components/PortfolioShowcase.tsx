"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

/* ─── Showcase images ─── */
const showcaseImages = [
    { src: "/portfolio/Bridal Make up-10.avif", alt: "Bridal makeup look – elegant traditional" },
    { src: "/portfolio/Bridal Make up-13.avif", alt: "Bridal makeup look – royal bridal" },
    { src: "/portfolio/Bridal Make up-15.avif", alt: "Bridal makeup look – classic beauty" },
    { src: "/portfolio/Bridal Make up-16.avif", alt: "Bridal makeup look – glamorous" },
    { src: "/portfolio/Bridal Make up-19.avif", alt: "Bridal makeup look – stunning bride" },
    { src: "/portfolio/Bridal Make up-20.avif", alt: "Bridal makeup look – contemporary style" },
    { src: "/portfolio/Bridal Make up-25.avif", alt: "Bridal makeup look – luxurious" },
    { src: "/portfolio/Bridal Make up-26.avif", alt: "Bridal makeup look – timeless elegance" },
];

/* ─── Single Parallax Image Card ─── */
function ParallaxCard({
    src,
    alt,
    index,
    scrollYProgress,
}: {
    src: string;
    alt: string;
    index: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    /* Each card parallaxes at a different rate for depth */
    const isEven = index % 2 === 0;
    const yRange = isEven ? [40, -40] : [60, -60];
    const y = useTransform(scrollYProgress, [0, 1], yRange);

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            initial={{ opacity: 0, scale: 0.85, y: 80 }}
            animate={
                isInView
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.85, y: 80 }
            }
            transition={{
                duration: 0.9,
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative"
        >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-rose-gold/20 transition-shadow duration-500">
                {/* The Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                        loading="lazy"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Rose-gold border glow on hover */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-0 group-hover:ring-2 ring-rose-gold/40 ring-inset transition-all duration-500" />
                </div>
            </div>

            {/* Decorative dot beneath odd cards */}
            {index % 2 !== 0 && (
                <div className="hidden sm:block absolute -bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-gold/40" />
            )}
        </motion.div>
    );
}

/* ─── Floating Marquee Strip ─── */
function MarqueeStrip() {
    return (
        <div className="overflow-hidden py-6">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 whitespace-nowrap"
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <span
                        key={i}
                        className="text-6xl sm:text-8xl lg:text-9xl font-bold text-transparent select-none"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            WebkitTextStroke: "1px rgba(183, 110, 121, 0.12)",
                        }}
                    >
                        Bridal Artistry
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function PortfolioShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    /* Parallax for background elements */
    const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const decorScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-32 overflow-hidden bg-soft-white"
        >
            {/* Parallax Background Decorative Blobs */}
            <motion.div
                style={{ y: bgY, scale: decorScale }}
                className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-gold/8 to-champagne/15 blur-3xl pointer-events-none"
            />
            <motion.div
                style={{ y: bgY }}
                className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-gold/8 to-rose-gold/10 blur-3xl pointer-events-none"
            />

            {/* Subtle dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #B76E79 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* ── Marquee ── */}
            <MarqueeStrip />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Section Header ── */}
                <div ref={headingRef} className="text-center mb-14 sm:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} />
                        Our Work
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-6xl font-bold text-charcoal leading-tight mb-5"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Stunning Bridal{" "}
                        <span className="gradient-text">Transformations</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="text-warm-gray text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Every bride is unique. Explore a glimpse of our breathtaking bridal
                        artistry — crafted with passion, precision, and 40+ years of expertise.
                    </motion.p>

                    {/* Decorative divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={headingInView ? { opacity: 1, scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex items-center justify-center gap-3 mt-6"
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-gold" />
                        <div className="w-2 h-2 rounded-full bg-rose-gold" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-gold" />
                    </motion.div>
                </div>

                {/* ── Featured Award Videos (Bento Grid) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-24 max-w-6xl mx-auto lg:h-[500px] xl:h-[600px]">
                    {/* Video 2 — Kareena Kapoor Award (Horizontal) - Moved to first position */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-rose-gold/20 bg-charcoal group aspect-video lg:aspect-auto w-full h-full"
                    >
                        <video
                            className="absolute inset-0 w-full h-full object-cover"
                            preload="none"
                            poster="/videos/award-kareena-poster.avif"
                            playsInline
                            controls
                        >
                            <source src="/videos/kareena-kappor-nikkibawa-award.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest border border-white/20">
                                <Sparkles size={14} className="text-rose-gold" />
                                International Quality Award
                            </span>
                        </div>
                    </motion.div>

                    {/* Video 1 — Original Award (Vertical) - Moved to second position */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="lg:col-span-1 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-rose-gold/20 bg-charcoal group aspect-[3/4] sm:aspect-[9/16] lg:aspect-auto w-full h-full"
                    >
                        <video
                            className="absolute inset-0 w-full h-full object-cover"
                            preload="none"
                            poster="/videos/award-ceremony-poster.avif"
                            playsInline
                            controls
                        >
                            <source src="/videos/award.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest border border-white/20">
                                <Sparkles size={14} className="text-rose-gold" />
                                Award Winning
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* ── Image Grid — Staggered Parallax ── */}
                {/* Row 1: 4 images with offset rows for depth */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-3 sm:mb-5">
                    {showcaseImages.slice(0, 4).map((img, i) => (
                        <div
                            key={img.src}
                            className={i % 2 !== 0 ? "sm:mt-10" : ""}
                        >
                            <ParallaxCard
                                src={img.src}
                                alt={img.alt}
                                index={i}
                                scrollYProgress={scrollYProgress}
                            />
                        </div>
                    ))}
                </div>

                {/* Row 2: 4 images, inverse offset */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
                    {showcaseImages.slice(4, 8).map((img, i) => (
                        <div
                            key={img.src}
                            className={i % 2 === 0 ? "sm:mt-10" : ""}
                        >
                            <ParallaxCard
                                src={img.src}
                                alt={img.alt}
                                index={i + 4}
                                scrollYProgress={scrollYProgress}
                            />
                        </div>
                    ))}
                </div>

                {/* ── View Full Gallery CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center mt-14 sm:mt-20"
                >
                    <a
                        href="/portfolio/"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-white gradient-bg hover:shadow-xl hover:shadow-rose-gold/25 transition-all duration-500 shimmer-btn"
                    >
                        View Full Portfolio
                        <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </a>
                    <p className="text-warm-gray text-sm mt-4">
                        50+ stunning bridal looks to explore
                    </p>
                </motion.div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="h-px bg-gradient-to-r from-transparent via-rose-gold/20 to-transparent" />
            </div>
        </section>
    );
}
