import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, MapPin, Calendar, Clock, Phone, MessageSquare, Download, Check, Sparkles } from 'lucide-react';

export default function OrderSuccessModal() {
  const { completedOrder, setCompletedOrder } = useCart();

  useEffect(() => {
    if (completedOrder) {
      // Disparar confeti artesanal festivo
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#B45309', '#F59E0B', '#DC2626', '#16A34A']
      });
    }
  }, [completedOrder]);

  if (!completedOrder) return null;

  const order = completedOrder;

  // Enlace para enviar confirmación por WhatsApp al negocio
  const whatsappMessage = encodeURIComponent(
    `¡Hola Dulce Sabor! Acabo de realizar el pedido ${order.orderId} a nombre de ${order.customer.name} por un total de $${order.total.toFixed(2)} para entrega en ${order.delivery.zoneName} el día ${order.delivery.date}. Método de pago: ${order.payment.method.toUpperCase()}.`
  );
  const whatsappUrl = `https://wa.me/50767459921?text=${whatsappMessage}`;

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
          {/* Cabecera de Éxito */}
          <div className="p-6 text-center bg-gradient-to-b from-[#FDF6E2] to-[#FFFDF9] border-b border-[#E5D6BE]">
            <div className="w-16 h-16 rounded-full bg-[#16A34A] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#16A34A]/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider block mb-1">
              ¡Pedido Confirmado con Éxito!
            </span>
            <h2 className="font-brand-title text-2xl sm:text-3xl font-bold text-[#2C1810]">
              Gracias por preferir Dulce Sabor
            </h2>
            <p className="text-sm text-[#674029] mt-1">
              Tus postres tradicionales comenzarán su proceso artesanal de cocción fresca.
            </p>
          </div>

          {/* Cuerpo del Recibo */}
          <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[#4A2B1B]">
            {/* Tarjeta de Código de Pedido */}
            <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] text-[#78350F] uppercase font-bold tracking-wider block">
                  Número de Pedido
                </span>
                <span className="text-xl font-extrabold text-[#78350F] font-mono tracking-wider">
                  {order.orderId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] font-bold text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {order.status || 'En preparación'}
                </span>
              </div>
            </div>

            {/* Detalles de Entrega */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-[#E5D6BE]">
              <div className="space-y-1">
                <span className="font-bold text-[#78350F] uppercase tracking-wider text-[10px] block">
                  Cliente & Contacto:
                </span>
                <p className="font-bold text-[#2C1810] text-sm">{order.customer.name}</p>
                <p className="flex items-center gap-1 text-[#674029]">
                  <Phone className="w-3 h-3 text-[#D97706]" /> {order.customer.phone}
                </p>
                <p className="text-[#674029]">{order.customer.address}</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#E5D6BE] pt-2 sm:pt-0 sm:pl-4">
                <span className="font-bold text-[#78350F] uppercase tracking-wider text-[10px] block">
                  Programación en Chiriquí:
                </span>
                <p className="font-bold text-[#2C1810] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B45309]" /> {order.delivery.zoneName}
                </p>
                <p className="flex items-center gap-1 text-[#674029]">
                  <Calendar className="w-3 h-3 text-[#D97706]" /> {order.delivery.date}
                </p>
                <p className="flex items-center gap-1 text-[#674029]">
                  <Clock className="w-3 h-3 text-[#D97706]" /> {order.delivery.timeSlot}
                </p>
              </div>
            </div>

            {/* Postres Encargados */}
            <div>
              <span className="font-bold text-[#78350F] uppercase tracking-wider text-[10px] block mb-2">
                Resumen de Postres:
              </span>
              <div className="border border-[#E5D6BE] rounded-2xl overflow-hidden divide-y divide-[#E5D6BE]">
                {order.items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between bg-white">
                    <div>
                      <span className="font-bold text-[#2C1810] text-sm">{it.name}</span>
                      <span className="text-[#78350F] block text-[11px]">
                        Cantidad: {it.quantity} x ${it.unitPrice ? it.unitPrice.toFixed(2) : it.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="font-extrabold text-[#4A2B1B] text-sm">
                      ${((it.unitPrice || it.price) * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="p-3 bg-[#FDF6E2] flex items-center justify-between font-bold text-sm">
                  <span>Total con flete incluido:</span>
                  <span className="text-base text-[#B45309] font-extrabold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Guía de Pago Simulado */}
            <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD]">
              <span className="font-bold text-[#0369A1] uppercase tracking-wider text-[10px] block mb-1">
                Instrucciones de Pago ({order.payment.method.toUpperCase()}):
              </span>
              {order.payment.method === 'yappy' && (
                <p className="text-[#0C4A6E]">
                  Envía <strong>${order.total.toFixed(2)}</strong> a <strong>@dulcesaborpanama</strong> o al <strong>6745-9921</strong> usando como descripción tu orden <strong>{order.orderId}</strong>.
                </p>
              )}
              {order.payment.method === 'ach' && (
                <p className="text-[#0C4A6E]">
                  Banco General • Cta Corriente: <strong>03-95-01-123456-7</strong> a nombre de Dulce Sabor Artesanal S.A.
                </p>
              )}
              {order.payment.method === 'cash' && (
                <p className="text-[#0C4A6E]">
                  Ten listo el monto exacto de <strong>${order.total.toFixed(2)}</strong> en efectivo al momento de recibir o retirar tu pedido.
                </p>
              )}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="p-5 sm:p-6 border-t border-[#E5D6BE] bg-[#FDF6E2] flex flex-col sm:flex-row items-center justify-end gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
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
