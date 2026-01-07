'use client';

import Image from 'next/image';
import Link from 'next/link';
import { updateQuantity, deleteItem } from '@/lib/actions/cart';
import { useTransition } from 'react';

interface CartItemProps {
  item: {
    id: string;
    productId: string;
    quantity: number;
    title: string;
    price: string;
    image: string;
    stock: number;
    isPrime: boolean | null;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (newQty: number) => {
    startTransition(() => updateQuantity(item.id, newQty));
  };

  const handleDelete = () => {
    startTransition(() => deleteItem(item.id));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 pb-6 last:border-0">
      {/* Image */}
      <div className="shrink-0">
        <Image 
           src={item.image} 
           alt={item.title} 
           width={180} 
           height={180} 
           unoptimized
           className="object-contain w-[100px] sm:w-[150px]" 
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <Link href={`#`} className="text-lg font-medium text-[var(--amazon-link)] hover:underline hover:text-[#c45500] line-clamp-2 leading-snug">
          {item.title}
        </Link>
        <div className="text-sm font-bold text-[#b12704] mt-1">${item.price}</div>
        
        {item.stock > 0 ? (
          <p className="text-xs text-green-700 mt-1">In Stock</p>
        ) : (
          <p className="text-xs text-red-600 mt-1">Out of Stock</p>
        )}

        {item.isPrime && (
           <div className="mt-1 flex items-center">
              <span className="text-[#00a8e1] text-xs font-bold">✓ prime</span>
           </div>
        )}

        <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
          <div className="flex items-center shadow-sm rounded-md bg-[#f0f2f2] border border-[#d5d9d9] hover:bg-[#e3e6e6]">
             <span className="px-2 text-gray-600">Qty:</span>
             <select 
               value={item.quantity} 
               onChange={(e) => handleUpdate(Number(e.target.value))}
               className="bg-transparent border-none py-1 pl-1 pr-6 focus:ring-0 text-sm cursor-pointer hover:bg-[#e3e6e6] rounded-r-md"
               disabled={isPending}
             >
               {[...Array(10)].map((_, i) => (
                 <option key={i + 1} value={i + 1}>{i + 1}</option>
               ))}
               {item.quantity > 10 && <option value={item.quantity}>{item.quantity}</option>}
             </select>
          </div>

          <div className="h-4 w-px bg-gray-300 mx-1 hidden sm:block"></div>

          <button 
             onClick={handleDelete}
             className="text-[var(--amazon-link)] hover:underline hover:text-[#c45500] cursor-pointer"
             disabled={isPending}
          >
             Delete
          </button>
          
          <div className="h-4 w-px bg-gray-300 mx-1 hidden sm:block"></div>
          
          <button className="text-[var(--amazon-link)] hover:underline hover:text-[#c45500] cursor-pointer">
             Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
