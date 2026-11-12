import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import {
  ChevronRight,
  Search,
  ChevronDown,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowLeft,
  ArrowRight,
  X
} from "lucide-react";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState("popular");
  const [activeCategory, setActiveCategory] = useState("Electronics Devices");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default popular
    });
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#F2F4F5] pb-20">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#E4E7E9]/40 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/" className="hover:text-gray-900 transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Shop Grid</span>
          <ChevronRight size={14} />
          <span className="text-[#2DA5F3] font-semibold">{activeCategory}</span>
        </div>
      </div>

      {/* 2. Top Info & Instruction Banner */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-xl shadow-sm border border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#FA8232] text-white uppercase tracking-wider mb-1">
              useParams o'rganish loyihasi
            </div>
            <h1 className="text-xl md:text-2xl font-bold">CLICON Elektronika Do'koni</h1>
            <p className="text-xs md:text-sm text-blue-200 mt-1">
              Istalgan mahsulot ustiga bosing — URL manzili <code className="bg-blue-950/80 px-2 py-0.5 rounded text-amber-300 font-mono text-xs">/product/:id</code> ga o'zgaradi va <code className="bg-blue-950/80 px-2 py-0.5 rounded text-amber-300 font-mono text-xs">useParams()</code> orqali o'qiladi.
            </p>
          </div>
          <span className="text-3xl hidden md:block">🛍️</span>
        </div>
      </div>

      {/* 3. Controls & Filter Bar (Matching Figma) */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
          {/* Search inside Shop */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for anything..."
              className="w-full bg-[#F2F4F5] text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-none focus:ring-1 focus:ring-[#FA8232]"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-[#FA8232] cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Active Filters:</span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-700 font-medium shadow-xs">
              {activeCategory}
              <X size={13} className="cursor-pointer hover:text-red-500" />
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-700 font-medium shadow-xs">
              5 Star Rating
              <X size={13} className="cursor-pointer hover:text-red-500" />
            </span>
          </div>

          <div>
            <span className="font-bold text-gray-900">{filteredProducts.length}</span> Results found.
          </div>
        </div>
      </div>

      {/* 4. Product Grid (Matching Figma 4-columns) */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg border border-gray-200 hover:border-[#FA8232] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
            >
              {/* Product Badge */}
              {product.badge && (
                <div
                  className={`absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm ${
                    product.badge.includes("OFF")
                      ? "bg-[#EFD33D] text-gray-900"
                      : product.badge === "HOT"
                      ? "bg-red-500 text-white"
                      : "bg-[#2DB224] text-white"
                  }`}
                >
                  {product.badge}
                </div>
              )}

              {/* Product Image Area */}
              <div className="relative h-56 bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    title="Wishlistga qo'shish"
                    className="w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-[#FA8232] hover:text-white flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Heart size={18} />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    title="useParams bilan ko'rish"
                    className="w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-[#FA8232] hover:text-white flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Eye size={18} />
                  </Link>
                  <button
                    title="Savatga qo'shish"
                    className="w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-[#FA8232] hover:text-white flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>

              {/* Product Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1.5 text-xs mb-1.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                          className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-[11px]">({product.reviewsCount.toLocaleString()})</span>
                  </div>

                  {/* Product Title (Links to /product/:id) */}
                  <Link
                    to={`/product/${product.id}`}
                    className="text-xs font-semibold text-gray-800 hover:text-[#2DA5F3] line-clamp-2 leading-relaxed transition-colors"
                  >
                    {product.title}
                  </Link>
                </div>

                {/* Price section */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-[#2DA5F3]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* useParams Pill Trigger */}
                  <Link
                    to={`/product/${product.id}`}
                    className="text-[11px] font-semibold text-[#FA8232] hover:underline flex items-center gap-0.5"
                  >
                    Batafsil →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Pagination (Matching Figma) */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
            <ArrowLeft size={16} />
          </button>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-10 h-10 rounded-full font-semibold text-xs flex items-center justify-center transition-all ${
                currentPage === num
                  ? "bg-[#FA8232] text-white shadow-md shadow-orange-500/20"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {num < 10 ? `0${num}` : num}
            </button>
          ))}
          <button className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
