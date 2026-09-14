import React, { useState } from 'react';
import { submitQuote } from '../services/api';
import { Sparkles, Send, CheckCircle2, Calendar, Users, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

export default function EventQuoteSection({ products = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Cumpleaños / Fiesta Familiar',
    eventDate: '',
    guestsCount: '20 a 50 personas',
    notes: '',
    requestedDesserts: ['bienmesabe', 'arroz-con-leche']
  });

  const [loading, setLoading] = useState(false);
  const [successQuoteId, setSuccessQuoteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleDessertSelection = (id) => {
    setFormData(prev => {
      const exists = prev.requestedDesserts.includes(id);
      return {
        ...prev,
        requestedDesserts: exists
          ? prev.requestedDesserts.filter(d => d !== id)
          : [...prev.requestedDesserts, id]
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Por favor indica tu nombre y teléfono para responder tu cotización.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitQuote(formData);
      if (res.success) {
        setSuccessQuoteId(res.data.quoteId || 'COT-123456');
      } else {
        setErrorMessage(res.message || 'Error al enviar cotización.');
      }
    } catch (err) {
      setErrorMessage('Error al comunicar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="eventos" className="py-16 md:py-24 bg-[#FBF6EC] border-t border-[#E5D6BE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Grandes Momentos en Chiriquí</span>
          </div>

          <h2 className="font-brand-title text-3xl sm:text-4xl font-bold text-[#2C1810] mb-3">
            Cotizaciones para Eventos & Banquetes
          </h2>

          <p className="text-sm sm:text-base text-[#674029] max-w-2xl mx-auto">
            ¿Tienes una boda en Boquete o Cerro Punta, un bautizo o una reunión corporativa? Preparamos mesas de postres tradicionales panameños en bandejas y porciones especiales.
          </p>
        </div>

        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E5D6BE] shadow-lg">
          {successQuoteId ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#16A34A] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-brand-title text-2xl font-bold text-[#2C1810] mb-2">
                ¡Solicitud de Cotización Recibida!
              </h3>
              <p className="text-sm text-[#674029] max-w-md mx-auto mb-4">
                Hemos registrado tu solicitud con el código <strong className="text-[#B45309] font-mono">{successQuoteId}</strong>. Nuestro maestro repostero te contactará por WhatsApp para afinar los detalles y menú personalizado.
              </p>
              <button
                onClick={() => {
                  setSuccessQuoteId(null);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    eventType: 'Cumpleaños / Fiesta Familiar',
                    eventDate: '',
                    guestsCount: '20 a 50 personas',
                    notes: '',
                    requestedDesserts: ['bienmesabe', 'arroz-con-leche']
                  });
                }}
                className="px-6 py-2.5 rounded-full bg-[#B45309] text-white text-xs font-bold hover:bg-[#78350F] transition-all cursor-pointer"
              >
                Solicitar otra cotización
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Tu Nombre o Empresa *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej. Carlos Morales"
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
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. 6612-3456"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Tipo de Evento
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  >
                    <option value="Cumpleaños / Fiesta Familiar">Cumpleaños / Fiesta Familiar</option>
                    <option value="Boda / Quinceaños">Boda / Quinceaños</option>
                    <option value="Reunión Corporativa">Reunión Corporativa</option>
                    <option value="Bautizo / Primera Comunión">Bautizo / Primera Comunión</option>
                    <option value="Otro tipo de celebración">Otro tipo de celebración</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Cantidad Estimada de Invitados
                  </label>
                  <select
                    name="guestsCount"
                    value={formData.guestsCount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  >
                    <option value="15 a 30 personas">15 a 30 personas</option>
                    <option value="30 a 60 personas">30 a 60 personas</option>
                    <option value="60 a 100 personas">60 a 100 personas</option>
                    <option value="Más de 100 personas">Más de 100 personas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                    Fecha Tentativa
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>

              {/* Postres que interesan */}
              <div>
                <label className="block text-xs font-semibold text-[#4A2B1B] mb-2">
                  Postres que deseas incluir en la mesa dulce:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {products.map((p) => {
                    const isChecked = formData.requestedDesserts.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => toggleDessertSelection(p.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-2 ${
                          isChecked
                            ? 'border-[#B45309] bg-[#FDF6E2] text-[#4A2B1B] font-bold'
                            : 'border-[#E5D6BE] bg-white text-[#674029]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-[#B45309] pointer-events-none"
                        />
                        <span className="truncate">{p.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notas adicionales */}
              <div>
                <label className="block text-xs font-semibold text-[#4A2B1B] mb-1">
                  Detalles adicionales o requerimientos dietéticos
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Lugar exacto del evento, si requieres montaje de mesa, porciones mini, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D6BE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#B45309] hover:bg-[#78350F] active:scale-98 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enviando cotización...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud de Cotización sin Compromiso</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
