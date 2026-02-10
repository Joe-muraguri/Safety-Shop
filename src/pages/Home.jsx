import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function Home() {
  const validProducts = products.filter(
    (product) => product && product.id && product.price != null
  );

  return (
    <>
      <Hero />

      {/* Products Section */}
      <section
        id="products"
        className="relative py-20 bg-gradient-to-b from-white to-gray-50"
      >
        {/* Decorative top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Our Safety Products
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              High-quality protective gear designed to keep your team safe,
              compliant, and confident on every job site.
            </p>
          </div>

          {/* Products Grid */}
          {validProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
              {validProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
              <p className="text-gray-500 text-lg">
                No products available at the moment.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
