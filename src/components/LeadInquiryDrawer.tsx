import { useState, FormEvent, ChangeEvent } from "react";
import { Product, LanguageCode, CurrencyCode, LeadInquiry } from "../types";
import { TRANSLATIONS } from "../data";
import { Trash2, Send, X, FileCheck, PhoneCall, ArrowRight, Table } from "lucide-react";

interface LeadInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  quoteCart: Product[];
  onRemoveFromQuote: (productId: string) => void;
  onClearQuote: () => void;
  onAddInquiry: (inquiry: LeadInquiry) => void;
  activeView: string;
  onChangeView: (view: any) => void;
}

export default function LeadInquiryDrawer({
  isOpen,
  onClose,
  currentLang,
  quoteCart,
  onRemoveFromQuote,
  onClearQuote,
  onAddInquiry,
  activeView,
  onChangeView,
}: LeadInquiryDrawerProps) {
  const [inquiryData, setInquiryData] = useState({
    fullName: "",
    emailAddress: "",
    whatsappNumber: "",
    companyName: "",
    message: "",
  });
  const [isDone, setIsDone] = useState(false);

  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (quoteCart.length === 0) {
      alert("Inquiry list is empty. Add high-end models from the catalog first.");
      return;
    }
    if (!inquiryData.fullName || !inquiryData.emailAddress) {
      alert("Please specify your name & professional email.");
      return;
    }

    const compiledModels = quoteCart.map((p) => p.name).join(", ");

    // Create unique lead log record for the CRM admin dashboard
    const newLead: LeadInquiry = {
      id: `lead-${Date.now()}`,
      fullName: inquiryData.fullName,
      emailAddress: inquiryData.emailAddress,
      whatsappNumber: inquiryData.whatsappNumber,
      companyName: inquiryData.companyName,
      message: inquiryData.message,
      productName: compiledModels,
      interestType: "Catalog Inquiry Bundle",
      dateReceived: new Date().toLocaleDateString(),
    };

    onAddInquiry(newLead);
    setIsDone(true);
    onClearQuote();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInquiryData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end">
      {/* Click outside container backdrop closes */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between z-10 border-l border-stone-200">
        {/* Header Drawer */}
        <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-[#F9F9F9]">
          <div>
            <h3 className="font-headline-md text-xl text-[#1A1A1A]">Your Sourcing Quote Builder</h3>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
              B2B SPECIFICATION LIST
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:text-[#C5A059] transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Core Drawer Body Scroll */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {!isDone ? (
            <>
              {/* Product items loop */}
              {quoteCart.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <span className="text-3xl">🏺</span>
                  <p className="text-sm font-semibold text-stone-600">No models selected</p>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto">
                    Add European, French classical, or villa dining ensembles from our catalog to get instant customized cargo volumetric specifications.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-stone-400">
                    <span>Selected Creations ({quoteCart.length})</span>
                    <button onClick={onClearQuote} className="text-red-500 hover:underline">
                      Clear list
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {quoteCart.map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-stone-50 overflow-hidden border shrink-0 flex items-center justify-center p-1">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-stone-800 text-xs">{item.name}</h4>
                            <p className="text-[9px] text-stone-400 uppercase tracking-wider">{item.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveFromQuote(item.id)}
                          className="text-stone-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiry details form input segment */}
              <form onSubmit={handleSubmit} className="border-t border-stone-200 pt-6 space-y-4 text-left">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  Submit specification list for direct factory quotation
                </span>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-stone-500">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={inquiryData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F9] border border-stone-200 px-3 py-2 text-xs focus:border-[#C5A059] outline-none"
                    placeholder="e.g. Alistair Sterling"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-stone-500">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="emailAddress"
                    value={inquiryData.emailAddress}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F9] border border-stone-200 px-3 py-2 text-xs focus:border-[#C5A059] outline-none"
                    placeholder="e.g. procurement@firm.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-[#1A1A1A]">WhatsApp (highly recommended)</label>
                    <input
                      type="text"
                      name="whatsappNumber"
                      value={inquiryData.whatsappNumber}
                      onChange={handleChange}
                      className="w-full bg-[#F9F9F9] border border-stone-200 px-3 py-1.5 text-xs focus:border-[#C5A059] outline-none"
                      placeholder="+44 7..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-[#1A1A1A]">Design Studio / Firm</label>
                    <input
                      type="text"
                      name="companyName"
                      value={inquiryData.companyName}
                      onChange={handleChange}
                      className="w-full bg-[#F9F9F9] border border-stone-200 px-3 py-1.5 text-xs focus:border-[#C5A059] outline-none"
                      placeholder="Sterling Architecture"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-[#1A1A1A]">Project metrics / special dimensions</label>
                  <textarea
                    rows={3}
                    name="message"
                    value={inquiryData.message}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F9] border border-stone-200 px-3 py-1.5 text-xs focus:border-[#C5A059] outline-none resize-none"
                    placeholder="Specify project address, target delivery weeks, etc."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={quoteCart.length === 0}
                  className="w-full uppercase font-label-sm text-xs bg-[#1A1A1A] hover:bg-[#C5A059] text-white py-3.5 tracking-widest font-bold disabled:opacity-45 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Sourcing Quote Request</span>
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500 rounded-full text-white flex items-center justify-center mx-auto shadow-md">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="font-headline-lg text-2xl text-stone-800">Inquiry Received Perfectly</h3>
              <p className="font-body-md text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
                {t.submittedSuccess}
              </p>
              <div className="bg-[#F9F9F9] p-4 text-xs font-mono text-stone-600 text-left space-y-2 border-l-2 border-emerald-500">
                <p><strong>Lead Entry Registered:</strong> {inquiryData.fullName}</p>
                <p><strong>Professional Box:</strong> {inquiryData.emailAddress}</p>
                <p><strong>Firm Context:</strong> {inquiryData.companyName || "N/A"}</p>
              </div>

              <div className="space-y-2 pt-4">
                <button
                  onClick={() => {
                    onChangeView("inquiry-logs");
                    onClose();
                  }}
                  className="w-full border border-stone-300 py-3 text-xs uppercase tracking-wider hover:bg-stone-50 transition-colors inline-flex justify-center items-center gap-1 font-bold"
                >
                  <Table className="w-4 h-4 text-stone-500" />
                  <span>Review CRM Lead Record Logs</span>
                </button>
                <button
                  onClick={() => {
                    setIsDone(false);
                    onClose();
                  }}
                  className="w-full text-stone-700 hover:text-[#1A1A1A] font-bold py-2 text-xs uppercase tracking-widest font-mono cursor-pointer"
                >
                  Return to Catalogue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
