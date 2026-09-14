import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { fetchZones, createOrder, FALLBACK_ZONES } from '../services/api';
import { X, MapPin, Calendar, Clock, CreditCard, Banknote, Smartphone, CheckCircle, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    cartSubtotal,
    clearCart,
    setCompletedOrder
  } = useCart();

  const [zones, setZones] = useState(FALLBACK_ZONES);
  const [selectedZoneId, setSelectedZoneId] = useState('volcan');
  const [paymentMethod, setPaymentMethod] = useState('yappy');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fecha mínima: Mañana (elaboración fresca en 24h)
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: tomorrowStr,
    deliveryTimeSlot: 'Mañana (9:00 AM - 1:00 PM)',
    yappyPhone: '',
    specialInstructions: ''
  });

  useEffect(() => {
    async function loadZones() {
      const data = await fetchZones();
      if (data && data.length > 0) {
        setZones(data);
      }
    }
    loadZones();
  }, []);

  if (!isCheckoutOpen) return null;

  const currentZone = zones.find(z => z.id === selectedZoneId) || zones[0];
  const deliveryCost = currentZone ? currentZone.cost : 0;
  const orderTotal = cartSubtotal + deliveryCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Por favor ingresa tu nombre y número de teléfono de contacto.');
      return;
    }

    if (currentZone.id !== 'pickup' && !formData.address.trim()) {
      setErrorMessage('Por favor especifica tu dirección o punto de referencia en la zona seleccionada.');
      return;
    }

    if (!formData.deliveryDate) {
      setErrorMessage('Selecciona una fecha para recibir tus postres frescos.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: currentZone.id === 'pickup' ? 'Retiro en Taller de Volcán' : formData.address
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        deliveryZoneId: selectedZoneId,
        deliveryDate: formData.deliveryDate,
        deliveryTimeSlot: formData.deliveryTimeSlot,
        paymentMethod,
        specialInstructions: formData.specialInstructions
      };

      const result = await createOrder(orderPayload);

      if (result.success && result.data) {
        clearCart();
        setIsCheckoutOpen(false);
        setCompletedOrder(result.data);
      } else {
        setErrorMessage(result.message || 'Ocurrió un error al procesar la orden.');
      }
    } catch (err) {
      setErrorMessage('Error al comunicar con el servidor.');
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
          className="fixed inset-0 bg-[#1D0F0A]/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#E5D6BE] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Encabezado */}
          <div className="p-5 sm:p-6 border-b border-[#E5D6BE] bg-[#FDF6E2] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider block">
                Finalizar Compra Artesanal
              </span>
              <h2 className="font-brand-title text-2xl font-bold text-[#2C1810]">
                Checkout & Entrega en Chiriquí
              </h2>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full hover:bg-[#F2E9D7] text-[#4A2B1B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-5 sm:p-8 space-y-6">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Paso 1: Datos de Contacto */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Datos de Contacto (Panamá)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. María Elena González"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Teléfono celular (WhatsApp / Yappy) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. 6789-0123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Correo electrónico (opcional para recibo)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>
            </div>

            {/* Paso 2: Logística y Zona de Entrega en Tierras Altas */}
            <div className="pt-4 border-t border-[#E5D6BE]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Zona de Entrega & Fecha Programada</span>
              </h3>

              {/* Selector de zona */}
              <div className="space-y-2 mb-4">
                <label className="block text-xs font-semibold text-[#4A2B1B]">
                  Selecciona la zona o modalidad:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {zones.map((zone) => {
                    const isSelected = selectedZoneId === zone.id;
                    return (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedZoneId(zone.id)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#B45309] bg-[#FDF6E2] shadow-xs'
                            : 'border-[#E5D6BE] bg-white hover:bg-[#FBF6EC]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-[#2C1810] mb-1">
                          <span className="flex items-center gap-1.5">
                            <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B45309]' : 'text-[#78350F]'}`} />
                            {zone.name}
                          </span>
                          <span className="text-[#B45309]">
                            {zone.cost === 0 ? 'Gratis' : `+$${zone.cost.toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#674029] line-clamp-1">
                          {zone.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dirección específica si es a domicilio */}
              {selectedZoneId !== 'pickup' && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Dirección exacta y punto de referencia *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Ej. Calle Principal, cerca del Hotel Bambito, casa verde"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              )}

              {/* Fecha y Franja Horaria (Por Encargo) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#FBF6EC] p-3.5 rounded-2xl border border-[#E5D6BE]">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Fecha de entrega / retiro *</span>
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    min={tomorrowStr}
                    required
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D6BE] bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                  <span className="text-[10px] text-[#78350F] block mt-1">
                    * Mínimo 24h para garantizar la frescura de la leche y cocción lenta.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Franja horaria preferida</span>
                  </label>
                  <select
                    name="deliveryTimeSlot"
                    value={formData.deliveryTimeSlot}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D6BE] bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  >
                    <option value="Mañana (9:00 AM - 1:00 PM)">Mañana (9:00 AM - 1:00 PM)</option>
                    <option value="Tarde (2:00 PM - 6:00 PM)">Tarde (2:00 PM - 6:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Paso 3: Forma de Pago Panameña */}
            <div className="pt-4 border-t border-[#E5D6BE]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Forma de Pago (Simulación Panameña)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {/* Opción 1: Yappy */}
                <div
                  onClick={() => setPaymentMethod('yappy')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    paymentMethod === 'yappy'
                      ? 'border-[#0089D0] bg-[#F0F9FF] ring-2 ring-[#0089D0]/30'
                      : 'border-[#E5D6BE] bg-white hover:bg-[#FBF6EC]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#0089D0] text-white flex items-center justify-center font-black text-sm mb-1.5 shadow-xs">
                    Y!
                  </div>
                  <span className="font-bold text-xs text-[#2C1810]">Yappy Panamá</span>
                  <span className="text-[10px] text-[#0089D0] font-semibold">@dulcesaborpanama</span>
                </div>

                {/* Opción 2: Transferencia ACH */}
                <div
                  onClick={() => setPaymentMethod('ach')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    paymentMethod === 'ach'
                      ? 'border-[#B45309] bg-[#FDF6E2] ring-2 ring-[#B45309]/30'
                      : 'border-[#E5D6BE] bg-white hover:bg-[#FBF6EC]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#78350F] text-white flex items-center justify-center mb-1.5 shadow-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#2C1810]">Transferencia ACH</span>
                  <span className="text-[10px] text-[#78350F] font-semibold">Banco General</span>
                </div>

                {/* Opción 3: Pago Contra Entrega */}
                <div
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    paymentMethod === 'cash'
                      ? 'border-[#16A34A] bg-[#F0FDF4] ring-2 ring-[#16A34A]/30'
                      : 'border-[#E5D6BE] bg-white hover:bg-[#FBF6EC]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center mb-1.5 shadow-xs">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#2C1810]">Contra Entrega</span>
                  <span className="text-[10px] text-[#16A34A] font-semibold">Efectivo al recibir</span>
                </div>
              </div>

              {/* Detalles según el método seleccionado */}
              <div className="p-3.5 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] text-xs text-[#4A2B1B]">
                {paymentMethod === 'yappy' && (
                  <div className="space-y-1">
                    <p className="font-bold text-[#0089D0] flex items-center gap-1">
                      <span>🔵 Simulación de Pago por Yappy:</span>
                    </p>
                    <p>Directorio: <strong className="text-[#2C1810]">@dulcesaborpanama</strong> | Teléfono: <strong>6745-9921</strong></p>
                    <p className="text-[11px] text-[#674029]">
                      Al presionar "Confirmar Pedido", se generará tu factura simulada con el botón para validar la transacción.
                    </p>
                  </div>
                )}
                {paymentMethod === 'ach' && (
                  <div className="space-y-1">
                    <p className="font-bold text-[#78350F]">🏦 Datos Bancarios para ACH (Panamá):</p>
                    <p>Banco: <strong>Banco General</strong> | Tipo: <strong>Cuenta Corriente</strong></p>
                    <p>Número: <strong>03-95-01-123456-7</strong> | Titular: <strong>Dulce Sabor Artesanal S.A.</strong></p>
                  </div>
                )}
                {paymentMethod === 'cash' && (
                  <div className="space-y-1">
                    <p className="font-bold text-[#16A34A]">💵 Pago en Efectivo:</p>
                    <p>Pagarás exactamente <strong>${orderTotal.toFixed(2)}</strong> al momento de recibir en tu domicilio en {currentZone.name} o retirar en el taller de Volcán.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Resumen de Costos y Confirmación */}
            <div className="pt-4 border-t border-[#E5D6BE] bg-[#FDF6E2] -mx-5 -mb-5 sm:-mx-8 sm:-mb-8 p-5 sm:p-8">
              <div className="space-y-1.5 text-xs text-[#674029] mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} postres):</span>
                  <span className="font-bold text-[#2C1810]">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flete ({currentZone.name}):</span>
                  <span className="font-bold text-[#2C1810]">
                    {deliveryCost === 0 ? 'Gratis (Retiro)' : `$${deliveryCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-[#E5D6BE] pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-base text-[#2C1810]">Total a Pagar:</span>
                  <span className="text-2xl font-extrabold text-[#B45309]">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#B45309] hover:bg-[#78350F] active:scale-98 text-white font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Registrando tu pedido...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirmar y Reservar Pedido Fresco (${orderTotal.toFixed(2)})</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#78350F]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Garantía de sabor artesanal y entrega puntual en Tierras Altas</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
