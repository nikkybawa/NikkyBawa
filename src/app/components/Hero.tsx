"use client";
import { motion } from "framer-motion";
import { Phone, Calendar, Star, MapPin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/salon-hero.avif"
                    alt="Nikky Bawa Luxury Salon Interior"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    quality={60}
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-deep-plum/30 to-transparent" />
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-rose-gold/10 blur-3xl" style={{ animation: "float 8s ease-in-out infinite" }} />
            <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gold/10 blur-3xl" style={{ animation: "float-delayed 10s ease-in-out infinite" }} />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-gold" style={{ animation: "sparkle 3s ease infinite" }} />
            <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 rounded-full bg-rose-gold-light" style={{ animation: "sparkle 4s ease infinite 1s" }} />
            <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 rounded-full bg-champagne" style={{ animation: "sparkle 3.5s ease infinite 0.5s" }} />

            {/* Hero Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
                >
                    <Star size={14} className="text-gold fill-gold" />
                    <span className="text-white/90 text-sm font-medium">Trusted Beauty Experts Since 1982</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Where Beauty Meets{" "}
                    <span className="gradient-text">Luxury</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed font-light"
                >
                    Premium bridal makeup, hair styling & beauty treatments. Experience personalized luxury at Bhopal&apos;s most trusted salon.
                </motion.p>

                {/* Location Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 text-white/60 text-sm mb-10"
                >
                    <MapPin size={14} />
                    <span>Roshan Pura Square, Bhopal</span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="tel:+919981415156"
                        className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base bg-white text-rose-gold-dark hover:bg-champagne hover:shadow-2xl hover:shadow-white/30 transition-all duration-500 shimmer-btn"
                    >
                        <Calendar size={20} />
                        Book Appointment
                    </a>
                    <a
                        href="tel:+919981415156"
                        className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                        <Phone size={20} />
                        +91 99814 15156
                    </a>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto"
                >
                    {[
                        { num: "40+", label: "Years Experience" },
                        { num: "11K+", label: "Students Trained" },
                        { num: "50K+", label: "Happy Clients" },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {s.num}
                            </div>
                            <div className="text-xs sm:text-sm text-white/60 mt-1">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-soft-white to-transparent z-10" />
        </section>
    );
}
