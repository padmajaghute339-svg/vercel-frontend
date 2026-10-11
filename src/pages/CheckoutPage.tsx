import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { OrderAddress, Order } from '../types';
import { ProductArtwork } from '../assets/ProductArtwork';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { playCrunchSound, playClickSound } from '../lib/soundEffects';

interface CheckoutPageProps {
  onOrderPlaced: (order: Order) => void;
  onBackToCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderPlaced,
  onBackToCart,
}) => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [address, setAddress] = useState<OrderAddress>(() => {
    if (user?.savedAddresses && user.savedAddresses.length > 0) {
      return user.savedAddresses[0];
    }
    return {
      fullName: user?.name || 'Arjun Sharma',
      email: user?.email || 'arjun.sharma@example.com',
      phone: '+91 98765 43210',
      street: '42, Heritage Enclave, Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302006',
      country: 'India',
    };
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('arjun@okhdfcbank');
  const [isPlacing, setIsPlacing] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacing(true);
    playCrunchSound();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B0000', '#FFB703', '#FF6B00', '#32662C'],
      });
    } catch {
      // ignore
    }

    const orderNumber = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `IND-EXPRESS-${Date.now().toString().slice(-6)}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      items: cart.items.map((i) => ({
        productName: i.product.name,
        variantWeight: i.variant.weight,
        price: i.variant.price,
        quantity: i.quantity,
        imageKey: i.product.imageKey,
      })),
      shippingAddress: address,
      paymentMethod:
        paymentMethod === 'upi'
          ? `UPI (${upiId}) - Demo`
          : paymentMethod === 'card'
          ? 'Credit Card (Mock Sandbox)'
          : 'Cash on Delivery (Pay on Arrival)',
      subtotal: cart.subtotal,
      discount: cart.discount,
      shipping: cart.shipping,
      total: cart.total,
      trackingNumber,
      estimatedDelivery: '3 to 4 Business Days',
    };

    setTimeout(() => {
      clearCart();
      setIsPlacing(false);
      onOrderPlaced(newOrder);
    }, 1200);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="font-display text-2xl font-bold text-haldiram-brown mb-2">
          Your Box is currently empty
        </h2>
        <p className="text-sm text-haldiram-brown/60 mb-6">
          Add some delicious royal snacks to continue to checkout.
        </p>
        <button
          onClick={onBackToCart}
          className="px-8 py-3.5 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-wider"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-28 pb-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation back */}
        <button
          onClick={onBackToCart}
          className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-haldiram-brown/70 hover:text-haldiram-red mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to Shopping</span>
        </button>

        {/* DEMO SANDBOX DISCLAIMER BANNER */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 shadow-sm">
          <ShieldAlert className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-xs">
            <span className="font-black uppercase tracking-wider block mb-0.5">
              Demonstration &amp; Test Sandbox Mode
            </span>
            <p className="font-medium text-amber-800/90 leading-relaxed">
              This is a creative concept portfolio project. No real bank accounts will be charged. You can safely simulate an order placement to test the order tracking workflow and administrative dashboard analytics.
            </p>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-5xl font-black text-haldiram-brown uppercase tracking-tight">
            ROYAL CHECKOUT &amp; DISPATCH
          </h1>
          <p className="text-xs sm:text-sm text-haldiram-brown/60 font-medium mt-1">
            Carefully packaged in aroma-retention nitrogen-flushed foils.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Delivery Address & Payment Method (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-haldiram-brown/10">
                <Truck className="text-haldiram-red" size={20} />
                <h3 className="font-display text-lg font-black text-haldiram-brown uppercase">
                  1. Delivery Destination
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-haldiram-brown mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-haldiram-brown mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-haldiram-brown mb-1">Email for Dispatch Updates</label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-haldiram-brown mb-1">Street Address &amp; House Number</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full text-xs font-semibold px-4 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-haldiram-brown mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-haldiram-brown mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-haldiram-brown mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full text-xs font-semibold px-3 py-3 rounded-xl border border-haldiram-brown/15 bg-haldiram-cream/30 focus:outline-none focus:ring-1 focus:ring-haldiram-red"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Simulator */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-haldiram-brown/10">
                <div className="flex items-center space-x-2">
                  <CreditCard className="text-haldiram-red" size={20} />
                  <h3 className="font-display text-lg font-black text-haldiram-brown uppercase">
                    2. Payment Gateway (Sandbox Demo)
                  </h3>
                </div>
                <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <Lock size={10} className="mr-1" /> 256-Bit Encrypted
                </span>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'upi', label: 'UPI / QR', desc: 'GPay, PhonePe, Paytm' },
                  { id: 'card', label: 'Card Demo', desc: 'Visa, Mastercard' },
                  { id: 'cod', label: 'Cash On Delivery', desc: 'Pay on Handshake' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setPaymentMethod(m.id as any);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      paymentMethod === m.id
                        ? 'bg-haldiram-brown text-white border-haldiram-brown shadow-sm'
                        : 'bg-haldiram-cream/40 text-haldiram-brown border-haldiram-brown/15 hover:border-haldiram-red'
                    }`}
                  >
                    <span className="block text-xs font-black">{m.label}</span>
                    <span className="block text-[10px] opacity-70 mt-0.5">{m.desc}</span>
                  </button>
                ))}
              </div>

              {/* Method subform */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-haldiram-cream border border-haldiram-brown/10 text-xs space-y-2">
                  <label className="block font-bold text-haldiram-brown">Virtual Payment Address (VPA):</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-haldiram-brown/15 bg-white"
                  />
                  <p className="text-[11px] text-haldiram-brown/60">
                    Simulates instant UPI intent approval on submission.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-haldiram-cream border border-haldiram-brown/10 text-xs space-y-2">
                  <p className="font-bold text-haldiram-brown">Demo Test Card: 4242 •••• •••• 4242</p>
                  <p className="text-[11px] text-haldiram-brown/60">
                    Expiry: 12/28 • CVV: 888 (Sandbox auto-approved).
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-haldiram-cream border border-haldiram-brown/10 text-xs">
                  <p className="font-bold text-haldiram-brown">Pay on Delivery</p>
                  <p className="text-[11px] text-haldiram-brown/60 mt-0.5">
                    Exact cash or UPI payment directly to the delivery rider upon arrival.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-haldiram-brown/10 shadow-sm space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-3 border-b border-haldiram-brown/10">
                <h3 className="font-display text-lg font-black text-haldiram-brown uppercase">
                  Order Summary
                </h3>
                <span className="text-xs font-bold text-haldiram-brown/60">
                  {cart.items.length} items
                </span>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-14 bg-haldiram-cream rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                        <ProductArtwork imageKey={item.product.imageKey} size="sm" />
                      </div>
                      <div>
                        <span className="font-bold text-haldiram-brown block line-clamp-1">
                          {item.product.name}
                        </span>
                        <span className="text-[10px] text-haldiram-brown/60">
                          {item.variant.weight} × {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-black text-haldiram-brown">
                      ₹{item.variant.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="pt-3 border-t border-haldiram-brown/10 space-y-2 text-xs font-medium text-haldiram-brown/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-haldiram-brown">₹{cart.subtotal}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{cart.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping &amp; Handling</span>
                  <span>{cart.shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${cart.shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{cart.tax}</span>
                </div>
                <div className="pt-3 border-t border-haldiram-brown/10 flex justify-between text-lg font-black text-haldiram-brown">
                  <span>Total Payable</span>
                  <span className="text-haldiram-red">₹{cart.total}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isPlacing}
                className="w-full py-5 rounded-full bg-haldiram-red text-white text-xs font-black uppercase tracking-widest hover:bg-haldiram-red-dark transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2 group hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              >
                <span>{isPlacing ? 'Confirming Dispatch...' : 'Place Sovereign Order'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-haldiram-brown/50 font-bold uppercase tracking-wider text-center">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Quality Tested • Zero Fake Charges Guarantee</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
