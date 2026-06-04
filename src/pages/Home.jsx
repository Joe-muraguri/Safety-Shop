import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import RequestQuote from "../components/RequestQuote";
import { useProducts } from "../hooks/useProducts";
import { ShieldCheck, Truck, BadgeCheck, Headset, ArrowRight, Package, Loader } from "lucide-react";
import SEO from "../components/SEO";

const features = [
  {
    icon: ShieldCheck,
    title: "ISO Certified Gear",
    desc: "All products meet international safety standards for full compliance.",
  },
  {
    icon: Truck,
    title: "Fast Nationwide Delivery",
    desc: "Same-day dispatch across Nairobi. Countrywide delivery in 24–48hrs.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine & Verified",
    desc: "100% authentic PPE — no counterfeits, no compromises.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    desc: "Our safety specialists help you pick the right gear for every job.",
  },
];

export default function Home() {
  const { products, loading, error } = useProducts();

  const validProducts = products.filter(
    (product) => product && product.id && product.price != null
  );

  return (
    <div className="bg-white">
      <SEO page="home" products={validProducts} />
      <Hero />

      {/* ── Why Choose Us ─────────────────────────────── */}
      <section className="bg-white py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-red-600" />
                </div>
                <div>
                  <p className="text-blue-950 font-semibold text-sm">{title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products Section ───────────────────────────── */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-6 h-px bg-red-600" />
                Our Catalogue
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
                Safety Products
              </h2>
              <p className="mt-3 text-gray-500 text-base max-w-lg leading-relaxed">
                High-quality protective gear designed to keep your team safe,
                compliant, and confident on every job site.
              </p>
            </div>
            <a
              href="#contact"
              className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-500 border border-red-200 hover:border-red-400 hover:bg-red-50 px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              Request a Quote <ArrowRight size={15} />
            </a>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
              <Loader size={22} className="animate-spin text-red-400" />
              <span className="text-sm font-medium">Loading products...</span>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-gray-500 text-sm">Could not load products. Showing default catalogue.</p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && validProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {validProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && validProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-950/5 border border-blue-950/10 flex items-center justify-center mb-4">
                <Package size={28} className="text-blue-300" />
              </div>
              <p className="text-gray-700 font-semibold text-lg">No products yet</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon — new stock is on the way.</p>
            </div>
          )}
        </div>
      </section>

      <RequestQuote />

      {/* ── CTA Banner ────────────────────────────────── */}
      <section className="bg-red-50 border-t border-red-100 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
            Need help choosing?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
            Talk to a Safety Specialist
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Not sure what gear you need? Our team will assess your worksite requirements and recommend the right PPE.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/2547XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-red-200 hover:-translate-y-0.5"
            >
              WhatsApp Us <ArrowRight size={16} />
            </a>
            <a
              href="tel:+254712345678"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-red-300 text-blue-950 hover:text-red-600 font-semibold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-sm"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
