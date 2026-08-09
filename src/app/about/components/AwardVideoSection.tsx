"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

export default function AwardVideoSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-20 sm:py-32 bg-soft-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-6"
                    >
                        <Award size={14} />
                        Award Winning Excellence
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Recognized for <span className="gradient-text">Excellence</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-warm-gray text-lg max-w-2xl mx-auto"
                    >
                        Discover our journey of passion, dedication, and artistry that has led us to be recognized among the best in the industry.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto lg:h-[500px] xl:h-[600px]">
                    {/* Video 2 — Kareena Kapoor Award (Horizontal) - Moved to first position */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
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
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest border border-white/20">
                                <Award size={14} className="text-rose-gold" />
                                International Quality Award
                            </span>
                        </div>
                    </motion.div>

                    {/* Video 1 — Original Award (Vertical) - Moved to second position */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest border border-white/20">
                                <Award size={14} className="text-rose-gold" />
                                Award Ceremony
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
