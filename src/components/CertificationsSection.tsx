import { CERTIFICATIONS_DATA } from "../data";
import { Award, ShieldCheck, FileCheck, CheckCircle2, ChevronRight, Lock } from "lucide-react";

export default function CertificationsSection() {
  const categories = [
    "Quality certificates",
    "Factory audits",
    "Product certifications",
    "Export certificates",
  ];

  return (
    <div className="w-full space-y-16">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
          Compliance & Risk Mitigation
        </span>
        <h1 className="font-display-lg text-4xl md:text-5xl text-[#1A1A1A]">
          SGS & TÜV Certified Global Standards
        </h1>
        <p className="font-body-md text-stone-500 leading-relaxed text-sm">
          Unlike unverified regional traders, Maison Elite submits all factory workshops, wood supplies, and foam assembly padding lines to rigorous audits conducted by international testing bodies.
        </p>
      </div>

      {/* Certifications grid by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {categories.map((cat) => {
          const categoryCerts = CERTIFICATIONS_DATA.filter((c) => c.type === cat);

          return (
            <div key={cat} className="border border-stone-200 p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-headline-md text-xl font-bold uppercase tracking-wide text-[#1A1A1A]">
                  {cat}
                </h3>
                <Award className="w-5 h-5 text-[#C5A059]" />
              </div>

              <div className="space-y-4">
                {categoryCerts.map((cert) => (
                  <div key={cert.id} className="p-4 bg-[#F9F9F9] flex items-start space-x-4 border-l-2 border-[#1A1A1A]">
                    <div className="p-2 bg-white flex items-center justify-center border border-stone-200 shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 text-sm font-label-sm">{cert.title}</h4>
                      <p className="text-xs text-stone-500 font-mono mt-1">
                        Auditor: {cert.issuer} | Released: {cert.year}
                      </p>
                      <div className="flex items-center space-x-1.5 pt-2 text-[9px] font-mono font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 inline" />
                        <span>VERIFIED SECURED REGISTERED</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* SGS / INTERTEK PDF VERIFICATION PANEL */}
      <div className="bg-[#1A1A1A] text-white p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
        <div className="space-y-3 max-w-2xl">
          <span className="text-[#C5A059] font-label-sm text-xs font-bold uppercase tracking-widest block">
            B2B Auditor Vault
          </span>
          <h2 className="font-display-md text-2xl md:text-3xl">Download Certifications & Test Reports</h2>
          <p className="font-body-md text-stone-400 text-xs leading-relaxed">
            Need to present BS-5852/CAL-133 fire safety certificates or factory carbon footprints to your project hotel client? Access our secure cloud locker to download fully notarized PDF files containing raw laboratory readings.
          </p>
        </div>

        <button
          onClick={() => {
            alert("Opening Secure PDF Report Center. Stamped laboratory transcripts will be downloaded automatically...");
          }}
          className="bg-white hover:bg-[#C5A059] text-[#1A1A1A] hover:text-white px-6 py-3.5 text-xs uppercase font-bold tracking-widest transition-all duration-300 flex items-center shadow-lg whitespace-nowrap"
        >
          <Lock className="w-4 h-4 mr-2" />
          Request Secure Access
        </button>
      </div>
    </div>
  );
}
