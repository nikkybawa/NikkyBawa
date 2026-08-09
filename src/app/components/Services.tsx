"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
    {
        title: "Bridal Makeup",
        desc: "Flawless, radiant bridal looks tailored to your personality. Walk down the aisle with confidence and grace.",
        img: "/images/bridal-makeup.avif",
        href: "/makeup/",
    },
    {
        title: "Hair Styling",
        desc: "Timeless elegance or modern trends — our expert stylists create the perfect look for every occasion.",
        img: "/images/hair-styling.avif",
        href: "/hair-cuts/",
    },
    {
        title: "Skin & Beauty",
        desc: "Advanced skincare treatments to nourish, rejuvenate, and enhance your skin's natural radiance.",
        img: "/images/skin-care.avif",
        href: "/facial/",
    },
    {
        title: "Hair Treatments",
        desc: "Specialized treatments to repair, restore strength, and improve your hair texture and health.",
        img: "/images/hair-treatment.avif",
        href: "/hair-straightening-keratin/",
    },
    {
        title: "Nail Art",
        desc: "Beautiful, elegant nails with premium nail art, manicure, and pedicure services.",
        img: "/images/nail-art.avif",
        href: "/nails/",
    },
    {
        title: "Hair Color",
        desc: "Vibrant, professional hair coloring and highlighting services to express your unique style.",
        img: "/images/hair-styling.avif",
        href: "/hair-color-style/",
    },
];

export default function Services() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="services" className="py-20 sm:py-28 bg-champagne-light relative overflow-hidden" ref={ref}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-gold/5 blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-4">
                        What We Offer
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Our <span className="gradient-text">Premium</span> Services
                    </h2>
                    <p className="text-warm-gray text-base sm:text-lg max-w-2xl mx-auto">
                        Professional beauty treatments designed to enhance your natural beauty and provide a luxurious salon experience.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((s, i) => (
                        <motion.a
                            key={s.title}
                            href={s.href}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-rose-gold/15 transition-all duration-500 hover-lift border border-champagne/40"
                        >
                            {/* Image */}
                            <div className="relative h-56 sm:h-60 overflow-hidden">
                                <Image
                                    src={s.img}
                                    alt={s.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3
                                    className="text-xl font-bold text-charcoal mb-2 group-hover:text-rose-gold transition-colors duration-300"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {s.title}
                                </h3>
                                <p className="text-warm-gray text-sm leading-relaxed mb-4">
                                    {s.desc}
                                </p>
                                <div className="flex items-center gap-2 text-rose-gold text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                                    Know More
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
