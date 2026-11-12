import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const tags = [
    "Game", "iPhone", "TV", "Asus Laptops", "MacBook", "SSD", "Graphics Card",
    "Power Bank", "Smart TV", "Speaker", "Tablet", "Microwave", "Samsung"
  ];

  return (
    <footer className="w-full bg-[#191C1F] text-gray-400 text-sm mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand & Contact */}
        <div className="lg:col-span-1 space-y-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            <div className="w-9 h-9 rounded-full bg-[#FA8232] flex items-center justify-center font-black text-lg text-white">
              C
            </div>
            <span className="tracking-wider uppercase">CLICON</span>
          </Link>
          <div className="text-xs space-y-2 pt-2">
            <p className="text-gray-500 uppercase font-semibold">Customer Support:</p>
            <p className="text-white font-medium text-base">(629) 555-0129</p>
            <p className="text-gray-400">4517 Washington Ave. Manchester, Kentucky 39495</p>
            <p className="text-white font-medium">info@clicon.com</p>
          </div>
        </div>

        {/* Col 2: Top Category */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold uppercase text-xs tracking-wider">Top Category</h4>
          <ul className="space-y-2 text-xs">
            {["Computer & Laptop", "Smartphone", "Headphone", "Accessories", "Camera & Photo", "TV & Homes"].map((item) => (
              <li key={item} className="hover:text-white cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold uppercase text-xs tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            {["Shop Product", "Shopping Cart", "Wishlist", "Compare", "Track Order", "Customer Help", "About Us"].map((item) => (
              <li key={item} className="hover:text-white cursor-pointer transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Download App */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold uppercase text-xs tracking-wider">Download App</h4>
          <div className="space-y-2 pt-1">
            <div className="bg-[#24292E] p-3 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-800 border border-gray-700/60 transition-colors">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Get it now</p>
                <p className="text-xs font-semibold text-white">Google Play</p>
              </div>
            </div>
            <div className="bg-[#24292E] p-3 rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-800 border border-gray-700/60 transition-colors">
              <span className="text-2xl">🍏</span>
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Get it now</p>
                <p className="text-xs font-semibold text-white">App Store</p>
              </div>
            </div>
          </div>
        </div>

        {/* Col 5: Popular Tags */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold uppercase text-xs tracking-wider">Popular Tags</h4>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 bg-[#24292E] hover:bg-[#FA8232] hover:text-white rounded border border-gray-700 cursor-pointer transition-colors text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        Kinbo eCommerce Template © 2021. Design by Templatecookie — Built with React & Tailwind CSS.
      </div>
    </footer>
  );
}
