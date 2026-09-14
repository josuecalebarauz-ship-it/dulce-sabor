import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KenBurnsImage from './KenBurnsImage';
import { Images, Sparkles, Film } from 'lucide-react';

export default function HeroImageShowcase({
  activeDessert,
  onSelectDessert,
  products = [],
  onOpenGallery
}) {
  const currentImageSrc = `/images/productos/${activeDessert.id}.jpg`;

  return (
    <div className="relative w-full h-[460px] sm:h-[530px] flex flex-col justify-between rounded-3xl overflow-hidden shadow-2xl border border-[#E5D6BE] bg-[#2C1810]">
      {/* Contenedor de la Imagen Cinemática Ken Burns con crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDessert.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <KenBurnsImage
              src={currentImageSrc}
              alt={activeDessert.name}
              duration={16}
              scaleFrom={1.0}
              scaleTo={1.16}
              className="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Barra superior con insignia y botón de galería */}
      <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D0F0A]/70 backdrop-blur-md text-[#FFFDF9] text-xs font-semibold border border-white/20 shadow-md">
          <Film className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
          <span>Efecto Cinemático</span>
        </div>

        <button
          onClick={() => onOpenGallery(activeDessert)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] backdrop-blur-md text-[#2C1810] text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#E5D6BE]"
        >
          <Images className="w-4 h-4 text-[#B45309]" />
          <span>Ver galería (3 fotos)</span>
        </button>
      </div>

      {/* Barra inferior: Información del postre y selector de postres */}
      <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-[#1D0F0A] via-[#1D0F0A]/85 to-transparent pt-12">
        <div className="mb-4">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider block mb-1">
            {activeDessert.category || 'Postre Tradicional'}
          </span>
          <h3 className="font-brand-title text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-sm">
            {activeDessert.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#E5D6BE] line-clamp-1 max-w-lg">
            {activeDessert.tagline}
          </p>
        </div>

        {/* Selector de postres para alternar la imagen cinemática */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {products.map((p) => {
            const isSelected = p.id === activeDessert.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectDessert(p)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#F59E0B] text-[#2C1810] font-bold shadow-md scale-105'
                    : 'bg-black/40 hover:bg-black/60 text-white/90 border border-white/10'
                }`}
              >
                <span>{p.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
