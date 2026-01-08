import { getProducts } from '@/lib/actions/product';
import ProductCard from '@/components/ProductCard';

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;

  const products = await getProducts(query, category);

  return (
    <main className="min-h-screen bg-[#e3e6e6]">
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-[var(--amazon-blue-light)]">
         {/* Decorative background gradient */}
         <div className="absolute inset-0 bg-gradient-to-tr from-[#131921] to-transparent opacity-60" />
         
        {/* Hero Text Overlay */}
        <div className="relative h-full flex flex-col justify-center items-center text-center z-10 pb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md px-4">
            Shop the Latest Deals
          </h1>
          <p className="text-gray-200 mt-3 text-sm md:text-lg max-w-2xl px-4">
            Don&apos;t miss out on these limited-time offers across all your favorite categories.
          </p>
        </div>
        

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
