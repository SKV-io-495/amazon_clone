'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, Menu, MapPin, X, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Main Nav */}
        <nav className="bg-[var(--amazon-blue)] text-white px-4 py-2 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 border border-transparent hover:border-white p-1 rounded">
             <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon Logo"
                width={96}
                height={40}
                className="brightness-0 invert object-contain"
                priority
             />
             <span className="text-[var(--amazon-orange)] text-xs mb-3 -ml-1">.clone</span>
          </Link>

          {/* Deliver To */}
          <div className="hidden md:flex items-center gap-1 border border-transparent hover:border-white p-1 rounded cursor-pointer">
            <MapPin size={18} className="mt-2" />
            <div className="text-xs">
              <p className="text-gray-300">Deliver to</p>
              <p className="font-bold">India</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex h-10">
            <select className="hidden md:block bg-gray-100 text-black text-xs px-2 rounded-l border-r border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-[var(--amazon-orange)]">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Home</option>
            </select>
            <input
              type="text"
              placeholder="Search Amazon.clone"
              className="flex-1 px-3 py-2 text-black text-sm outline-none border-none focus:ring-0"
            />
            <button className="bg-[var(--amazon-yellow)] hover:bg-[var(--amazon-orange)] px-4 rounded-r transition-colors flex items-center justify-center">
              <Search size={22} className="text-black" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
             {/* Language (Placeholder) */}
             <div className="hidden md:flex items-center p-2 border border-transparent hover:border-white rounded cursor-pointer font-bold text-sm">
                EN
             </div>

            {/* Account */}
            <div className="hidden md:block border border-transparent hover:border-white p-1 rounded cursor-pointer">
              <p className="text-xs text-gray-300">Hello, sign in</p>
              <p className="text-sm font-bold">Account & Lists</p>
            </div>

            {/* Orders */}
            <div className="hidden md:block border border-transparent hover:border-white p-1 rounded cursor-pointer">
              <p className="text-xs text-gray-300">Returns</p>
              <p className="text-sm font-bold">& Orders</p>
            </div>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-1 border border-transparent hover:border-white p-1 rounded relative">
              <div className="relative">
                 <ShoppingCart size={32} />
                 <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[var(--amazon-orange)] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                   0
                 </span>
              </div>
              <span className="hidden md:block font-bold text-sm mt-3">Cart</span>
            </Link>
          </div>
        </nav>

        {/* Sub Nav */}
        <div className="bg-[var(--amazon-blue-light)] text-white text-sm px-4 py-1.5 flex items-center gap-5 overflow-x-auto">
          <button 
             onClick={() => setIsSidebarOpen(true)}
             className="flex items-center gap-1 hover:border hover:border-white px-1 py-0.5 rounded whitespace-nowrap font-bold"
          >
            <Menu size={20} /> All
          </button>
          <Link href="#" className="hover:border hover:border-white px-1 py-0.5 rounded whitespace-nowrap">Today&apos;s Deals</Link>
          <Link href="#" className="hover:border hover:border-white px-1 py-0.5 rounded whitespace-nowrap">Customer Service</Link>
          <Link href="#" className="hover:border hover:border-white px-1 py-0.5 rounded whitespace-nowrap">Registry</Link>
          <Link href="#" className="hover:border hover:border-white px-1 py-0.5 rounded whitespace-nowrap">Gift Cards</Link>
          <Link href="#" className="hover:border hover:border-white px-1 py-0.5 rounded whitespace-nowrap">Sell</Link>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex">
           {/* Backdrop */}
           <div 
              className="absolute inset-0 bg-black/80 transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
           />
           
           {/* Sidebar Panel */}
           <div className="relative w-[365px] h-full bg-white flex flex-col md:w-[365px] w-[80%] overflow-y-auto animate-in slide-in-from-left duration-300">
              {/* Header */}
              <div className="bg-[var(--amazon-blue-light)] text-white p-4 font-bold text-lg flex items-center gap-3">
                 <User size={24} className="bg-white text-[var(--amazon-blue-light)] rounded-full p-0.5" />
                 Hello, sign in
              </div>
              
              {/* Close Button */}
              <button 
                 onClick={() => setIsSidebarOpen(false)}
                 className="absolute top-2 -right-10 text-white p-2"
              >
                 <X size={32} />
              </button>

              {/* Content */}
              <div className="py-2">
                 <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-lg text-black mb-2">Digital Content & Devices</h3>
                    <ul className="space-y-3 text-sm text-gray-700 font-medium">
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Amazon Music <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Kindle E-readers & Books <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Amazon Appstore <ChevronRight size={16} className="text-gray-500" />
                       </li>
                    </ul>
                 </div>
                 
                 <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-lg text-black mb-2">Shop By Department</h3>
                    <ul className="space-y-3 text-sm text-gray-700 font-medium">
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Electronics <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Computers <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Smart Home <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Arts & Crafts <ChevronRight size={16} className="text-gray-500" />
                       </li>
                    </ul>
                 </div>

                 <div className="px-4 py-3">
                    <h3 className="font-bold text-lg text-black mb-2">Programs & Features</h3>
                     <ul className="space-y-3 text-sm text-gray-700 font-medium">
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Gift Cards <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Shop By Interest <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          Amazon Live <ChevronRight size={16} className="text-gray-500" />
                       </li>
                       <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 -mx-2 rounded">
                          International Shopping <ChevronRight size={16} className="text-gray-500" />
                       </li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
