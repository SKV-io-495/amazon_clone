import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import BuyBox from '@/components/BuyBox';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!product) {
    notFound();
  }

  const rating = parseFloat(product.rating || '0');
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="max-w-screen-2xl mx-auto p-4">
        {/* Breadcrumb Placeholder */}
        <div className="text-xs text-gray-500 mb-4">
           Back to results
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-9 gap-10">
          {/* Col 1: Images (Span 4) */}
          <div className="lg:col-span-4 flex gap-4">
             {/* Thumbnails (Left side vertical list for desktop) */}
             <div className="hidden lg:flex flex-col gap-3">
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className={`w-12 h-12 border rounded cursor-pointer p-1 ${i === 1 ? 'border-[var(--amazon-orange)] shadow-sm' : 'border-gray-300'}`}>
                      <div className="relative w-full h-full">
                         <Image src={product.image} alt="thumbnail" fill className="object-contain" unoptimized />
                      </div>
                   </div>
                ))}
             </div>
             
             {/* Main Image */}
             <div className="flex-1 relative aspect-square max-h-[600px] border border-gray-100 lg:border-none">
                <Image 
                   src={product.image}
                   alt={product.title}
                   fill
                   className="object-contain" // Changed to contain to show full product
                   priority
                   unoptimized
                />
             </div>
          </div>

          {/* Col 2: Details (Span 3) */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-medium text-gray-900 mb-2 leading-tight">
               {product.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
               <div className="flex text-[var(--amazon-orange)]">
                  {[...Array(5)].map((_, i) => (
                     <Star
                     key={i}
                     size={16}
                     className={`${i < fullStars ? 'fill-current' : i === fullStars && hasHalfStar ? 'fill-current/50' : 'text-gray-300'}`}
                     />
                  ))}
               </div>
               <span className="text-[#007185] hover:underline hover:text-[#c7511f] cursor-pointer text-sm font-medium">
                  {product.reviewCount?.toLocaleString()} ratings
               </span>
            </div>

            <div className="border-t border-b border-gray-200 py-4 my-2">
               <div className="flex items-start gap-2">
                  <span className="text-sm text-gray-600 mt-1">Price:</span>
                  <span className="text-3xl font-medium text-[var(--amazon-price)]">${product.price}</span>
               </div>
               <div className="text-sm text-gray-600 mt-1">
                  All prices include VAT.
               </div>
            </div>

            <div className="mt-4">
               <h3 className="font-bold mb-2">About this item</h3>
               <ul className="list-disc pl-5 space-y-2 text-sm text-gray-900">
                  <li>{product.description}</li>
                  <li>High quality construction and materials.</li>
                  <li>Designed for performance and durability.</li>
                  <li>Ideal for daily use.</li>
               </ul>
            </div>
          </div>

          {/* Col 3: Buy Box (Span 2) */}
          <div className="lg:col-span-2">
            <BuyBox 
               productId={product.id} 
               price={product.price} 
               stock={product.stock}
               title={product.title}
               image={product.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
