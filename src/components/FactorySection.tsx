import { useState } from "react";
import { FACTORY_DEPARTMENTS, TRANSLATIONS, BEFORE_AFTER_SHOWCASE } from "../data";
import { LanguageCode } from "../types";
import { Hammer, ShieldCheck, HelpCircle, Eye, Settings, Box, Database, Sparkles, Sliders } from "lucide-react";

interface FactorySectionProps {
  currentLang: LanguageCode;
}

export default function FactorySection({ currentLang }: FactorySectionProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<"video" | "gallery">("video");
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const t = TRANSLATIONS[currentLang];

  const machineryShowcase = [
    {
      name: "HOMAG 5-Axis Wood CNC Router",
      origin: "Germany",
      purpose: "Precision panel routing and joinery cutouts up to 0.01mm tolerance",
      benefits: "Guarantees 100% modular alignment of all hotel furniture frames"
    },
    {
      name: "Heesemann Calibrated Belt Sanding Line",
      origin: "Germany",
      purpose: "Multi-stage automated surface calibrating & micro-polishing",
      benefits: "Prepares premium solid oak & mahogany surfaces for flawless gilding"
    },
    {
      name: "ORMA Multi-Press Veneering System",
      origin: "Italy",
      purpose: "High-pressure thermal adhesive veneer overlaying and bonding",
      benefits: "Delivers completely smooth book-matched luxury marble grain veneers"
    },
    {
      name: "Computerized Smart Kiln-Drying Chambers",
      origin: "Sweden",
      purpose: "Calibrated thermo-hygrometric raw log drying and moisture balancing",
      benefits: "Maintains moisture content below 8-10% to prevent splits globally"
    }
  ];

  return (
    <div className="w-full space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
          Industrial Craftsmanship & Sourcing
        </span>
        <h1 className="font-display-lg text-4xl md:text-5xl text-[#1A1A1A]">
          Where Modern Physics Meets Generations of Woodcraft
        </h1>
        <p className="font-body-md text-stone-500 leading-relaxed text-sm">
          Maison Elite operates a state-of-the-art 20,000 SQM vertically integrated manufacturing facility in China, utilizing German precision CNC hardware complemented by generational hand-chiseling ateliers.
        </p>
      </div>

      {/* Video / Gallery Media Tabs section */}
      <div className="border border-stone-200">
        <div className="flex border-b border-stone-200 bg-[#F9F9F9]">
          <button
            onClick={() => setActiveMediaTab("video")}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-r border-[#1A1A1A]/10 cursor-pointer ${
              activeMediaTab === "video" ? "bg-white text-[#C5A059]" : "text-stone-500"
            }`}
          >
            Factory Aerial Video Tour
          </button>
          <button
            onClick={() => setActiveMediaTab("gallery")}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-r border-[#1A1A1A]/10 cursor-pointer ${
              activeMediaTab === "gallery" ? "bg-white text-[#C5A059]" : "text-stone-500"
            }`}
          >
            Digital Workshop Walkthrough
          </button>
        </div>

        <div className="p-4 bg-stone-100 flex items-center justify-center">
          {activeMediaTab === "video" ? (
            <div className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden bg-stone-900 group">
              {!isPlayingVideo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 z-10 bg-black/45">
                  <div className="font-sans text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                    Maison Elite Manufacturing Docu
                  </div>
                  <h3 className="font-headline-lg text-xl md:text-3xl text-white">
                    Inside Our 20,000 SQM Production Grounds
                  </h3>
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="w-14 h-14 rounded-full bg-[#C5A059] hover:bg-white text-white hover:text-[#1A1A1A] transition-all flex items-center justify-center shadow-lg group-hover:scale-105"
                  >
                    ▶
                  </button>
                  <p className="text-[10px] text-stone-300 font-mono">
                    Runtime: 4:15 | Filmed in Ultrawide 4K spec
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-stone-900 flex flex-col items-center justify-center space-y-4 text-white">
                  <span className="animate-spin text-[#C5A059] text-xl">⏳</span>
                  <p className="text-xs uppercase tracking-widest font-mono">
                    Broadcasting live secured feed from mainland workshops ...
                  </p>
                  <button
                    onClick={() => setIsPlayingVideo(false)}
                    className="text-stone-400 hover:text-white uppercase text-xs tracking-wider border border-stone-600 px-4 py-2"
                  >
                    Pause Stream
                  </button>
                  {/* Decorative Video Screen simulation */}
                  <div className="w-full h-full absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300 via-stone-900 to-black"></div>
                </div>
              )}
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLtd9yRRw_x9lv0Rb2P3zY9Bm-9RdDCdn47HM-5nWB0qC3s_Cn3-BnXACRoJ1THrF8du5GiicM2qMSe-bYJO3UwDy2gU5mgKjsSMOC-kVVOwas0nru9Xi8zm6wPyVzs5teca5I5axM4Nu95ncUjWyEMz-qesOCn3WEZeU26vSMUipAvm8H_OMKzxPZPiWDJ32R13w3JiEJi2p7V6w1PC-ACmk4srgJPZW6Kx8x6ltKtrXs5cgaJcNblXLDM"
                alt="Factory grounds"
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-1000"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full aspect-[16/9] max-h-[500px]">
              {[
                { title: "Precision Milwork", img: "https://lh3.googleusercontent.com/aida/AP1WRLT9cTlAeDEeOmyi4pMWjlW9eVjxTI-DjG-qExBZF-7uifMbqDLaLtXhsGNP2pUUTIM0BEpX1OsmSwwn8UL2H-bM_xLGbqre6u9rfsKm6e3isu9WJvDUVmSNF5pAx5VAfBFLo8LxEi7EV080xYUYAC1_slPL1nOYJakfCg28e9L6jZ9LhunBimK4O1zzknf1ZRVi76AqMeaaDQ6LDg0on18GhbR8Py9tg7cvHn43GeszDHkkUWX8RzU4O0Q" },
                { title: "Manual Carving Room", img: "https://lh3.googleusercontent.com/aida/AP1WRLtd9yRRw_x9lv0Rb2P3zY9Bm-9RdDCdn47HM-5nWB0qC3s_Cn3-BnXACRoJ1THrF8du5GiicM2qMSe-bYJO3UwDy2gU5mgKjsSMOC-kVVOwas0nru9Xi8zm6wPyVzs5teca5I5axM4Nu95ncUjWyEMz-qesOCn3WEZeU26vSMUipAvm8H_OMKzxPZPiWDJ32R13w3JiEJi2p7V6w1PC-ACmk4srgJPZW6Kx8x6ltKtrXs5cgaJcNblXLDM" },
                { title: "Upholstery Line", img: "https://lh3.googleusercontent.com/aida/AP1WRLT9cTlAeDEeOmyi4pMWjlW9eVjxTI-DjG-qExBZF-7uifMbqDLaLtXhsGNP2pUUTIM0BEpX1OsmSwwn8UL2H-bM_xLGbqre6u9rfsKm6e3isu9WJvDUVmSNF5pAx5VAfBFLo8LxEi7EV080xYUYAC1_slPL1nOYJakfCg28e9L6jZ9LhunBimK4O1zzknf1ZRVi76AqMeaaDQ6LDg0on18GhbR8Py9tg7cvHn43GeszDHkkUWX8RzU4O0Q" },
                { title: "QC Testing Lab", img: "https://lh3.googleusercontent.com/aida/AP1WRLtd9yRRw_x9lv0Rb2P3zY9Bm-9RdDCdn47HM-5nWB0qC3s_Cn3-BnXACRoJ1THrF8du5GiicM2qMSe-bYJO3UwDy2gU5mgKjsSMOC-kVVOwas0nru9Xi8zm6wPyVzs5teca5I5axM4Nu95ncUjWyEMz-qesOCn3WEZeU26vSMUipAvm8H_OMKzxPZPiWDJ32R13w3JiEJi2p7V6w1PC-ACmk4srgJPZW6Kx8x6ltKtrXs5cgaJcNblXLDM" }
              ].map((gall, i) => (
                <div key={i} className="relative group overflow-hidden border border-stone-200 bg-white">
                  <img
                    src={gall.img}
                    alt={gall.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#1A1A1A]/80 backdrop-blur-xs py-2 text-center text-white text-[10px] uppercase tracking-wider font-bold">
                    {gall.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CORE WORKSHOP DEPARTMENTS LISTING */}
      <div className="space-y-12">
        <h2 className="font-headline-lg text-3xl text-[#1A1A1A] text-left">
          Inside Our Speciality Manufacturing Ateliers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {FACTORY_DEPARTMENTS.map((dept, idx) => (
            <div key={idx} className="border border-stone-200 p-6 flex flex-col md:flex-row gap-6 hover:border-[#1A1A1A] transition-all">
              <div className="w-full md:w-1/3 aspect-square bg-stone-100 overflow-hidden shrink-0">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-headline-md text-xl text-[#1A1A1A] font-semibold">{dept.name}</h3>
                <p className="font-body-md text-xs text-stone-500 leading-relaxed">
                  {dept.description}
                </p>
                <div className="space-y-1 pt-2 font-mono text-[10px] text-stone-700">
                  <span className="font-bold text-[#C5A059] block uppercase tracking-wider mb-1">DEPARTMENT SEGMENTS</span>
                  {dept.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <span className="w-1 h-1 bg-[#C5A059] inline-block" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIRECT MACHINERY IMPORT SHOWCASE */}
      <div className="bg-[#1A1A1A] text-white p-12 text-left space-y-10">
        <div className="space-y-2">
          <span className="text-[#C5A059] font-label-sm text-xs font-bold uppercase tracking-widest block">
            Imported Hardware Arsenal
          </span>
          <h2 className="font-headline-lg text-3xl">German & Italian Digital Machinery Integration</h2>
          <p className="font-body-md text-stone-400 text-sm max-w-2xl leading-relaxed">
            By investing over $6 Million USD in computer-numeric machinery direct from Europe, we eliminate the structural inconsistencies associated with cheap regional mills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {machineryShowcase.map((mach, idx) => (
            <div key={idx} className="border border-white/10 p-6 space-y-4 hover:border-[#C5A059] transition-all">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="font-bold font-sans text-stone-200 text-sm">{mach.name}</h4>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono font-bold text-stone-300">
                  {mach.origin}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-stone-400 leading-relaxed font-body-md">{mach.purpose}</p>
                <div className="text-stone-300 font-mono text-[10px] bg-white/5 p-2 rounded-none">
                  <span className="text-[#C5A059] font-bold block uppercase tracking-wide">Hospitality Benefit:</span>
                  {mach.benefits}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BEFORE / AFTER VISUAL ARCHITECT SHOWCASE */}
      <div className="border border-stone-200 p-8 text-left space-y-8">
        <div className="space-y-2">
          <span className="text-[#C5A059] font-label-sm text-xs font-bold uppercase tracking-widest block">
            Design execution
          </span>
          <h2 className="font-headline-lg text-3xl">{BEFORE_AFTER_SHOWCASE.title}</h2>
          <p className="font-body-md text-stone-500 text-sm leading-relaxed">
            {BEFORE_AFTER_SHOWCASE.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Before Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-widest text-[#1A1A1A]">
                {BEFORE_AFTER_SHOWCASE.items[0].beforeLabel}
              </span>
              <span className="font-mono text-xs text-[#C5A059] font-bold uppercase">
                {BEFORE_AFTER_SHOWCASE.items[0].project}
              </span>
            </div>
            <div className="aspect-[16/10] bg-stone-100 overflow-hidden border relative flex items-center justify-center p-4">
              <img
                src={BEFORE_AFTER_SHOWCASE.items[0].beforeImage}
                alt="Before"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-stone-900/5 hover:bg-transparent transition-colors" />
            </div>
          </div>

          {/* After Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                {BEFORE_AFTER_SHOWCASE.items[0].afterLabel}
              </span>
              <span className="font-mono text-xs text-stone-500 uppercase">
                Fully Manufactured
              </span>
            </div>
            <div className="aspect-[16/10] bg-stone-100 overflow-hidden border">
              <img
                src={BEFORE_AFTER_SHOWCASE.items[0].afterImage}
                alt="After"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
