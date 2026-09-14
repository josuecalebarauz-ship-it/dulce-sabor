import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen
  } = useCart();

  const handleProceedToCheckout = () => {
    closeCart();
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#1D0F0A]/70 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl border-l border-[#E5D6BE] flex flex-col justify-between"
            >
              {/* Encabezado del Carrito */}
              <div className="p-5 sm:p-6 border-b border-[#E5D6BE] flex items-center justify-between bg-[#FDF6E2]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#4A2B1B] text-[#F59E0B] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-brand-title text-lg font-bold text-[#2C1810]">
                      Tu Carrito Dulce
                    </h3>
                    <span className="text-xs text-[#78350F]">
                      {cartCount} {cartCount === 1 ? 'postre seleccionado' : 'postres seleccionados'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-[#F2E9D7] text-[#4A2B1B] transition-colors cursor-pointer"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lista de Postres en el Carrito */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#FBF6EC] border border-[#E5D6BE] flex items-center justify-center text-3xl mb-4">
                      🍮
                    </div>
                    <h4 className="font-brand-title text-xl font-bold text-[#2C1810] mb-2">
                      Tu carrito está vacío
                    </h4>
                    <p className="text-sm text-[#674029] max-w-xs mb-6">
                      Aún no has agregado ninguno de nuestros postres tradicionales chiricanos.
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-full bg-[#B45309] hover:bg-[#78350F] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      Explorar el Catálogo
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#E5D6BE] shadow-xs"
                    >
                      {/* Icono del postre */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FDF6E2] to-[#FCEBBB] border border-[#F4BE54]/50 flex items-center justify-center text-2xl shrink-0">
                        {item.modelType === 'bienmesabe' && '🍯'}
                        {item.modelType === 'arroz-con-leche' && '🥣'}
                        {item.modelType === 'gelatina-mosaico' && '🍧'}
                        {item.modelType === 'dulce-banana' && '🍰'}
                        {item.modelType === 'bollos-maiz' && '🌽'}
                      </div>

                      {/* Información y Precio */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#2C1810] truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#78350F] block mb-1.5">
                          {item.portion || 'Porción artesanal'}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#B45309]">
                            B/. {(item.price * item.quantity).toFixed(2)}
                            <span className="text-[10px] text-[#674029] font-normal ml-1">
                              (B/. {item.price.toFixed(2)} c/u)
                            </span>
                          </span>

                          {/* Controles de cantidad */}
                          <div className="flex items-center gap-1.5 bg-[#FBF6EC] border border-[#E5D6BE] rounded-full p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-full bg-[#FFFDF9] hover:bg-[#F2E9D7] text-[#4A2B1B] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                              aria-label="Disminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#2C1810] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-[#FFFDF9] hover:bg-[#F2E9D7] text-[#4A2B1B] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                              aria-label="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#991B1B] hover:text-[#DC2626] p-1.5 rounded-lg hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                        title="Eliminar postre"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Pie con Subtotal y Botón de Checkout */}
              {cartItems.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-[#E5D6BE] bg-[#FFFDF9]">
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-[#674029]">
                      <span>Subtotal de postres:</span>
                      <span className="font-bold text-[#2C1810]">B/. {cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#78350F] text-xs">
                      <span>Flete estimado (Tierras Altas):</span>
                      <span className="italic">Se calcula en checkout</span>
                    </div>
                    <div className="border-t border-[#E5D6BE] pt-2 flex justify-between items-baseline">
                      <span className="font-bold text-base text-[#2C1810]">Total estimado:</span>
                      <span className="text-2xl font-extrabold text-[#78350F]">
                        B/. {cartSubtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 rounded-full bg-[#B45309] hover:bg-[#78350F] active:scale-98 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceder al Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#78350F]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Pago seguro simulado (Yappy, ACH, Contra Entrega)</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
