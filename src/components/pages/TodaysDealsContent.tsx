import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function TodaysDealsContent() {
  const deals = [
    { id: 1, title: 'Wireless Earbuds', discount: '50% off', price: '$29.99', oldPrice: '$59.99', image: 'https://placehold.co/200x200/png' },
    { id: 2, title: 'Smart Watch', discount: '30% off', price: '$49.99', oldPrice: '$79.99', image: 'https://placehold.co/200x200/png' },
    { id: 3, title: 'Bluetooth Speaker', discount: '20% off', price: '$39.99', oldPrice: '$49.99', image: 'https://placehold.co/200x200/png' },
    { id: 4, title: 'Gaming Mouse', discount: '40% off', price: '$19.99', oldPrice: '$39.99', image: 'https://placehold.co/200x200/png' },
  ];

  return (
    <div className="bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Today&apos;s Deals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {deals.map(deal => (
          <div key={deal.id} className="border p-4 rounded hover:scale-105 transition-transform">
            <div className="relative w-full h-48 mb-4">
               <Image src={deal.image} alt={deal.title} fill className="object-contain" unoptimized />
            </div>
            <span className="bg-[#cc0c39] text-white px-2 py-1 text-sm font-bold rounded">{deal.discount}</span>
            <span className="text-[#cc0c39] font-bold text-sm ml-2">Limited time deal</span>
            <div className="mt-2">
               <span className="text-xl font-medium">{deal.price}</span>
               <span className="text-xs text-gray-500 line-through ml-2">{deal.oldPrice}</span>
            </div>
            <p className="text-sm mt-1">{deal.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
