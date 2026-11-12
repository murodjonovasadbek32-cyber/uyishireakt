import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  PhoneCall,
  ChevronDown,
  Layers,
  Repeat,
  Headphones,
  Info
} from "lucide-react";

export default function Header({ cartCount = 2, wishlistCount = 0 }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="w-full bg-[#1B6392] text-white">
      {/* 1. Top Utility Bar */}
      <div className="border-b border-white/10 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-200">
          <div>
            <span>Welcome to Clicon online eCommerce store.</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer flex items-center gap-1">
                Eng <ChevronDown size={14} />
              </span>
              <span className="hover:text-white cursor-pointer flex items-center gap-1">
                USD <ChevronDown size={14} />
              </span>
            </div>
            <div className="h-3 w-px bg-white/20"></div>
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer">Track Order</span>
              <span className="hover:text-white cursor-pointer">Compare</span>
              <span className="hover:text-white cursor-pointer">Customer Support</span>
              <span className="hover:text-white cursor-pointer">Need Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="py-5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white hover:opacity-95 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-[#FA8232] flex items-center justify-center font-black text-xl shadow-md">
              C
            </div>
            <span className="tracking-wider uppercase">CLICON</span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden sm:block">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for anything..."
              className="w-full bg-white text-gray-800 placeholder-gray-400 pl-4 pr-12 py-3 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#FA8232] shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[#FA8232] transition-colors"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Icons: Wishlist, Cart, User */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <div className="relative cursor-pointer hover:text-[#FA8232] transition-colors">
              <Heart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#FA8232] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Shopping Cart */}
            <div className="relative flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <ShoppingCart size={24} className="group-hover:text-[#FA8232] transition-colors" />
                <span className="absolute -top-1.5 -right-2 bg-[#FA8232] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <div className="hidden lg:block text-left text-xs">
                <span className="block text-slate-300 text-[10px] uppercase">Shopping cart</span>
                <span className="font-semibold text-sm text-white group-hover:text-[#FA8232] transition-colors">$1,699.00</span>
              </div>
            </div>

            {/* User */}
            <div className="cursor-pointer hover:text-[#FA8232] transition-colors">
              <User size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sub Navigation Bar */}
      <div className="bg-white text-gray-700 border-b border-gray-200 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6">
            {/* All Category Dropdown Button */}
            <button className="flex items-center gap-2 bg-[#F2F4F5] hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded transition-colors text-xs uppercase tracking-wide">
              <Layers size={16} className="text-[#1B6392]" />
              <span>All Category</span>
              <ChevronDown size={14} className="ml-2 text-gray-500" />
            </button>

            <Link to="/" className="hover:text-[#1B6392] font-medium transition-colors">Shop</Link>
            <span className="hover:text-[#1B6392] cursor-pointer flex items-center gap-1 transition-colors">
              <Repeat size={14} /> Compare
            </span>
            <span className="hover:text-[#1B6392] cursor-pointer flex items-center gap-1 transition-colors">
              <Headphones size={14} /> Customer Support
            </span>
            <span className="hover:text-[#1B6392] cursor-pointer flex items-center gap-1 transition-colors">
              <Info size={14} /> Need Help
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
            <PhoneCall size={18} className="text-[#FA8232]" />
            <span>+1 202 555 0104</span>
          </div>
        </div>
      </div>
    </header>
  );
}
