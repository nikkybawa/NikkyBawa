"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const premiumServices = [
  {
    title: "Luxury Bridal Makeup",
    description: "Flawless, radiant bridal looks utilizing premium international brands for your special day.",
    image: "/images/bridal-makeup.avif",
    link: "/makeup",
    tag: "Most Popular"
  },
  {
    title: "Advanced Hair Styling",
    description: "Transform your look with precision cuts, vibrant global coloring, and expert styling.",
    image: "/images/hair-styling.avif",
    link: "/hair-color-style",
    tag: "Signature"
  },
  {
    title: "Rejuvenating Facials",
    description: "Deep cleansing and premium skincare treatments designed to restore your natural, youthful glow.",
    image: "/images/skin-care.avif",
    link: "/facial",
    tag: "Relaxing"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function BestServices() {
  return (
    <section className="py-24 bg-soft-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-champagne-light/40 rounded-l-[100px] blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-rose-gold/5 rounded-tr-[100px] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest mb-6 border border-rose-gold/20">
              <Star size={14} className="fill-rose-gold" />
              Our Excellence
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore Our <span className="gradient-text">Signature Services</span>
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed">
              Elevate your beauty routine with our most sought-after treatments, curated by industry experts and tailored just for you.
            </p>
          </div>
          
          <Link href="/#services" className="inline-flex items-center gap-2 font-semibold text-rose-gold hover:text-charcoal transition-colors group shrink-0">
            View All Services
            <span className="bg-rose-gold/10 p-2 rounded-full group-hover:bg-charcoal group-hover:text-white transition-colors">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumServices.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="group relative bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-rose-gold/10 transition-all duration-500 border border-champagne"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] mb-6">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-charcoal shadow-sm">
                    {service.tag}
                  </span>
                </div>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="px-2 pb-4">
                <h3 className="text-2xl font-bold text-charcoal mb-3 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {service.title}
                </h3>
                <p className="text-warm-gray text-base leading-relaxed mb-6 line-clamp-2">
                  {service.description}
                </p>
                
                <Link 
                  href={service.link}
                  className="inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-champagne font-bold text-charcoal group-hover:bg-charcoal group-hover:border-charcoal group-hover:text-white transition-all duration-300"
                >
                  Discover More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
