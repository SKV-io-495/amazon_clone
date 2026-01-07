'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import Button from './ui/Button';

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

  const handleAddToCart = () => {
    console.log('Add to cart:', product.id, product.title);
  };

  return (
    <div className="bg-white p-4 flex flex-col h-full group">
      {/* Image */}
      <div className="relative w-full aspect-square mb-3 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          unoptimized
          className="object-contain group-hover:scale-105 transition-transform"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-sm font-medium text-[var(--amazon-link)] hover:text-[var(--amazon-orange)] hover:underline cursor-pointer line-clamp-2 mb-1">
          {product.title}
        </h3>

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
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
