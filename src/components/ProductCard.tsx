'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import Button from './ui/Button';
import { addToCart } from '@/lib/actions/cart';
import { toggleWishlist } from '@/lib/actions/wishlist';
import { useTransition, useState } from 'react';
import AddToCartModal from './AddToCartModal';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  rating: string | null;
  reviewCount: number | null;
  image: string;
  category: string;
  stock: number;
  isPrime: boolean | null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const rating = parseFloat(product.rating || '0');
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false); // Optimistic

  const handleAddToCart = () => {
    startTransition(async () => {
      const result = await addToCart(product.id);
      if (result.success) {
        setIsModalOpen(true);
      } else {
        alert('Failed to add to cart');
      }
    });
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    // Optimistic Update
    const previousState = isWishlisted;
    setIsWishlisted(!previousState); 
    
    const result = await toggleWishlist(product.id);
    
    if (result && 'error' in result) {
       // Revert or redirect
       setIsWishlisted(previousState);
       if (result.requiresAuth) {
           window.location.href = '/wishlist'; // Redirect to guarded page
       } else {
           alert('Failed to update wishlist');
       }
    }
  };

  return (
    <>
      <AddToCartModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         product={{ title: product.title, image: product.image, price: product.price }} 
      />
      
      <div className="bg-white p-4 flex flex-col h-full group border border-transparent hover:border-gray-200 transition-colors relative">
         {/* Wishlist Button */}
         <button 
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full hover:bg-gray-100/80 transition-colors opacity-0 group-hover:opacity-100"
         >
            <Heart 
               size={24} 
               className={isWishlisted ? "fill-red-600 text-red-600" : "text-gray-500"} 
            />
         </button>

         {/* Image */}
         <div className="relative w-full aspect-square mb-3 overflow-hidden">
            <Link href={`/product/${product.id}`}>
               <Image
                 src={product.image}
                 alt={product.title}
                 fill
                 unoptimized
                 className="object-contain group-hover:scale-105 transition-transform cursor-pointer"
                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
               />
            </Link>
         </div>

         <div className="flex-1 flex flex-col">
            {/* Title */}
            <Link href={`/product/${product.id}`}>
               <h3 className="text-sm font-medium text-[var(--amazon-link)] hover:text-[var(--amazon-orange)] hover:underline cursor-pointer line-clamp-2 mb-1">
                 {product.title}
               </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
               <div className="flex">
                 {[...Array(5)].map((_, i) => (
                   <Star
                     key={i}
                     size={14}
                     className={
                       i < fullStars
                         ? 'fill-[var(--amazon-orange)] text-[var(--amazon-orange)]'
                         : i === fullStars && hasHalfStar
                         ? 'fill-[var(--amazon-orange)]/50 text-[var(--amazon-orange)]'
                         : 'text-gray-300'
                     }
                   />
                 ))}
               </div>
               <span className="text-xs text-[var(--amazon-link)]">
                 {product.reviewCount?.toLocaleString() || 0}
               </span>
            </div>

            {/* Price */}
            <div className="mb-2">
               <span className="text-lg font-medium text-[var(--amazon-price)]">
                 ${product.price}
               </span>
            </div>

            {/* Prime Badge */}
            {product.isPrime && (
               <div className="flex items-center gap-1 mb-2">
                 <span className="text-[#00a8e1] text-xs font-bold">✓ prime</span>
               </div>
            )}

            {/* Stock */}
            {product.stock > 0 ? (
               <p className="text-xs text-green-700 mb-2">In Stock</p>
            ) : (
               <p className="text-xs text-red-600 mb-2">Out of Stock</p>
            )}

            {/* Add to Cart */}
            <div className="mt-auto">
               <Button
                 variant="primary"
                 size="sm"
                 className="w-full"
                 onClick={handleAddToCart}
                 disabled={isPending}
               >
                 {isPending ? 'Adding...' : 'Add to Cart'}
               </Button>
            </div>
         </div>
      </div>
    </>
  );
}
