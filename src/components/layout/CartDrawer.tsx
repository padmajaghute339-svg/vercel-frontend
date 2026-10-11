import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { ProductArtwork } from '../../assets/ProductArtwork';
import { playClickSound } from '../../lib/soundEffects';

interface CartDrawerProps {
  onCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onExplore }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMsg({ text: res.message, success: res.success });
    if (res.success) setCouponInput('');
  };

  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cart.subtotal);
  const freeShippingPercent = Math.min(100, Math.round((cart.subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-haldiram-brown/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-haldiram-cream shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-haldiram-brown/10 bg-white/70 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="text-haldiram-red" size={22} />
              <div>
                <h2 className="text-xl font-display font-extrabold text-haldiram-brown uppercase tracking-tight">
                  Your Crunch Box
                </h2>
                <p className="text-xs text-haldiram-brown/60 font-medium">
                  {cart.items.length} unique delicacies selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-haldiram-brown/60 hover:text-haldiram-red transition-colors rounded-full hover:bg-haldiram-brown/5"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-haldiram-cream-warm px-6 py-3 border-b border-haldiram-brown/5">
            <div className="flex justify-between items-center text-xs font-bold text-haldiram-brown mb-1.5">
              <span>
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <Sparkles size={13} /> You unlocked FREE Express Delivery!
                  </span>
                ) : (
                  `Add ₹${remainingForFreeShipping} more for FREE Delivery`
                )}
              </span>
              <span className="text-haldiram-red font-black">{freeShippingPercent}%</span>
            </div>
            <div className="w-full h-2 bg-haldiram-brown/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-haldiram-gold to-haldiram-saffron rounded-full transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Item List Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-haldiram-red/10 flex items-center justify-center text-haldiram-red mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="font-display text-xl font-bold text-haldiram-brown mb-1">
                  Your Box is Empty
                </h3>
                <p className="text-sm text-haldiram-brown/60 max-w-xs mb-6">
                  Add some legendary Bikaneri Bhujia or Shahi Kaju Katli to start your royal crunch journey!
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExplore();
                  }}
                  className="px-6 py-3 rounded-full bg-haldiram-red text-white text-xs font-extrabold uppercase tracking-widest hover:bg-haldiram-red-dark transition-all shadow-md"
                >
                  Explore Delicacies
                </button>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-3.5 rounded-2xl bg-white border border-haldiram-brown/8 shadow-sm hover:border-haldiram-gold/50 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 flex-shrink-0 flex items-center justify-center bg-haldiram-cream rounded-xl p-1 overflow-hidden">
                    <ProductArtwork imageKey={item.product.imageKey} size="sm" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-haldiram-brown truncate">
                      {item.product.name}
                    </h4>
                    <span className="inline-block text-[11px] font-semibold text-haldiram-saffron bg-haldiram-saffron/10 px-2 py-0.5 rounded-full mt-0.5">
                      {item.variant.weight}
                    </span>
                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-2 bg-haldiram-cream rounded-lg border border-haldiram-brown/10 p-0.5">
                        <button
                          onClick={() => {
                            playClickSound();
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-haldiram-brown/70 hover:text-haldiram-red rounded"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-haldiram-brown">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            playClickSound();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-haldiram-brown/70 hover:text-haldiram-red rounded"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-black text-haldiram-brown">
                          ₹{item.variant.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-haldiram-brown/40 hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculation & Checkout */}
          {cart.items.length > 0 && (
            <div className="p-6 border-t border-haldiram-brown/10 bg-white/90 backdrop-blur-sm space-y-4">
              
              {/* Coupon Form */}
              <div>
                {cart.couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <Tag size={14} /> Coupon applied: {cart.couponCode} (-₹{cart.discount})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-900 hover:text-red-600 uppercase text-[10px] tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. CRUNCH20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-haldiram-brown/15 bg-white focus:outline-none focus:ring-1 focus:ring-haldiram-red uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-haldiram-brown text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && (
                  <p className={`text-[11px] mt-1 font-medium ${couponMsg.success ? 'text-emerald-700' : 'text-red-600'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-haldiram-brown/80 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-haldiram-brown">₹{cart.subtotal}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-₹{cart.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{cart.shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${cart.shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{cart.tax}</span>
                </div>
                <div className="border-t border-haldiram-brown/10 pt-2 flex justify-between text-base font-black text-haldiram-brown">
                  <span>Grand Total</span>
                  <span className="text-haldiram-red">₹{cart.total}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-4 rounded-full bg-haldiram-red text-white text-sm font-extrabold uppercase tracking-widest hover:bg-haldiram-red-dark transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
