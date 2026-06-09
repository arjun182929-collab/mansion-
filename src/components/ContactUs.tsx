import { useState, FormEvent, ChangeEvent } from "react";
import { TRANSLATIONS } from "../data";
import { LanguageCode } from "../types";
import { Mail, Phone, MapPin, CheckCircle, Send, MessageSquare } from "lucide-react";

interface ContactUsProps {
  currentLang: LanguageCode;
  onAddInquiry: (inquiry: any) => void;
}

export default function ContactUs({ currentLang, onAddInquiry }: ContactUsProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    whatsappNumber: "",
    companyName: "",
    message: "",
  });

  const t = TRANSLATIONS[currentLang];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.emailAddress) {
      alert("Please enter at least your Name and Business Email address.");
      return;
    }

    // Capture the Lead in the main list state for CRM Leads Logs Tracker
    onAddInquiry({
      id: `lead-${Date.now()}`,
      ...formData,
      productName: "Direct Corporate Factory Inquiry",
      interestType: "Corporate B2B Custom Contract",
      dateReceived: new Date().toLocaleDateString(),
    });

    setFormSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full space-y-16">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-label-sm text-xs uppercase tracking-widest text-[#C5A059] font-bold block">
          Connect with Maison Elite
        </span>
        <h1 className="font-display-lg text-4xl md:text-5xl text-[#1A1A1A]">
          Begin Your Customized Sourcing Protocol
        </h1>
        <p className="font-body-md text-stone-500 leading-relaxed text-sm">
          Whether you require a single high-resolution custom CAD mockup template or a full 100-container bedroom set for a hotel resort project, our senior agents coordinate flawless manufacturing timelines.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Left Column: Direct Factory channels & Map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <h3 className="font-headline-md text-2xl text-[#1A1A1A]">Maison Elite Global Headquarters</h3>

            <div className="space-y-4 text-sm font-mono text-stone-700">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1A1A1A] block uppercase text-[10px] tracking-widest mb-1">
                    FACTORY GROUND ADDRESS
                  </span>
                  <span>No. 88 Longhua Luxury Furniture Manufacturing Zone, Shunde District, Foshan City, Guangdong Province, China</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1A1A1A] block uppercase text-[10px] tracking-widest mb-1">
                    B2B GLOBAL SALES ENVELOPE
                  </span>
                  <a href="mailto:contract@maisonelitefurniture.com" className="hover:text-[#C5A059] transition-colors">
                    contract@maisonelitefurniture.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1A1A1A] block uppercase text-[10px] tracking-widest mb-1 font-sans">
                    WHATSAPP DIRECT HOTLINE
                  </span>
                  <span>+86 139 1234 5678 (24hr Architectural Support)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick interactive Channel widget */}
          <div className="bg-[#1A1A1A] text-white p-6 rounded-none space-y-4">
            <h4 className="font-headline-md text-lg text-[#C5A059]">Instant Workspace Chat</h4>
            <p className="text-xs text-stone-300 leading-relaxed font-body-md">
              Need to ask about wood moisture content or request custom leather samples directly on WhatsApp? Press down below to chat instantly.
            </p>
            <button
              onClick={() => {
                window.open("https://wa.me/8613912345678?text=Hello Maison Elite, I would like to schedule a B2B factory tour and video conference.");
              }}
              className="bg-[#C5A059] hover:bg-white text-white hover:text-[#1A1A1A] px-5 py-2.5 text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center space-x-2 w-full"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect On WhatsApp</span>
            </button>
          </div>

          {/* Premium Vector simulated Interactive Map */}
          <div className="border border-stone-200 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#1A1A1A]">FOSHAN MANUFACTURING ZONE CENTRAL</span>
              <span className="text-stone-400 font-mono">22.8427° N, 113.1251° E</span>
            </div>
            {/* Elegant vector/minimal map illustration block */}
            <div className="w-full aspect-[16/9] bg-[#F2EFE9] relative flex items-center justify-center overflow-hidden border">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px]"></div>
              {/* Minimal lines representing roads */}
              <div className="absolute w-[200%] h-0.5 bg-stone-300 rotate-12 top-1/4"></div>
              <div className="absolute w-[200%] h-0.5 bg-stone-300 -rotate-45 top-1/2"></div>
              <div className="absolute w-0.5 h-[200%] bg-stone-300 left-1/3"></div>

              {/* Pin indicator */}
              <div className="absolute bg-[#1A1A1A] text-white p-2 rounded-none flex items-center space-x-2 shadow-lg animate-bounce z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                <span className="font-mono text-[9px] font-bold">MAISON ELITE HQ Usine</span>
              </div>
              <span className="absolute bottom-2 right-2 text-[8px] font-mono text-stone-400 uppercase">
                Vector Rendered Map
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Inquiry Entry Form channels */}
        <div className="lg:col-span-7">
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="border border-stone-200 p-8 md:p-12 space-y-6">
              <h3 className="font-headline-md text-2xl text-[#1A1A1A] pb-2 border-b border-stone-100">
                {t.quoteRequestForm}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                    {t.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F9] border border-stone-200 focus:border-[#C5A059] px-4 py-3 text-sm focus:ring-0 outline-none transition-colors"
                    placeholder="e.g. Alistair Sterling"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                    {t.emailAddress} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    required
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F9] border border-stone-200 focus:border-[#C5A059] px-4 py-3 text-sm focus:ring-0 outline-none transition-colors"
                    placeholder="e.g. office@firm.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                    {t.whatsappNumber}
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F9] border border-stone-200 focus:border-[#C5A059] px-4 py-3 text-sm focus:ring-0 outline-none transition-colors"
                    placeholder="e.g. +44 7911 123456"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                    {t.companyName}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F9] border border-stone-200 focus:border-[#C5A059] px-4 py-3 text-sm focus:ring-0 outline-none transition-colors"
                    placeholder="Firm or Hospitality Developer Name"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#F9F9F9] border border-stone-200 focus:border-[#C5A059] px-4 py-3 text-sm focus:ring-0 outline-none transition-colors resize-none"
                  placeholder="Tell us about the project: units needed, CAD files status, preferred leather weights, expected port of entry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full uppercase font-label-sm text-xs bg-[#1A1A1A] text-white py-4 hover:bg-[#C5A059] transition-all duration-300 font-bold tracking-widest flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitForm}</span>
              </button>
            </form>
          ) : (
            <div className="border border-emerald-500 bg-emerald-50/20 p-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-headline-lg text-3xl text-emerald-800 font-bold">Inquiry Securely Transmitted</h3>
              <p className="font-body-md text-sm text-stone-700 leading-relaxed max-w-lg mx-auto">
                {t.submittedSuccess}
              </p>
              <button
                onClick={() => {
                  setFormData({
                    fullName: "",
                    emailAddress: "",
                    whatsappNumber: "",
                    companyName: "",
                    message: "",
                  });
                  setFormSubmitted(false);
                }}
                className="font-label-sm text-xs bg-[#1A1A1A] text-white px-6 py-3 uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors"
              >
                File Another Inquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
