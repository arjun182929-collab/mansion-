import { useState, MouseEvent } from "react";
import { Product, LanguageCode, CurrencyCode } from "../types";
import { TRANSLATIONS, PRODUCTS_DATA, TESTIMONIALS, FAQS_DATA } from "../data";
import { Download, FileText, Heart, Check, Trash, Eye, Phone, ChevronRight, CornerDownRight, MessageSquare, ArrowLeft } from "lucide-react";

interface ProductDetailProps {
  product: Product;
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  onBack: () => void;
  onAddToQuote: (product: Product) => void;
  quoteCart: Product[];
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onOpenInquiryForm: (productName: string) => void;
  onChangeView: (view: any) => void;
}

export default function ProductDetail({
  product,
  currentLang,
  currentCurrency,
  onBack,
  onAddToQuote,
  quoteCart,
  onToggleWishlist,
  wishlist,
  onOpenInquiryForm,
  onChangeView,
}: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "materials" | "faq" | "reviews">("desc");
  const [activeImage, setActiveImage] = useState(product.image);
  const [isZoomOn, setIsZoomOn] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  const t = TRANSLATIONS[currentLang];
  const inCart = quoteCart.some((p) => p.id === product.id);
  const inWishlist = wishlist.some((p) => p.id === product.id);

  // Zoom magnifier effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${activeImage})`,
    });
  };

  const handleDownloadCatalog = () => {
    // Generate simulated high-end catalog triggers
    alert(`Downloading premium architectural specification sheet and CAD DWG block for "${product.name}" in PDF format...`);
  };

  // Filter 3 related products matching same category roughly
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.id === "prod-3")
  ).slice(0, 3);

  return (
    <div className="w-full space-y-16">
      {/* Back button to Product Center */}
      <div className="flex justify-between items-center pb-4 border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-stone-500 hover:text-[#1A1A1A] transition-colors font-label-sm text-xs uppercase tracking-widest cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collections</span>
        </button>
        <span className="text-xs text-stone-400 font-mono">
          Model Ref: ME-{product.id.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left COLUMN: Breathtaking Image Galleries & Zoom Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Display Image with actual Zoom-in Hover capability */}
          <div
            className="relative overflow-hidden aspect-square bg-[#F9F9F9] border border-stone-100 flex items-center justify-center cursor-crosshair group"
            onMouseEnter={() => setIsZoomOn(true)}
            onMouseLeave={() => setIsZoomOn(false)}
            onMouseMove={handleMouseMove}
          >
            {isZoomOn ? (
              <div
                className="absolute inset-0 bg-no-repeat bg-[length:200%] z-10 pointer-events-none"
                style={zoomStyle}
              />
            ) : null}

            <img
              src={activeImage}
              alt={product.name}
              className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-500"
            />

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 border border-stone-200 pointer-events-none">
              Hover image to enlarge detail
            </div>
          </div>

          {/* Multiple Angle Image Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`aspect-square bg-stone-50 border flex items-center justify-center p-2 relative overflow-hidden group ${
                  activeImage === product.image ? "border-[#C5A059]" : "border-stone-200 hover:border-[#1A1A1A]"
                }`}
              >
                <img
                  src={product.image}
                  alt="Angle primary"
                  className="max-h-full max-w-full object-contain"
                />
              </button>
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square bg-stone-50 border flex items-center justify-center p-2 relative overflow-hidden group ${
                    activeImage === img ? "border-[#C5A059]" : "border-stone-200 hover:border-[#1A1A1A]"
                  }`}
                >
                  <img src={img} alt={`Angle ${index + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right COLUMN: Luxury Pricing, Specific Details & Inquiry Form Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                {product.category}
              </span>
              <h1 className="font-display-lg text-4xl text-[#1A1A1A] leading-tight">
                {product.name}
              </h1>
              <p className="font-body-md text-xs text-stone-500 uppercase tracking-widest font-medium">
                {product.subtitle}
              </p>
            </div>

            <div className="h-[1px] bg-stone-200"></div>

            {/* Elite Manufacturing Metadata Highlights */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm text-stone-700">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-widest">
                    Materials Used
                  </span>
                  <span className="font-mono text-xs">{product.materials.slice(0, 2).join(" & ")}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-widest">
                    Dimensions
                  </span>
                  <span className="font-mono text-xs">{product.dimensions}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-widest">
                    Production Lead Time
                  </span>
                  <span className="font-mono text-xs">{product.productionTime}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-widest">
                    Minimum order (MOQ)
                  </span>
                  <span className="font-mono text-xs">{product.moq}</span>
                </div>
              </div>

              {/* Upholstery Colors Swatches display */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-widest">
                  Available Leather / Velvet Finishes
                </span>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 border border-stone-200 px-2.5 py-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-600 inline-block" />
                      <span className="text-[10px] font-mono capitalize">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-stone-200"></div>

            {/* Customization Note */}
            <div className="bg-[#F9F9F9] p-4 font-body-md text-xs text-stone-600 leading-relaxed border-l-2 border-[#C5A059]">
              <span className="font-bold block uppercase tracking-wider text-[#1A1A1A] mb-1">
                Custom Architectural Tailoring:
              </span>
              Can customize frame metrics, sizing dimensions, foam densities (fire safety standard BS-5852 / CAL-133 options), or accept Client's Own Fabric (COM).
            </div>
          </div>

          {/* Action triggers */}
          <div className="space-y-4 pt-8">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onAddToQuote(product)}
                className={`w-full py-4 uppercase font-label-sm text-xs tracking-widest font-bold transition-all ${
                  inCart
                    ? "bg-[#C5A059] text-white"
                    : "bg-[#1A1A1A] text-white hover:bg-[#C5A059]"
                }`}
              >
                {inCart ? "In Sourcing list" : "Add to Quote Draft"}
              </button>
              <button
                onClick={() => onOpenInquiryForm(product.name)}
                className="w-full border border-[#1A1A1A] text-[#1A1A1A] py-4 uppercase font-label-sm text-xs tracking-widest font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
              >
                Inquire For Pricing
              </button>
            </div>

            {/* Supplementary B2B Actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleDownloadCatalog}
                className="border border-stone-200 p-3 hover:border-[#1A1A1A] transition-colors flex flex-col items-center justify-center space-y-1 cursor-pointer"
                title="Download tech PDF manual"
              >
                <FileText className="w-4 h-4 text-stone-500" />
                <span className="text-[8px] uppercase tracking-wider font-bold">Tech Sheets</span>
              </button>

              <button
                onClick={() => {
                  const num = "8613912345678"; // standard high end mock number
                  window.open(`https://wa.me/${num}?text=Hello Maison Elite, I would like to inquire about the ${product.name} (Ref: ${product.id}) with custom dimensions.`);
                }}
                className="border border-stone-200 p-3 hover:border-green-500 transition-colors flex flex-col items-center justify-center space-y-1 cursor-pointer"
                title="WhatsApp Inquiry"
              >
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-[8px] uppercase tracking-wider font-bold">WhatsApp Call</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`border p-3 transition-colors flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                  inWishlist
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-stone-200 hover:border-[#1A1A1A] text-stone-700"
                }`}
              >
                <Heart className="w-4 h-4" fill={inWishlist ? "currentColor" : "none"} />
                <span className="text-[8px] uppercase tracking-wider font-bold">
                  {inWishlist ? "Saved" : "Save Design"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SEGMENT: Multi-tab Panel detailing specs, materials, FAQ, and Reviews */}
      <div className="bg-white border border-stone-200">
        {/* Tab Headers */}
        <div className="flex border-b border-stone-200 overflow-x-auto scrollbar-none bg-[#F9F9F9]">
          <button
            onClick={() => setActiveTab("desc")}
            className={`px-8 py-5 text-xs font-label-sm uppercase tracking-widest font-bold whitespace-nowrap border-r border-stone-200 transition-colors ${
              activeTab === "desc" ? "bg-white text-[#C5A059]" : "text-stone-500 hover:bg-white"
            }`}
          >
            {t.description}
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-8 py-5 text-xs font-label-sm uppercase tracking-widest font-bold whitespace-nowrap border-r border-stone-200 transition-colors ${
              activeTab === "specs" ? "bg-white text-[#C5A059]" : "text-stone-500 hover:bg-white"
            }`}
          >
            {t.specifications}
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-8 py-5 text-xs font-label-sm uppercase tracking-widest font-bold whitespace-nowrap border-r border-stone-200 transition-colors ${
              activeTab === "materials" ? "bg-white text-[#C5A059]" : "text-stone-500 hover:bg-white"
            }`}
          >
            {t.materialsUsed}
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-8 py-5 text-xs font-label-sm uppercase tracking-widest font-bold whitespace-nowrap border-r border-stone-200 transition-colors ${
              activeTab === "faq" ? "bg-white text-[#C5A059]" : "text-stone-500 hover:bg-white"
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-8 py-5 text-xs font-label-sm uppercase tracking-widest font-bold whitespace-nowrap border-r border-stone-200 transition-colors ${
              activeTab === "reviews" ? "bg-white text-[#C5A059]" : "text-stone-500 hover:bg-white"
            }`}
          >
            {t.reviews}
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="p-8 md:p-12 text-left text-sm text-stone-700 leading-relaxed space-y-6">
          {activeTab === "desc" && (
            <div className="space-y-6">
              <h4 className="font-headline-md text-2xl text-[#1A1A1A]">{product.name} Heritage Concept</h4>
              <p className="font-body-md text-base text-stone-600 leading-relaxed">
                {product.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h5 className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] font-bold">
                    {t.packagingDetails}
                  </h5>
                  <p className="font-body-md text-xs text-stone-500">{product.packagingDetails}</p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] font-bold">
                    {t.shippingInfo}
                  </h5>
                  <p className="font-body-md text-xs text-stone-500">{product.shippingInfo}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-6">
              <h4 className="font-headline-md text-2xl text-[#1A1A1A]">Project Configuration Data</h4>
              <table className="w-full border-collapse border border-stone-200 text-xs">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="border-b border-stone-200 hover:bg-[#F9F9F9]">
                      <td className="p-4 font-bold bg-[#F9F9F9] w-1/3 border-r border-stone-200 uppercase tracking-widest text-stone-500 text-[10px]">
                        {key}
                      </td>
                      <td className="p-4 text-stone-700 font-mono">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "materials" && (
            <div className="space-y-6">
              <h4 className="font-headline-md text-2xl text-[#1A1A1A]">Handpicked Materials</h4>
              <p className="font-body-md text-stone-600">
                We maintain full traceability for all raw resources to ensure they align with luxury requirements:
              </p>
              <ul className="space-y-2 text-xs font-mono">
                {product.materials.map((m, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-6">
              <h4 className="font-headline-md text-2xl text-[#1A1A1A]">Frequently Asked Questions</h4>
              <div className="space-y-6">
                {FAQS_DATA.map((faq, idx) => (
                  <div key={idx} className="space-y-2 border-b border-stone-100 pb-4">
                    <h5 className="font-bold text-[#1A1A1A] text-sm font-label-sm">{faq.q}</h5>
                    <p className="font-body-md text-xs text-stone-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              <h4 className="font-headline-md text-2xl text-[#1A1A1A]">Hospitality Partner Feedback</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {TESTIMONIALS.map((test) => (
                  <div key={test.id} className="border border-stone-200 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-stone-800 text-sm font-label-sm">{test.name}</h5>
                        <p className="text-[10px] text-stone-500 uppercase tracking-wider">{test.role}</p>
                        <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                          {test.company}
                        </p>
                      </div>
                      <span className="text-[#C5A059] font-serif text-lg font-bold">★★★★★</span>
                    </div>
                    <p className="font-body-md text-xs text-stone-600 italic leading-relaxed">
                      "{test.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED DESIGNS RECOMMENDATION BLOCK */}
      <div className="space-y-8">
        <h3 className="font-headline-md text-3xl text-left text-[#1A1A1A] mb-8">
          {t.relatedProducts}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((rel) => (
            <div key={rel.id} className="group border border-stone-200 p-4 hover:border-[#1A1A1A] transition-all cursor-pointer">
              <div className="aspect-square bg-stone-50 flex items-center justify-center overflow-hidden mb-4 relative">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="font-headline-md text-xl text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors">{rel.name}</h4>
                <p className="font-body-md text-[10px] text-stone-500 uppercase tracking-widest">{rel.subtitle}</p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      // Switch to the related product detail view
                      onChangeView({ view: "products", selectedProduct: rel });
                    }}
                    className="text-xs font-bold uppercase tracking-widest text-stone-800 hover:text-[#C5A059] transition-colors border-b border-[#C5A059] pb-0.5"
                  >
                    Explore Model →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
