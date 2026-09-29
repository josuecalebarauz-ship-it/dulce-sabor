import React from 'react';
import { Sparkles, Palette, Smile, Heart, Award, Star } from 'lucide-react';

export default function MascotaBrandSection() {
  return (
    <section id="mascota" className="py-16 md:py-24 bg-[#FFFDF9] relative overflow-hidden border-t border-[#E5D6BE]/60">
      {/* Patrón sutil de iconos en el fondo */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "url('/images/brand/patron-iconos.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* PARTE 1: Conoce a Nuestra Mascota */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
              <Smile className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Identidad & Alegría</span>
            </div>

            <h2 className="font-brand-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-4">
              Conoce a Nuestra <span className="text-[#B45309] font-serif italic">Mascota Oficial</span>
            </h2>

            <p className="text-base sm:text-lg text-[#674029] leading-relaxed mb-6">
              Nuestra mascota es el alma visible de Dulce Sabor. Representa el espíritu alegre, dulce y hospitalario de los pueblos del interior panameño, encarnando el amor por la cocina tradicional de nuestras abuelas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCEBBB] text-[#B45309] flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-[#2C1810] uppercase mb-1">Dulzura</h4>
                <p className="text-[11px] text-[#674029]">
                  La alegría compartida en cada postre panameño.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCEBBB] text-[#B45309] flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-[#2C1810] uppercase mb-1">Tradición</h4>
                <p className="text-[11px] text-[#674029]">
                  Recetas de antaño cocinadas a fuego lento.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] text-center">
                <div className="w-10 h-10 rounded-full bg-[#FCEBBB] text-[#B45309] flex items-center justify-center mx-auto mb-2">
                  <Star className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-[#2C1810] uppercase mb-1">Cariño</h4>
                <p className="text-[11px] text-[#674029]">
                  Atención humana y cercana a cada familia.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#78350F] italic bg-[#FDF6E2] p-3 rounded-xl border border-[#E5D6BE]">
              "Un postre sin cariño es solo azúcar; con tradición se convierte en memoria viva."
            </p>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#FDF6E2] to-[#FFFDF9] rounded-3xl p-6 border-2 border-[#E5D6BE] shadow-xl text-center group">
              <img
                src="/images/brand/personaje-variantes.webp"
                alt="Variantes de la mascota oficial Dulce Sabor saludando y cocinando"
                loading="lazy"
                className="w-full h-auto max-h-[360px] object-contain mx-auto group-hover:scale-103 transition-transform duration-300 drop-shadow-md"
              />
              <span className="inline-block mt-4 text-xs font-bold text-[#78350F] uppercase tracking-wider">
                Mascota Artesanal • Chef Dulce Sabor
              </span>
            </div>
          </div>
        </div>

        {/* PARTE 2: Proceso Creativo "De la idea al corazón" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-[#E5D6BE]">
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border-2 border-[#E5D6BE] shadow-lg group">
              <img
                src="/images/brand/boceto-mascota.webp"
                alt="Boceto original del proceso creativo de la mascota de Dulce Sabor"
                loading="lazy"
                className="w-full h-auto max-h-[360px] object-contain mx-auto group-hover:scale-102 transition-transform duration-300"
              />
              <div className="mt-4 flex items-center justify-between text-xs text-[#78350F]">
                <span className="font-semibold">Bocetos y Trazos Iniciales</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FCEBBB] font-bold text-[10px]">
                  Diseño de Autor
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
              <Palette className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Proceso Creativo</span>
            </div>

            <h2 className="font-brand-title text-3xl sm:text-4xl font-bold text-[#2C1810] mb-4">
              De la Idea al <span className="text-[#B45309] font-serif italic">Corazón</span>
            </h2>

            <p className="text-sm sm:text-base text-[#674029] leading-relaxed mb-4">
              Cada elemento de nuestra identidad fue dibujado pensando en la calidez de las cocinas chiricanas. Partimos de bocetos a mano alzada para capturar la simpatía natural de un personaje que acompaña a grandes y chicos en la mesa familiar.
            </p>

            <p className="text-xs sm:text-sm text-[#674029] leading-relaxed mb-6">
              Desde las proporciones amigables hasta su gorrito de repostero tradicional, el personaje rinde tributo a quienes dedican horas con la espátula de madera sobre la paila de cobre para lograr el punto perfecto del bienmesabe.
            </p>

            <div className="p-4 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] text-xs text-[#4A2B1B]">
              <span className="font-bold text-[#B45309] block mb-1">Evolución de Marca:</span>
              <span>Del primer trazo a lápiz hasta convertirse en el embajador visual de los sabores de Caisán y Renacimiento.</span>
            </div>
          </div>
        </div>

        {/* PARTE 3: Stickers Coleccionables "Lleva un pedacito de Dulce Sabor" */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#FDF6E2] via-[#FFFDF9] to-[#FDF6E2] border-2 border-[#F4BE54]/60 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Detalle Especial en tus Pedidos</span>
              </div>

              <h3 className="font-brand-title text-2xl sm:text-3xl font-bold text-[#2C1810] mb-3">
                Lleva un Pedacito de <span className="text-[#B45309] font-serif italic">Dulce Sabor</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#674029] leading-relaxed mb-4">
                En cada entrega empacamos con cariño stickers coleccionables de nuestra marca. Diseñados con vinilo duradero, son ideales para decorar tu termo de café, libreta de recetas, refrigerador o regalar a los más pequeños del hogar.
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] text-[#78350F] font-semibold">
                <span className="px-3 py-1 rounded-full bg-white border border-[#E5D6BE]">✨ Vinilo resistente al agua</span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#E5D6BE]">🍮 Colección exclusiva</span>
                <span className="px-3 py-1 rounded-full bg-white border border-[#E5D6BE]">🎁 Incluido de regalo</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white p-4 rounded-2xl border border-[#E5D6BE] shadow-md group">
                <img
                  src="/images/brand/stickers.webp"
                  alt="Colección de stickers y calcomanías oficiales Dulce Sabor"
                  loading="lazy"
                  className="w-full max-w-xs h-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
