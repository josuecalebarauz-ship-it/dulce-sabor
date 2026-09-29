import React from 'react';
import { MapPin, Clock, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { ZONAS_ENTREGA, LOCALIDAD } from '../config/negocio';

export default function DeliveryZonesSection() {
  return (
    <section id="zonas" className="py-16 md:py-24 bg-[#FFFDF9] relative overflow-hidden border-t border-[#E5D6BE]/60">
      {/* Patrón de fondo sutil */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/images/brand/patron-textura.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Cobertura y Logística Rural</span>
          </div>

          <h2 className="font-brand-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-4">
            Zonas de Entrega en <span className="text-[#B45309] font-serif italic">Renacimiento</span>
          </h2>

          <p className="text-[#674029] text-base sm:text-lg leading-relaxed">
            Desde nuestro taller en {LOCALIDAD.direccionCorta}, distribuimos postres tradicionales recién preparados a las principales comunidades del distrito y áreas vecinas.
          </p>
        </div>

        {/* Aviso Destacado: Entregas por Encargo (24h de anticipación) */}
        <div className="mb-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FEF3C7] via-[#FDF6E2] to-[#FEF3C7] border border-[#F59E0B]/50 shadow-sm flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 rounded-2xl bg-[#B45309] text-white flex items-center justify-center shrink-0 shadow-md">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-base sm:text-lg text-[#2C1810] mb-1">
              Logística artesanal por encargo (24 horas de anticipación)
            </h4>
            <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
              En una zona rural como Caisán, la frescura es nuestro mayor compromiso. <strong>No almacenamos postres viejos</strong>; cada receta se cocina el mismo día de la entrega con leche fresca de ordeño matutino y frutas cosechadas en fincas de la zona.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-block px-4 py-2 rounded-full bg-[#B45309] text-white font-bold text-xs shadow-xs">
              100% Fresco y Puntual
            </span>
          </div>
        </div>

        {/* Tarjetas de Comunidades y Costos de Envío */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.isArray(ZONAS_ENTREGA) && ZONAS_ENTREGA.map((zone) => {
            const rawCost = zone?.costo ?? zone?.cost ?? 0;
            const numericCost = typeof rawCost === 'number' ? rawCost : parseFloat(rawCost) || 0;
            return (
              <div
                key={zone?.id || zone?.nombre}
                className="p-5 rounded-2xl bg-white border border-[#E5D6BE] shadow-xs hover:shadow-md hover:border-[#D97706]/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-[#FBF6EC] border border-[#E5D6BE] text-[#B45309] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-extrabold text-[#B45309] bg-[#FDF6E2] px-2.5 py-1 rounded-full border border-[#F4BE54]/40">
                      B/. {numericCost.toFixed(2)}
                    </span>
                  </div>

                  <h3 className="font-brand-title text-lg font-bold text-[#2C1810] mb-1 group-hover:text-[#B45309] transition-colors">
                    {zone?.nombre || 'Comunidad'}
                  </h3>
                  <p className="text-xs text-[#674029] mb-3 leading-relaxed">
                    {zone?.descripcion || 'Entrega programada en Renacimiento'}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5D6BE]/70 flex items-center gap-1.5 text-[11px] text-[#78350F]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>{zone?.tiempo || 'Entrega por pedido (24h de anticipación)'}</span>
                </div>
              </div>
            );
          })}

          {/* Tarjeta Informativa de Otras Zonas */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FBF6EC] to-[#FDF6E2] border border-[#E5D6BE] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#4A2B1B] text-[#F59E0B] flex items-center justify-center mb-3">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h3 className="font-brand-title text-lg font-bold text-[#2C1810] mb-1">
                ¿Otra comunidad cercana?
              </h3>
              <p className="text-xs text-[#674029] leading-relaxed">
                Si te encuentras en un punto no listado o requieres entregas especiales en David o Boquete, consúltanos con anticipación.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5D6BE]/70">
              <a
                href="#contacto"
                className="text-xs font-bold text-[#B45309] hover:text-[#78350F] inline-flex items-center gap-1"
              >
                <span>Consultar por WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
