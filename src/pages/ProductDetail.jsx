import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import {
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Repeat,
  Share2,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Code
} from "lucide-react";

export default function ProductDetail() {
  // 🎯 1. useParams hooki orqali URL'dagi :id ni olamiz:
  const { id } = useParams();

  // 🎯 2. Olingan id bo'yicha mahsulotlar ro'yxatidan keraklisini topamiz:
  const product = products.find((item) => String(item.id) === String(id));

  // State'lar (rasm, rang, xotira, soni, tablar)
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Har safar URL'dagi id o'zgarganda sahifa tepaga chiqishi va boshlang'ich rasmni yangilash
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedImage(0);
    setSelectedColor(0);
    setSelectedStorage(0);
    setQuantity(1);
  }, [id]);

  // Agar mahsulot topilmasa:
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          ✕
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mahsulot topilmadi!</h2>
        <p className="text-gray-500 text-sm max-w-md mb-6">
          URL'da berilgan <code className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono">id: "{id}"</code> bo'yicha hech qanday mahsulot mavjud emas.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#FA8232] text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-[#DE7328] transition-colors"
        >
          <ArrowLeft size={16} /> Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  // Related products (hozirgi mahsulotdan tashqari boshqalar)
  const relatedProducts = products.filter((p) => String(p.id) !== String(id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F2F4F5] pb-24">
      {/* 1. Breadcrumbs */}
      <div className="bg-[#E4E7E9]/40 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center flex-wrap gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/" className="hover:text-gray-900 transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <Link to="/" className="hover:text-gray-900 transition-colors">Shop Grid</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-[#2DA5F3] font-semibold truncate max-w-xs">{product.shortTitle || product.title}</span>
        </div>
      </div>

      {/* 2. useParams Educational Banner (Aynan useParams qanday ishlaganini ko'rsatish) */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold">
              <Code size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">useParams() Natijasi:</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono text-xs font-bold">
                  id = "{id}"
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                React Router <code className="text-amber-300 font-mono">/product/:id</code> yo'nalishidan <b>id = "{id}"</b> qiymatini oldi va shu mahsulot ma'lumotlarini yukladi.
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap"
          >
            ← Barcha mahsulotlar
          </Link>
        </div>
      </div>

      {/* 3. Product Hero Section (Figma Dizayni bo'yicha 2 ustunli) */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Chap ustun: Rasm va Galereya */}
          <div className="flex flex-col gap-4">
            {/* Katta rasm */}
            <div className="relative h-[380px] md:h-[460px] bg-gray-50 rounded-xl border border-gray-200 p-6 flex items-center justify-center overflow-hidden">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#EFD33D] text-gray-900 font-bold text-xs uppercase px-2.5 py-1 rounded shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail karusel / rasmlar qatori */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 p-1.5 bg-gray-50 flex-shrink-0 flex items-center justify-center transition-all ${
                    selectedImage === index
                      ? "border-[#FA8232] shadow-md shadow-orange-500/20"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* O'ng ustun: Mahsulot ma'lumotlari & Sotib olish formasi */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Reyting & Sharhlar soni */}
              <div className="flex items-center gap-2 text-xs mb-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-800">{product.rating} Star Rating</span>
                <span className="text-gray-400">({product.reviewsCount.toLocaleString()} User Feedback)</span>
              </div>

              {/* Sarlavha */}
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-snug">
                {product.title}
              </h1>

              {/* Meta ma'lumotlar to'ri */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-500 my-4 py-3 border-y border-gray-100">
                <div>
                  Sku: <span className="text-gray-900 font-semibold">{product.sku}</span>
                </div>
                <div>
                  Brand: <span className="text-gray-900 font-semibold">{product.brand}</span>
                </div>
                <div>
                  Availability:{" "}
                  <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
                    <Check size={14} /> {product.inStock ? "In Stock" : "Out of stock"}
                  </span>
                </div>
                <div>
                  Category: <span className="text-gray-900 font-semibold">{product.category}</span>
                </div>
              </div>

              {/* Narx qismi */}
              <div className="flex items-center gap-3 my-4">
                <span className="text-3xl font-extrabold text-[#2DA5F3]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.discount && (
                  <span className="bg-[#EFD33D] text-gray-900 text-xs font-bold px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Rang tanlash (Color Swatches) */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Color: <span className="text-gray-900 normal-case">{product.colors[selectedColor]?.name}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-7 h-7 rounded-full border border-gray-300 transition-all ${
                          selectedColor === idx ? "ring-2 ring-offset-2 ring-[#FA8232] scale-110" : "hover:opacity-80"
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Xotira / Variant tanlash */}
              {product.storages && product.storages.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Size / Storage:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.storages.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedStorage(idx)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded border transition-all ${
                          selectedStorage === idx
                            ? "border-[#FA8232] text-[#FA8232] bg-orange-50/50 font-bold"
                            : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Soni va Sotib olish tugmalari */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Quantity counter */}
                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-l transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold text-gray-800">{quantity < 10 ? `0${quantity}` : quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="p-2.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-r transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* ADD TO CART - Asosiy to'q sariq tugma */}
                <button className="flex-1 min-w-[180px] bg-[#FA8232] hover:bg-[#DE7328] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-md shadow-md flex items-center justify-center gap-2 transition-all">
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>

                {/* BUY NOW - Kontur tugma */}
                <button className="bg-white border-2 border-[#FA8232] text-[#FA8232] hover:bg-orange-50 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-md transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Wishlist, Compare, Share */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:text-[#FA8232] transition-colors">
                    <Heart size={16} /> <span>Add to Wishlist</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[#FA8232] transition-colors">
                    <Repeat size={16} /> <span>Add to Compare</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Share product:</span>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Share2 size={16} className="cursor-pointer hover:text-[#FA8232]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 100% Guarantee Safe Checkout */}
            <div className="mt-6 bg-[#F2F4F5] p-3.5 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 mb-2">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>100% Guarantee Safe Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-white px-2 py-1 rounded border border-gray-200 font-bold text-blue-800">VISA</span>
                <span className="bg-white px-2 py-1 rounded border border-gray-200 font-bold text-red-600">MasterCard</span>
                <span className="bg-white px-2 py-1 rounded border border-gray-200 font-bold text-blue-500">PayPal</span>
                <span className="bg-white px-2 py-1 rounded border border-gray-200 font-bold text-black">Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Description & Specs Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-gray-200 text-xs font-bold uppercase tracking-wider">
            {[
              { id: "description", label: "Description" },
              { id: "features", label: "Feature Highlights" },
              { id: "shipping", label: "Shipping & Return" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-[#FA8232] text-[#FA8232] bg-orange-50/20"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="p-6 md:p-8 text-sm text-gray-600 leading-relaxed">
            {activeTab === "description" && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Tavsif</h3>
                <p className="mb-4">{product.description}</p>
                <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-lg text-blue-900 text-xs">
                  ℹ️ Bu ma'lumotlar aynan <code className="font-mono font-bold">useParams()</code> orqali olingan <b>id: {product.id}</b> bo'yicha dinamik tarzda ko'rsatilmoqda.
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Asosiy xususiyatlar</h3>
                <ul className="space-y-2">
                  {product.features?.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "shipping" && (
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Yetkazib berish va qaytarish</h3>
                <p className="text-xs text-gray-600">
                  O'zbekiston bo'ylab 24 soat ichida yetkazib beriladi. Mahsulotni 14 kun ichida almashtirish yoki qaytarish kafolati mavjud.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Related Products (useParams o'zgarishini sinab ko'rish uchun ajoyib qism!) */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Boshqa mahsulotlar (useParams'ni sinab ko'ring)</h2>
          <Link to="/" className="text-xs font-semibold text-[#FA8232] hover:underline">
            Hammasini ko'rish →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((rel) => (
            <Link
              key={rel.id}
              to={`/product/${rel.id}`}
              className="group bg-white rounded-lg border border-gray-200 hover:border-[#FA8232] hover:shadow-lg transition-all p-4 flex flex-col justify-between"
            >
              <div className="h-40 bg-gray-50 rounded p-2 flex items-center justify-center overflow-hidden mb-3">
                <img
                  src={rel.images[0]}
                  alt={rel.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                  <Star size={12} fill="currentColor" />
                  <span className="text-gray-700 font-semibold">{rel.rating}</span>
                </div>
                <h4 className="text-xs font-semibold text-gray-800 group-hover:text-[#2DA5F3] line-clamp-2 transition-colors">
                  {rel.title}
                </h4>
                <div className="mt-2 text-sm font-bold text-[#2DA5F3]">
                  ${rel.price}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
