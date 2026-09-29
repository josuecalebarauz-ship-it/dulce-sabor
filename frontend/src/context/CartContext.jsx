import React, { createContext, useContext, useState, useEffect } from 'react';

import { FALLBACK_PRODUCTS } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dulce_sabor_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Guardar y recuperar el pedido generado en sessionStorage para evitar duplicados al recargar
  const [completedOrder, setCompletedOrder] = useState(() => {
    try {
      const saved = sessionStorage.getItem('dulce_sabor_pedido_actual');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dulce_sabor_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.warn('Error al guardar carrito en localStorage:', err);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (completedOrder) {
        sessionStorage.setItem('dulce_sabor_pedido_actual', JSON.stringify(completedOrder));
      } else {
        sessionStorage.removeItem('dulce_sabor_pedido_actual');
      }
    } catch (err) {
      console.warn('Error al sincronizar sessionStorage de pedido:', err);
    }
  }, [completedOrder]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCatalogPrice = (id, fallback) => {
    const p = FALLBACK_PRODUCTS.find(item => item.id === id);
    return p ? p.price : fallback;
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = Number(
    cartItems.reduce((acc, item) => acc + (getCatalogPrice(item.id, item.price) * item.quantity), 0).toFixed(2)
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        selectedProductForModal,
        setSelectedProductForModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe utilizarse dentro de un CartProvider');
  }
  return context;
}
