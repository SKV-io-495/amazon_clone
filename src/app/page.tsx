import { getProducts } from '@/lib/actions/product';
import ProductCard from '@/components/ProductCard';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#e3e6e6]">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[var(--amazon-blue-light)] to-transparent"
          style={{
            backgroundImage: 'url(https://placehold.co/1500x600/232f3e/ffffff?text=Shop+the+Latest+Deals)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Fade overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e3e6e6] to-transparent" />
      </div>

      {/* Product Grid */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-40 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          {/* Category Title */}
          <h2 className="text-xl font-bold mb-4 bg-white p-4">
            Shop our top picks
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12 bg-white">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>

      {/* Footer Spacer */}
      <div className="h-16" />
    </main>
  );
}
