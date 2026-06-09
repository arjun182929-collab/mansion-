import { useState, useEffect } from "react";
import { ViewType, LanguageCode, CurrencyCode, Product, LeadInquiry } from "./types";
import { PRODUCTS_DATA, TRANSLATIONS, TESTIMONIALS } from "./data";

// Components Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProjectsShowcase from "./components/ProjectsShowcase";
import FactorySection from "./components/FactorySection";
import CertificationsSection from "./components/CertificationsSection";
import BlogSection from "./components/BlogSection";
import CompanyAbout from "./components/CompanyAbout";
import ContactUs from "./components/ContactUs";
import LeadInquiryDrawer from "./components/LeadInquiryDrawer";
import CrmLeadsTracker from "./components/CrmLeadsTracker";
import CompareProducts from "./components/CompareProducts";
import WishlistProducts from "./components/WishlistProducts";

// Icons
import { MapPin, Phone, MessageSquare, ArrowRight, Download, Users, Award, ShieldAlert, Sparkles, Building, Layers } from "lucide-react";

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>("USD");
  const [currentView, setCurrentView] = useState<ViewType>("home");

  // Deep Routing states for selected product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Lead Generation States
  const [quoteCart, setQuoteCart] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [quoteDrawerOpen, setQuoteDrawerOpen] = useState(false);

  // CRM Leads Database Log state (persisted inside session)
  const [inquiriesList, setInquiriesList] = useState<LeadInquiry[]>([]);

  // Exit Intent state
  const [exitPopupOpen, setExitPopupOpen] = useState(false);
  const [mouseLeft, setMouseLeft] = useState(false);

  // Load translations shortcut
  const t = TRANSLATIONS[currentLang];

  // Mock initial leads so CRM is populated beautifully on launch
  useEffect(() => {
    setInquiriesList([
      {
        id: "lead-101",
        fullName: "Alistair Sterling",
        emailAddress: "procurement@sterlingcroft.com",
        whatsappNumber: "+44 7911 123456",
        companyName: "Sterling & Croft Design Firm, London",
        productName: "European Leather Sofa, Palace Fabric Sofa",
        interestType: "Catalog Inquiry Bundle",
        message: "Requesting custom wood framing test guidelines for Monaco casino resort lobby project.",
        dateReceived: "2026-06-08"
      },
      {
        id: "lead-102",
        fullName: "Sophia Martinez",
        emailAddress: "s.martinez@marriottluxury.com",
        whatsappNumber: "+1 212 555 0199",
        companyName: "Marriott Luxury Group Procurement, Americas",
        productName: "Vogue Lounge Armchair",
        interestType: "Corporate B2B Custom Contract",
        message: "Need 45 units with bespoke CAL-133 fire compliant foam cushions.",
        dateReceived: "2026-06-09"
      }
    ]);
  }, []);

  // Exit intent hook trigger
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && !mouseLeft) {
        setExitPopupOpen(true);
        setMouseLeft(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseLeft]);

  // Handle direct view switching
  const handleViewChange = (viewData: any) => {
    if (typeof viewData === "string") {
      setCurrentView(viewData as ViewType);
      setSelectedProduct(null);
      setCategoryFilter("All");
    } else if (viewData && viewData.view) {
      setCurrentView(viewData.view);
      if (viewData.selectedProduct) {
        setSelectedProduct(viewData.selectedProduct);
      } else {
        setSelectedProduct(null);
      }
      if (viewData.categoryFilter) {
        setCategoryFilter(viewData.categoryFilter);
      } else {
        setCategoryFilter("All");
      }
    }
    // Scroll window high
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Inquiry Cart Helpers
  const handleAddToQuote = (product: Product) => {
    if (quoteCart.some((p) => p.id === product.id)) {
      setQuoteCart((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setQuoteCart((prev) => [...prev, product]);
    }
  };

  const handleRemoveFromQuote = (productId: string) => {
    setQuoteCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteCart([]);
  };

  // Comparison Helpers
  const handleToggleCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert("B2B Side-by-side spec comparison is limited to 3 models simultaneously.");
        return;
      }
      setCompareList((prev) => [...prev, product]);
    }
  };

  // Wishlist Helpers
  const handleToggleWishlist = (product: Product) => {
    if (wishlist.some((p) => p.id === product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setWishlist((prev) => [...prev, product]);
    }
  };

  // CRM Log Submission Helper
  const handleAddInquiryLog = (lead: LeadInquiry) => {
    setInquiriesList((prev) => [lead, ...prev]);
  };

  const handleRemoveInquiryLog = (id: string) => {
    setInquiriesList((prev) => prev.filter((lead) => lead.id !== id));
  };

  const handleClearAllInquiries = () => {
    setInquiriesList([]);
  };

  return (
    <div id="maison-elite-root-container" className="min-h-screen bg-[#F9F9F9] text-[#1A1A1A] font-sans pt-20 selection:bg-[#C5A059] selection:text-white">
      {/* Sticky Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        currentCurrency={currentCurrency}
        onChangeCurrency={setCurrentCurrency}
        currentView={currentView}
        onChangeView={handleViewChange}
        quoteCart={quoteCart}
        compareList={compareList}
        wishlist={wishlist}
        onOpenQuoteDrawer={() => setQuoteDrawerOpen(true)}
      />

      {/* Primary Workspace Inner Container */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-20 py-12">
        {currentView === "home" && !selectedProduct && (
          <div className="space-y-24">
            {/* HERO CAROUSEL BANNER SECTION */}
            <section className="relative aspect-[21/9] bg-stone-900 overflow-hidden flex items-center justify-center border border-stone-200">
              <div className="absolute inset-0 bg-black/45 z-10" />
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLtd9yRRw_x9lv0Rb2P3zY9Bm-9RdDCdn47HM-5nWB0qC3s_Cn3-BnXACRoJ1THrF8du5GiicM2qMSe-bYJO3UwDy2gU5mgKjsSMOC-kVVOwas0nru9Xi8zm6wPyVzs5teca5I5axM4Nu95ncUjWyEMz-qesOCn3WEZeU26vSMUipAvm8H_OMKzxPZPiWDJ32R13w3JiEJi2p7V6w1PC-ACmk4srgJPZW6Kx8x6ltKtrXs5cgaJcNblXLDM"
                alt="Elite Palace Interiors"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
              />

              <div className="relative z-20 text-center max-w-4xl px-6 space-y-6 text-white">
                <span className="font-label-sm text-xs md:text-sm uppercase tracking-[0.3em] text-[#C5A059] font-bold block animate-pulse">
                  ESTABLISHED 1989 • FORSHAN CHINA
                </span>
                <h1 className="font-display-lg text-4xl md:text-6xl text-white font-semibold leading-tight tracking-tight">
                  {t.tagline}
                </h1>
                <p className="font-body-md text-stone-200 text-xs md:text-base tracking-wide max-w-2xl mx-auto leading-relaxed">
                  {t.subtagline}
                </p>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => handleViewChange("products")}
                    className="w-full sm:w-auto bg-white hover:bg-[#C5A059] text-[#1A1A1A] hover:text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    {t.viewCollection}
                  </button>
                  <button
                    onClick={() => handleViewChange("contact")}
                    className="w-full sm:w-auto border border-white hover:bg-white hover:text-[#1A1A1A] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    {t.requestQuote}
                  </button>
                </div>
              </div>
            </section>

            {/* B2B HOSPITALITY STATISTICS BAR */}
            <section className="grid grid-cols-2 lg:grid-cols-5 gap-8 border border-stone-200 p-8 md:p-12 bg-white text-left shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-3xl md:text-4xl text-[#1A1A1A] font-bold block">15+</span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold font-sans">
                  {t.yearsExp}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-3xl md:text-4xl text-[#1A1A1A] font-bold block">50+</span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold font-sans">
                  {t.countriesExported}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-3xl md:text-4xl text-[#1A1A1A] font-bold block">500+</span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold font-sans">
                  {t.projectsCompleted}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-3xl md:text-4xl text-[#C5A059] font-bold block">20,000</span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold font-sans">
                  {t.factoryArea}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-3xl md:text-4xl text-[#C5A059] font-bold block">1,800+ HQ</span>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold font-sans">
                  {t.productionCapacity}
                </p>
              </div>
            </section>

            {/* CURATED CATEGORIES SELECTION */}
            <section className="space-y-12">
              <div className="text-left max-w-2xl space-y-2">
                <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">Curated curation</span>
                <h2 className="font-display-lg text-3xl md:text-4xl text-[#1A1A1A]">{t.allCollections}</h2>
                <p className="font-body-md text-stone-500 text-sm">{t.allCollectionsDesc}</p>
              </div>

              {/* Bento Grid layout of major catalog categories with custom count overlays */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {[
                  { name: "Living Room Furniture", desc: "Italian aniline leather sofas & carved wood moldings", bg: "https://lh3.googleusercontent.com/aida/AP1WRLtd9yRRw_x9lv0Rb2P3zY9Bm-9RdDCdn47HM-5nWB0qC3s_Cn3-BnXACRoJ1THrF8du5GiicM2qMSe-bYJO3UwDy2gU5mgKjsSMOC-kVVOwas0nru9Xi8zm6wPyVzs5teca5I5axM4Nu95ncUjWyEMz-qesOCn3WEZeU26vSMUipAvm8H_OMKzxPZPiWDJ32R13w3JiEJi2p7V6w1PC-ACmk4srgJPZW6Kx8x6ltKtrXs5cgaJcNblXLDM", count: 4 },
                  { name: "Bedroom Furniture", desc: "Plush tufted headboards & majestic hotel master suites", bg: "https://lh3.googleusercontent.com/aida/AP1WRLu_lUkkBrTBKDBAnBzpOvWeRJpTch6khQRlSRUnNEWLsGnbp4QRn5Rm6-0t_31l3duZ8F_EZVF469f7BNNK0_MnFX5sPNFDxfwe87e4i1H0c7ZhXnkEmNvvHM9Gtn0JK4ciH0ul24A-VnMmInooYILfZGe1L8D-l3s6e9vE-IKtVPAs5Zn1doluu-uQZNjgUKM0cBBcjEDtAAa5ngb2cbnkz5xj49LfuUSVwFS1FRCE8w7xJFfWvfd7PA", count: 1 },
                  { name: "Dining Furniture", desc: "Bookmatched Carrara marble dining sets with gold rings", bg: "https://lh3.googleusercontent.com/aida/AP1WRLuWnuAXqfqqmQtG2-2atMD2bdh0vS-3NY5gUqo5i2vLo8T6cFESXsTbHHV4_VvLmHuAD5Ps4hLeGj9rr42wNWIDpl51VlCwGt4nK3W-NdnfOjANpaErYGS-yNEYNsLddxGbtld73jUJ21Qyi30LbuJNLVND4lfMTr3s2ULov4D6ylMXEW8VYR3JPPp9QCNgC_28grPT0Sfl9OkKrxaHKsUBtGKWV4uXkwuIGUYxPfU7UOLuCPEHjnDSpa8", count: 1 },
                  { name: "Hotel Furniture", desc: "CAL-133 fire compliant swiveling lobby armchairs", bg: "https://lh3.googleusercontent.com/aida/AP1WRLvQCXPlIQC7xQ4lD5BIwAEkoJ-bTuVwpQgMOMv9bxstnnJ5P4yGdpRJxxHjMTHA_zI8C4044yHVV7NvewLkzKBOuTkNngCDUUjYPo4xbgbFLr867tCw8J2vtpPCL96AK7ojbcjbuDfZhZIBqkLugLDxBxn-ZWicmDyLynsRFPna5qflfkrHb2cavCjpxC_lF8P-2InxkAjGbvTBkwSPzdLe9U4OUPaDCwjJdSr7uE7eJTthtJtoEepwgUM", count: 1 },
                  { name: "Villa Furniture", desc: "Bespoke massive sets with high hem fringe details", bg: "https://lh3.googleusercontent.com/aida/AP1WRLtkRwjyGF6cZIyclVPFM0Dxp0Xt0_Nij6ff4xtzVnnuwGFabNwdtqUu8OQBwze_nLN6symsVpPN-Hg-O5KXtZCzeVQMvABSjSiao9lfEJXPMee4ZnB0-z22qXnCUHhAcx1u6zQAKL7efE_QogqsHF8w8JX42mbVkweUjOt_N93QdVty0tMgkTKTz8xypHwhJRCVGwwVOqQt45eIZHtTPcuBXKrqr_BnXmIiF8-D-hSnmUYRkt0hKDU4pgI", count: 2 },
                  { name: "Custom Furniture", desc: "Full-scale OEM/ODM project custom mold carvings", bg: "https://lh3.googleusercontent.com/aida/AP1WRLT3SyDuQB0fF-DSUNGCy9IAwpPwTou1Cp659a1aIKpP3iF-JxArySrR2jbT0RwPwQVzxpcuJm-CdF54A7-oX9GF8z57pMAjBA6IjOkyKcndEenpbF7ek16_r_Yfe86d3h1Ydk_M31uukFx6h_bCwiSER0zc6nfT9IUEdNVydBx_eugWGgAFjxHd1aqFq0FsBPGRS64s70f0iTRQ1nRQYw64jJLIRJnDA5e2aasZkCl1j73JzyjNapweg8", count: 3 }
                ].map((categ, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleViewChange({ view: "products", categoryFilter: categ.name })}
                    className="group border border-stone-200 p-6 flex flex-col justify-between aspect-square hover:border-[#1A1A1A] transition-all duration-300 relative overflow-hidden cursor-pointer bg-white"
                  >
                    {/* Background image transition */}
                    <div className="absolute inset-0 bg-stone-50 z-0">
                      <img
                        src={categ.bg}
                        alt={categ.name}
                        className="w-full h-full object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-300 scale-[1.01]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <span className="font-mono text-stone-400 text-xs font-bold uppercase z-10">
                      {categ.count} Spec Sets Ready
                    </span>

                    <div className="space-y-2 text-left z-10 pt-24 text-[#1A1A1A]">
                      <h3 className="font-headline-md text-2xl group-hover:text-[#C5A059] transition-colors">
                        {categ.name}
                      </h3>
                      <p className="font-body-md text-stone-500 text-xs leading-relaxed">
                        {categ.desc}
                      </p>
                      <button className="text-xs uppercase tracking-widest font-bold text-stone-800 flex items-center pt-2">
                        <span>Explore Spec Group</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 inline group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* WHY Sourcing DIRECT FROM MAISON ELITE MATTERS */}
            <section className="bg-[#1A1A1A] text-white p-12 md:p-20 text-left space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="font-mono text-xs text-[#C5A059] uppercase tracking-widest font-bold block">
                    {t.theEliteStandard}
                  </span>
                  <h2 className="font-display-lg text-4xl leading-tight">
                    Optimizing Project Margins Safely
                  </h2>
                  <p className="font-body-md text-stone-300 text-sm leading-relaxed">
                    {t.eliteStandardDesc}
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-200 text-sm font-sans">{t.factoryDirect}</h4>
                        <p className="text-xs text-stone-400 font-body-md mt-0.5">{t.factoryDirectDesc}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-200 text-sm font-sans">{t.oemOdm}</h4>
                        <p className="text-xs text-stone-400 font-body-md mt-0.5">{t.oemOdmDesc}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-200 text-sm font-sans">{t.rigorousQc}</h4>
                        <p className="text-xs text-stone-400 font-body-md mt-0.5">{t.rigorousQcDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side factory preview illustration */}
                <div className="aspect-square bg-stone-800 overflow-hidden relative border border-stone-750 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-stone-950/25 z-10" />
                  <img
                    src="https://lh3.googleusercontent.com/aida/AP1WRLT9cTlAeDEeOmyi4pMWjlW9eVjxTI-DjG-qExBZF-7uifMbqDLaLtXhsGNP2pUUTIM0BEpX1OsmSwwn8UL2H-bM_xLGbqre6u9rfsKm6e3isu9WJvDUVmSNF5pAx5VAfBFLo8LxEi7EV080xYUYAC1_slPL1nOYJakfCg28e9L6jZ9LhunBimK4O1zzknf1ZRVi76AqMeaaDQ6LDg0on18GhbR8Py9tg7cvHn43GeszDHkkUWX8RzU4O0Q"
                    alt="Precision HOMAG drill"
                    className="absolute inset-0 w-full h-full object-cover opacity-35 hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="relative z-20 space-y-6">
                    <span className="font-mono text-xs uppercase text-[#C5A059]">B2B SOURCING SECURED</span>
                    <h3 className="font-headline-md text-3xl text-white">FSC Legal Timber & Intertek Audited</h3>
                    <button
                      onClick={() => handleViewChange("factory")}
                      className="text-stone-300 font-bold uppercase tracking-widest text-xs border-b border-[#C5A059] pb-0.5 hover:text-white transition-colors block w-max mx-auto"
                    >
                      Audit Our Facility →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* PARTNERS TESTIMONIALS SLIDER ROW */}
            <section className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
                  CLIENT VOICE
                </span>
                <h2 className="font-display-lg text-3xl md:text-4xl text-[#1A1A1A]">
                  Trusted by Elite Hospitality Partners
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {TESTIMONIALS.map((test) => (
                  <div key={test.id} className="border border-stone-200 p-8 space-y-6 bg-white shadow-xs">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <h4 className="font-bold text-stone-800 text-sm font-label-sm">{test.name}</h4>
                        <p className="text-[9px] text-stone-400 uppercase tracking-widest leading-relaxed">
                          {test.role}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#C5A059]">
                          {test.company}
                        </p>
                      </div>
                      <span className="text-[#C5A059] text-xl font-serif">★★★★★</span>
                    </div>
                    <p className="font-body-md text-xs text-stone-600 italic leading-relaxed">
                      "{test.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CURATED ROUTING PAGES RENDER LOGIC */}
        {currentView === "products" && !selectedProduct && (
          <ProductList
            currentLang={currentLang}
            currentCurrency={currentCurrency}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onToggleCompare={handleToggleCompare}
            compareList={compareList}
            onAddToQuote={handleAddToQuote}
            quoteCart={quoteCart}
            categoryFilter={categoryFilter}
          />
        )}

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            currentLang={currentLang}
            currentCurrency={currentCurrency}
            onBack={() => setSelectedProduct(null)}
            onAddToQuote={handleAddToQuote}
            quoteCart={quoteCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onOpenInquiryForm={(prod) => {
              // Direct inquiry triggers quote cart list drawer setup or direct modal
              setQuoteDrawerOpen(true);
            }}
            onChangeView={(v) => handleViewChange(v)}
          />
        )}

        {currentView === "projects" && (
          <ProjectsShowcase currentLang={currentLang} />
        )}

        {currentView === "factory" && (
          <FactorySection currentLang={currentLang} />
        )}

        {currentView === "certifications" && (
          <CertificationsSection />
        )}

        {currentView === "blog" && (
          <BlogSection currentLang={currentLang} />
        )}

        {currentView === "about" && (
          <CompanyAbout currentLang={currentLang} />
        )}

        {currentView === "contact" && (
          <ContactUs currentLang={currentLang} onAddInquiry={handleAddInquiryLog} />
        )}

        {currentView === "compare" && (
          <CompareProducts
            compareList={compareList}
            currentCurrency={currentCurrency}
            onRemoveFromCompare={handleToggleCompare}
            onAddToQuote={handleAddToQuote}
            quoteCart={quoteCart}
          />
        )}

        {currentView === "wishlist" && (
          <WishlistProducts
            wishlist={wishlist}
            onRemoveFromWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentView("products");
            }}
          />
        )}

        {currentView === "inquiry-logs" && (
          <CrmLeadsTracker
            inquiriesList={inquiriesList}
            onRemoveInquiry={handleRemoveInquiryLog}
            onClearAll={handleClearAllInquiries}
          />
        )}
      </main>

      {/* Floating Sticky Actions Bar & Contact Aids */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Float WhatsApp */}
        <button
          onClick={() => {
            window.open("https://wa.me/8613912345678?text=Hello Maison Elite, I would like to schedule a B2B factory tour and video conference.");
          }}
          className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer relative group"
          title="Direct B2B WhatsApp Live helpdesk"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute right-14 bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Contract WhatsApp
          </span>
        </button>

        {/* Global Catalog Request Sticky */}
        <button
          onClick={() => setExitPopupOpen(true)}
          className="w-12 h-12 bg-[#C5A059] hover:bg-[#1A1A1A] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer relative group"
          title="Download 2026 Architectural Catalog PDF"
        >
          <Download className="w-5 h-5 animate-bounce" />
          <span className="absolute right-14 bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1 font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            2026 Catalog PDF
          </span>
        </button>
      </div>

      {/* Persistent Footer */}
      <Footer currentLang={currentLang} onChangeView={handleViewChange} />

      {/* Multi-item Specification build cart slide side-panel Drawer */}
      <LeadInquiryDrawer
        isOpen={quoteDrawerOpen}
        onClose={() => setQuoteDrawerOpen(false)}
        currentLang={currentLang}
        quoteCart={quoteCart}
        onRemoveFromQuote={(id) => handleRemoveFromQuote(id)}
        onClearQuote={handleClearQuote}
        onAddInquiry={handleAddInquiryLog}
        activeView={currentView}
        onChangeView={handleViewChange}
      />

      {/* EXIT INTENT PROMOTION POPUP / CATALOG DOWNLOAD SYSTEM OVERLAY */}
      {exitPopupOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none max-w-lg w-full p-8 md:p-12 relative border border-stone-200 shadow-2xl text-left space-y-6">
            <button
              onClick={() => setExitPopupOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-[#1A1A1A] text-xs uppercase font-bold p-1 cursor-pointer"
            >
              Close [X]
            </button>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-widest block">
                Exclusive Sourcing Toolkit
              </span>
              <h3 className="font-display-md text-3xl text-[#1A1A1A] leading-tight">
                {t.exitTitle}
              </h3>
              <p className="font-body-md text-stone-500 text-xs leading-relaxed">
                {t.exitSubtitle}
              </p>
            </div>

            <div className="bg-[#F9F9F9] p-4 text-xs font-mono text-stone-600 space-y-1.5 border-l-2 border-[#C5A059]">
              <p>✔ Includes 500+ CAD architectural drawing models (.dwg format)</p>
              <p>✔ SGS/ISO9001 certified chemical safety compliance guidelines</p>
              <p>✔ Detailed wood hemisphere dry-kiln curing parameters tables</p>
            </div>

            <button
              onClick={() => {
                alert("Preparing catalog zip archive package. Complete package download initialized successfully...");
                setExitPopupOpen(false);
              }}
              className="w-full bg-[#1A1A1A] hover:bg-[#C5A059] text-white py-4 uppercase font-label-sm text-xs tracking-widest font-bold transition-all flex items-center justify-center"
            >
              <Download className="w-4.5 h-4.5 mr-2" />
              <span>{t.downloadCatalog}</span>
            </button>

            <button
              onClick={() => setExitPopupOpen(false)}
              className="w-full text-center text-[10px] text-stone-400 hover:text-[#1A1A1A] uppercase tracking-wider font-mono cursor-pointer"
            >
              {t.exitCloseName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple internal icon helpers
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
