import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { fetchZones, createOrder, FALLBACK_ZONES } from '../services/api';
import { X, MapPin, Calendar, Clock, CreditCard, Banknote, CheckCircle, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

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

  // Validación real de pago: casillas de verificación obligatorias
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isAdvanceConfirmed, setIsAdvanceConfirmed] = useState(false);

  // Fecha mínima: Mañana (elaboración fresca en 24h)
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Datos limpios sin autocompletar ni datos personales precargados
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: tomorrowStr,
    deliveryTimeSlot: 'Mañana (9:00 AM - 1:00 PM)',
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

  // Reiniciar confirmaciones si cambia de método de pago
  const handleSelectPaymentMethod = (method) => {
    setPaymentMethod(method);
    setIsPaymentConfirmed(false);
    setIsAdvanceConfirmed(false);
    setErrorMessage('');
  };

  if (!isCheckoutOpen) return null;

  const currentZone = zones.find(z => z.id === selectedZoneId) || zones[0];
  const deliveryCost = currentZone ? currentZone.cost : 0;
  const orderTotal = Number((cartSubtotal + deliveryCost).toFixed(2));

  // Anticipo obligatorio del 50% para Contra Entrega
  const advanceAmount = Number((orderTotal * 0.5).toFixed(2));
  const remainingAmount = Number((orderTotal - advanceAmount).toFixed(2));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validaciones lógicas reales
  const hasName = formData.name.trim().length > 0;
  const hasPhone = formData.phone.trim().length > 0;
  const hasAddress = selectedZoneId === 'pickup' || formData.address.trim().length > 0;
  const hasDate = Boolean(formData.deliveryDate);
  const hasPaymentRequirement = paymentMethod === 'cash' ? isAdvanceConfirmed : isPaymentConfirmed;

  const isFormValid = hasName && hasPhone && hasAddress && hasDate && hasPaymentRequirement;

  // Mensaje de validación pendiente
  const getValidationPendingMessage = () => {
    if (!hasName || !hasPhone) {
      return 'Completa tu nombre y teléfono para continuar.';
    }
    if (selectedZoneId !== 'pickup' && !hasAddress) {
      return 'Ingresa tu dirección de entrega en la zona seleccionada.';
    }
    if (!hasDate) {
      return 'Selecciona una fecha de entrega.';
    }
    if (paymentMethod === 'cash' && !isAdvanceConfirmed) {
      return 'Debes confirmar el pago del anticipo del 50% para continuar.';
    }
    if ((paymentMethod === 'yappy' || paymentMethod === 'ach') && !isPaymentConfirmed) {
      return 'Realiza el pago y confirma que ya lo efectuaste para enviar tu pedido.';
    }
    return '';
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!hasName || !hasPhone) {
      setErrorMessage('Por favor ingresa tu nombre y número de teléfono de contacto.');
      return;
    }

    if (selectedZoneId !== 'pickup' && !hasAddress) {
      setErrorMessage('Por favor especifica tu dirección o punto de referencia en la zona seleccionada.');
      return;
    }

    if (!hasDate) {
      setErrorMessage('Selecciona una fecha para recibir tus postres frescos.');
      return;
    }

    if (paymentMethod === 'cash' && !isAdvanceConfirmed) {
      setErrorMessage('Debes confirmar el pago del anticipo del 50% para continuar.');
      return;
    }

    if ((paymentMethod === 'yappy' || paymentMethod === 'ach') && !isPaymentConfirmed) {
      setErrorMessage('Debes confirmar que ya realizaste el pago para poder enviar el pedido.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: selectedZoneId === 'pickup' ? 'Retiro en Taller de Volcán' : formData.address.trim()
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
        paymentVerification: {
          confirmedByUser: true,
          advancePaid: paymentMethod === 'cash' ? advanceAmount : orderTotal,
          remainingBalance: paymentMethod === 'cash' ? remainingAmount : 0
        },
        specialInstructions: formData.specialInstructions.trim()
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

          {/* Formulario con protección contra autocompletado */}
          <form
            onSubmit={handleSubmitOrder}
            autoComplete="off"
            className="overflow-y-auto p-5 sm:p-8 space-y-6"
          >
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Paso 1: Datos del Cliente (Sin Autocompletar) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Datos del Cliente (Panamá)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="new-password"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Escribe tu nombre y apellido"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Teléfono celular (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="new-password"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. 6XXX-XXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Correo electrónico (opcional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="new-password"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>
            </div>

            {/* Paso 2: Zona de Entrega & Fecha */}
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
                            {zone.cost === 0 ? 'Gratis' : `+B/.${zone.cost.toFixed(2)}`}
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
                    autoComplete="new-password"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Calle, número de casa, punto de referencia en Chiriquí"
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

            {/* Paso 3: Forma de Pago y Validación Obligatoria */}
            <div className="pt-4 border-t border-[#E5D6BE]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A2B1B] mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Forma de Pago & Confirmación Obligatoria</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {/* Opción 1: Yappy */}
                <div
                  onClick={() => handleSelectPaymentMethod('yappy')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    paymentMethod === 'yappy'
                      ? 'border-[#0089D0] bg-[#F0F9FF] ring-2 ring-[#0089D0]/30 shadow-xs'
                      : 'border-[#E5D6BE] bg-white hover:bg-[#FBF6EC]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#0089D0] text-white flex items-center justify-center font-black text-sm mb-1.5 shadow-xs">
                    Y!
                  </div>
                  <span className="font-bold text-xs text-[#2C1810]">Yappy Panamá</span>
                  <span className="text-[10px] text-[#0089D0] font-semibold">6167-2499</span>
                </div>

                {/* Opción 2: Transferencia ACH */}
                <div
                  onClick={() => handleSelectPaymentMethod('ach')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    paymentMethod === 'ach'
                      ? 'border-[#B45309] bg-[#FDF6E2] ring-2 ring-[#B45309]/30 shadow-xs'
                      : 'border-[#E5D6BE] bg-white hover:bg-[#FBF6EC]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#78350F] text-white flex items-center justify-center mb-1.5 shadow-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#2C1810]">Transferencia ACH</span>
                  <span className="text-[10px] text-[#78350F] font-semibold">Banco General</span>
                </div>

                {/* Opción 3: Pago Contra Entrega (Anticipo 50%) */}
                <div
                  onClick={() => handleSelectPaymentMethod('cash')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                    paymentMethod === 'cash'
                      ? 'border-[#B45309] bg-[#FFFBEB] ring-2 ring-[#B45309]/30 shadow-xs'
                      : 'border-[#E5D6BE] bg-white hover:bg-[#FBF6EC]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#B45309] text-white flex items-center justify-center mb-1.5 shadow-xs">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#2C1810]">Contra Entrega</span>
                  <span className="text-[10px] text-[#B45309] font-bold">50% anticipo</span>
                </div>
              </div>

              {/* DETALLE Y VALIDACIÓN SEGÚN EL MÉTODO SELECCIONADO */}

              {/* Caso A: YAPPY */}
              {paymentMethod === 'yappy' && (
                <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#0C4A6E] space-y-3">
                  <div>
                    <p className="font-bold text-[#0369A1] text-sm mb-1 flex items-center gap-1.5">
                      <span>🔵 Pago Total por Yappy:</span>
                    </p>
                    <p className="font-semibold text-[#0C4A6E]">
                      Realiza el pago y confirma que ya lo efectuaste para enviar tu pedido.
                    </p>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl border border-[#BAE6FD] space-y-1">
                    <p>Monto a transferir: <strong className="text-base text-[#0369A1]">B/. {orderTotal.toFixed(2)}</strong></p>
                    <p>Teléfono Yappy: <strong className="text-sm font-mono text-[#2C1810]">6167-2499</strong></p>
                    <p>Directorio Comercial: <strong className="text-[#2C1810]">@dulcesaborpanama</strong></p>
                  </div>
                  {/* Casilla obligatoria */}
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border-2 border-[#0089D0] cursor-pointer hover:bg-sky-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isPaymentConfirmed}
                      onChange={(e) => setIsPaymentConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#0089D0] rounded focus:ring-[#0089D0]"
                    />
                    <span className="font-bold text-xs text-[#0369A1]">
                      [✓] Confirmo que ya realicé el pago de B/. {orderTotal.toFixed(2)} por Yappy al 6167-2499.
                    </span>
                  </label>
                </div>
              )}

              {/* Caso B: TRANSFERENCIA ACH */}
              {paymentMethod === 'ach' && (
                <div className="p-4 rounded-2xl bg-[#FDF6E2] border border-[#FDE68A] text-xs text-[#78350F] space-y-3">
                  <div>
                    <p className="font-bold text-[#92400E] text-sm mb-1 flex items-center gap-1.5">
                      <span>🏦 Pago Total por Transferencia ACH:</span>
                    </p>
                    <p className="font-semibold text-[#78350F]">
                      Realiza el pago y confirma que ya lo efectuaste para enviar tu pedido.
                    </p>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl border border-[#FDE68A] space-y-1">
                    <p>Monto a transferir: <strong className="text-base text-[#92400E]">B/. {orderTotal.toFixed(2)}</strong></p>
                    <p>Banco: <strong>Banco General de Panamá</strong></p>
                    <p>Tipo de Cuenta: <strong>Cuenta Corriente</strong></p>
                    <p>Número de Cuenta: <strong className="font-mono text-[#2C1810]">03-95-01-123456-7</strong></p>
                    <p>Beneficiario: <strong>Dulce Sabor Artesanal S.A.</strong></p>
                  </div>
                  {/* Casilla obligatoria */}
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border-2 border-[#B45309] cursor-pointer hover:bg-amber-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isPaymentConfirmed}
                      onChange={(e) => setIsPaymentConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#B45309] rounded focus:ring-[#D97706]"
                    />
                    <span className="font-bold text-xs text-[#92400E]">
                      [✓] Confirmo que ya realicé el pago de B/. {orderTotal.toFixed(2)} por transferencia ACH.
                    </span>
                  </label>
                </div>
              )}

              {/* Caso C: CONTRA ENTREGA — ANTICIPO OBLIGATORIO DEL 50% */}
              {paymentMethod === 'cash' && (
                <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#F59E0B] text-xs text-[#78350F] space-y-3 shadow-xs">
                  <div>
                    <p className="font-bold text-[#B45309] text-sm mb-1 flex items-center gap-1.5">
                      <span>⚠️ Contra Entrega — Anticipo Obligatorio del 50%:</span>
                    </p>
                    <p className="font-semibold text-[#92400E] leading-relaxed">
                      "Para confirmar pedidos contra entrega se requiere un anticipo del 50% del total. El 50% restante se paga al recibir."
                    </p>
                  </div>

                  {/* Desglose dinámico 50% / 50% */}
                  <div className="p-3 bg-white rounded-xl border border-[#FDE68A] space-y-1.5 font-medium">
                    <div className="flex justify-between text-xs text-[#674029]">
                      <span>Total del pedido:</span>
                      <strong className="text-[#2C1810]">B/. {orderTotal.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between text-xs text-[#B45309] pt-1 border-t border-[#FDE68A]">
                      <span className="font-bold">Anticipo requerido (50%):</span>
                      <strong className="text-sm font-bold text-[#B45309]">B/. {advanceAmount.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between text-xs text-[#15803D]">
                      <span>Saldo al recibir (50% restante):</span>
                      <strong className="text-sm font-bold text-[#15803D]">B/. {remainingAmount.toFixed(2)}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#674029]">
                    Envía el anticipo de <strong>B/. {advanceAmount.toFixed(2)}</strong> por Yappy al <strong>6167-2499</strong> (@dulcesaborpanama) o ACH Banco General.
                  </p>

                  {/* Casilla obligatoria de anticipo */}
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white border-2 border-[#B45309] cursor-pointer hover:bg-amber-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isAdvanceConfirmed}
                      onChange={(e) => setIsAdvanceConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#B45309] rounded focus:ring-[#D97706]"
                    />
                    <span className="font-bold text-xs text-[#B45309]">
                      [✓] Confirmo que realicé el pago del anticipo del 50% (B/. {advanceAmount.toFixed(2)}).
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Resumen de Costos y Confirmación */}
            <div className="pt-4 border-t border-[#E5D6BE] bg-[#FDF6E2] -mx-5 -mb-5 sm:-mx-8 sm:-mb-8 p-5 sm:p-8">
              <div className="space-y-1.5 text-xs text-[#674029] mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} postres):</span>
                  <span className="font-bold text-[#2C1810]">B/. {cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Flete ({currentZone.name}):</span>
                  <span className="font-bold text-[#2C1810]">
                    {deliveryCost === 0 ? 'Gratis (Retiro)' : `B/. ${deliveryCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-[#E5D6BE] pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-base text-[#2C1810]">Total del Pedido:</span>
                  <span className="text-2xl font-extrabold text-[#B45309]">
                    B/. {orderTotal.toFixed(2)}
                  </span>
                </div>

                {paymentMethod === 'cash' && (
                  <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs space-y-1 mt-2">
                    <div className="flex justify-between text-[#B45309] font-bold">
                      <span>Anticipo a pagar ahora (50%):</span>
                      <span>B/. {advanceAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#15803D] font-bold">
                      <span>Saldo a pagar al recibir (50%):</span>
                      <span>B/. {remainingAmount.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mensaje de requisito faltante */}
              {!isFormValid && (
                <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="font-medium">{getValidationPendingMessage()}</span>
                </div>
              )}

              {/* Botón de Confirmación: bloqueado hasta cumplir los requisitos */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-4 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isFormValid && !loading
                    ? 'bg-[#B45309] hover:bg-[#78350F] active:scale-98 text-white cursor-pointer shadow-[#B45309]/30 hover:shadow-xl'
                    : 'bg-[#D1D5DB] text-[#6B7280] cursor-not-allowed opacity-75'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Registrando tu pedido...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      {paymentMethod === 'cash'
                        ? `Confirmar Pedido (Anticipo B/. ${advanceAmount.toFixed(2)})`
                        : `Confirmar y Reservar Pedido (B/. ${orderTotal.toFixed(2)})`}
                    </span>
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
