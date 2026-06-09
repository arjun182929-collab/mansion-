import { LanguageCode, CurrencyCode, ViewType, Product } from "../types";
import { TRANSLATIONS } from "../data";
import { Globe, Heart, Layers, MessageSquare, Menu, X, HelpCircle, PhoneCall } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentLang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  currentCurrency: CurrencyCode;
  onChangeCurrency: (currency: CurrencyCode) => void;
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
  quoteCart: Product[];
  compareList: Product[];
  wishlist: Product[];
  onOpenQuoteDrawer: () => void;
}

export default function Navbar({
  currentLang,
  onChangeLang,
  currentCurrency,
  onChangeCurrency,
  currentView,
  onChangeView,
  quoteCart,
  compareList,
  wishlist,
  onOpenQuoteDrawer,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];

  const handleNavLink = (view: ViewType) => {
    onChangeView(view);
    setMobileMenuOpen(false);
  };

  const menuItems: { label: string; view: ViewType }[] = [
    { label: t.products, view: "products" },
    { label: t.projects, view: "projects" },
    { label: t.factory, view: "factory" },
    { label: t.certifications, view: "certifications" },
    { label: t.blog, view: "blog" },
    { label: t.about, view: "about" },
    { label: t.contact, view: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#F9F9F9]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between h-20">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavLink("home")}
          className="font-headline-md text-2xl font-bold tracking-tighter text-[#1A1A1A] cursor-pointer hover:text-[#C5A059] transition-colors"
        >
          {t.brandName}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavLink(item.view)}
              className={`font-label-sm text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                currentView === item.view
                  ? "text-[#C5A059] border-b border-[#C5A059] pb-1"
                  : "text-[#1A1A1A] hover:text-[#C5A059]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Actions Panel */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Multi-language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              className="flex items-center space-x-1 font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#C5A059] transition-colors py-2"
            >
              <Globe className="w-4.5 h-4.5 mr-1" />
              <span>{currentLang}</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#FFFFFF] border border-[#1A1A1A]/15 shadow-sm py-1 z-50">
                <button
                  onClick={() => {
                    onChangeLang("en");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide hover:bg-[#F9F9F9] ${
                    currentLang === "en" ? "text-[#C5A059]" : "text-[#1A1A1A]"
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => {
                    onChangeLang("zh");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide hover:bg-[#F9F9F9] ${
                    currentLang === "zh" ? "text-[#C5A059]" : "text-[#1A1A1A]"
                  }`}
                >
                  简体中文 (ZH)
                </button>
                <button
                  onClick={() => {
                    onChangeLang("fr");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide hover:bg-[#F9F9F9] ${
                    currentLang === "fr" ? "text-[#C5A059]" : "text-[#1A1A1A]"
                  }`}
                >
                  Français (FR)
                </button>
                <button
                  onClick={() => {
                    onChangeLang("it");
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide hover:bg-[#F9F9F9] ${
                    currentLang === "it" ? "text-[#C5A059]" : "text-[#1A1A1A]"
                  }`}
                >
                  Italiano (IT)
                </button>
              </div>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center space-x-1 font-label-sm text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-[#C5A059] transition-all py-2"
            >
              <span className="font-bold">{currentCurrency}</span>
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[#FFFFFF] border border-[#1A1A1A]/15 shadow-sm py-1 z-50">
                <button
                  onClick={() => {
                    onChangeCurrency("USD");
                    setCurrencyDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide hover:bg-[#F9F9F9] ${
                    currentCurrency === "USD" ? "text-[#C5A059]" : "text-[#1A1A1A]"
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => {
                    onChangeCurrency("EUR");
                    setCurrencyDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide hover:bg-[#F9F9F9] ${
                    currentCurrency === "EUR" ? "text-[#C5A059]" : "text-[#1A1A1A]"
                  }`}
                >
                  EUR (€)
                </button>
                <button
                  onClick={() => {
                    onChangeCurrency("CNY");
                    setCurrencyDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium tracking-wide hover:bg-[#F9F9F9] ${
                    currentCurrency === "CNY" ? "text-[#C5A059]" : "text-[#1A1A1A]"
                  }`}
                >
                  CNY (¥)
                </button>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => handleNavLink("wishlist")}
            className="relative p-1 text-[#1A1A1A] hover:text-[#C5A059] transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Product Comparison Tool */}
          <button
            onClick={() => handleNavLink("compare")}
            className="relative p-1 text-[#1A1A1A] hover:text-[#C5A059] transition-colors cursor-pointer"
            title="Compare Products"
          >
            <Layers className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#1A1A1A] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Inquiry Admin Logs */}
          <button
            onClick={() => handleNavLink("inquiry-logs")}
            className="p-1 text-[#1A1A1A] hover:text-[#C5A059] transition-colors cursor-pointer"
            title="Sourcing Logs / Leads CRM"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenQuoteDrawer}
            className="font-label-sm text-xs uppercase tracking-widest bg-[#1A1A1A] text-white px-5 py-2.5 hover:bg-[#C5A059] transition-all duration-300 relative"
          >
            {t.requestQuote}
            {quoteCart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C5A059] text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold border border-white">
                {quoteCart.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu, dropdown action bars, language toggle icon toggles */}
        <div className="flex xl:hidden lg:hidden items-center space-x-4">
          <button
            onClick={() => handleNavLink("wishlist")}
            className="relative text-[#1A1A1A] p-1"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={onOpenQuoteDrawer}
            className="bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5"
          >
            QUOTE ({quoteCart.length})
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#1A1A1A]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#FFFFFF] border-t border-[#1A1A1A]/10 py-6 px-6 space-y-4 absolute left-0 shadow-lg z-50">
          <div className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavLink(item.view)}
                className={`text-left font-label-sm text-sm uppercase tracking-widest py-1 ${
                  currentView === item.view ? "text-[#C5A059] font-medium" : "text-[#1A1A1A]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavLink("compare")}
              className={`text-left font-label-sm text-sm uppercase tracking-widest py-1 ${
                currentView === "compare" ? "text-[#C5A059]" : "text-[#1A1A1A]"
              }`}
            >
              {t.compare} ({compareList.length})
            </button>
            <button
              onClick={() => handleNavLink("inquiry-logs")}
              className={`text-left font-label-sm text-sm uppercase tracking-widest py-1 ${
                currentView === "inquiry-logs" ? "text-[#C5A059]" : "text-[#1A1A1A]"
              }`}
            >
              B2B CRM Leads Tracker
            </button>
          </div>

          <div className="pt-4 border-t border-[#1A1A1A]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase text-stone-500">Language:</span>
              <div className="flex space-x-1">
                {(["en", "zh", "fr", "it"] as LanguageCode[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onChangeLang(lang)}
                    className={`px-2 py-0.5 text-xs font-bold ${
                      currentLang === lang ? "bg-[#C5A059] text-white" : "bg-[#F9F9F9] text-stone-700"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase text-stone-500">Currency:</span>
              <div className="flex space-x-1">
                {(["USD", "EUR", "CNY"] as CurrencyCode[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => onChangeCurrency(cur)}
                    className={`px-2 py-0.5 text-xs font-bold ${
                      currentCurrency === cur ? "bg-[#1A1A1A] text-white" : "bg-[#F9F9F9] text-stone-700"
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
