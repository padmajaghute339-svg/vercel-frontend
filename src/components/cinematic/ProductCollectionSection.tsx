import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { Product, CategoryId } from '../../types';
import { ProductCard } from '../shop/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

interface ProductCollectionSectionProps {
  onQuickView: (product: Product) => void;
  onViewAllShop: () => void;
}

export const ProductCollectionSection: React.FC<ProductCollectionSectionProps> = ({
  onQuickView,
  onViewAllShop,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFDF7] select-none border-t border-haldiram-brown/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-black tracking-[0.25em] text-haldiram-red uppercase bg-haldiram-red/10 px-4 py-1.5 rounded-full mb-3">
              <Sparkles size={12} />
              <span>Curated Indian Delicacies</span>
            </div>
            <h2 className="font-display text-hero-giant font-black tracking-tightest uppercase text-haldiram-brown leading-[0.88]">
              FIND YOUR <br />
              <span className="text-haldiram-red">FAVORITE</span>
            </h2>
          </div>

          <div className="md:max-w-xs">
            <p className="text-sm text-haldiram-brown/70 leading-relaxed font-medium">
              Every pack is roasted, fried, and sealed in our Bikaner-inspired temperature-controlled kitchens for pure crisp resonance.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound();
                setActiveCategory(cat.id as CategoryId);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-haldiram-red text-white shadow-lg scale-105'
                  : 'bg-white border border-haldiram-brown/15 text-haldiram-brown/80 hover:border-haldiram-red hover:text-haldiram-red'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              playClickSound();
              onViewAllShop();
            }}
            className="px-10 py-5 rounded-full bg-haldiram-brown text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95 inline-flex items-center space-x-3 group"
          >
            <span>Explore All {PRODUCTS.length} Royal Delicacies</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
