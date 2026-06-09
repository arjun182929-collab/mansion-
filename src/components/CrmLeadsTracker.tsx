import { LeadInquiry } from "../types";
import { Table, Trash2, Mail, Phone, Building, Layers, FileSpreadsheet, PlusCircle } from "lucide-react";

interface CrmLeadsTrackerProps {
  inquiriesList: LeadInquiry[];
  onRemoveInquiry: (id: string) => void;
  onClearAll: () => void;
}

export default function CrmLeadsTracker({
  inquiriesList,
  onRemoveInquiry,
  onClearAll,
}: CrmLeadsTrackerProps) {
  const handleExportCsv = () => {
    if (inquiriesList.length === 0) {
      alert("No leads registered to export.");
      return;
    }
    // Simulate high end CSV B2B export
    const headers = "ID,Name,Email,WhatsApp,Company,Models,Type,Date";
    const rows = inquiriesList
      .map(
        (lead) =>
          `"${lead.id}","${lead.fullName}","${lead.emailAddress}","${lead.whatsappNumber || ""}","${
            lead.companyName || ""
          }","${lead.productName}","${lead.interestType}","${lead.dateReceived}"`
      )
      .join("\n");
    const blob = new Blob([`${headers}\n${rows}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `maison_elite_B2B_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-200 pb-6">
        <div className="space-y-2 text-left">
          <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Architecture & Contractor Admin CRM
          </span>
          <h1 className="font-display-lg text-3xl md:text-4xl text-[#1A1A1A]">
            B2B Sourcing Leads Tracker
          </h1>
          <p className="font-body-md text-stone-500 text-sm">
            Review and manage direct catalog specification list requests & custom project submissions securely.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="bg-[#1A1A1A] hover:bg-[#C5A059] text-white px-5 py-3 text-xs uppercase font-bold tracking-widest transition-colors flex items-center space-x-2"
          >
            <FileSpreadsheet className="w-4.5 h-4.5" />
            <span>Export CSV Leads Sheet</span>
          </button>
          <button
            onClick={onClearAll}
            className="border border-red-200 hover:bg-red-50 text-red-600 px-5 py-3 text-xs uppercase font-bold tracking-widest transition-colors"
          >
            Purge database
          </button>
        </div>
      </div>

      {inquiriesList.length === 0 ? (
        <div className="border border-dashed border-stone-300 p-16 text-center space-y-4">
          <span className="text-4xl">🗂️</span>
          <h3 className="font-display-md text-xl text-stone-700">No B2B leads registered in this session</h3>
          <p className="font-body-md text-xs text-stone-400 max-w-md mx-auto">
            All submissions from "Request Quote" buttons, "Inquire for Pricing" overlays, or exit intent download forms are processed live and logged into this secure table in real time.
          </p>
        </div>
      ) : (
        <div className="border border-stone-200 overflow-hidden bg-[#FFFFFF]">
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-xs min-w-[800px]">
              <thead>
                <tr className="bg-[#F9F9F9] border-b border-stone-200 text-stone-500 uppercase font-mono text-[9px] tracking-wider">
                  <th className="p-4">Lead ID / Date</th>
                  <th className="p-4">Contractor / Firm</th>
                  <th className="p-4">Channels</th>
                  <th className="p-4">Target Models of Interest</th>
                  <th className="p-4 text-right">Scope Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-sans">
                {inquiriesList.map((lead) => (
                  <tr key={lead.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-4 space-y-1">
                      <span className="font-mono text-[10px] text-[#C5A059] block font-bold uppercase">
                        {lead.id.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono block">Rec: {lead.dateReceived}</span>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="font-bold text-stone-800 text-sm flex items-center">
                        <PlusCircle className="w-3.5 h-3.5 mr-1 text-[#C5A059]" />
                        {lead.fullName}
                      </div>
                      {lead.companyName && (
                        <span className="text-[10px] text-stone-400 flex items-center font-bold">
                          <Building className="w-3.5 h-3.5 mr-1" />
                          {lead.companyName}
                        </span>
                      )}
                    </td>
                    <td className="p-4 space-y-1">
                      <span className="text-[10px] text-stone-600 flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1 text-stone-400" />
                        {lead.emailAddress}
                      </span>
                      {lead.whatsappNumber && (
                        <span className="text-[10px] text-stone-600 flex items-center">
                          <Phone className="w-3.5 h-3.5 mr-1 text-stone-400" />
                          {lead.whatsappNumber}
                        </span>
                      )}
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="text-stone-800 font-bold flex items-center">
                        <Layers className="w-3.5 h-3.5 mr-1 text-stone-400" />
                        {lead.productName}
                      </div>
                      <p className="text-[10px] text-stone-400 leading-relaxed italic max-w-xs">{lead.message}</p>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onRemoveInquiry(lead.id)}
                        className="text-stone-400 hover:text-red-600 p-2 border border-transparent hover:border-red-100 transition-all rounded-none bg-stone-50"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
