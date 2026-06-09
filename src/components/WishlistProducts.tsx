import { Product, CurrencyCode } from "../types";
import { TRANSLATIONS } from "../data";
import { Trash2, Heart, ExternalLink } from "lucide-react";

interface WishlistProductsProps {
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function WishlistProducts({
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct,
}: WishlistProductsProps) {
  return (
    <div className="w-full space-y-12 text-left">
      <div className="border-b border-stone-200 pb-6">
        <span className="font-label-sm text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
          Your Curated Architectural Board
        </span>
        <h1 className="font-display-lg text-3xl md:text-4xl text-[#1A1A1A]">
          Saved Design Concepts & Sets
        </h1>
        <p className="font-body-md text-stone-500 text-sm mt-1">
          Review saved products ready for technical DWG drawings or customized physical client presentations.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="border border-dashed border-stone-300 p-16 text-center space-y-4">
          <Heart className="w-10 h-10 text-stone-300/80 mx-auto" fill="none" />
          <h3 className="font-display-md text-xl text-stone-700">Wishlist is empty</h3>
          <p className="font-body-md text-xs text-stone-400 max-w-sm mx-auto">
            Browse our curated 10 principal furniture categories and press the heart icon to save products dynamically to your aesthetic project board.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div key={product.id} className="border border-stone-200 p-5 space-y-4 hover:border-[#1A1A1A] transition-all relative group">
              <button
                onClick={() => onRemoveFromWishlist(product)}
                className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors z-10 cursor-pointer"
                title="Remove from Saved"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>

              <div className="aspect-square bg-stone-50 flex items-center justify-center p-4 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="max-h-[85%] max-w-[85%] object-contain" />
              </div>

              <div className="space-y-1">
                <span className="text-[9px] text-[#C5A059] uppercase font-bold tracking-widest block font-mono">{product.category}</span>
                <h4 className="font-headline-md text-xl text-[#1A1A1A]">{product.name}</h4>
                <p className="text-xs text-stone-500 font-body-md line-clamp-2">{product.subtitle}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="font-label-sm text-xs font-bold uppercase tracking-widest text-stone-800 hover:text-[#C5A059] transition-colors border-b border-[#C5A059] pb-0.5"
                >
                  Configure Spec Sheet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
