import { Package, RotateCcw, MapPin, CreditCard, Settings, MonitorPlay } from 'lucide-react';

export default function CustomerServiceContent() {
  const topics = [
    'Your Orders', 'Returns & Refunds', 'Manage Addresses', 'Payment Settings', 'Account Settings', 'Digital Services'
  ];

  return (
    <div className="max-w-[1000px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hello. What can we help you with?</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="border border-gray-300 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-50">
            <div className="bg-gray-100 p-3 rounded-full"><Package size={24} className="text-gray-600"/></div>
            <span className="font-medium">Your Orders</span>
         </div>
         <div className="border border-gray-300 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-50">
             <div className="bg-gray-100 p-3 rounded-full"><RotateCcw size={24} className="text-gray-600"/></div>
             <span className="font-medium">Returns & Refunds</span>
         </div>
         <div className="border border-gray-300 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-50">
             <div className="bg-gray-100 p-3 rounded-full"><MapPin size={24} className="text-gray-600"/></div>
             <span className="font-medium">Manage Addresses</span>
         </div>
         <div className="border border-gray-300 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-50">
             <div className="bg-gray-100 p-3 rounded-full"><CreditCard size={24} className="text-gray-600"/></div>
             <span className="font-medium">Payment Settings</span>
         </div>
         <div className="border border-gray-300 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-50">
             <div className="bg-gray-100 p-3 rounded-full"><Settings size={24} className="text-gray-600"/></div>
             <span className="font-medium">Account Settings</span>
         </div>
         <div className="border border-gray-300 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-50">
             <div className="bg-gray-100 p-3 rounded-full"><MonitorPlay size={24} className="text-gray-600"/></div>
             <span className="font-medium">Digital Services</span>
         </div>
      </div>

      <div className="bg-gray-100 p-6 rounded">
         <h2 className="text-xl font-bold mb-2">Search our help library</h2>
         <input type="text" placeholder="Type something like 'question about a charge'" className="w-full p-2 border border-gray-400 rounded" />
      </div>
    </div>
  );
}
