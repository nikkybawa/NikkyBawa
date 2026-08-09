"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function OurStory() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-20 sm:py-28 bg-soft-white relative overflow-hidden" ref={ref}>
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-champagne/30 blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                            <Image
                                src="/images/founder.avif"
                                alt="Mrs. Nikky Bawa – Founder"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                            />
                        </div>
                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -bottom-4 -right-4 sm:right-4 px-5 py-3 rounded-2xl bg-white shadow-xl border border-champagne/40 z-20"
                        >
                            <div className="text-2xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>1982</div>
                            <div className="text-[10px] text-warm-gray uppercase tracking-wider">Year Founded</div>
                        </motion.div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-6">
                            The Story
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            The Legacy of{" "}
                            <span className="gradient-text">Mrs. Nikky Bawa</span>
                        </h2>
                        <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-5">
                            Nikky Bawa Ladies Salon is one of the most trusted and well-established beauty brands in Central India. Founded in <strong className="text-charcoal">1982 by Mrs. Nikky Bawa</strong>, the brand began its journey with a single salon in Bhopal, Madhya Pradesh.
                        </p>
                        <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-5">
                            Driven by a passion to provide high-quality beauty services and professional training, the salon has built a strong reputation for delivering exceptional beauty experiences through expertise, innovation, and personalized care.
                        </p>
                        <p className="text-warm-gray text-base sm:text-lg leading-relaxed">
                            What started as a single beauty studio soon evolved into a <strong className="text-charcoal">respected name in the beauty and wellness industry</strong>, serving thousands of satisfied clients across Central India.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
