import { useState } from "react";
import { Product, LanguageCode, CurrencyCode } from "../types";
import { PRODUCTS_DATA, TRANSLATIONS, CURRENCY_RATES, CURRENCY_SYMBOLS } from "../data";
import { Search, Heart, Layers, Eye, Sliders, Check, ChevronLeft, ChevronRight, ShoppingCart, HelpCircle } from "lucide-react";

interface ProductListProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onToggleCompare: (product: Product) => void;
  compareList: Product[];
  onAddToQuote: (product: Product) => void;
  quoteCart: Product[];
  categoryFilter?: string;
}

export default function ProductList({
  currentLang,
  currentCurrency,
  onSelectProduct,
  onToggleWishlist,
  wishlist,
  onToggleCompare,
  compareList,
  onAddToQuote,
  quoteCart,
  categoryFilter = "All",
}: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFilter === "All" ? "All" : categoryFilter
  );

  // Filters State
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceGroup, setPriceGroup] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const t = TRANSLATIONS[currentLang];
  const rate = CURRENCY_RATES[currentCurrency];
  const symbol = CURRENCY_SYMBOLS[currentCurrency];

  const categories = [
    "All",
    "Living Room Furniture",
    "Bedroom Furniture",
    "Dining Furniture",
    "Hotel Furniture",
    "Apartment Furniture",
    "Villa Furniture",
    "Office Furniture",
    "Restaurant Furniture",
    "Commercial Furniture",
    "Custom Furniture",
  ];

  const materials = ["Leather", "Solid Wood", "Velvet", "Marble", "Gold Metal", "Boucle"];
  const styles = ["European", "French", "Modern", "Minimalist", "Baroque"];

  // Toggle filter lists
  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
    setCurrentPage(1);
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
    setCurrentPage(1);
  };

  const formatPrice = (usdPrice: number) => {
    const calculated = Math.round(usdPrice * rate);
    return `${symbol}${calculated.toLocaleString()}`;
  };

  // Filter logic
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    // 1. Category filter
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }
    // 2. Search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const inName = product.name.toLowerCase().includes(lowerQuery);
      const inSubtitle = product.subtitle.toLowerCase().includes(lowerQuery);
      const inMaterial = product.materials.some((m) => m.toLowerCase().includes(lowerQuery));
      if (!inName && !inSubtitle && !inMaterial) return false;
    }
    // 3. Materials checklist
    if (selectedMaterials.length > 0) {
      const hasMatch = product.materials.some((pm) =>
        selectedMaterials.some((sm) => pm.toLowerCase().includes(sm.toLowerCase()))
      );
      if (!hasMatch) return false;
    }
    // 4. Styles checklist
    if (selectedStyles.length > 0) {
      const hasMatch = selectedStyles.some(
        (ss) =>
          product.name.toLowerCase().includes(ss.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(ss.toLowerCase()) ||
          product.description.toLowerCase().includes(ss.toLowerCase())
      );
      if (!hasMatch) return false;
    }
    // 5. Price group level
    if (priceGroup !== "All") {
      const price = product.priceApprox;
      if (priceGroup === "Under3000" && price >= 3000) return false;
      if (priceGroup === "3000to5000" && (price < 3000 || price > 5000)) return false;
      if (priceGroup === "Over5000" && price <= 5000) return false;
    }
    return true;
  });

  // Simple Pagination implementation
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      {/* Category Horizontal Bar Scroll */}
      <div className="border-b border-[#1A1A1A]/10 pb-4 mb-8 overflow-x-auto scrollbar-none flex items-center space-x-6 md:space-x-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`whitespace-nowrap font-label-sm text-xs uppercase tracking-widest pb-2 cursor-pointer transition-colors ${
              selectedCategory === cat
                ? "text-[#C5A059] border-b-2 border-[#C5A059] font-semibold"
                : "text-stone-500 hover:text-[#1A1A1A]"
            }`}
          >
            {cat === "All" ? t.allProducts : cat}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-headline-lg text-4xl text-[#1A1A1A] mb-3">
            {selectedCategory === "All" ? t.allProducts : selectedCategory}
          </h1>
          <p className="font-body-md text-sm text-stone-500">
            {t.showResultCount.replace("{count}", filteredProducts.length.toString())}
          </p>
        </div>

        {/* Detailed Search input bottom-bordered */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent border-b border-[#1A1A1A]/20 focus:border-[#C5A059] focus:ring-0 pb-2 text-sm text-[#1A1A1A] placeholder-stone-400 outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-1 bottom-3" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side Architectural Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          {/* Materials Filter Checklist */}
          <div>
            <h3 className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] mb-4 border-b border-[#1A1A1A]/10 pb-2 font-bold flex items-center justify-between">
              <span>{t.material}</span>
              <Sliders className="w-3.5 h-3.5 text-stone-400" />
            </h3>
            <div className="space-y-2.5">
              {materials.map((mat) => {
                const checked = selectedMaterials.includes(mat);
                return (
                  <label
                    key={mat}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleMaterialToggle(mat)}
                      className="w-4 h-4 rounded-none border-stone-300 text-[#1A1A1A] focus:ring-[#1A1A1A]/50 cursor-pointer"
                    />
                    <span
                      className={`text-sm tracking-wide transition-colors ${
                        checked ? "text-[#1A1A1A] font-medium" : "text-stone-500 group-hover:text-[#1A1A1A]"
                      }`}
                    >
                      {mat}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Styles Checklist */}
          <div>
            <h3 className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] mb-4 border-b border-[#1A1A1A]/10 pb-2 font-bold">
              {t.style}
            </h3>
            <div className="space-y-2.5">
              {styles.map((style) => {
                const checked = selectedStyles.includes(style);
                return (
                  <label
                    key={style}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleStyleToggle(style)}
                      className="w-4 h-4 rounded-none border-stone-300 text-[#1A1A1A] focus:ring-[#1A1A1A]/50 cursor-pointer"
                    />
                    <span
                      className={`text-sm tracking-wide transition-colors ${
                        checked ? "text-[#1A1A1A] font-medium" : "text-stone-500 group-hover:text-[#1A1A1A]"
                      }`}
                    >
                      {style}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range selection */}
          <div>
            <h3 className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] mb-4 border-b border-[#1A1A1A]/10 pb-2 font-bold">
              {t.priceRange}
            </h3>
            <div className="space-y-3">
              {[
                { label: "All Designs", value: "All" },
                { label: `Under ${formatPrice(3000)}`, value: "Under3000" },
                { label: `${formatPrice(3000)} - ${formatPrice(5000)}`, value: "3000to5000" },
                { label: `Over ${formatPrice(5000)}`, value: "Over5000" },
              ].map((group) => (
                <label
                  key={group.value}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="priceGroup"
                    checked={priceGroup === group.value}
                    onChange={() => {
                      setPriceGroup(group.value);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded-full border-stone-300 text-[#1A1A1A] focus:ring-[#1A1A1A]/50 cursor-pointer"
                  />
                  <span
                    className={`text-sm tracking-wide transition-colors ${
                      priceGroup === group.value
                        ? "text-[#1A1A1A] font-medium"
                        : "text-stone-500 group-hover:text-[#1A1A1A]"
                    }`}
                  >
                    {group.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sourcing Guide Notice Box for architecture buyers */}
          <div className="bg-[#1A1A1A] text-white p-6 rounded-none space-y-4">
            <h4 className="font-headline-md text-lg text-[#C5A059]">B2B Direct Advantage</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              We specialize in fulfilling bespoke hotel & villa projects directly from our ISO-certified facilities in China. No middleman premiums. Custom CAD blocks supplied.
            </p>
            <button className="text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
              Read Sourcing Guide →
            </button>
          </div>
        </aside>

        {/* Right Side Products Grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="border border-dashed border-[#1A1A1A]/20 p-16 text-center space-y-4">
              <h3 className="font-headline-md text-2xl text-[#1A1A1A]">No matches found</h3>
              <p className="font-body-md text-stone-500 max-w-md mx-auto">
                No high-end furniture models pass the current filters. Please adjust materials, query, or check another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSelectedMaterials([]);
                  setSelectedStyles([]);
                  setPriceGroup("All");
                }}
                className="font-label-sm text-xs uppercase bg-[#1A1A1A] text-white px-6 py-3 tracking-widest hover:bg-[#C5A059] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {paginatedProducts.map((product) => {
                  const inWishlist = wishlist.some((p) => p.id === product.id);
                  const inCompare = compareList.some((p) => p.id === product.id);
                  const inCart = quoteCart.some((p) => p.id === product.id);

                  return (
                    <div key={product.id} className="group relative">
                      {/* Product Card Image Container with Absolute Accents */}
                      <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 flex items-center justify-center pt-4">
                        {/* Tag details */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="font-label-sm text-[9px] uppercase tracking-widest bg-white text-[#1A1A1A] px-2.5 py-1 font-bold border border-[#1A1A1A]/10">
                            RUISEN CUSTOM
                          </span>
                        </div>

                        {/* Quick Interactive Icon Group (Wishlist/Compare) */}
                        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => onToggleWishlist(product)}
                            className={`p-2 rounded-full cursor-pointer shadow-md border transition-all ${
                              inWishlist
                                ? "bg-red-50 border-red-200 text-red-500"
                                : "bg-white border-stone-200 hover:border-[#1A1A1A] text-stone-600"
                            }`}
                            title="Save to Wishlist"
                          >
                            <Heart className="w-4.5 h-4.5" fill={inWishlist ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={() => onToggleCompare(product)}
                            className={`p-2 rounded-full cursor-pointer shadow-md border transition-all ${
                              inCompare
                                ? "bg-amber-50 border-amber-200 text-[#C5A059]"
                                : "bg-white border-stone-200 hover:border-[#1A1A1A] text-stone-600"
                            }`}
                            title="Compare specs"
                          >
                            <Layers className="w-4.5 h-4.5" />
                          </button>
                        </div>

                        {/* Image element with premium transitions */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />

                        {/* Quick View Button (Slide-up effect) */}
                        <div className="absolute inset-x-0 bottom-0 bg-[#1A1A1A]/80 backdrop-blur-xs py-4 flex justify-around items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="text-white text-xs font-bold uppercase tracking-widest flex items-center hover:text-[#C5A059] transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1.5" />
                            {t.quickView}
                          </button>
                          <div className="w-[1px] h-4 bg-white/20"></div>
                          <button
                            onClick={() => onAddToQuote(product)}
                            className="text-white text-xs font-bold uppercase tracking-widest flex items-center hover:text-[#C5A059] transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1.5" />
                            {inCart ? t.addedToQuote : t.addToQuote}
                          </button>
                        </div>
                      </div>

                      {/* Product Card Details */}
                      <div className="mt-6 space-y-2 text-left">
                        <div className="flex justify-between items-start">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="text-left group/title focus:outline-none"
                          >
                            <h3 className="font-headline-md text-2xl text-[#1A1A1A] group-hover/title:text-[#C5A059] transition-colors">
                              {product.name}
                            </h3>
                          </button>
                          <span className="font-mono text-stone-400 text-xs py-0.5">
                            Approx. {formatPrice(product.priceApprox)}
                          </span>
                        </div>
                        <p className="font-body-md text-xs text-stone-500 leading-relaxed uppercase tracking-wide">
                          {product.subtitle}
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] border-b-2 border-[#C5A059] pb-0.5 hover:text-[#C5A059] transition-colors"
                          >
                            {t.inquireForPricing}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sophisticated Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 pt-8 border-t border-[#1A1A1A]/10 flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center border border-stone-200 hover:border-[#1A1A1A] disabled:opacity-30 disabled:border-stone-200 text-stone-700 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className={`w-10 h-10 flex items-center justify-center transition-all ${
                        currentPage === pg
                          ? "bg-[#1A1A1A] text-white font-mono"
                          : "border border-stone-200 hover:border-[#1A1A1A] text-stone-700"
                      }`}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center border border-stone-200 hover:border-[#1A1A1A] disabled:opacity-30 disabled:border-stone-200 text-stone-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* QUICK VIEW POPUP/MODAL OVERLAY */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-none max-w-4xl w-full relative grid grid-cols-1 md:grid-cols-2 shadow-2xl h-auto md:max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-[#1A1A1A] hover:text-[#C5A059] z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Quick View Left Column Upholstery Shot */}
            <div className="bg-stone-100 flex items-center justify-center p-8 aspect-square md:aspect-auto">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-h-[50vh] object-contain"
              />
            </div>

            {/* Quick View Right Column Details */}
            <div className="p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-label-sm text-[10px] tracking-widest text-[#C5A059] uppercase font-bold">
                  {quickViewProduct.category}
                </span>
                <h2 className="font-headline-lg text-3xl text-[#1A1A1A] leading-tight">
                  {quickViewProduct.name}
                </h2>
                <h3 className="font-body-md text-xs text-stone-500 uppercase tracking-wide">
                  {quickViewProduct.subtitle}
                </h3>
                <div className="h-[1px] bg-stone-100"></div>

                <p className="text-sm text-stone-600 leading-relaxed font-body-md text-left">
                  {quickViewProduct.description}
                </p>

                {/* Micro Product Specifications */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-widest">
                      Dimensions (WxDxH)
                    </span>
                    <span className="text-xs text-[#1A1A1A] font-medium">{quickViewProduct.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-widest">
                      Minimum order (MOQ)
                    </span>
                    <span className="text-xs text-[#1A1A1A] font-medium">{quickViewProduct.moq}</span>
                  </div>
                </div>
              </div>

              {/* Direct Call actions */}
              <div className="space-y-3 pt-6">
                <button
                  onClick={() => {
                    onSelectProduct(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full font-label-sm text-xs bg-[#1A1A1A] text-white py-3.5 hover:bg-[#C5A059] transition-all duration-300 uppercase tracking-widest font-bold"
                >
                  View Full Architectural Spec sheet
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onAddToQuote(quickViewProduct);
                    }}
                    className="border border-stone-200 hover:border-[#1A1A1A] text-xs uppercase p-3 transition-colors tracking-wider text-[#1A1A1A]"
                  >
                    {quoteCart.some((p) => p.id === quickViewProduct.id)
                      ? "In Inquiry"
                      : "Add to Request"}
                  </button>
                  <button
                    onClick={() => onToggleWishlist(quickViewProduct)}
                    className="border border-stone-200 hover:border-red-500 hover:bg-red-50 text-xs uppercase p-3 transition-colors tracking-wider text-stone-700"
                  >
                    {wishlist.some((p) => p.id === quickViewProduct.id) ? "Saved" : "Save List"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Minimalist X Icon
function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
