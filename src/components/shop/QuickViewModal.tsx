import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types';
import { ProductArtwork } from '../../assets/ProductArtwork';
import { useCart } from '../../hooks/useCart';
import { X, Star, Plus, Minus, ShoppingBag, ShieldCheck, Flame, Zap, ArrowRight } from 'lucide-react';
import { playClickSound } from '../../lib/soundEffects';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onFullDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onFullDetails,
}) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const currentVariant = selectedVariant || product.variants[0];

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(product, currentVariant, quantity);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 flex items-center justify-center py-10 relative z-10">
        <div className="max-w-4xl w-full bg-haldiram-cream rounded-3xl shadow-2xl border border-haldiram-gold/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header Close */}
          <div className="flex justify-end p-4 border-b border-haldiram-brown/10 bg-white/60">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-haldiram-brown/60 hover:text-haldiram-red hover:bg-haldiram-brown/5 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 p-6 sm:p-8 gap-8 items-center">
            
            {/* Left Image Showcase */}
            <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-6 border border-haldiram-brown/10 shadow-inner">
              <ProductArtwork imageKey={product.imageKey} size="lg" />
              <div className="mt-4 flex items-center gap-2">
                {product.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Product Details */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-haldiram-saffron">
                  {product.categoryName} • BIKANER CRAFT
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-haldiram-brown tracking-tight mt-1">
                  {product.name}
                </h2>
                {product.hindiName && (
                  <p className="text-sm font-semibold text-haldiram-red">
                    {product.hindiName}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-haldiram-brown/70 mt-1 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-xs font-black text-haldiram-brown">{product.rating}</span>
                <span className="text-xs text-haldiram-brown/50">({product.reviewCount} verified reviews)</span>
              </div>

              {/* Crunch & Heat Meters */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="p-2.5 rounded-2xl bg-white border border-haldiram-brown/10">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-haldiram-brown">
                    <Zap size={14} className="text-amber-500" />
                    <span>Crunch Index</span>
                  </div>
                  <span className="text-lg font-black text-haldiram-brown mt-0.5 block">
                    {product.crunchIndex}%
                  </span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-haldiram-brown/10">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-haldiram-brown">
                    <Flame size={14} className="text-red-500" />
                    <span>Spice Level</span>
                  </div>
                  <span className="text-lg font-black text-haldiram-red mt-0.5 block">
                    {product.spiceLevel} / 5
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-haldiram-brown/80 leading-relaxed bg-white/50 p-3 rounded-2xl border border-haldiram-brown/5">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-haldiram-brown mb-1.5">
                  Select Pack Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        playClickSound();
                        setSelectedVariant(v);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        currentVariant.id === v.id
                          ? 'bg-haldiram-brown text-white border-haldiram-brown shadow-sm'
                          : 'bg-white text-haldiram-brown/80 border-haldiram-brown/15 hover:border-haldiram-red'
                      }`}
                    >
                      <span>{v.weight}</span>
                      <span className="block text-[10px] font-black text-haldiram-gold mt-0.5">
                        ₹{v.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-haldiram-brown">
                    ₹{currentVariant.price * quantity}
                  </span>
                  {currentVariant.originalPrice && (
                    <span className="text-xs text-haldiram-brown/40 line-through ml-2">
                      ₹{currentVariant.originalPrice * quantity}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-full border border-haldiram-brown/15">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-haldiram-brown/70 hover:text-haldiram-red"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-black text-haldiram-brown w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-haldiram-brown/70 hover:text-haldiram-red"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-widest hover:bg-haldiram-red-dark transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={15} />
                  <span>{isAdding ? 'Adding to Box...' : 'Add To Box'}</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onFullDetails(product);
                  }}
                  className="px-5 py-4 rounded-full bg-white border border-haldiram-brown/20 text-haldiram-brown text-xs font-black uppercase tracking-wider hover:border-haldiram-red transition-all flex items-center space-x-1"
                >
                  <span>Full Recipe</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
