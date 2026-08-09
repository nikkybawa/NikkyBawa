"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

/* ─── Image list ─── */
const portfolioImages = [
    "Bridal Make up-1.avif",
    "Bridal Make up-2.avif",
    "Bridal Make up-3.avif",
    "Bridal Make up-4.avif",
    "Bridal Make up-5.avif",
    "Bridal Make up-6.avif",
    "Bridal Make up-7.avif",
    "Bridal Make up-8.avif",
    "Bridal Make up-9.avif",
    "Bridal Make up-10.avif",
    "Bridal Make up-11.avif",
    "Bridal Make up-12.avif",
    "Bridal Make up-13.avif",
    "Bridal Make up-14.avif",
    "Bridal Make up-15.avif",
    "Bridal Make up-16.avif",
    "Bridal Make up-17.avif",
    "Bridal Make up-18.avif",
    "Bridal Make up-19.avif",
    "Bridal Make up-20.avif",
    "Bridal Make up-21.avif",
    "Bridal Make up-22.avif",
    "Bridal Make up-23.avif",
    "Bridal Make up.-24.avif",
    "Bridal Make up-25.avif",
    "Bridal Make up-26.avif",
    "Bridal Make up-27.avif",
    "Bridal Make up-28.avif",
    "Bridal Make up-29.avif",
    "Bridal Make up-30.avif",
    "Bridal Make up-31.avif",
    "Bridal Make up.pptxs-32.avif",
    "Bridal Make up.-33.avif",
    "Bridal Make up-34.avif",
    "Bridal Make up-35.avif",
    "Bridal Make up-36.avif",
    "Bridal Make up-37.avif",
    "Bridal Make up-38.avif",
    "Bridal Make up-39.avif",
    "Bridal Make up-40.avif",
    "Bridal Make up-41.avif",
    "Bridal Make up-42.avif",
    "Bridal Make up-43.avif",
    "Bridal Make up-45.avif",
    "Bridal Make up-46.avif",
    "Bridal Make up-47.avif",
    "Bridal Make up-48.avif",
    "Bridal Make up-49.avif",
    "Bridal Make up-50.avif",
];

/* ─── Aspect ratio variations for visual interest ─── */
const aspectRatios = [
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[3/4]",
    "aspect-[2/3]",
    "aspect-[4/5]",
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[3/4]",
    "aspect-[2/3]",
    "aspect-[4/5]",
];

/* ─── Single Gallery Card ─── */
function GalleryCard({
    src,
    index,
    onOpen,
}: {
    src: string;
    index: number;
    onOpen: (i: number) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const ratio = aspectRatios[index % aspectRatios.length];

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { rootMargin: "200px 0px", threshold: 0.01 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const imageNumber = index + 1;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={
                isVisible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 60, scale: 0.92 }
            }
            transition={{
                duration: 0.7,
                delay: isVisible ? (index % 4) * 0.1 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="portfolio-card mb-4 break-inside-avoid"
        >
            <div
                className={`relative ${ratio} rounded-2xl overflow-hidden cursor-pointer group`}
                onClick={() => onOpen(index)}
            >
                {isVisible ? (
                    <Image
                        src={`/portfolio/${src}`}
                        alt={`Bridal makeup look ${imageNumber} by Nikky Bawa Salon Bhopal`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 bg-champagne-light animate-pulse rounded-2xl" />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
                        <ZoomIn size={20} className="text-white" />
                    </div>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-white text-sm font-medium">
                        Bridal Look #{imageNumber}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                        Nikky Bawa Salon
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Lightbox ─── */
function Lightbox({
    images,
    currentIndex,
    onClose,
    onPrev,
    onNext,
}: {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose, onPrev, onNext]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl" />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Close lightbox"
            >
                <X size={22} />
            </button>

            {/* Prev button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Previous image"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Next button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Next image"
            >
                <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-[90vw] h-[80vh] sm:w-[80vw] sm:h-[85vh] max-w-5xl"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={`/portfolio/${images[currentIndex]}`}
                    alt={`Bridal makeup look ${currentIndex + 1} by Nikky Bawa Salon`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </span>
            </div>
        </motion.div>
    );
}

/* ─── Main Gallery ─── */
export default function PortfolioGallery() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    const goNext = useCallback(
        () =>
            setLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % portfolioImages.length : null
            ),
        []
    );

    const goPrev = useCallback(
        () =>
            setLightboxIndex((prev) =>
                prev !== null
                    ? (prev - 1 + portfolioImages.length) % portfolioImages.length
                    : null
            ),
        []
    );

    /* Split images into columns for masonry effect */
    const columns = useMemo(() => {
        const cols: string[][] = [[], [], [], []];
        portfolioImages.forEach((img, i) => {
            cols[i % 4].push(img);
        });
        return cols;
    }, []);

    /* Compute original flat-index for a column-based image */
    const getOriginalIndex = useCallback(
        (colIdx: number, rowIdx: number) => rowIdx * 4 + colIdx,
        []
    );

    return (
        <section
            ref={sectionRef}
            className="py-16 sm:py-24 bg-soft-white relative overflow-hidden"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-rose-gold/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <span className="text-rose-gold text-sm font-semibold tracking-widest uppercase">
                        Gallery
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3 mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Bridal{" "}
                        <span className="gradient-text">Transformations</span>
                    </h2>
                    <p className="text-warm-gray text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Each look is a masterpiece — explore our curated collection of
                        stunning bridal makeovers and beauty artistry.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-gold" />
                        <div className="w-2 h-2 rounded-full bg-rose-gold" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-gold" />
                    </div>
                </motion.div>

                {/* Masonry Grid */}
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {columns.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-4">
                            {col.map((img, rowIdx) => (
                                <GalleryCard
                                    key={img}
                                    src={img}
                                    index={getOriginalIndex(colIdx, rowIdx)}
                                    onOpen={openLightbox}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Mobile: 2 column */}
                <div className="grid grid-cols-2 gap-3 sm:hidden">
                    {portfolioImages.map((img, i) => (
                        <GalleryCard
                            key={img}
                            src={img}
                            index={i}
                            onOpen={openLightbox}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={portfolioImages}
                        currentIndex={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={goPrev}
                        onNext={goNext}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
