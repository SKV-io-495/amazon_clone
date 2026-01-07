import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function RegistryContent() {
  return (
    <div>
      {/* Hero Banner Area */}
      <div className="relative w-full h-[400px] bg-[#f2f4f8] flex items-center justify-center">
         <div className="text-center">
             <h1 className="text-4xl font-bold mb-4">Celebration Ready</h1>
             <p className="text-lg mb-6">Whatever you&apos;re celebrating, Amazon Registry has you covered.</p>
             <Button variant="primary">Create a Registry</Button>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-w-[1200px] mx-auto">
         <div className="text-center">
             <div className="w-full h-48 bg-gray-200 mb-4 relative">
                <Image src="https://placehold.co/300x200/png" alt="Wedding" fill className="object-cover" unoptimized />
             </div>
             <h3 className="font-bold text-lg">Wedding Registry</h3>
         </div>
          <div className="text-center">
             <div className="w-full h-48 bg-gray-200 mb-4 relative">
                <Image src="https://placehold.co/300x200/png" alt="Baby" fill className="object-cover" unoptimized />
             </div>
             <h3 className="font-bold text-lg">Baby Registry</h3>
         </div>
          <div className="text-center">
             <div className="w-full h-48 bg-gray-200 mb-4 relative">
                <Image src="https://placehold.co/300x200/png" alt="Birthday" fill className="object-cover" unoptimized />
             </div>
             <h3 className="font-bold text-lg">Birthday Gift List</h3>
         </div>
      </div>
    </div>
  );
}
