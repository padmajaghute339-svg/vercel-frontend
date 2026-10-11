import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types';
import { ProductArtwork } from '../../assets/ProductArtwork';
import { useCart } from '../../hooks/useCart';
import { Star, ShoppingBag, Eye, Zap, Flame } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedVariant, 1);
    setTimeout(() => setIsAdding(false), 600);
  };

  const discountPercent = selectedVariant.originalPrice
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-3xl p-5 border border-haldiram-brown/8 hover:border-haldiram-gold/60 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center space-x-1.5">
          {product.isBestseller && (
            <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full bg-haldiram-red text-white shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full bg-haldiram-gold text-haldiram-brown shadow-sm">
              New Batch
            </span>
          )}
        </div>

        {discountPercent > 0 && (
          <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image Stage with 3D Hover Float */}
      <div className="relative w-full h-56 flex items-center justify-center my-3 py-2 bg-gradient-to-b from-transparent to-haldiram-cream/40 rounded-2xl group-hover:scale-105 transition-transform duration-500">
        <ProductArtwork imageKey={product.imageKey} size="md" />

        {/* Quick View Hover Pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            onQuickView(product);
          }}
          className="absolute bottom-2 px-3.5 py-1.5 rounded-full bg-haldiram-brown/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-1.5 shadow-lg"
        >
          <Eye size={12} />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center space-x-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star size={13} fill="currentColor" />
            </div>
            <span className="text-xs font-black text-haldiram-brown">{product.rating}</span>
            <span className="text-[11px] text-haldiram-brown/50 font-medium">({product.reviewCount})</span>
            <span className="text-[10px] text-haldiram-brown/30">•</span>
            <span className="text-[11px] uppercase font-bold text-haldiram-saffron tracking-wider">
              {product.categoryName}
            </span>
          </div>

          {/* Name & Tagline */}
          <h3 className="font-display text-lg font-black text-haldiram-brown group-hover:text-haldiram-red transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-haldiram-brown/60 line-clamp-2 mt-0.5 leading-relaxed">
            {product.tagline}
          </p>

          {/* Micro metrics: Crunch & Spice */}
          <div className="flex items-center space-x-3 mt-3 py-1.5 px-3 rounded-xl bg-haldiram-cream border border-haldiram-brown/5 text-[11px] font-semibold text-haldiram-brown/80">
            <span className="flex items-center gap-1">
              <Zap size={12} className="text-amber-500" /> {product.crunchIndex}% Crunch
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Flame size={12} className="text-red-500" /> {product.spiceLevel}/5 Heat
            </span>
          </div>

          {/* Weight Variant Selector */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  setSelectedVariant(v);
                }}
                className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border transition-all ${
                  selectedVariant.id === v.id
                    ? 'bg-haldiram-brown text-white border-haldiram-brown shadow-sm'
                    : 'bg-white text-haldiram-brown/70 border-haldiram-brown/15 hover:border-haldiram-red'
                }`}
              >
                {v.weight.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-haldiram-brown/8 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-black text-haldiram-brown">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.originalPrice && (
                <span className="text-xs text-haldiram-brown/40 line-through">
                  ₹{selectedVariant.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-haldiram-brown/50 font-medium">Incl. all taxes</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-1.5 ${
              isAdding
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-haldiram-red text-white hover:bg-haldiram-red-dark hover:scale-105 active:scale-95'
            }`}
          >
            <ShoppingBag size={13} />
            <span>{isAdding ? 'Added!' : 'Add to Box'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
