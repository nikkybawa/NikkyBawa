"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Sparkles, Send } from "lucide-react";

export default function ContactForm() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [inquiryType, setInquiryType] = useState<"general" | "booking">("booking");

    const services = [
        "Bridal Makeup",
        "Party/Guest Makeup",
        "Hair Cut & Styling",
        "Hair Color & Highlights",
        "Keratin/Smoothening",
        "Facial & Cleanup",
        "Manicure & Pedicure",
        "Other Services"
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        data.inquiryType = inquiryType;

        try {
            // Static export has no Node runtime; contact.php sits next to the
            // exported files in public_html and calls Resend server-side.
            const res = await fetch("/contact.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSubmitStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                if (submitStatus !== "error") setSubmitStatus("idle");
            }, 5000);
        }
    };

    return (
        <section id="contact-form-section" className="py-20 sm:py-28 relative bg-white" ref={ref}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-champagne-light/50 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Send Us A <span className="gradient-text">Message</span>
                    </h2>
                    <p className="text-warm-gray max-w-2xl mx-auto">
                        Fill out the form below. Whether it's a general question or you want to schedule your beauty session, we are ready for you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="bg-white rounded-[2rem] shadow-xl shadow-rose-gold/5 border border-champagne overflow-hidden p-6 sm:p-10"
                >
                    {/* Inquiry Type Toggle */}
                    <div className="flex p-1 bg-soft-white rounded-full mx-auto max-w-md mb-10 border border-champagne/50 relative overflow-hidden">
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm shadow-rose-gold/10 transition-transform duration-300 ease-in-out border border-rose-gold/10
                            ${inquiryType === 'booking' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setInquiryType("general")}
                            className={`flex-1 py-3 text-sm font-semibold rounded-full z-10 transition-colors ${inquiryType === "general" ? "text-rose-gold" : "text-charcoal/60 hover:text-charcoal"}`}
                        >
                            General Inquiry
                        </button>
                        <button
                            type="button"
                            onClick={() => setInquiryType("booking")}
                            className={`flex-1 py-3 text-sm font-semibold rounded-full z-10 transition-colors ${inquiryType === "booking" ? "text-rose-gold" : "text-charcoal/60 hover:text-charcoal"}`}
                        >
                            Book Appointment
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot: hidden from people, filled in by bots. */}
                        <input
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="absolute left-[-9999px] w-px h-px opacity-0"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Details */}
                            <div className="space-y-6">
                                <h3 className="font-bold text-lg text-charcoal flex items-center gap-2 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    <User size={18} className="text-rose-gold" />
                                    Your Details
                                </h3>
                                
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                                    <input required type="text" name="name" className="w-full px-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all placeholder:text-warm-gray/50" placeholder="Jane Doe" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
                                        <input required type="email" name="email" className="w-full px-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all placeholder:text-warm-gray/50" placeholder="jane@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">Phone Number *</label>
                                        <input required type="tel" name="phone" className="w-full px-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all placeholder:text-warm-gray/50" placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                            </div>

                            {/* Service Details */}
                            <div className="space-y-6">
                                <h3 className="font-bold text-lg text-charcoal flex items-center gap-2 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    <Sparkles size={18} className="text-rose-gold" />
                                    {inquiryType === 'booking' ? 'Appointment Details' : 'Message Context'}
                                </h3>

                                {inquiryType === 'booking' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-charcoal mb-2">Select Service</label>
                                            <select name="service" className="w-full px-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all text-charcoal appearance-none">
                                                <option value="">Choose a service...</option>
                                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-charcoal mb-2">Preferred Date</label>
                                                <div className="relative">
                                                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
                                                    <input type="date" name="date" className="w-full pl-10 pr-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all text-charcoal" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-charcoal mb-2">Preferred Time</label>
                                                <div className="relative">
                                                    <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray/50" />
                                                    <input type="time" name="time" className="w-full pl-10 pr-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all text-charcoal" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {inquiryType === 'general' && (
                                    <div className="h-full pb-1">
                                        <label className="block text-sm font-medium text-charcoal mb-2">Your Message *</label>
                                        <textarea required name="message" className="w-full px-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all placeholder:text-warm-gray/50 resize-none h-[calc(100%-32px)] min-h-[140px]" placeholder="Tell us how we can help you..." />
                                    </div>
                                )}
                            </div>
                        </div>

                        {inquiryType === 'booking' && (
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                    Additional Notes
                                </label>
                                <textarea name="message" rows={3} className="w-full px-4 py-3 bg-soft-white border border-champagne/60 rounded-xl focus:outline-none focus:border-rose-gold/50 focus:ring-1 focus:ring-rose-gold/50 transition-all placeholder:text-warm-gray/50 resize-none" placeholder="Tell us how we can help you..." />
                            </div>
                        )}

                        <div className="pt-6 border-t border-champagne/30 text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-full text-white font-semibold gradient-bg hover-lift shimmer-btn disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        {inquiryType === 'booking' ? 'Request Appointment' : 'Send Message'}
                                    </>
                                )}
                            </button>
                            
                            {submitStatus === "success" && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 mt-4 text-sm font-medium"
                                >
                                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                                </motion.p>
                            )}
                            {submitStatus === "error" && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 mt-4 text-sm font-medium"
                                >
                                    Oops! Something went wrong. Please try again or call us directly.
                                </motion.p>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
