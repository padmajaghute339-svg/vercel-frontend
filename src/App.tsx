import React, { useState, useEffect } from 'react';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchDrawer } from './components/layout/SearchDrawer';
import { QuickViewModal } from './components/shop/QuickViewModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Product, Order, CategoryId } from './types';
import { PRODUCTS } from './data/products';

export const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopCategory, setShopCategory] = useState<CategoryId>('all');
  const [shopFlavor, setShopFlavor] = useState<'spicy' | 'sweet' | 'crunchy' | 'savory' | null>(null);

  // Orders stored in state with initial simulated order
  const [orders, setOrders] = useState<Order[]>(() => [
    {
      id: 'ord_demo_init_01',
      orderNumber: 'CC-894120',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hrs ago
      status: 'dispatched',
      items: [
        {
          productName: 'Royal Aloo Bhujia',
          variantWeight: '400g Family Pack',
          price: 210,
          quantity: 2,
          imageKey: 'aloo-bhujia',
        },
        {
          productName: 'Royal Shahi Kaju Katli',
          variantWeight: '500g Regal Box',
          price: 690,
          quantity: 1,
          imageKey: 'kaju-katli',
        },
      ],
      shippingAddress: {
        fullName: 'Arjun Sharma',
        email: 'arjun.sharma@example.com',
        phone: '+91 98765 43210',
        street: '42, Heritage Enclave, Civil Lines',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302006',
        country: 'India',
      },
      paymentMethod: 'UPI (arjun@okhdfcbank) - Demo',
      subtotal: 1110,
      discount: 222,
      shipping: 0,
      total: 932,
      trackingNumber: 'IND-EXPRESS-782941',
      estimatedDelivery: 'Tomorrow by 4:00 PM',
    },
  ]);

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page === 'snacks') {
      setShopCategory('namkeen');
      setShopFlavor(null);
      setCurrentPage('shop');
      return;
    }
    if (page === 'sweets') {
      setShopCategory('sweets');
      setShopFlavor(null);
      setCurrentPage('shop');
      return;
    }
    if (page === 'story') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('flavors-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if (page === 'shop') {
      setShopCategory('all');
      setShopFlavor(null);
    }
    setCurrentPage(page);
  };

  const handleSelectFlavor = (flavor: 'spicy' | 'sweet' | 'crunchy') => {
    setShopFlavor(flavor);
    setShopCategory('all');
    setCurrentPage('shop');
  };

  const handleCategoryFilter = (cat: string) => {
    setShopCategory(cat as CategoryId);
    setShopFlavor(null);
    setCurrentPage('shop');
  };

  const handleProductDetail = (prod: Product) => {
    setSelectedProduct(prod);
    setCurrentPage('product-detail');
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setActiveTrackingOrder(newOrder);
    setCurrentPage('orders');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFFDF7]">
      {/* Film grain subtle cinematic noise texture */}
      <div className="film-grain" />

      {/* Persistent Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Pages Outlet */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            onSelectFlavor={handleSelectFlavor}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={shopCategory}
            initialFlavor={shopFlavor}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentPage('shop')}
            onQuickViewRelated={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onOrderPlaced={handleOrderPlaced}
            onBackToCart={() => setCurrentPage('shop')}
          />
        )}

        {currentPage === 'orders' && (
          <OrderTrackingPage
            orders={orders}
            activeOrder={activeTrackingOrder}
            onContinueShopping={() => handleNavigate('shop')}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            orders={orders}
            onTrackOrder={(ord) => {
              setActiveTrackingOrder(ord);
              setCurrentPage('orders');
            }}
            onNavigateAdmin={() => setCurrentPage('admin')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onNavigateHome={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer
        onNavigate={handleNavigate}
        onFilterCategory={handleCategoryFilter}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        onCheckout={() => setCurrentPage('checkout')}
        onExplore={() => setCurrentPage('shop')}
      />

      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleProductDetail}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onFullDetails={handleProductDetail}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
