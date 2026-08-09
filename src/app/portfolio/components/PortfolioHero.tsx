"use client";
import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";
import Image from "next/image";

export default function PortfolioHero() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background Collage - 3 blurred images */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 grid grid-cols-3 opacity-40">
                    <div className="relative">
                        <Image
                            src="/portfolio/Bridal Make up-7.avif"
                            alt=""
                            fill
                            className="object-cover blur-sm scale-110"
                            loading="eager"
                            sizes="33vw"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src="/portfolio/Bridal Make up-25.avif"
                            alt=""
                            fill
                            className="object-cover blur-sm scale-110"
                            loading="eager"
                            sizes="33vw"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src="/portfolio/Bridal Make up-40.avif"
                            alt=""
                            fill
                            className="object-cover blur-sm scale-110"
                            loading="eager"
                            sizes="33vw"
                            aria-hidden="true"
                        />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/85" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-plum/30 to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div
                className="absolute top-16 right-12 w-64 h-64 rounded-full bg-rose-gold/10 blur-3xl"
                style={{ animation: "float 8s ease-in-out infinite" }}
            />
            <div
                className="absolute bottom-16 left-12 w-80 h-80 rounded-full bg-gold/10 blur-3xl"
                style={{ animation: "float-delayed 10s ease-in-out infinite" }}
            />
            <div
                className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-gold"
                style={{ animation: "sparkle 3s ease infinite" }}
            />
            <div
                className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-rose-gold-light"
                style={{ animation: "sparkle 4s ease infinite 1s" }}
            />
            <div
                className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-champagne"
                style={{ animation: "sparkle 3.5s ease infinite 0.5s" }}
            />

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
                >
                    <Camera size={14} className="text-gold" />
                    <span className="text-white/90 text-sm font-medium">
                        Our Creative Gallery
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Our{" "}
                    <span className="gradient-text">Portfolio</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed font-light"
                >
                    Every bride tells a story. Explore our collection of breathtaking
                    bridal transformations — crafted with love, precision, and over 40
                    years of artistry.
                </motion.p>

                {/* Decorative Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex items-center justify-center gap-3"
                >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-gold/60" />
                    <Sparkles size={16} className="text-gold" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-gold/60" />
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto"
                >
                    {[
                        { num: "50K+", label: "Happy Brides" },
                        { num: "40+", label: "Years of Art" },
                        { num: "100%", label: "Satisfaction" },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <div
                                className="text-2xl sm:text-3xl font-bold text-white"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {s.num}
                            </div>
                            <div className="text-xs sm:text-sm text-white/60 mt-1">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soft-white to-transparent z-10" />
        </section>
    );
}
