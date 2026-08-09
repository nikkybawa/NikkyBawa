"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, MapPin, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about/" },
    { name: "Portfolio", href: "/portfolio/" },
    { 
      name: "Services", 
      href: "/#services",
      submenu: [
        { name: "Makeup", href: "/makeup/" },
        { 
          name: "Hair", 
          href: "#",
          submenu: [
            { name: "Hair Color Style", href: "/hair-color-style/" },
            { name: "Hair Straightening / Keratin", href: "/hair-straightening-keratin/" },
            { name: "Hair Cuts", href: "/hair-cuts/" },
            { name: "Hair Extension", href: "/hair-extension/" },
          ]
        },
        { name: "Facial", href: "/facial/" },
        { name: "Nails", href: "/nails/" },
        { name: "Hair Removal", href: "/hair-removal/" },
        { name: "Skin Whitening", href: "/skin-whitening/" },
      ]
    },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact/" },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const isScrolledOrNotHome = scrolled || !isHome;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
    const [mobileNestedOpen, setMobileNestedOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolledOrNotHome
                ? "glass shadow-lg shadow-rose-gold/10 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="/#home" className="flex items-center">
                    <Image
                        src="/logo.avif"
                        alt="Nikky Bawa Ladies Salon"
                        width={160}
                        height={48}
                        priority
                        fetchPriority="high"
                        className={`h-10 sm:h-12 w-auto transition-all duration-300 ${isScrolledOrNotHome ? '' : 'brightness-0 invert'}`}
                    />
                </a>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((l) => (
                        <div key={l.name} className="relative group/main">
                            <a
                                href={l.href}
                                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 relative ${isScrolledOrNotHome ? 'text-charcoal hover:text-rose-gold' : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {l.name}
                                {l.submenu && <ChevronDown size={14} className="opacity-70 group-hover/main:rotate-180 transition-transform duration-300" />}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover/main:w-full transition-all duration-300 ${isScrolledOrNotHome ? 'bg-gradient-to-r from-rose-gold to-gold' : 'bg-white/80'
                                    }`} />
                            </a>

                            {/* Dropdown Menu */}
                            {l.submenu && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover/main:opacity-100 group-hover/main:translate-y-0 group-hover/main:pointer-events-auto transition-all duration-300 z-50">
                                    <div className="bg-white rounded-2xl shadow-xl shadow-rose-gold/10 border border-champagne/40 w-64 py-3 relative">
                                        {l.submenu.map(sub => (
                                            <div key={sub.name} className="relative group/sub">
                                                {sub.submenu ? (
                                                    <div className="flex items-center justify-between px-6 py-2.5 text-sm text-charcoal hover:bg-champagne-light hover:text-rose-gold transition-colors font-medium border-l-2 border-transparent hover:border-rose-gold cursor-pointer">
                                                        {sub.name}
                                                        <ChevronRight size={14} className="opacity-70" />
                                                    </div>
                                                ) : (
                                                    <a 
                                                        href={sub.href} 
                                                        className="block px-6 py-2.5 text-sm text-charcoal hover:bg-champagne-light hover:text-rose-gold transition-colors font-medium border-l-2 border-transparent hover:border-rose-gold"
                                                    >
                                                        {sub.name}
                                                    </a>
                                                )}

                                                {/* Nested Dropdown */}
                                                {sub.submenu && (
                                                    <div className="absolute top-0 left-full pl-0.5 opacity-0 -translate-x-2 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:translate-x-0 group-hover/sub:pointer-events-auto transition-all duration-300 z-50">
                                                        <div className="bg-white rounded-2xl shadow-xl shadow-rose-gold/10 border border-champagne/40 w-64 py-3">
                                                            {sub.submenu.map(nested => (
                                                                <a 
                                                                    key={nested.name} 
                                                                    href={nested.href} 
                                                                    className="block px-6 py-2.5 text-sm text-charcoal hover:bg-champagne-light hover:text-rose-gold transition-colors font-medium border-l-2 border-transparent hover:border-rose-gold"
                                                                >
                                                                    {nested.name}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA + Hamburger */}
                <div className="flex items-center gap-3">
                    <a
                        href="tel:+919981415156"
                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold gradient-bg hover:shadow-lg hover:shadow-rose-gold/30 transition-all duration-300 shimmer-btn"
                    >
                        <Phone size={16} />
                        Book Now
                    </a>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-xl hover:bg-champagne/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} className={isScrolledOrNotHome ? 'text-charcoal' : 'text-white'} /> : <Menu size={24} className={isScrolledOrNotHome ? 'text-charcoal' : 'text-white'} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="lg:hidden fixed inset-0 top-[72px] sm:top-[88px] bg-soft-white/98 backdrop-blur-xl z-40 flex flex-col items-center justify-start gap-6 pt-12 overflow-y-auto pb-24"
                    >
                        {navLinks.map((l, i) => (
                            <div key={l.name} className="w-full flex flex-col items-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={(e) => {
                                        if (l.submenu) {
                                            e.preventDefault();
                                            setMobileSubmenuOpen(!mobileSubmenuOpen);
                                        } else {
                                            setMobileOpen(false);
                                            window.location.href = l.href;
                                        }
                                    }}
                                >
                                    <span
                                        className="text-2xl font-semibold text-charcoal hover:text-rose-gold transition-colors"
                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {l.name}
                                    </span>
                                    {l.submenu && (
                                        <ChevronDown size={20} className={`text-charcoal transition-transform duration-300 ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
                                    )}
                                </motion.div>
                                
                                {/* Mobile Submenu */}
                                {l.submenu && (
                                    <AnimatePresence>
                                        {mobileSubmenuOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="w-full flex flex-col items-center gap-4 mt-4 overflow-hidden"
                                            >
                                                {l.submenu.map((sub, j) => (
                                                    <div key={sub.name} className="w-full flex flex-col items-center">
                                                        {sub.submenu ? (
                                                            <>
                                                                <div 
                                                                    className="flex items-center gap-2 cursor-pointer text-lg text-warm-gray hover:text-rose-gold transition-colors"
                                                                    onClick={() => setMobileNestedOpen(!mobileNestedOpen)}
                                                                >
                                                                    {sub.name}
                                                                    <ChevronDown size={16} className={`transition-transform duration-300 ${mobileNestedOpen ? 'rotate-180' : ''}`} />
                                                                </div>
                                                                <AnimatePresence>
                                                                    {mobileNestedOpen && (
                                                                        <motion.div
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: "auto", opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            className="w-full flex flex-col items-center gap-3 mt-3 overflow-hidden bg-champagne-light py-4 px-12 rounded-2xl shadow-inner shadow-rose-gold/5"
                                                                        >
                                                                            {sub.submenu.map(nested => (
                                                                                <a
                                                                                    key={nested.name}
                                                                                    href={nested.href}
                                                                                    onClick={() => setMobileOpen(false)}
                                                                                    className="text-base font-medium text-warm-gray hover:text-rose-gold transition-colors"
                                                                                >
                                                                                    {nested.name}
                                                                                </a>
                                                                            ))}
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </>
                                                        ) : (
                                                            <a
                                                                href={sub.href}
                                                                onClick={() => setMobileOpen(false)}
                                                                className="text-lg text-warm-gray hover:text-rose-gold transition-colors"
                                                            >
                                                                {sub.name}
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                        
                        <motion.a
                            href="tel:+919981415156"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 px-8 py-3 rounded-full text-white text-lg font-semibold gradient-bg mt-4"
                        >
                            <Phone size={20} />
                            Call Now
                        </motion.a>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-2 text-warm-gray text-sm mt-4"
                        >
                            <MapPin size={14} />
                            Bhopal, MP
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
