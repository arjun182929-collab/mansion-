import { TRANSLATIONS } from "../data";
import { LanguageCode } from "../types";
import { Shield, Sparkles, Sprout, TrendingUp, Users } from "lucide-react";

interface CompanyAboutProps {
  currentLang: LanguageCode;
}

export default function CompanyAbout({ currentLang }: CompanyAboutProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="w-full space-y-20">
      {/* Intro Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
          Heritage and Vision
        </span>
        <h1 className="font-display-lg text-4xl md:text-5xl text-[#1A1A1A]">
          The Maison Elite Story
        </h1>
        <p className="font-body-md text-stone-500 leading-relaxed text-sm">
          Tracing forty years of generational carving secrets layered over robotic precision engineering lines in China to satisfy global hospitality developers and architects.
        </p>
      </section>

      {/* Narrative grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
        <div className="space-y-6">
          <h2 className="font-headline-lg text-3xl text-[#1A1A1A]">
            A Generation of Absolute Devotion to Woodcraft
          </h2>
          <p className="font-body-md text-stone-605 text-sm leading-relaxed">
            Founded during the early boom of premium timber milling, Maison Elite grew from a specialized carving studio into a sprawling 20,000 sqm high-precision industrial grounds. Our mission is to produce furniture details that make hotel guests catch their breath, while executing custom contract solutions with absolute precision.
          </p>
          <blockquote className="border-l-4 border-[#C5A059] pl-6 italic font-serif text-stone-500 text-sm">
            "We do not build furniture items simply to fill space. We weave noble raw materials with historic geometry to establish a legacy that lasts for half a century."
            <span className="block font-sans text-[10px] uppercase tracking-widest font-bold text-stone-700 not-italic mt-2">
              — Zhou Zhaoju, Founder & Master Sculptor
            </span>
          </blockquote>
        </div>

        <div className="aspect-[4/3] bg-stone-100 border border-stone-200 overflow-hidden relative">
          <img
            src="https://lh3.googleusercontent.com/aida/AP1WRLtd9yRRw_x9lv0Rb2P3zY9Bm-9RdDCdn47HM-5nWB0qC3s_Cn3-BnXACRoJ1THrF8du5GiicM2qMSe-bYJO3UwDy2gU5mgKjsSMOC-kVVOwas0nru9Xi8zm6wPyVzs5teca5I5axM4Nu95ncUjWyEMz-qesOCn3WEZeU26vSMUipAvm8H_OMKzxPZPiWDJ32R13w3JiEJi2p7V6w1PC-ACmk4srgJPZW6Kx8x6ltKtrXs5cgaJcNblXLDM"
            alt="Hand-sanding timber"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* CORE CAPABILITIES HIGHLIGHTS */}
      <section className="bg-[#1A1A1A] text-white p-12 text-left space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A059] font-label-sm text-xs font-bold uppercase tracking-widest block">
            Why We Are Selected
          </span>
          <h3 className="font-display-md text-3xl">Pillars of Manufacturing Nobility</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-sans font-bold text-lg">Absolute Risk Mitigation</h4>
            <p className="font-body-md text-stone-400 text-xs leading-relaxed">
              We manage all certifications (ISO 9001, FSC, Intertek fire tests), raw logging compliance records, export licenses, and container shipping insurance so your developers feel secure.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-sans font-bold text-lg">Extreme Customization Capacity</h4>
            <p className="font-body-md text-stone-400 text-xs leading-relaxed">
              Our 12-person architectural CAD desk turns raw sketches or complex DWG blueprints into production-ready physical prototypes under 48 hours. Let us handle your custom models.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#C5A059]" />
            </div>
            <h4 className="font-sans font-bold text-lg">Generational Master Artisans</h4>
            <p className="font-body-md text-stone-400 text-xs leading-relaxed">
              Over 45 sculptors inside our carving ateliers spent decades practicing non-destructive hand tools to sculpt mahogany logs. We keep traditional high-end craftsmanship alive.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP GRID */}
      <section className="space-y-12 text-left">
        <h2 className="font-headline-lg text-3xl text-[#1A1A1A]">Maison Elite Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Zhou Zhaoju",
              role: "Founder & Chairman",
              bio: "Crafted royal furniture assemblies since 1989. Master of Mahogany sculpting parameters.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
            },
            {
              name: "Richard Vance",
              role: "Head Architect & Contract Liaison",
              bio: "20+ years coordinating bespoke hotel spaces with global luxury design houses.",
              image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
            },
            {
              name: "Guo Hong",
              role: "Director of Timber Engineering",
              bio: "Oversees vacuum curing dry kilns calibration. Certified global timber sourcing master.",
              image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
            }
          ].map((leader, i) => (
            <div key={i} className="border border-stone-200 p-5 space-y-4">
              <div className="aspect-[4/5] bg-stone-100 overflow-hidden relative">
                <img referrerPolicy="no-referrer" src={leader.image} alt={leader.name} className="w-full h-full object-cover grayscale" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold font-sans text-stone-800 text-base">{leader.name}</h4>
                <p className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">{leader.role}</p>
                <p className="font-body-md text-xs text-stone-500 leading-relaxed pt-2">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
