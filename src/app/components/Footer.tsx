"use client";
import { useEffect, useRef } from "react";
import { Phone, MapPin, Mail, Heart, ArrowUp, Sparkles } from "lucide-react";
import Image from "next/image";

const footerLinks = {
    Services: [
        { name: "Bridal Makeup", href: "/makeup/" },
        { name: "Hair Styling", href: "/hair-cuts/" },
        { name: "Facial", href: "/facial/" },
        { name: "Skin Whitening", href: "/skin-whitening/" },
        { name: "Hair Removal", href: "/hair-removal/" },
    ],
    "Hair Services": [
        { name: "Hair Color", href: "/hair-color-style/" },
        { name: "Keratin Treatment", href: "/hair-straightening-keratin/" },
        { name: "Hair Extension", href: "/hair-extension/" },
        { name: "Nails", href: "/nails/" },
    ],
    "Quick Links": [
        { name: "Home", href: "/" },
        { name: "About", href: "/about/" },
        { name: "Portfolio", href: "/portfolio/" },
        { name: "Contact", href: "/contact/" },
    ],
};

function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let isVisible = false;
        const stars: { x: number; y: number; size: number; opacity: number; speed: number; phase: number }[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Reduced star count for better performance
        for (let i = 0; i < 30; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                speed: Math.random() * 0.005 + 0.002,
                phase: Math.random() * Math.PI * 2,
            });
        }

        const animate = (time: number) => {
            if (!isVisible) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                const twinkle = Math.sin(time * star.speed + star.phase) * 0.3 + 0.7;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 169, 110, ${star.opacity * twinkle})`;
                ctx.fill();

                // Small glow
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(183, 110, 121, ${star.opacity * twinkle * 0.1})`;
                ctx.fill();
            });
            animationId = requestAnimationFrame(animate);
        };

        // Only animate when footer is visible
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.01 }
        );
        observer.observe(canvas);

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            observer.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1117 0%, #0f0a0d 50%, #0a0608 100%)" }}>
            {/* Star Animation Canvas */}
            <StarField />

            {/* Decorative top glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-rose-gold/8 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/5 blur-[80px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative z-10">
                {/* Top Tagline */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <Sparkles size={16} className="text-gold" />
                        <Image
                            src="/logo.avif"
                            alt="Nikky Bawa Ladies Salon"
                            width={200}
                            height={60}
                            className="h-14 sm:h-16 w-auto brightness-0 invert"
                        />
                        <Sparkles size={16} className="text-gold" />
                    </div>
                    <p className="text-white/50 text-sm tracking-widest uppercase">Trusted Beauty Experts Since 1982</p>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    {/* Brand / Contact */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">Contact Us</h4>
                        <div className="space-y-3.5">
                            <a href="tel:+919981415156" className="flex items-center gap-3 text-white/80 text-sm hover:text-rose-gold-light transition-colors duration-200 group">
                                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors duration-200">
                                    <Phone size={14} className="text-rose-gold-light" />
                                </span>
                                +91 99814 15156
                            </a>
                            <a href="tel:+919111188852" className="flex items-center gap-3 text-white/80 text-sm hover:text-rose-gold-light transition-colors duration-200 group">
                                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors duration-200">
                                    <Phone size={14} className="text-rose-gold-light" />
                                </span>
                                +91 91111 88852
                            </a>
                            <a href="mailto:rajanbawabetwa@gmail.com" className="flex items-center gap-3 text-white/80 text-sm hover:text-rose-gold-light transition-colors duration-200 group">
                                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors duration-200">
                                    <Mail size={14} className="text-rose-gold-light" />
                                </span>
                                rajanbawabetwa@gmail.com
                            </a>
                            <div className="flex items-start gap-3 text-white/80 text-sm">
                                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin size={14} className="text-rose-gold-light" />
                                </span>
                                <span>Betwa Apartment, 7th Floor, Bhopal, MP</span>
                            </div>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{title}</h4>
                            <ul className="space-y-3">
                                {links.map((l) => (
                                    <li key={l.name}>
                                        <a
                                            href={l.href}
                                            className="text-white/70 text-sm hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-rose-gold/50 shrink-0" />
                                            {l.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Section Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/50 text-xs text-center sm:text-left">
                        © {new Date().getFullYear()} Nikky Bawa Ladies Salon. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-white/50 text-xs">
                        Made with <Heart size={12} className="text-rose-gold fill-rose-gold mx-1" /> in Bhopal
                    </div>
                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full border border-white/15 hover:border-rose-gold/50 hover:bg-rose-gold/10 flex items-center justify-center transition-all duration-300 group"
                        aria-label="Back to top"
                    >
                        <ArrowUp size={16} className="text-white/60 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
