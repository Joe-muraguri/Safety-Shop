export default function ProductCard({ product }) {
  if (!product || !product.name || product.price == null) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center text-gray-500">
        Product unavailable
      </div>
    );
  }

  const formattedPrice = Number(product.price).toLocaleString("en-KE");
  const oldPrice = product.oldPrice ? Number(product.oldPrice).toLocaleString("en-KE") : null;

  return (
    <div className="
      group bg-white rounded-lg overflow-hidden
      border border-gray-200 shadow-sm
      hover:shadow-md hover:border-gray-300
      transition-all duration-200
      flex flex-col
      h-full
    ">
      {/* Image – more square, less tall */}
      <div className="relative aspect-square md:aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {product.certified && (
          <span className="
            absolute top-2 left-2 text-xs font-medium
            bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded
          ">
            Certified
          </span>
        )}
      </div>

      {/* Content – reduced vertical spacing */}
      <div className="p-3.5 md:p-4 flex flex-col flex-grow">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Description – very strict limit */}
        {product.shortDescription && (
          <p className="text-xs md:text-sm text-gray-600 mb-2.5 line-clamp-1 md:line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price – compact */}
        <div className="mt-auto mb-3">
          <span className="text-xl md:text-2xl font-bold text-gray-900">
            KES {formattedPrice}
          </span>
          {oldPrice && (
            <span className="ml-2 text-xs md:text-sm text-gray-500 line-through">
              {oldPrice}
            </span>
          )}
        </div>

        {/* Button – noticeably shorter */}
        <a
          href={`https://wa.me/2547XXXXXXXX?text=Interested%20in%20${encodeURIComponent(product.name)}%20–%20KES%20${formattedPrice}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2
            bg-[#25D366] hover:bg-[#20b858] active:bg-[#1da851]
            text-white font-medium text-sm
            py-2.5 px-4 rounded-lg
            transition-colors duration-150
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1
            w-full shadow-sm
          "
        >
          <svg className="w-4.5 h-4.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}