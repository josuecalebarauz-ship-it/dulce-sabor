import React from 'react';
import { Package, ShieldCheck, Leaf, Sparkles, Heart } from 'lucide-react';
import { LOCALIDAD } from '../config/negocio';

export default function PackagingSection() {
  return (
    <section id="empaques" className="py-16 md:py-24 bg-[#FDF6E2]/40 relative overflow-hidden border-t border-[#E5D6BE]/60">
      {/* Patrón de textura decorativa */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "url('/images/brand/patron-textura.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Imagen del Empaque */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#E5D6BE] shadow-xl bg-white p-3 group">
              <img
                src="/images/brand/empaque.webp"
                alt="Empaque oficial y presentación de postres de Dulce Sabor"
                loading="lazy"
                className="w-full h-auto max-h-[480px] object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-6 left-6 bg-[#4A2B1B]/90 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Presentación Oficial</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Explicación y Cualidades del Empaque */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
              <Package className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Nuestros Empaques</span>
            </div>

            <h2 className="font-brand-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-4">
              Cuidado y Cariño en <span className="text-[#B45309] font-serif italic">Cada Detalle</span>
            </h2>

            <p className="text-base sm:text-lg text-[#674029] leading-relaxed mb-6">
              Sabemos que un postre tradicional panameño merece una presentación a la altura de su sabor. Por eso, diseñamos nuestros empaques para conservar la textura, aroma y temperatura perfecta durante el trayecto rural desde Caisán hasta tu hogar o evento.
            </p>

            {/* Lista de Características */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5D6BE]/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1810]">
                    Protección y Sellado Hermético
                  </h4>
                  <p className="text-xs text-[#674029] mt-0.5">
                    Envases sellados que evitan derrames y mantienen intacta la consistencia cremosa del bienmesabe y el arroz con leche durante el transporte.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5D6BE]/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1810]">
                    Materiales Biodegradables y Reciclables
                  </h4>
                  <p className="text-xs text-[#674029] mt-0.5">
                    Comprometidos con el entorno natural de Renacimiento y los campos agrícolas chiricanos, priorizando empaques eco-responsables.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5D6BE]/80 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#FCEBBB] text-[#78350F] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1810]">
                    Listos para Regalar y Compartir
                  </h4>
                  <p className="text-xs text-[#674029] mt-0.5">
                    Etiquetado artesanal con detalles de ingredientes y porciones de consumo individual ideales para mesas de postres y detalles dulces.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B45309] hover:bg-[#78350F] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>Elige tus postres favoritos</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
