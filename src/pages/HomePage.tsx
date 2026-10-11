import React from 'react';
import { AnimatedHero } from '../components/cinematic/AnimatedHero';
import { ScandalousCrunch } from '../components/cinematic/ScandalousCrunch';
import { HeroProductShowcase } from '../components/cinematic/HeroProductShowcase';
import { FlavorsOfIndia } from '../components/cinematic/FlavorsOfIndia';
import { ProductCollectionSection } from '../components/cinematic/ProductCollectionSection';
import { BrandStory } from '../components/cinematic/BrandStory';
import { FinalCTA } from '../components/cinematic/FinalCTA';
import { Product } from '../types';

interface HomePageProps {
  onQuickView: (product: Product) => void;
  onNavigate: (page: string) => void;
  onSelectFlavor: (flavor: 'spicy' | 'sweet' | 'crunchy') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onQuickView,
  onNavigate,
  onSelectFlavor,
}) => {
  return (
    <div className="w-full">
      {/* 1. Opening Hero Animation */}
      <AnimatedHero
        onShopClick={() => onNavigate('shop')}
        onExploreFlavors={() => {
          const el = document.getElementById('flavors-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. SECTION A — Scandalously Crunchy */}
      <ScandalousCrunch
        onExploreProduct={() => onNavigate('shop')}
      />

      {/* 3. SECTION B — The Hero Product (Pinned Cinematic Showcase) */}
      <HeroProductShowcase
        onQuickView={() => onNavigate('shop')}
      />

      {/* 4. SECTION C — Flavors of India */}
      <div id="flavors-section">
        <FlavorsOfIndia
          onSelectFlavor={(flavor) => {
            onSelectFlavor(flavor);
            onNavigate('shop');
          }}
        />
      </div>

      {/* 5. SECTION D — Product Collection ("Find Your Favorite") */}
      <ProductCollectionSection
        onQuickView={onQuickView}
        onViewAllShop={() => onNavigate('shop')}
      />

      {/* 6. SECTION E — Brand Story ("Made For Sharing") */}
      <BrandStory
        onExploreCollection={() => onNavigate('shop')}
      />

      {/* 7. SECTION F — Final Call to Action ("Let's Get Crunching") */}
      <FinalCTA
        onExploreProducts={() => onNavigate('shop')}
        onShopBestsellers={() => onNavigate('shop')}
      />
    </div>
  );
};
