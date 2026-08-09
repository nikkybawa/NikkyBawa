"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, GraduationCap, Award, Dumbbell, Sparkles } from "lucide-react";
import Image from "next/image";

const timeline = [
    {
        year: "1982",
        title: "The Beginning",
        desc: "Mrs. Nikky Bawa founded the first Nikky Bawa Ladies Salon in Bhopal, Madhya Pradesh, with a vision of premium beauty services.",
        icon: Sparkles,
    },
    {
        year: "1997",
        title: "Expansion & Recognition",
        desc: "Expanded into multiple outlets. Established Nikky Bawa Beauty Academy. Recognized by the State Government for outstanding contribution to skill development.",
        icon: Award,
    },
    {
        year: "2008",
        title: "Day Spa Launch",
        desc: "Launched one of the largest Day Spa facilities in Central India, offering premium relaxation and wellness services.",
        icon: Building2,
    },
    {
        year: "2010",
        title: "Fitness Mania",
        desc: "Introduced Fitness Mania — a dynamic fitness center that quickly became a popular destination for health enthusiasts in Bhopal.",
        icon: Dumbbell,
    },
];

export default function Journey() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="py-20 sm:py-28 bg-champagne-light relative overflow-hidden" ref={ref}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-gold/5 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-4">
                        Our Journey
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        A Legacy of <span className="gradient-text">Excellence</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-gold/20 via-rose-gold/40 to-rose-gold/20 sm:-translate-x-px" />

                    {timeline.map((item, i) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className={`relative flex items-start gap-6 sm:gap-0 mb-12 last:mb-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                                }`}
                        >
                            {/* Dot on Timeline */}
                            <div className="absolute left-6 sm:left-1/2 w-3 h-3 rounded-full gradient-bg -translate-x-1.5 mt-6 z-10 shadow-md shadow-rose-gold/30" />

                            {/* Content Card */}
                            <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-champagne/40 hover:shadow-lg hover:border-rose-gold/20 transition-all duration-300">
                                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "sm:justify-end" : ""}`}>
                                        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                                            <item.icon size={18} className="text-white" />
                                        </div>
                                        <span
                                            className="text-2xl font-bold gradient-text"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {item.year}
                                        </span>
                                    </div>
                                    <h3
                                        className="text-lg font-bold text-charcoal mb-2"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Academy Image + Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    className="mt-20 grid lg:grid-cols-2 gap-10 items-center"
                >
                    <div className="rounded-3xl overflow-hidden shadow-xl relative aspect-[16/10]">
                        <Image
                            src="/images/academy.avif"
                            alt="Nikky Bawa Beauty Academy"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-4">
                            <GraduationCap size={14} />
                            Beauty Academy
                        </span>
                        <h3
                            className="text-2xl sm:text-3xl font-bold text-charcoal mb-4"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Empowering Women Through Skill
                        </h3>
                        <p className="text-warm-gray text-base leading-relaxed mb-6">
                            Nikky Bawa Beauty Academy has trained more than <strong className="text-charcoal">11,000 female students</strong>, many of whom now form a significant part of the beauty industry workforce in Central India.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { num: "11K+", label: "Students Trained" },
                                { num: "40+", label: "Years Legacy" },
                                { num: "3+", label: "Business Ventures" },
                            ].map((s) => (
                                <div key={s.label} className="text-center p-4 rounded-2xl bg-white border border-champagne/40 shadow-sm">
                                    <div className="text-xl sm:text-2xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                                    <div className="text-[11px] text-warm-gray mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
