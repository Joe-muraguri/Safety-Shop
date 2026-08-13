import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Phone, ChevronDown } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const AUTOPLAY_DELAY = 5000;
const HERO_DIR = "/images/hero";

// Copy stays hand-written — matched to images by index.
// If there are more images than copy entries, the last entry repeats.
const slidesCopy = [
  {
    tag: "Industrial PPE",
    headline: ["Protect What", "Matters Most"],
    sub: "Premium safety gear — helmets, gloves, vests and more — built for Kenya's toughest jobs.",
    cta: "Explore Safety Solutions",
  },
  {
    tag: "Certified Equipment",
    headline: ["Certified.", "Durable. Trusted."],
    sub: "High-quality PPE that meets international safety standards — ready for construction, manufacturing & warehouses.",
    cta: "View Full Range",
  },
  {
    tag: "Full Protection",
    headline: ["Safety That Works", "As Hard As You Do"],
    sub: "Reflective gear, harnesses, respirators — everything your team needs to stay safe and compliant.",
    cta: "Shop Now",
  },
  {
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

const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch(`${HERO_DIR}/manifest.json`)
      .then((res) => res.json())
      .then((files) => {
        const built = files.map((file, i) => ({
          image: `${HERO_DIR}/${file}`,
          ...(slidesCopy[i] ?? slidesCopy[slidesCopy.length - 1]),
        }));
        setSlides(built);
      })
      .catch(() => setSlides([]));
  }, []);

  if (slides.length === 0) {
    // Prevents a flash of empty section while the manifest loads
    return <section className="relative h-[85vh] md:h-screen bg-blue-950" />;
  }

  return (
    <section className="relative h-[85vh] md:h-screen overflow-hidden bg-blue-950">
      <div
        className="absolute inset-0 z-[1] opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.image}>
            <div
              className={`absolute inset-0 bg-cover bg-center ${
                activeIndex === i ? "animate-kenburns" : ""
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/50 to-blue-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-blue-950/30" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="absolute top-20 -right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial="hidden" animate="visible" exit="exit">
              <motion.div
                custom={0}
                variants={textVariants}
                className="pointer-events-auto inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
              >
                <ShieldCheck size={13} />
                {slides[activeIndex].tag}
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight max-w-3xl">
                <motion.span custom={1} variants={textVariants} className="block">
                  {slides[activeIndex].headline[0]}
                </motion.span>
                <motion.span custom={2} variants={textVariants} className="block text-red-500">
                  {slides[activeIndex].headline[1]}
                </motion.span>
              </h1>

              <motion.p
                custom={3}
                variants={textVariants}
                className="mt-5 text-blue-200 text-base md:text-lg max-w-xl leading-relaxed"
              >
                {slides[activeIndex].sub}
              </motion.p>

              <motion.div
                custom={4}
                variants={textVariants}
                className="mt-8 flex flex-wrap gap-4 pointer-events-auto"
              >
                <a
                  href="#products"
                  className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-0.5"
                >
                  {slides[activeIndex].cta}
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+254712345678"
                  className="inline-flex items-center gap-2 bg-blue-900/70 hover:bg-blue-800 border border-blue-700 hover:border-blue-500 text-blue-100 hover:text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 backdrop-blur-sm"
                >
                  <Phone size={16} />
                  Call Us Now
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-5 pointer-events-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="flex flex-col group cursor-default"
              >
                <span className="text-2xl md:text-3xl font-extrabold text-white leading-none transition-transform duration-200 group-hover:-translate-y-0.5">
                  {s.value}
                </span>
                <span className="text-xs text-blue-300 font-medium mt-1 uppercase tracking-wider">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3 text-blue-300 text-xs font-mono">
        <span className="text-white font-bold text-sm">0{activeIndex + 1}</span>
        <div className="relative w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            key={activeIndex}
            className="absolute inset-y-0 left-0 bg-red-500 rounded-full animate-progress"
            style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
          />
        </div>
        <span>0{slides.length}</span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 text-blue-300/70 pointer-events-none animate-bounce-slow">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 to-transparent z-10 pointer-events-none" />

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

        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        .animate-kenburns {
          animation: kenburns ${AUTOPLAY_DELAY + 1000}ms ease-out forwards;
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress linear forwards;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}