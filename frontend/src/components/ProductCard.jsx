import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KenBurnsImage from './KenBurnsImage';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Images, Star, Clock, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, setSelectedProductForModal } = useCart();

  const mainImageSrc = `/images/productos/${product.id}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-3xl bg-[#FFFDF9] border border-[#E5D6BE] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D97706]/50 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Contenedor de la Imagen Cinemática con efecto Ken Burns */}
        <div
          onClick={() => setSelectedProductForModal(product)}
          className="relative h-64 sm:h-72 w-full overflow-hidden cursor-pointer"
        >
          {/* Badge del producto */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#4A2B1B] text-[#FDF6E2] shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                {product.badge}
              </span>
            </div>
          )}

          {/* Calificación y reseñas */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFDF9]/90 backdrop-blur-xs border border-[#E5D6BE] text-xs font-bold text-[#78350F] shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{product.rating}</span>
            <span className="text-[#A16207]/70 font-normal">({product.reviewCount})</span>
          </div>

          {/* Componente de Imagen con Efecto Ken Burns */}
          <KenBurnsImage
            src={mainImageSrc}
            alt={product.name}
            duration={isHovered ? 8 : 14}
            scaleFrom={1.0}
            scaleTo={1.15}
            className="w-full h-full"
          />

          {/* Indicador de galería al pasar el cursor */}
          <div className="absolute bottom-3 right-3 z-20 transition-all duration-300 transform group-hover:scale-105">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#2C1810]/85 text-[#FFFDF9] px-3 py-1 rounded-full backdrop-blur-xs shadow-md border border-white/10">
              <Images className="w-3 h-3 text-[#F59E0B]" />
              <span>Ver galería (3 fotos)</span>
            </span>
          </div>
        </div>

        {/* Información textual del producto */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between text-xs text-[#B45309] font-bold uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span className="text-[#78350F]/70 font-medium">{product.portion}</span>
          </div>

          <h3
            onClick={() => setSelectedProductForModal(product)}
            className="font-brand-title text-xl font-bold text-[#2C1810] group-hover:text-[#B45309] transition-colors mb-2 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-sm text-[#674029] line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Ingredientes destacados */}
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#78350F] block mb-1.5">
              Ingredientes de campo:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.ingredients.slice(0, 3).map((ing, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-md bg-[#FBF6EC] border border-[#E5D6BE] text-[#4A2B1B]"
                >
                  {ing}
                </span>
              ))}
              {product.ingredients.length > 3 && (
                <span className="text-xs px-1.5 py-0.5 text-[#B45309] font-semibold">
                  +{product.ingredients.length - 3} más
                </span>
              )}
            </div>
          </div>

          {/* Tiempo de preparación fresca */}
          <div className="flex items-center gap-1.5 text-xs text-[#78350F] font-medium mb-5 bg-[#FDF6E2] p-2 rounded-xl border border-[#FCEBBB]">
            <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
            <span className="line-clamp-1">{product.preparationTime}</span>
          </div>
        </div>
      </div>

      {/* Acciones del pie de la tarjeta */}
      <div className="p-5 sm:p-6 pt-0 border-t border-[#F2E9D7] flex items-center justify-between gap-3 mt-auto">
        <div>
          <span className="text-xs text-[#78350F] block font-medium">Precio</span>
          <span className="text-2xl font-extrabold text-[#2C1810]">
            B/. {product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedProductForModal(product)}
            aria-label={`Ver galería de fotos de ${product.name}`}
            className="p-2.5 rounded-xl border border-[#E5D6BE] text-[#4A2B1B] hover:bg-[#FDF6E2] hover:border-[#D97706] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Ver galería completa de fotos"
          >
            <Images className="w-4 h-4 text-[#B45309]" />
            <span className="hidden sm:inline">Galería</span>
          </button>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-4 py-2.5 rounded-xl bg-[#B45309] hover:bg-[#78350F] active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ordenar</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
