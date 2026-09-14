import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, MapPin, Sparkles, CheckCircle, ShieldCheck, Flame, Coffee } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-16 md:py-24 bg-[#FFFDF9] relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/2 left-0 -z-10 w-72 h-72 bg-[#FCEBBB]/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 w-96 h-96 bg-[#FDF6E2]/60 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Nuestra Razón de Ser</span>
          </div>

          <h2 className="font-brand-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-4">
            Tradición que Une a las Familias en <span className="text-[#B45309] font-serif italic">Tierras Altas</span>
          </h2>

          <p className="text-[#674029] text-base sm:text-lg leading-relaxed">
            "Dulce Sabor" nació con la misión de rescatar y mantener vivos los sabores auténticos de la dulcería panameña tradicional, cocinados lentamente como lo hacían nuestras abuelas en las faldas del Volcán Barú.
          </p>
        </div>

        {/* Pilares: Modelo B2C y Propuesta de Valor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Pilar 1 */}
          <div className="p-8 rounded-3xl bg-[#FBF6EC] border border-[#E5D6BE] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#4A2B1B] text-[#F59E0B] flex items-center justify-center mb-5 shadow-sm">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-brand-title text-xl font-bold text-[#2C1810] mb-3">
              100% Artesanal y Casero
            </h3>
            <p className="text-sm text-[#674029] leading-relaxed">
              Rechazamos las premezclas industriales y conservantes químicos. Cada bienmesabe se bate durante horas en paila de cobre, y los bollos se muelen y cuecen al vapor el mismo día de la entrega.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="p-8 rounded-3xl bg-[#FDF6E2] border border-[#F4BE54]/60 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#B45309] text-white flex items-center justify-center mb-5 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-brand-title text-xl font-bold text-[#2C1810] mb-3">
              Directo al Consumidor (B2C)
            </h3>
            <p className="text-sm text-[#674029] leading-relaxed">
              Sin intermediarios ni cadenas de distribución que resten frescura. Cocinamos por encargo directamente para ti, garantizando un precio justo y un trato humano y cercano.
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="p-8 rounded-3xl bg-[#FBF6EC] border border-[#E5D6BE] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#4A2B1B] text-[#F59E0B] flex items-center justify-center mb-5 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-brand-title text-xl font-bold text-[#2C1810] mb-3">
              Orgullo de Chiriquí
            </h3>
            <p className="text-sm text-[#674029] leading-relaxed">
              Empleamos leche entera pura de ordeño de Tierras Altas, raspadura de trapiche de caña y frutas frescas cosechadas en fincas vecinas de Volcán, Cerro Punta y Bambito.
            </p>
          </div>
        </div>

        {/* Ficha académica explicativa para la evaluación del proyecto */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#2C1810] text-[#FFFDF9] shadow-xl border border-[#D97706]/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider">
              Contexto Académico del Negocio
            </span>
            <span className="text-xs text-[#E5D6BE]">E-Commerce Dulce Sabor</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-[#F59E0B] text-base mb-2">
                Público Objetivo Identificado
              </h4>
              <p className="text-[#E5D6BE] leading-relaxed mb-3">
                Familias, residentes y visitantes de 18 a 55 años en Chiriquí (Volcán, Cerro Punta, Bambito, Paso Ancho y David) que anhelan postres tradicionales para cumpleaños, celebraciones familiares o antojo personal, priorizando la calidad casera sobre los productos procesados de supermercado.
              </p>
              <ul className="space-y-1.5 text-[#E5D6BE]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Experiencia optimizada para smartphones (Mobile-First)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Efecto cinemático Ken Burns para apreciar el detalle artesanal</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#F59E0B] text-base mb-2">
                Modalidad Comercial & Pagos Panameños
              </h4>
              <p className="text-[#E5D6BE] leading-relaxed mb-3">
                Tienda virtual 100% digital B2C con pedidos bajo encargo (frescura programada de 24h). Integra pasarelas adaptadas a la realidad del comercio panameño: billetera móvil <strong>Yappy</strong>, transferencias <strong>ACH</strong> interbancarias y <strong>pago en efectivo</strong> contra entrega en Tierras Altas.
              </p>
              <ul className="space-y-1.5 text-[#E5D6BE]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Logística local zonificada con cálculo dinámico de flete</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>Formulario para cotizaciones de banquetes y eventos especiales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
