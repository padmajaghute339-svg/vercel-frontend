import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Product, CategoryId } from '../types';
import { ProductCard } from '../components/shop/ProductCard';
import { Search, Filter, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { playClickSound } from '../lib/soundEffects';

interface ShopPageProps {
  initialCategory?: CategoryId;
  initialFlavor?: 'spicy' | 'sweet' | 'crunchy' | 'savory' | null;
  onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  initialFlavor = null,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(initialFlavor);
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating' | 'crunch'>('bestseller');

  const dietaryOptions = ['Vegetarian', 'Gluten-Free', 'Jain-Friendly', 'Vegan'];
  const flavorOptions = [
    { id: 'spicy', label: 'Fiery Spicy' },
    { id: 'sweet', label: 'Royal Sweet' },
    { id: 'crunchy', label: 'High Crunch' },
    { id: 'savory', label: 'Tangy Savory' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter Flavor
    if (selectedFlavor) {
      result = result.filter((p) => p.flavorProfile === selectedFlavor);
    }

    // Filter Dietary
    if (selectedDietary) {
      result = result.filter((p) => p.dietary.includes(selectedDietary as any));
    }

    // Filter Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'crunch':
        result.sort((a, b) => b.crunchIndex - a.crunchIndex);
        break;
      case 'bestseller':
      default:
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, selectedFlavor, selectedDietary, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedFlavor !== null || selectedDietary !== null || searchQuery !== '';

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedFlavor(null);
    setSelectedDietary(null);
    setSearchQuery('');
    setSortBy('bestseller');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-28 pb-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Banner */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-black tracking-[0.25em] text-haldiram-red uppercase bg-haldiram-red/10 px-4 py-1.5 rounded-full mb-3">
            <Sparkles size={12} />
            <span>The Complete Collection</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-haldiram-brown uppercase tracking-tight">
            ROYAL DELICACIES &amp; NAMKEEN
          </h1>
          <p className="mt-2 text-sm sm:text-base text-haldiram-brown/70 max-w-xl">
            Authentic Bikaneri savories, pure Desi Ghee mithai, and festival gift boxes roasted fresh daily.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-6 border border-haldiram-brown/10 shadow-sm mb-10 space-y-6">
          
          {/* Top row: Search input & Sort dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-haldiram-brown/40" size={18} />
              <input
                type="text"
                placeholder="Search by name, spice, or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-semibold pl-11 pr-4 py-3 rounded-full border border-haldiram-brown/15 bg-haldiram-cream/50 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-haldiram-brown/40 hover:text-haldiram-red"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <SlidersHorizontal size={15} className="text-haldiram-brown/60" />
              <span className="text-xs font-bold text-haldiram-brown uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-extrabold px-3.5 py-2.5 rounded-xl border border-haldiram-brown/15 bg-white text-haldiram-brown focus:outline-none focus:ring-1 focus:ring-haldiram-red"
              >
                <option value="bestseller">Bestseller First</option>
                <option value="rating">Top Rated (Stars)</option>
                <option value="crunch">Crunch Acoustics Index</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(cat.id as CategoryId);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-haldiram-red text-white shadow-md'
                      : 'bg-haldiram-cream border border-haldiram-brown/10 text-haldiram-brown/80 hover:border-haldiram-red hover:text-haldiram-red'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subfilters: Flavor & Dietary */}
          <div className="pt-2 border-t border-haldiram-brown/8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-haldiram-brown/60 uppercase mr-1">
                Flavor:
              </span>
              {flavorOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedFlavor(selectedFlavor === f.id ? null : f.id);
                  }}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all ${
                    selectedFlavor === f.id
                      ? 'bg-haldiram-saffron text-white border-haldiram-saffron shadow-sm'
                      : 'bg-white border-haldiram-brown/10 text-haldiram-brown/70 hover:border-haldiram-saffron'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-haldiram-brown/60 uppercase mr-1">
                Dietary:
              </span>
              {dietaryOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    playClickSound();
                    setSelectedDietary(selectedDietary === d ? null : d);
                  }}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all ${
                    selectedDietary === d
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-white border-haldiram-brown/10 text-haldiram-brown/70 hover:border-emerald-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-black uppercase text-haldiram-red hover:underline ml-auto"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs font-bold text-haldiram-brown/60 uppercase tracking-wider">
            Showing {filteredAndSortedProducts.length} of {PRODUCTS.length} Royal Specialties
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-haldiram-brown/10 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-haldiram-brown mb-2">
              No matching delicacies found
            </h3>
            <p className="text-sm text-haldiram-brown/60 mb-6">
              Try modifying your flavor or dietary filters to discover more items.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-wider hover:bg-haldiram-red-dark"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
