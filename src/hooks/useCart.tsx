import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem, Product, ProductVariant } from '../types';
import { playCrunchSound } from '../lib/soundEffects';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'crunchycraft_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string | undefined>();
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const selectedVariant = variant || product.variants[0];
    const itemId = `${product.id}-${selectedVariant.id}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          variantId: selectedVariant.id,
          product,
          variant: selectedVariant,
          quantity,
        },
      ];
    });

    playCrunchSound();
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === cartItemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(undefined);
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CRUNCH20') {
      setCouponCode('CRUNCH20');
      setDiscountPercent(20);
      return { success: true, message: 'CRUNCH20 applied: 20% discount unlocked!' };
    }
    if (cleanCode === 'BIKANER10') {
      setCouponCode('BIKANER10');
      setDiscountPercent(10);
      return { success: true, message: 'BIKANER10 applied: 10% discount unlocked!' };
    }
    return { success: false, message: 'Invalid promo code. Try CRUNCH20 or BIKANER10' };
  };

  const removeCoupon = () => {
    setCouponCode(undefined);
    setDiscountPercent(0);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const discount = Math.round((subtotal * discountPercent) / 100);
  // Free delivery above 499 INR
  const shipping = subtotal > 499 || items.length === 0 ? 0 : 50;
  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST on snacks
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const cart: Cart = {
    items,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    couponCode,
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
