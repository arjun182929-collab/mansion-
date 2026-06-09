import { FormEvent } from "react";
import { TRANSLATIONS } from "../data";
import { LanguageCode } from "../types";
import { Mail, ShieldAlert, FileText, ChevronRight, MessageSquare } from "lucide-react";

interface FooterProps {
  currentLang: LanguageCode;
  onChangeView: (view: any) => void;
}

export default function Footer({ currentLang, onChangeView }: FooterProps) {
  const t = TRANSLATIONS[currentLang];

  const handleSub = (e: FormEvent) => {
    e.preventDefault();
    alert("Thank you! You are subscribed to Maison Elite's quarterly architectural digest.");
  };

  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-white/10 pt-20 pb-12 mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left mb-16">
        {/* Left Column: Brand Statement */}
        <div className="space-y-6">
          <h3 className="font-headline-lg text-2xl font-bold tracking-tighter text-[#C5A059]">
            {t.brandName}
          </h3>
          <p className="font-body-md text-xs text-stone-400 leading-relaxed max-w-xs">
            A premium vertically-integrated Chinese furniture manufacturer servicing high-end hotel developers, luxury villas, and architectural firms universally.
          </p>
          <div className="flex items-center space-x-3 text-stone-500 font-mono text-[9px]">
            <span>© 2026 MAISON ELITE LTD. ALL RIGHTS RESERVED.</span>
          </div>
        </div>

        {/* Column 2: Architectural Collections Links */}
        <div className="space-y-4">
          <h4 className="font-label-sm text-xs uppercase tracking-widest text-stone-300 font-bold">
            Curated Collections
          </h4>
          <div className="flex flex-col space-y-2 text-xs font-mono text-stone-400">
            {[
              "Living Room Furniture",
              "Bedroom Furniture",
              "Dining Furniture",
              "Hotel Furniture",
              "Villa Furniture",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => onChangeView({ view: "products", categoryFilter: cat })}
                className="text-left hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Corporate Portfolio navigation */}
        <div className="space-y-4">
          <h4 className="font-label-sm text-xs uppercase tracking-widest text-stone-300 font-bold">
            Sourcing & Factory
          </h4>
          <div className="flex flex-col space-y-2 text-xs font-mono text-stone-400">
            <button onClick={() => onChangeView("factory")} className="text-left hover:text-[#C5A059] transition-all">
              20k SQM Facility Tour
            </button>
            <button onClick={() => onChangeView("certifications")} className="text-left hover:text-[#C5A059] transition-all">
              SGS Certifications Vault
            </button>
            <button onClick={() => onChangeView("projects")} className="text-left hover:text-[#C5A059] transition-all">
              Global Project Showcase
            </button>
            <button onClick={() => onChangeView("blog")} className="text-left hover:text-[#C5A059] transition-all">
              SEO Journals & Guides
            </button>
            <button onClick={() => onChangeView("about")} className="text-left hover:text-[#C5A059] transition-all">
              The Maison Elite Team
            </button>
          </div>
        </div>

        {/* Column 4: Sourcing Newsletter */}
        <div className="space-y-4">
          <h4 className="font-label-sm text-xs uppercase tracking-widest text-stone-300 font-bold">
            Architectural Digest
          </h4>
          <p className="font-body-md text-xs text-stone-400 leading-relaxed max-w-xs">
            Subscribe to receive premium custom product catalogs, CAD blocks, and seasonal timber curing reports.
          </p>
          <form onSubmit={handleSub} className="flex border border-white/20 overflow-hidden bg-white/5 rounded-none">
            <input
              type="email"
              required
              placeholder="Your business email..."
              className="bg-transparent text-xs w-full px-4 py-2 outline-none border-none placeholder-stone-500 font-mono"
            />
            <button
              type="submit"
              className="bg-[#C5A059] p-2 hover:bg-white text-white hover:text-[#1A1A1A] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Under footer alignment bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 border-t border-white/15 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-stone-400 gap-4">
        <p>Premium Sourcing Partner for Global Architects • Safe Delivery • Fully SGS Audited</p>
        <div className="flex space-x-4">
          <button onClick={() => onChangeView("certifications")} className="hover:text-[#C5A059]">Sitemap</button>
          <button onClick={() => onChangeView("contact")} className="hover:text-[#C5A059]">Direct Hotline</button>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
