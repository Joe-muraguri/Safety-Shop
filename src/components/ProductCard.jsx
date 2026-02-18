import { ShieldCheck, MessageCircle, Tag, ChevronRight } from "lucide-react";

export default function ProductCard({ product }) {
  if (!product || !product.name || product.price == null) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-300 text-center text-gray-400 text-sm">
        Product unavailable
      </div>
    );
  }

  const formattedPrice = Number(product.price).toLocaleString("en-KE");
  const oldPrice = product.oldPrice
    ? Number(product.oldPrice).toLocaleString("en-KE")
    : null;

  const discount =
    product.oldPrice && product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const waLink = `https://wa.me/2547XXXXXXXX?text=Hi%20SafetyKE%2C%20I%27m%20interested%20in%20*${encodeURIComponent(product.name)}*%20at%20KES%20${formattedPrice}.%20Please%20advise.`;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

      {/* Left red accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 z-10 rounded-l-2xl" />

      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Top badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 items-end">
          {discount && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
              -{discount}%
            </span>
          )}
          {product.certified && (
            <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1 border border-emerald-100">
              <ShieldCheck size={10} />
              Certified
            </span>
          )}
        </div>

        {/* Hover enquiry panel — slides up */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-blue-950/95 backdrop-blur-sm p-4 flex flex-col gap-2">
          <p className="text-white text-xs font-semibold uppercase tracking-wider opacity-60 mb-0.5">
            Quick Enquire
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold px-3 py-2.5 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <MessageCircle size={14} className="fill-current" />
              Chat on WhatsApp
            </span>
            <ChevronRight size={13} />
          </a>
          <a
            href="#contact"
            className="flex items-center justify-between gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors border border-white/10"
          >
            <span className="flex items-center gap-2">
              <Tag size={13} />
              Request Quote
            </span>
            <ChevronRight size={13} />
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className="pl-5 pr-4 pt-3.5 pb-4 flex flex-col flex-grow">

        {/* Category tag */}
        {product.category && (
          <span className="text-xs text-red-500 font-semibold uppercase tracking-widest mb-1">
            {product.category}
          </span>
        )}

        {/* Name */}
        <h3 className="text-sm md:text-base font-bold text-blue-950 leading-snug line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Description */}
        {product.shortDescription && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-extrabold text-blue-950 leading-none">
              KES {formattedPrice}
            </span>
            {oldPrice && (
              <span className="text-xs text-gray-400 line-through mt-0.5">
                KES {oldPrice}
              </span>
            )}
          </div>

          {/* Inline WhatsApp icon button — visible on mobile (no hover available) */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="md:opacity-0 md:group-hover:opacity-100 flex-shrink-0 w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20b858] flex items-center justify-center shadow-md shadow-green-200 transition-all duration-200"
          >
            <MessageCircle size={17} className="text-white fill-current" />
          </a>
        </div>
      </div>
    </div>
  );
}
