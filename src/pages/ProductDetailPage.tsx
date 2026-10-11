import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { ProductArtwork } from '../assets/ProductArtwork';
import { useCart } from '../hooks/useCart';
import {
  Star,
  ShoppingBag,
  Plus,
  Minus,
  ArrowLeft,
  ShieldCheck,
  Flame,
  Zap,
  Sparkles,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { playClickSound } from '../lib/soundEffects';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onQuickViewRelated: (p: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
}) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'story' | 'ingredients' | 'nutrition' | 'reviews'>('story');
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product, selectedVariant, quantity);
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-28 pb-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-haldiram-brown/70 hover:text-haldiram-red mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collection</span>
        </button>

        {/* Hero Product Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Left: Product Artwork Stage */}
          <div className="bg-gradient-to-b from-[#FFFDF7] via-[#FAF4E6] to-[#F5ECE0] rounded-3xl p-8 sm:p-12 border border-haldiram-brown/10 shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              {product.dietary.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-sm"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>

            <div className="my-8 transform hover:scale-105 transition-transform duration-500">
              <ProductArtwork imageKey={product.imageKey} size="hero" />
            </div>

            <div className="w-full flex items-center justify-around pt-6 border-t border-haldiram-brown/10 text-xs font-bold text-haldiram-brown/80">
              <div className="flex items-center space-x-2">
                <Truck size={16} className="text-haldiram-red" />
                <span>Express Dispatch</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-emerald-700" />
                <span>100% Quality Sealed</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw size={16} className="text-haldiram-gold" />
                <span>Freshness Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right: Specifications & Purchasing Controls */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase text-haldiram-saffron bg-haldiram-saffron/10 px-3.5 py-1 rounded-full mb-3">
                <Sparkles size={12} />
                <span>{product.categoryName} • BIKANER HERITAGE</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black text-haldiram-brown uppercase tracking-tight leading-none">
                {product.name}
              </h1>

              {product.hindiName && (
                <p className="text-lg font-bold text-haldiram-red mt-1">
                  {product.hindiName}
                </p>
              )}

              <p className="text-sm sm:text-base text-haldiram-brown/70 font-medium mt-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Ratings Bar */}
            <div className="flex items-center space-x-3 py-2 border-y border-haldiram-brown/10">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-black text-haldiram-brown">{product.rating}</span>
              <span className="text-xs text-haldiram-brown/50">
                ({product.reviewCount} Certified Customer Reviews)
              </span>
            </div>

            {/* Sensory Matrix: Crunch & Spice Gauges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-haldiram-brown/10 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-haldiram-brown uppercase flex items-center gap-1.5">
                    <Zap size={15} className="text-amber-500" /> Crunch Resonance
                  </span>
                  <span className="text-xs font-black text-haldiram-brown">{product.crunchIndex}%</span>
                </div>
                <div className="w-full h-2 bg-haldiram-brown/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                    style={{ width: `${product.crunchIndex}%` }}
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-haldiram-brown/10 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-haldiram-brown uppercase flex items-center gap-1.5">
                    <Flame size={15} className="text-red-500" /> Spice Heat Level
                  </span>
                  <span className="text-xs font-black text-haldiram-red">{product.spiceLevel} / 5</span>
                </div>
                <div className="w-full h-2 bg-haldiram-brown/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-red-600 rounded-full"
                    style={{ width: `${(product.spiceLevel / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Weight Variant Picker */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-haldiram-brown mb-2">
                Available Package Sizes:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedVariant(v);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedVariant.id === v.id
                        ? 'bg-haldiram-brown text-white border-haldiram-brown shadow-md'
                        : 'bg-white text-haldiram-brown border-haldiram-brown/15 hover:border-haldiram-red'
                    }`}
                  >
                    <span className="block text-xs font-bold">{v.weight}</span>
                    <span className="block text-sm font-black text-haldiram-gold mt-1">
                      ₹{v.price}
                    </span>
                    {v.originalPrice && (
                      <span className="block text-[10px] text-white/50 line-through">
                        ₹{v.originalPrice}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing & Add to Cart Controls */}
            <div className="bg-white p-6 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-haldiram-brown">
                      ₹{selectedVariant.price * quantity}
                    </span>
                    {selectedVariant.originalPrice && (
                      <span className="text-sm text-haldiram-brown/40 line-through">
                        ₹{selectedVariant.originalPrice * quantity}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-haldiram-brown/60 font-medium">
                    Inclusive of all taxes &amp; standard packing
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-3 bg-haldiram-cream px-4 py-2 rounded-full border border-haldiram-brown/15">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-haldiram-brown/70 hover:text-haldiram-red"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-black text-haldiram-brown w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-haldiram-brown/70 hover:text-haldiram-red"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-haldiram-red text-white hover:bg-haldiram-red-dark hover:scale-[1.02] active:scale-95'
                }`}
              >
                <ShoppingBag size={16} />
                <span>{isAdded ? 'Added to Royal Box!' : 'Add to Royal Crunch Box'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Story, Ingredients, Nutrition, Reviews */}
        <div className="bg-white rounded-3xl border border-haldiram-brown/10 shadow-sm p-6 sm:p-10 mb-16">
          <div className="flex border-b border-haldiram-brown/10 pb-4 space-x-6 overflow-x-auto no-scrollbar">
            {[
              { id: 'story', label: 'Culinary Story' },
              { id: 'ingredients', label: 'Authentic Ingredients' },
              { id: 'nutrition', label: 'Nutritional Facts' },
              { id: 'reviews', label: 'Verified Reviews' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id as any);
                }}
                className={`text-xs font-black uppercase tracking-wider whitespace-nowrap pb-2 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'text-haldiram-red border-haldiram-red'
                    : 'text-haldiram-brown/60 border-transparent hover:text-haldiram-brown'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-8">
            {activeTab === 'story' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-display text-2xl font-black text-haldiram-brown uppercase">
                  The Royal Bikaner Heritage
                </h3>
                <p className="text-sm text-haldiram-brown/80 leading-relaxed font-medium">
                  {product.longDescription}
                </p>
                <div className="p-4 rounded-2xl bg-haldiram-cream border border-haldiram-brown/10 text-xs font-bold text-haldiram-brown">
                  💡 Storage Instructions: Store in a cool, dry place away from direct sunlight. Once unsealed, keep inside an airtight brass or glass canister to maintain crisp sound integrity.
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-display text-2xl font-black text-haldiram-brown uppercase">
                  Purity in Every Grain
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="p-3 rounded-xl bg-haldiram-cream border border-haldiram-brown/5 text-xs font-semibold text-haldiram-brown flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-haldiram-gold" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4 max-w-xl">
                <h3 className="font-display text-2xl font-black text-haldiram-brown uppercase">
                  Lab Certified Nutrition
                </h3>
                <div className="divide-y divide-haldiram-brown/10 border border-haldiram-brown/10 rounded-2xl overflow-hidden text-xs">
                  <div className="flex justify-between p-3 bg-haldiram-cream font-bold text-haldiram-brown">
                    <span>Serving Benchmark</span>
                    <span>Per 100g</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="font-medium text-haldiram-brown/70">Energy Calories</span>
                    <span className="font-black text-haldiram-brown">{product.nutrition.calories}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="font-medium text-haldiram-brown/70">Total Fats</span>
                    <span className="font-black text-haldiram-brown">{product.nutrition.fat}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="font-medium text-haldiram-brown/70">Carbohydrates</span>
                    <span className="font-black text-haldiram-brown">{product.nutrition.carbs}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="font-medium text-haldiram-brown/70">Plant Protein</span>
                    <span className="font-black text-haldiram-brown">{product.nutrition.protein}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="font-medium text-haldiram-brown/70">Sodium Content</span>
                    <span className="font-black text-haldiram-brown">{product.nutrition.sodium}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="font-display text-2xl font-black text-haldiram-brown uppercase">
                  Customer Experiences
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Vikramaditya Rathore',
                      city: 'Bikaner',
                      stars: 5,
                      text: 'Nobody understands the texture of moth dal like CrunchyCraft. The crunch carries that distinct desert pepper warmth that takes me straight back to childhood.',
                    },
                    {
                      name: 'Ananya Deshmukh',
                      city: 'Mumbai',
                      stars: 5,
                      text: 'Ordered the 1kg feast pack for Diwali. Arrived crisp, zero breakage, and the silver vark was immaculate. Best quality tea-time crunch hands down.',
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-haldiram-cream border border-haldiram-brown/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-haldiram-brown">{rev.name} ({rev.city})</span>
                        <div className="flex text-amber-500">
                          {[...Array(rev.stars)].map((_, s) => (
                            <Star key={s} size={12} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-haldiram-brown/80 leading-relaxed font-medium">
                        "{rev.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
