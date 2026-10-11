import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { ProductArtwork } from '../../assets/ProductArtwork';
import { playClickSound } from '../../lib/soundEffects';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.flavorProfile.toLowerCase().includes(q) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  });

  const popularSearches = ['Aloo Bhujia', 'Kaju Katli', 'Gulab Jamun', 'Moong Dal', 'Navratan'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-haldiram-brown/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 max-w-3xl mx-auto mt-16 sm:mt-24 px-4">
        <div className="bg-haldiram-cream rounded-3xl shadow-2xl border border-haldiram-gold/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Search Input Bar */}
          <div className="p-6 border-b border-haldiram-brown/10 flex items-center space-x-4 bg-white">
            <Search className="text-haldiram-red flex-shrink-0" size={24} />
            <input
              type="text"
              placeholder="Search royal namkeen, mithai, ingredients, spices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full text-base sm:text-lg font-medium text-haldiram-brown placeholder-haldiram-brown/40 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs uppercase font-bold text-haldiram-brown/50 hover:text-haldiram-red"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-haldiram-brown/60 hover:text-haldiram-red rounded-full"
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-6 py-3 bg-haldiram-cream-warm border-b border-haldiram-brown/5 flex items-center space-x-2 overflow-x-auto text-xs">
            <span className="font-bold text-haldiram-brown/60 flex items-center gap-1 flex-shrink-0">
              <Sparkles size={12} className="text-haldiram-gold" /> Trending:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  playClickSound();
                  setQuery(term);
                }}
                className="px-3 py-1 rounded-full bg-white border border-haldiram-brown/10 text-haldiram-brown/80 hover:border-haldiram-red hover:text-haldiram-red font-semibold whitespace-nowrap transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-6 space-y-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-base font-bold text-haldiram-brown">No royal delicacies found for "{query}"</p>
                <p className="text-xs text-haldiram-brown/60 mt-1">Try searching for Bhujia, Kaju Katli, or Moong Dal</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    playClickSound();
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-haldiram-gold/10 border border-haldiram-brown/5 hover:border-haldiram-gold/60 cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-16 rounded-xl bg-haldiram-cream flex items-center justify-center p-1 overflow-hidden flex-shrink-0">
                      <ProductArtwork imageKey={product.imageKey} size="sm" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-haldiram-brown group-hover:text-haldiram-red transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-haldiram-brown/60 line-clamp-1">
                        {product.tagline}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-black text-haldiram-brown">₹{product.price}</span>
                        <span className="text-[10px] uppercase font-bold text-haldiram-saffron bg-haldiram-saffron/10 px-2 py-0.5 rounded-full">
                          {product.categoryName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-haldiram-brown/30 group-hover:text-haldiram-red group-hover:translate-x-1 transition-all" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
