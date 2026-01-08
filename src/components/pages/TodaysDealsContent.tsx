import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

interface TodaysDealsContentProps {
  products: any[]; // Using any[] for simplicity as Product type is in ProductCard
}

export default function TodaysDealsContent({ products }: TodaysDealsContentProps) {
  // Use first 4 products for deals simulation, or all if less than 4
  const deals = products.slice(0, 4);

  return (
    <div className="bg-white p-6 max-w-[1500px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Today&apos;s Deals</h1>
      
      {products.length === 0 ? (
         <p>No deals currently available.</p>
      ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
           {deals.map(product => (
             <ProductCard key={product.id} product={product} />
           ))}
         </div>
      )}
    </div>
  );
}
