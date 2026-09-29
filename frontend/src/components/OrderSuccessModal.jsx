import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { YAPPY_NUMERO, WHATSAPP_NUMERO, LOCALIDAD } from '../config/negocio';
import { CheckCircle2, MapPin, Calendar, Clock, Phone, MessageSquare, AlertCircle, ShoppingBag } from 'lucide-react';

export default function OrderSuccessModal() {
  const { completedOrder, setCompletedOrder } = useCart();

  useEffect(() => {
    if (completedOrder) {
      // Disparar confeti festivo
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#B45309', '#F59E0B', '#DC2626', '#16A34A']
      });
    }
  }, [completedOrder]);

  if (!completedOrder) return null;

  const order = completedOrder;

  // Lista de productos para el mensaje de WhatsApp
  const itemsText = order.items
    .map(it => `• ${it.quantity}x ${it.name} (B/.${((it.unitPrice || it.price) * it.quantity).toFixed(2)})`)
    .join('\n');

  const deliveryCostVal = order.deliveryCost ?? order.delivery?.cost ?? 0;

  // Mensaje automático oficial y detallado para WhatsApp
  const rawWhatsappMsg =
    `¡Hola, Dulce Sabor! Acabo de registrar mi pedido en la web.\n\n` +
    `📋 Número de Pedido: ${order.orderId}\n` +
    `👤 Nombre: ${order.customer?.name || 'Cliente'}\n` +
    `📞 Teléfono: ${order.customer?.phone || ''}\n` +
    `📍 Punto de Entrega: ${order.customer?.address || ''} (${order.delivery?.zoneName || order.customer?.comunidad || LOCALIDAD.comunidad})\n\n` +
    `🍮 Productos:\n${itemsText}\n\n` +
    `📦 Costo de Envío: B/.${Number(deliveryCostVal).toFixed(2)}\n` +
    `💰 Total a Pagar: B/.${Number(order.total).toFixed(2)}\n\n` +
    `💳 Pago por Yappy al: ${YAPPY_NUMERO}\n` +
    `🔖 Concepto Yappy: ${order.orderId}\n\n` +
    `Adjunto mi comprobante de pago por este medio para su verificación manual. ¡Muchas gracias!`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(rawWhatsappMsg)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1D0F0A]/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#E5D6BE] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Cabecera con Mascota e Identidad */}
          <div className="p-6 text-center bg-gradient-to-b from-[#FDF6E2] to-[#FFFDF9] border-b border-[#E5D6BE] relative">
            <div className="flex justify-center mb-3">
              <div className="relative">
                <img
                  src="/images/brand/personaje-variantes.webp"
                  alt="Mascota oficial Dulce Sabor saludando"
                  loading="lazy"
                  className="w-24 h-24 object-contain mx-auto drop-shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider block mb-1">
              ¡Pedido Registrado con Éxito!
            </span>
            <h2 className="font-brand-title text-2xl sm:text-3xl font-bold text-[#2C1810]">
              Gracias por preferir Dulce Sabor
            </h2>
            <p className="text-xs sm:text-sm text-[#674029] mt-1 max-w-md mx-auto">
              Tus postres tradicionales comenzarán su proceso artesanal en {LOCALIDAD.direccionCorta}.
            </p>
          </div>

          {/* Cuerpo del Recibo */}
          <div className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-[#4A2B1B]">
            {/* Tarjeta de Código de Pedido y Estado */}
            <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] text-[#78350F] uppercase font-bold tracking-wider block">
                  Número de Pedido Único
                </span>
                <span className="text-2xl font-extrabold text-[#78350F] font-mono tracking-wider">
                  {order.orderId}
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-end gap-1">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pendiente de pago</span>
                </span>
                <span className="text-[10px] text-[#78350F]">
                  Confirmación manual por el negocio
                </span>
              </div>
            </div>

            {/* Total a Pagar Destacado */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FEF3C7] to-[#FDF6E2] border border-[#F59E0B]/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E] block">
                  Total a Pagar:
                </span>
                <span className="text-xs text-[#78350F]">
                  Incluye postres y flete a {order.delivery?.zoneName || 'tu comunidad'}
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#B45309]">
                B/. {Number(order.total).toFixed(2)}
              </span>
            </div>

            {/* Guía e Instrucciones de Pago por Yappy */}
            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0089D0] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                  Y
                </div>
                <span className="font-bold text-[#1E40AF] uppercase tracking-wider text-xs">
                  Instrucciones de Pago por Yappy
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#DBEAFE] space-y-1">
                <p className="text-sm font-bold text-[#1E3A8A] leading-relaxed">
                  Paga por Yappy al <span className="font-mono text-base font-extrabold text-[#0F172A] bg-amber-100 px-1.5 py-0.5 rounded">{YAPPY_NUMERO}</span> con el número de pedido como concepto y envía tu comprobante por WhatsApp.
                </p>
                <p className="text-[11px] text-[#475569]">
                  Concepto / Nota en Yappy: <strong className="font-mono text-amber-900">{order.orderId}</strong>
                </p>
              </div>

              <div className="text-[11px] text-[#1E40AF] bg-[#DBEAFE]/50 p-2.5 rounded-lg flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>
                  <strong>Aviso importante:</strong> El estado de tu pedido permanecerá estrictamente como <strong>"Pendiente de pago"</strong> hasta que nuestro equipo verifique manualmente la transacción de Yappy en WhatsApp.
                </span>
              </div>
            </div>

            {/* Detalles de Entrega */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-[#E5D6BE]">
              <div className="space-y-1">
                <span className="font-bold text-[#78350F] uppercase tracking-wider text-[10px] block">
                  Cliente & Contacto:
                </span>
                <p className="font-bold text-[#2C1810] text-sm">{order.customer?.name}</p>
                <p className="flex items-center gap-1 text-[#674029]">
                  <Phone className="w-3 h-3 text-[#16A34A]" /> {order.customer?.phone}
                </p>
                <p className="text-[#674029]">{order.customer?.address}</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#E5D6BE] pt-2 sm:pt-0 sm:pl-4">
                <span className="font-bold text-[#78350F] uppercase tracking-wider text-[10px] block">
                  Zona de Entrega (Renacimiento):
                </span>
                <p className="font-bold text-[#2C1810] flex items-center gap-1 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#B45309]" /> {order.delivery?.zoneName || order.customer?.comunidad}
                </p>
                <p className="text-[#674029] text-[11px]">
                  Costo de envío: <strong>B/. {Number(deliveryCostVal).toFixed(2)}</strong>
                </p>
                <p className="text-[#78350F] text-[11px] italic">
                  Elaboración artesanal por encargo (24h de anticipación)
                </p>
              </div>
            </div>

            {/* Resumen de Postres Encargados */}
            <div>
              <span className="font-bold text-[#78350F] uppercase tracking-wider text-[10px] block mb-2">
                Resumen de Productos:
              </span>
              <div className="border border-[#E5D6BE] rounded-2xl overflow-hidden divide-y divide-[#E5D6BE]">
                {order.items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between bg-white">
                    <div>
                      <span className="font-bold text-[#2C1810] text-sm">{it.name}</span>
                      <span className="text-[#78350F] block text-[11px]">
                        Cantidad: {it.quantity} x B/. {Number(it.unitPrice || it.price).toFixed(2)}
                      </span>
                    </div>
                    <span className="font-extrabold text-[#4A2B1B] text-sm">
                      B/. {Number((it.unitPrice || it.price) * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="p-3 bg-[#FDF6E2] flex items-center justify-between font-bold text-sm">
                  <span>Total final del pedido:</span>
                  <span className="text-base text-[#B45309] font-extrabold">
                    B/. {Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="p-5 sm:p-6 border-t border-[#E5D6BE] bg-[#FDF6E2] flex flex-col sm:flex-row items-center justify-end gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar comprobante por WhatsApp</span>
            </a>

            <button
              onClick={() => setCompletedOrder(null)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#4A2B1B] hover:bg-[#2C1810] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Volver a la Tienda
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
