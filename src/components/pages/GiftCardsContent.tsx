import Image from 'next/image';

export default function GiftCardsContent() {
  return (
    <div className="p-6 max-w-[1500px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gift Cards</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="cursor-pointer">
             <div className="relative w-full aspect-[1.6] rounded-lg overflow-hidden mb-2 hover:shadow-lg transition-shadow">
                <Image src={`https://placehold.co/320x200/png?text=Gift+Card+${i}`} alt="Gift Card" fill className="object-cover" unoptimized />
             </div>
             <p className="text-sm font-medium text-blue-700 hover:underline hover:text-orange-700">Amazon.com Gift Card</p>
          </div>
        ))}
      </div>
    </div>
  );
}
