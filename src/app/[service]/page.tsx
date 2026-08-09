import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import Contact from '../components/Contact';
import BestServices from '../components/BestServices';
import servicesData from '../../../content/services.json';
import seoData from '../../../content/seo.json';

// Define the type for the JSON records to avoid TypeScript errors
type ServiceData = {
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string;
  introQuote?: string;
  promotion?: { title: string; description: string; buttonText: string; buttonLink: string };
  subServices?: { title: string; description: string; price?: string; duration?: string; image: string }[];
};

type SeoData = {
  title: string;
  description: string;
};

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const seo = (seoData as Record<string, SeoData>)[service];
  
  if (!seo) {
    return {
      title: 'Service Not Found | Nikky Bawa Salon',
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/${service}/`
    }
  };
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((service) => ({
    service: service,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const data = (servicesData as Record<string, ServiceData>)[service];

  if (!data) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            {/* Image */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-champagne">
              <Image 
                src={data.image} 
                alt={data.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="flex flex-col relative">
              <span className="inline-block px-4 py-1.5 rounded-full bg-rose-gold/10 text-rose-gold text-xs font-semibold uppercase tracking-widest w-max mb-6">
                Premium Service
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {data.title}
              </h1>
              <p className="text-warm-gray text-lg sm:text-xl mb-8 leading-relaxed">
                {data.description}
              </p>

              {/* Features List */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-charcoal mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>What We Offer</h3>
                <ul className="space-y-4">
                  {data.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-warm-gray sm:text-lg">
                      <div className="w-2 h-2 rounded-full bg-rose-gold shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="p-6 sm:p-8 bg-champagne-light rounded-3xl border border-champagne/40 mb-10 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-rose-gold/10 transition-colors" />
                <h4 className="font-bold text-charcoal mb-3 text-lg">Why Choose Us?</h4>
                <p className="text-base text-warm-gray leading-relaxed relative z-10">{data.benefits}</p>
              </div>

              {/* Call to Action */}
              <a href="tel:+919981415156" className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 rounded-full text-white text-lg font-semibold gradient-bg shadow-lg shadow-rose-gold/30 hover:shadow-rose-gold/50 hover:-translate-y-1 transition-all w-max shimmer-btn">
                Book Appointment
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Sections (Optional) */}
        {data.introQuote && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative">
             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-rose-gold italic relative z-10" style={{ fontFamily: "'Playfair Display', serif" }}>
               &ldquo;{data.introQuote}&rdquo;
             </h2>
          </div>
        )}

        {/* Sub-Services Cards (Optional) */}
        {data.subServices && data.subServices.length > 0 && (
          <div className="bg-champagne-light py-20 mb-20 border-y border-champagne">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-charcoal mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
                {data.title.split(' ')[0]} Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.subServices.map((sub, i) => (
                  <div key={i} className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-champagne flex flex-col hover:-translate-y-1">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image src={sub.image} alt={sub.title} fill className="object-cover scale-[1.35] transition-transform duration-700 group-hover:scale-[1.45]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="font-bold text-charcoal text-xl mb-3">{sub.title}</h4>
                      <p className="text-base text-warm-gray mb-6 flex-grow">{sub.description}</p>
                      
                      {sub.price && (
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-rose-gold font-bold text-2xl">{sub.price}</span>
                        </div>
                      )}
                      {sub.duration && (
                        <div className="flex items-center gap-2 text-sm text-warm-gray mb-6 font-medium">
                          <svg className="w-4 h-4 text-rose-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"></path></svg>
                          {sub.duration}
                        </div>
                      )}

                      <a href={`https://wa.me/919981415156?text=Hi, I want to inquire about ${sub.title}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold transition-colors mt-auto shadow-md shadow-[#25D366]/20 group">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        Inquire Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Promotion Banner (Optional) */}
        {data.promotion && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="bg-gradient-to-r from-rose-gold to-gold rounded-[2.5rem] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/images/salon-hero.avif')] opacity-10 mix-blend-overlay bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{data.promotion.title}</h2>
                <p className="text-lg sm:text-2xl font-medium mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">{data.promotion.description}</p>
                <a href={data.promotion.buttonLink} className="inline-block bg-white text-charcoal font-bold text-lg px-10 py-5 rounded-full hover:-translate-y-1 hover:shadow-2xl transition-all">
                  {data.promotion.buttonText}
                </a>
              </div>
            </div>
          </div>
        )}

      </main>
      <BestServices />
      <hr className="section-divider" />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  );
}
