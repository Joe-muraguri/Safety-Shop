import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Phone } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58caa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    tag: "Industrial PPE",
    headline: ["Protect What", "Matters Most"],
    sub: "Premium safety gear — helmets, gloves, vests and more — built for Kenya's toughest jobs.",
    cta: "Explore Safety Solutions",
  },
  {
    image:
      "https://images.pexels.com/photos/4559605/pexels-photo-4559605.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tag: "Certified Equipment",
    headline: ["Certified.", "Durable. Trusted."],
    sub: "High-quality PPE that meets international safety standards — ready for construction, manufacturing & warehouses.",
    cta: "View Full Range",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581092160607-798f8a3d7c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    tag: "Full Protection",
    headline: ["Safety That Works", "As Hard As You Do"],
    sub: "Reflective gear, harnesses, respirators — everything your team needs to stay safe and compliant.",
    cta: "Shop Now",
  },
  {
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920",
    tag: "Nationwide Delivery",
    headline: ["Your Workforce.", "Our Priority."],
    sub: "Reliable, affordable industrial safety equipment — delivered across Kenya with fast support.",
    cta: "Get Protected Today",
  },
];

const stats = [
  { value: "5,000+", label: "Products Sold" },
  { value: "300+", label: "Happy Clients" },
  { value: "ISO", label: "Certified Gear" },
  { value: "24hr", label: "Fast Delivery" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[85vh] md:h-screen overflow-hidden bg-blue-950">
      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />

            {/* Dark overlay — left side darker for text, right side lets photo show */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/50 to-blue-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-blue-950/30" />

            {/* Diagonal red accent shape */}
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-20 -right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left red border accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content overlay — sits above swiper */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">

          {/* Tag pill */}
          <div className="pointer-events-auto inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <ShieldCheck size={13} />
            {slides[activeIndex].tag}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight max-w-3xl">
            {slides[activeIndex].headline[0]}
            <br />
            <span className="text-red-500">{slides[activeIndex].headline[1]}</span>
          </h1>

          {/* Sub */}
          <p className="mt-5 text-blue-200 text-base md:text-lg max-w-xl leading-relaxed">
            {slides[activeIndex].sub}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-0.5"
            >
              {slides[activeIndex].cta}
              <ArrowRight size={17} />
            </a>
            <a
              href="tel:+254712345678"
              className="inline-flex items-center gap-2 bg-blue-900/70 hover:bg-blue-800 border border-blue-700 hover:border-blue-500 text-blue-100 hover:text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 backdrop-blur-sm"
            >
              <Phone size={16} />
              Call Us Now
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-5 pointer-events-auto">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-white leading-none">
                  {s.value}
                </span>
                <span className="text-xs text-blue-300 font-medium mt-1 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide counter — bottom right */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2 text-blue-300 text-xs font-mono">
        <span className="text-white font-bold text-sm">
          0{activeIndex + 1}
        </span>
        <span>/</span>
        <span>0{slides.length}</span>
      </div>

      {/* Bottom gradient fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-550 to-transparent z-10 pointer-events-none" />

      {/* Pagination dots — override swiper defaults via inline style trick */}
      <style>{`
        .swiper-pagination {
          bottom: 28px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.3) !important;
          opacity: 1 !important;
          width: 6px !important;
          height: 6px !important;
          transition: all 0.3s !important;
        }
        .swiper-pagination-bullet-active {
          background: #EF4444 !important;
          width: 24px !important;
          border-radius: 3px !important;
        }
      `}</style>
    </section>
  );
}
