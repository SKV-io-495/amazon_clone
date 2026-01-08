'use client';

import { addToCart } from '@/lib/actions/cart';
import Button from './ui/Button';
import { useTransition, useState } from 'react';
import { MapPin } from 'lucide-react';
import AddToCartModal from './AddToCartModal';
import { toggleWishlist } from '@/lib/actions/wishlist';

interface BuyBoxProps {
  productId: string;
  price: string;
  stock: number;
  title: string;
  image: string;
}

export default function BuyBox({ productId, price, stock, title, image }: BuyBoxProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    startTransition(async () => {
      await addToCart(productId);
      setIsModalOpen(true);
    });
  };

  const handleAddToWishlist = async () => {
     await toggleWishlist(productId);
     alert('Added to Wishlist');
  };

  return (
    <>
      <AddToCartModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         product={{ title: title, image: image, price: price }}
      />

      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
         <div className="mb-4">
            <span className="text-2xl font-medium text-[var(--amazon-price)]">${price}</span>
         </div>
      
         <div className="mb-4">
            <span className="text-sm text-gray-500">FREE delivery</span>
         </div>

         <div className="mb-6">
            <div className="flex items-start gap-1 text-xs text-[#007185] hover:underline cursor-pointer mb-2">
               <MapPin size={14} className="mt-0.5" />
               <span>Deliver to India</span>
            </div>
            {stock > 0 ? (
               <p className="text-lg text-green-700 font-medium">In Stock</p>
            ) : (
               <p className="text-lg text-red-600 font-medium">Out of Stock</p>
            )}
         </div>

         <div className="space-y-2">
            <Button 
               className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black border-none rounded-full"
               onClick={handleAddToCart}
               disabled={isPending || stock === 0}
            >
               {isPending ? 'Adding...' : 'Add to Cart'}
            </Button>
            <Button 
               className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-black border-none rounded-full"
               disabled={stock === 0}
            >
               Buy Now
            </Button>
         </div>

         <div className="mt-4 text-xs text-gray-600 space-y-1">
            <div className="grid grid-cols-2">
               <span className="text-gray-500">Ships from</span>
               <span>Amazon.clone</span>
            </div>
            <div className="grid grid-cols-2">
               <span className="text-gray-500">Sold by</span>
               <span>Amazon.clone</span>
            </div>
         </div>

         <div className="mt-4 border-t border-gray-200 pt-4">
            <button 
               onClick={handleAddToWishlist}
               className="w-full text-left text-sm text-black border border-gray-300 rounded shadow-sm px-2 py-1 hover:bg-gray-50"
            >
               Add to List
            </button>
         </div>
      </div>
    </>
  );
}
