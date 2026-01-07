import Button from '@/components/ui/Button';

export default function SellContent() {
  return (
    <div>
       <div className="bg-[#232f3e] text-white py-12 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Sell on Amazon</h1>
          <p className="text-xl mb-8">Reach hundreds of millions of customers</p>
          <Button variant="primary" className="text-lg px-8 py-2">Sign up</Button>
          <p className="text-sm mt-4 text-gray-300">$39.99 a month + selling fees</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 max-w-[1200px] mx-auto text-center">
          <div>
             <h3 className="font-bold text-xl mb-2">Sell More</h3>
             <p>Access Amazon&apos;s world-class logistics and customer service.</p>
          </div>
          <div>
             <h3 className="font-bold text-xl mb-2">Build Your Brand</h3>
             <p>Protect and grow your brand with our innovative tools.</p>
          </div>
          <div>
             <h3 className="font-bold text-xl mb-2">Scale Globally</h3>
             <p>Expand to international marketplaces with ease.</p>
          </div>
       </div>
    </div>
  );
}
