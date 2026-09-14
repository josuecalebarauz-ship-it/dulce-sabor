import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroImageShowcase from './HeroImageShowcase';
import { useCart } from '../context/CartContext';
import { Sparkles, ShoppingBag, Images, Heart, ShieldCheck, Clock } from 'lucide-react';

export default function Hero({ products = [] }) {
  const [activeDessert, setActiveDessert] = useState(products[0] || {
    id: 'bienmesabe',
    name: 'Bienmesabe Chiricano',
    tagline: 'El rey dulce de Tierras Altas con raspadura y leche fresca',
    price: 4.50,
    portion: 'Frasco artesanal (8 oz)',
    accentColor: '#854d0e'
  });

  const { addToCart, setSelectedProductForModal } = useCart();

  const currentProduct = products.find(p => p.id === activeDessert.id) || products[0] || activeDessert;

  return (
    <section id="inicio" className="relative pt-4 pb-16 md:pt-8 md:pb-24 overflow-hidden">
      {/* Fondos degradados cálidos */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#FDF6E2] rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-10 left-0 -z-10 w-80 h-80 bg-[#FCEBBB]/50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Columna Izquierda: Mensaje y Propuesta de Valor */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            {/* Tagline artesanal */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEBBB] border border-[#F4BE54]/60 text-[#78350F] text-xs font-semibold tracking-wide uppercase mb-5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>100% Casero • Tierras Altas de Chiriquí</span>
            </div>

            <h1 className="font-brand-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C1810] tracking-tight leading-[1.15] mb-4">
              El Dulce Encanto de la <span className="text-[#B45309] italic font-serif">Tradición Panameña</span>
            </h1>

            <p className="text-base sm:text-lg text-[#674029] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Postres típicos elaborados con recetas familiares de antaño, leche fresca de ordeño diario e ingredientes puros de la campiña. Sin intermediarios, directo de nuestro taller artesanal en Volcán hasta tu hogar.
            </p>

            {/* Llamados a la acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#catalogo"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#B45309] to-[#78350F] text-white font-semibold text-base shadow-lg shadow-[#78350F]/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Explorar Catálogo</span>
                <span className="text-lg">→</span>
              </a>

              <button
                onClick={() => setSelectedProductForModal(currentProduct)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FFFDF9] border-2 border-[#D97706]/40 text-[#4A2B1B] font-semibold text-base hover:bg-[#FDF6E2] hover:border-[#D97706] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Images className="w-4 h-4 text-[#D97706]" />
                <span>Ver Galería de Fotos</span>
              </button>
            </div>

            {/* Píldoras de confianza y valor artesanal */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E5D6BE]/70 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-8 h-8 rounded-full bg-[#FCEBBB] flex items-center justify-center mb-1 text-[#B45309]">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="font-semibold text-xs text-[#2C1810]">Recetas de la Abuela</span>
                <span className="text-[11px] text-[#78350F]/80">Paila y fogón lento</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-8 h-8 rounded-full bg-[#FCEBBB] flex items-center justify-center mb-1 text-[#B45309]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-semibold text-xs text-[#2C1810]">100% Fresco</span>
                <span className="text-[11px] text-[#78350F]/80">Sin químicos ni conservantes</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-8 h-8 rounded-full bg-[#FCEBBB] flex items-center justify-center mb-1 text-[#B45309]">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-semibold text-xs text-[#2C1810]">Por Encargo</span>
                <span className="text-[11px] text-[#78350F]/80">Hecho el mismo día</span>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha: Escaparate Visual Cinemático Ken Burns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EC] border border-[#E5D6BE] shadow-xl p-3 sm:p-4">
              <HeroImageShowcase
                activeDessert={currentProduct}
                onSelectDessert={(p) => setActiveDessert(p)}
                products={products}
                onOpenGallery={(p) => setSelectedProductForModal(p)}
              />

              {/* Barra de acción rápida para pedir este postre */}
              <div className="mt-3 px-2 py-2 flex items-center justify-between gap-3">
                <span className="text-xs text-[#78350F] font-medium hidden sm:inline">
                  🌿 {currentProduct.preparationTime || 'Elaboración artesanal'}
                </span>
                <button
                  onClick={() => addToCart(currentProduct, 1)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#B45309] hover:bg-[#78350F] active:scale-95 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ml-auto"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Pedir este postre (${currentProduct.price ? currentProduct.price.toFixed(2) : '4.50'})</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
