'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './ui/Button';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    image: string;
    price: string;
  };
}

export default function AddToCartModal({ isOpen, onClose, product }: AddToCartModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Auto-close after a few seconds? No, Amazon keeps it open usually.
    } else {
      setTimeout(() => setIsVisible(false), 300); // Animation clear
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-start justify-end p-4 md:p-10 pointer-events-none ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
       {/* Modal Body */}
       <div className={`bg-white shadow-2xl border border-gray-200 rounded-lg w-[350px] pointer-events-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-10'}`}>
          <div className="p-4 bg-gray-50 flex items-center justify-between rounded-t-lg border-b border-gray-100">
             <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                <Check size={18} className="bg-green-700 text-white rounded-full p-0.5" />
                Added to Cart
             </div>
             <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <X size={18} />
             </button>
          </div>
          
          <div className="p-4 flex gap-4">
             <div className="relative w-16 h-16 flex-shrink-0">
                <Image src={product.image} alt={product.title} fill className="object-contain" unoptimized />
             </div>
             <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2 mb-1">{product.title}</p>
                <p className="text-red-700 font-medium text-sm">
                   Subtotal <span className="text-gray-500">(1 item):</span> ${product.price}
                </p>
             </div>
          </div>

          <div className="p-4 pt-0 flex flex-col gap-2">
             <Link href="/cart" className="w-full">
                <Button variant="outline" size="sm" className="w-full rounded-full">
                   View Cart
                </Button>
             </Link>
             <Link href="/checkout" className="w-full">
               <Button variant="primary" size="sm" className="w-full rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-black border-none">
                  Proceed to checkout (1 item)
               </Button>
             </Link>
          </div>
       </div>
    </div>
  );
}
