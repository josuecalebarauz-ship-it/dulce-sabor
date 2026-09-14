import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import KenBurnsImage from './KenBurnsImage';
import { X, ShoppingBag, Plus, Minus, Check, Clock, Sparkles, Star, ChevronLeft, ChevronRight, Images } from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  // Lista de las 3 imágenes disponibles para cada postre artesanal
  const galleryImages = [
    { src: `/images/productos/${product.id}.jpg`, label: 'Presentación principal' },
    { src: `/images/productos/${product.id}-2.jpg`, label: 'Detalle de textura e ingredientes' },
    { src: `/images/productos/${product.id}-3.jpg`, label: 'Servido en mesa campesina' }
  ];

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedProductForModal(null);
      setQuantity(1);
      setActivePhotoIndex(0);
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Fondo oscuro translúcido con desenfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setSelectedProductForModal(null);
            setActivePhotoIndex(0);
          }}
          className="fixed inset-0 bg-[#1D0F0A]/75 backdrop-blur-sm"
        />

        {/* Ventana modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#E5D6BE] overflow-hidden z-10 my-auto"
        >
          {/* Botón de cerrar */}
          <button
            onClick={() => {
              setSelectedProductForModal(null);
              setActivePhotoIndex(0);
            }}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#FFFDF9]/90 text-[#4A2B1B] hover:bg-[#F2E9D7] hover:text-[#2C1810] transition-colors shadow-md cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Columna Izquierda: Galería Fotográfica / Carousel con Ken Burns */}
            <div className="lg:col-span-6 bg-[#2C1810] relative flex flex-col justify-between min-h-[360px] lg:min-h-full">
              {/* Badge superior */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-[#4A2B1B]/90 text-[#FDF6E2] shadow-xs flex items-center gap-1.5 border border-white/20 backdrop-blur-xs">
                  <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                  {product.badge || 'Postre Artesanal'}
                </span>
              </div>

              {/* Indicador de foto activa */}
              <div className="absolute top-4 right-14 z-20">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-xs border border-white/15">
                  Foto {activePhotoIndex + 1} de {galleryImages.length}
                </span>
              </div>

              {/* Visor de imagen principal con Ken Burns y crossfade */}
              <div className="relative w-full h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhotoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <KenBurnsImage
                      src={galleryImages[activePhotoIndex].src}
                      alt={`${product.name} - ${galleryImages[activePhotoIndex].label}`}
                      duration={14}
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Flechas de navegación del carousel */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border border-white/20"
                  aria-label="Siguiente foto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Tira de miniaturas de la galería */}
              <div className="p-3 bg-gradient-to-t from-black/90 to-black/40 z-20 flex items-center justify-center gap-2.5">
                {galleryImages.map((img, idx) => {
                  const isActive = idx === activePhotoIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#F59E0B] scale-105 shadow-md ring-2 ring-[#F59E0B]/50'
                          : 'border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Columna Derecha: Información Completa y Adición al Carrito */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] lg:max-h-none">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#B45309] uppercase tracking-wider mb-2">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-[#D97706]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-[#78350F]/70 font-normal">({product.reviewCount} opiniones)</span>
                  </div>
                </div>

                <h2 className="font-brand-title text-2xl sm:text-3xl font-bold text-[#2C1810] mb-2">
                  {product.name}
                </h2>

                <p className="text-sm font-handwriting text-[#B45309] text-lg font-bold mb-4">
                  "{product.tagline}"
                </p>

                <p className="text-sm text-[#674029] leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Porción */}
                <div className="mb-5 p-3 rounded-2xl bg-[#FBF6EC] border border-[#E5D6BE] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#78350F] uppercase tracking-wider">
                    Presentación:
                  </span>
                  <span className="text-xs font-semibold text-[#2C1810]">
                    {product.portion}
                  </span>
                </div>

                {/* Ingredientes completos */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-2.5">
                    Ingredientes 100% Autóctonos:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-xs text-[#4A2B1B] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tiempo de elaboración */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDF6E2] border border-[#FCEBBB] text-xs text-[#78350F] mb-6">
                  <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Garantía de Frescura:</span>
                    <span>{product.preparationTime}</span>
                  </div>
                </div>
              </div>

              {/* Selector de cantidad y botón de agregar */}
              <div className="pt-4 border-t border-[#E5D6BE]/80">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-[#78350F] block font-medium">Precio Unitario</span>
                    <span className="text-2xl font-extrabold text-[#2C1810]">
                      B/. {product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Selector de Cantidad */}
                  <div className="flex items-center gap-3 bg-[#FBF6EC] border border-[#E5D6BE] rounded-full p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-[#FFFDF9] hover:bg-[#F2E9D7] text-[#4A2B1B] flex items-center justify-center font-bold transition-colors cursor-pointer shadow-xs"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-[#2C1810] w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-[#FFFDF9] hover:bg-[#F2E9D7] text-[#4A2B1B] flex items-center justify-center font-bold transition-colors cursor-pointer shadow-xs"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                    addedAnimation
                      ? 'bg-[#16A34A] text-white scale-[0.98]'
                      : 'bg-[#B45309] hover:bg-[#78350F] text-white hover:shadow-lg'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Agregado al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        Agregar {quantity} al Carrito • B/. {(product.price * quantity).toFixed(2)}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
