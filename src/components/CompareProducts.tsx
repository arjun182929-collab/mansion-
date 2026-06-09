import { Product, CurrencyCode } from "../types";
import { TRANSLATIONS, CURRENCY_RATES, CURRENCY_SYMBOLS } from "../data";
import { Check, Trash2, ArrowLeftRight, Heart } from "lucide-react";

interface CompareProductsProps {
  compareList: Product[];
  currentCurrency: CurrencyCode;
  onRemoveFromCompare: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  quoteCart: Product[];
}

export default function CompareProducts({
  compareList,
  currentCurrency,
  onRemoveFromCompare,
  onAddToQuote,
  quoteCart,
}: CompareProductsProps) {
  const rate = CURRENCY_RATES[currentCurrency];
  const symbol = CURRENCY_SYMBOLS[currentCurrency];

  const formatPrice = (usdPrice: number) => {
    const calculated = Math.round(usdPrice * rate);
    return `${symbol}${calculated.toLocaleString()}`;
  };

  return (
    <div className="w-full space-y-12">
      <div className="text-left border-b border-stone-200 pb-6">
        <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
          B2B Side-by-Side Sourcing Matrix
        </span>
        <h1 className="font-display-lg text-3xl md:text-4xl text-[#1A1A1A]">
          Direct Model Specifications Comparison
        </h1>
        <p className="font-body-md text-stone-500 text-sm mt-1">
          Compare dimensions, structural woods, outer materials, packing details, and MOQ values directly.
        </p>
      </div>

      {compareList.length === 0 ? (
        <div className="border border-dashed border-stone-300 p-16 text-center space-y-4">
          <ArrowLeftRight className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-headline-md text-xl text-stone-700">No models added to comparison</h3>
          <p className="font-body-md text-xs text-stone-400 max-w-sm mx-auto">
            Explore the curated collection, check individual quick previews, and press "Compare" to overlay multiple custom sofas, beds, or tables here side-by-side.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-stone-200 bg-white">
          <table className="w-full border-collapse text-left text-xs min-w-[700px]">
            <thead>
              <tr className="bg-[#F9F9F9] border-b border-stone-200 text-stone-500 font-mono text-[9px] uppercase tracking-wider">
                <th className="p-4 w-1/4">Specification Factor</th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 w-1/4 border-l border-stone-200 relative">
                    <button
                      onClick={() => onRemoveFromCompare(product)}
                      className="absolute top-2 right-2 text-stone-400 hover:text-red-500 font-sans text-[10px] font-bold p-1 border border-stone-100 bg-white shadow-xs cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="pt-4 flex flex-col items-center text-center space-y-2">
                      <div className="w-16 h-16 bg-stone-50 flex items-center justify-center p-1 border overflow-hidden">
                        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-800 text-sm font-label-sm">{product.name}</h4>
                        <span className="text-[9px] text-[#C5A059] block tracking-widest font-bold uppercase">{product.category}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans text-stone-700">
              <tr className="hover:bg-stone-50/50">
                <td className="p-4 bg-[#F9F9F9] font-bold uppercase tracking-widest text-[9px] text-stone-500">Dimensions (W x D x H)</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 border-l border-stone-200 font-mono">{product.dimensions}</td>
                ))}
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="p-4 bg-[#F9F9F9] font-bold uppercase tracking-widest text-[9px] text-stone-500">Materials Used</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 border-l border-stone-200">
                    <ul className="space-y-1">
                      {product.materials.map((m, idx) => (
                        <li key={idx} className="flex items-center space-x-1.5 font-mono text-[10px]">
                          <Check className="w-3 h-3 text-[#C5A059]" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="p-4 bg-[#F9F9F9] font-bold uppercase tracking-widest text-[9px] text-stone-500 font-mono">Available Finishes</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 border-l border-stone-200 font-mono capitalize text-[10px]">
                    {product.colors.join(", ")}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="p-4 bg-[#F9F9F9] font-bold uppercase tracking-widest text-[9px] text-stone-500">MOQ details</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 border-l border-stone-200 font-mono text-[10px]">{product.moq}</td>
                ))}
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="p-4 bg-[#F9F9F9] font-bold uppercase tracking-widest text-[9px] text-stone-500">Pack Specifications</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 border-l border-stone-100 text-[10px] leading-relaxed max-w-xs">{product.packagingDetails}</td>
                ))}
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="p-4 bg-[#F9F9F9] font-bold uppercase tracking-widest text-[9px] text-stone-500">Approx. Direct cost</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 border-l border-stone-200 font-mono font-bold text-sm text-[#C5A059]">
                    {formatPrice(product.priceApprox)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-[#F9F9F9] font-bold uppercase tracking-widest text-[9px] text-stone-500">Actions</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 border-l border-stone-200 text-center">
                    <button
                      onClick={() => onAddToQuote(product)}
                      className={`w-full py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                        quoteCart.some((p) => p.id === product.id)
                          ? "bg-[#C5A059] text-white"
                          : "bg-[#1A1A1A] text-white hover:bg-[#C5A059]"
                      }`}
                    >
                      {quoteCart.some((p) => p.id === product.id) ? "In Sourcing" : "Add to Request"}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
