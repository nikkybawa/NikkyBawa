"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Heart } from "lucide-react";
import Image from "next/image";

export default function Welcome() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-20 sm:py-28 bg-soft-white relative overflow-hidden" ref={ref}>
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-champagne/40 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-rose-gold/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-6">
                            Our Story
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Welcome to{" "}
                            <span className="gradient-text">Nikky Bawa</span>
                        </h2>
                        <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-4">
                            Founded in <strong className="text-charcoal">1982 by Mrs. Nikky Bawa</strong>, our salon has grown into one of the most trusted beauty brands in Central India. What started as a single salon in Bhopal is now a legacy of beauty excellence.
                        </p>
                        <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-8">
                            Our <strong className="text-charcoal">Nikky Bawa Beauty Academy</strong> has trained over <strong className="text-charcoal">11,000 students</strong>, and was recognized by the State Government in 1997 for its contribution to skill development.
                        </p>

                        {/* Values */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: Award, title: "Excellence", desc: "Award-winning service" },
                                { icon: Heart, title: "Personal Care", desc: "Customized treatments" },
                                { icon: Users, title: "Expert Team", desc: "Trained professionals" },
                            ].map((v, i) => (
                                <motion.div
                                    key={v.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-white shadow-sm border border-champagne/40 hover:shadow-md hover:border-rose-gold/20 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-3">
                                        <v.icon size={22} className="text-white" />
                                    </div>
                                    <h4 className="font-semibold text-charcoal text-sm">{v.title}</h4>
                                    <p className="text-warm-gray text-xs mt-1">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image Side – Collage Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] relative">
                                    <Image src="/images/bridal-makeup.avif" alt="Bridal makeup at Nikky Bawa" fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                                </div>
                                <div className="rounded-3xl overflow-hidden shadow-lg aspect-square relative">
                                    <Image src="/images/nail-art.avif" alt="Nail art services" fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="rounded-3xl overflow-hidden shadow-lg aspect-square relative">
                                    <Image src="/images/hair-styling.avif" alt="Hair styling services" fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                                </div>
                                <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] relative">
                                    <Image src="/images/skin-care.avif" alt="Skin care treatments" fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                                </div>
                            </div>
                        </div>
                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -bottom-4 -left-4 sm:left-4 px-5 py-3 rounded-2xl bg-white shadow-xl border border-champagne/40 flex items-center gap-3 z-20"
                        >
                            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                                <Award size={18} className="text-white" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-charcoal">Govt. Recognized</div>
                                <div className="text-[10px] text-warm-gray">Awarded in 1997</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
