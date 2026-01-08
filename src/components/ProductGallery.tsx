'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  // Safe fallback if images is somehow empty, though parent should handle logic
  const validImages = images.length > 0 ? images : ['https://placehold.co/500x500/png'];
  const [activeImage, setActiveImage] = useState(validImages[0]);

  return (
    <div className="flex gap-4 w-full">
      {/* Thumbnails (Left side vertical list for desktop) */}
      <div className="hidden lg:flex flex-col gap-3">
        {validImages.map((img, i) => (
          <div 
            key={i} 
            className={cn(
              "w-12 h-12 border rounded cursor-pointer p-1 transition-colors",
              activeImage === img ? 'border-[var(--amazon-orange)] shadow-sm' : 'border-gray-300 hover:border-[var(--amazon-orange)]'
            )}
            onMouseEnter={() => setActiveImage(img)}
            onClick={() => setActiveImage(img)}
          >
            <div className="relative w-full h-full">
              <Image 
                src={img} 
                alt={`${title} thumbnail ${i + 1}`} 
                fill 
                className="object-contain" 
                unoptimized 
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Image */}
      <div className="flex-1 relative aspect-square max-h-[600px] border border-gray-100 lg:border-none flex items-center justify-center bg-white">
        <Image 
          src={activeImage}
          alt={title}
          fill
          className="object-contain" // contain ensures full product visibility
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
