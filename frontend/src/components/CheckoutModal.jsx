import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FALLBACK_PRODUCTS, createOrder } from '../services/api';
import { YAPPY_NUMERO, ZONAS_ENTREGA, LOCALIDAD } from '../config/negocio';
import { X, MapPin, Phone, User, Home, AlertCircle, Loader2, CheckCircle2, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    clearCart,
    setCompletedOrder
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comunidadId: ZONAS_ENTREGA[0]?.id || 'caisan-centro'
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  // Recalcular precios de forma estricta desde el catálogo para evitar datos alterables
  const validatedItems = cartItems.map(item => {
    const catalogItem = FALLBACK_PRODUCTS.find(p => p.id === item.id);
    const unitPrice = catalogItem ? catalogItem.price : item.price;
    const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
    return {
      ...item,
      price: unitPrice,
      quantity,
      itemTotal: Number((unitPrice * quantity).toFixed(2))
    };
  });

  const subtotal = Number(validatedItems.reduce((acc, it) => acc + it.itemTotal, 0).toFixed(2));
  const currentZone = (Array.isArray(ZONAS_ENTREGA) && ZONAS_ENTREGA.find(z => z.id === formData.comunidadId)) || ZONAS_ENTREGA[0] || {};
  const rawDeliveryCost = currentZone.costo ?? currentZone.cost ?? 0;
  const deliveryCost = Number((typeof rawDeliveryCost === 'number' ? rawDeliveryCost : parseFloat(rawDeliveryCost) || 0).toFixed(2));
  const orderTotal = Number((subtotal + deliveryCost).toFixed(2));

  const hasName = formData.name.trim().length > 0;
  const hasPhone = formData.phone.trim().length > 0;
  const hasAddress = formData.address.trim().length > 0;
  const isFormValid = hasName && hasPhone && hasAddress && validatedItems.length > 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isFormValid) {
      setErrorMessage('Por favor completa tu nombre, teléfono y dirección o punto de entrega.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          comunidad: currentZone.nombre
        },
        items: validatedItems,
        deliveryZoneId: currentZone.id,
        paymentMethod: 'yappy'
      };

      const result = await createOrder(orderPayload);

      if (result.success && result.data) {
        // Guardar pedido generado y limpiar carrito
        clearCart();
        setIsCheckoutOpen(false);
        setCompletedOrder(result.data);
      } else {
        setErrorMessage(result.message || 'Ocurrió un error al registrar el pedido.');
      }
    } catch (err) {
      setErrorMessage('No se pudo conectar con el servidor. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-[#1D0F0A]/75 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#E5D6BE] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Encabezado */}
          <div className="p-5 sm:p-6 border-b border-[#E5D6BE] bg-[#FDF6E2] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider block">
                Finalizar Pedido Artesanal
              </span>
              <h2 className="font-brand-title text-2xl font-bold text-[#2C1810]">
                Checkout • Dulce Sabor
              </h2>
              <p className="text-xs text-[#78350F] mt-0.5">
                {LOCALIDAD.direccionCorta}
              </p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full hover:bg-[#F2E9D7] text-[#4A2B1B] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmitOrder}
            autoComplete="off"
            className="overflow-y-auto p-5 sm:p-7 space-y-6"
          >
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Paso 1: Datos del Cliente */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                <span>Datos del Cliente y Entrega</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Nombre */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Nombre completo *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="new-password"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. María González"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Teléfono celular (WhatsApp) *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="new-password"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. 6123-4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                {/* Selector de Comunidad */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Comunidad de entrega (Renacimiento y alrededores) *</span>
                  </label>
                  <select
                    name="comunidadId"
                    value={formData.comunidadId}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  >
                    {Array.isArray(ZONAS_ENTREGA) && ZONAS_ENTREGA.map((zone) => {
                      const rawCost = zone?.costo ?? zone?.cost ?? 0;
                      const numericCost = typeof rawCost === 'number' ? rawCost : parseFloat(rawCost) || 0;
                      return (
                        <option key={zone.id} value={zone.id}>
                          {zone.nombre} — Envío: B/. {numericCost.toFixed(2)} ({zone.tiempo})
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-[11px] text-[#78350F] mt-1">
                    {currentZone?.descripcion || ''}
                  </p>
                </div>

                {/* Dirección exacta */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Dirección exacta o punto de entrega *</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    autoComplete="new-password"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Calle, número de casa, local comercial o punto de referencia conocido"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>
            </div>

            {/* Paso 2: Método de Pago (Yappy Directo) */}
            <div className="pt-4 border-t border-[#E5D6BE]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                <span>Método de Pago</span>
              </h3>

              <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0089D0] text-white font-extrabold flex items-center justify-center text-sm shrink-0 shadow-xs">
                  Y
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0369A1]">Pago por Yappy</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1]">
                      Directo sin pasarela
                    </span>
                  </div>
                  <p className="text-[#0C4A6E] mt-1 leading-relaxed">
                    Número Yappy: <strong className="font-mono text-sm text-[#2C1810]">{YAPPY_NUMERO}</strong>
                  </p>
                  <p className="text-[11px] text-[#0C4A6E] mt-1 bg-white/70 p-2 rounded-lg border border-[#BAE6FD]">
                    Al pulsar <strong>Confirmar pedido</strong>, se generará tu número de pedido único (<span className="font-mono font-bold">DS-XXXXXX</span>) para que realices el pago por Yappy e inmediatamente envíes tu comprobante por WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            {/* Paso 3: Resumen del Pedido */}
            <div className="pt-4 border-t border-[#E5D6BE]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                <span>Resumen del Pedido</span>
              </h3>

              {/* Lista de productos */}
              <div className="border border-[#E5D6BE] rounded-2xl overflow-hidden divide-y divide-[#E5D6BE] mb-4 bg-white text-xs">
                {validatedItems.map(item => (
                  <div key={item.id} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FBF6EC] border border-[#E5D6BE] flex items-center justify-center text-xs">
                        🍮
                      </div>
                      <div>
                        <span className="font-bold text-[#2C1810] block">{item.name}</span>
                        <span className="text-[11px] text-[#78350F]">
                          {item.quantity} x B/. {item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#2C1810]">
                      B/. {item.itemTotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desglose de totales */}
              <div className="p-4 rounded-2xl bg-[#FDF6E2] border border-[#E5D6BE] space-y-2 text-xs">
                <div className="flex justify-between text-[#674029]">
                  <span>Subtotal de postres:</span>
                  <span className="font-bold text-[#2C1810]">B/. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#674029]">
                  <span>Costo de envío ({currentZone.nombre}):</span>
                  <span className="font-bold text-[#2C1810]">B/. {deliveryCost.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#E5D6BE] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#2C1810]">Total a Pagar:</span>
                  <span className="text-2xl font-extrabold text-[#B45309]">
                    B/. {orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Botón de Confirmación */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isFormValid && !loading
                    ? 'bg-[#B45309] hover:bg-[#78350F] active:scale-98 text-white cursor-pointer shadow-[#B45309]/30 hover:shadow-xl'
                    : 'bg-[#D1D5DB] text-[#6B7280] cursor-not-allowed opacity-80'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Registrando pedido...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirmar pedido (B/. {orderTotal.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#78350F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Postres tradicionales preparados frescos por encargo en Caisán</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
