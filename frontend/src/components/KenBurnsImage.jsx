import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function KenBurnsImage({
  src,
  alt = 'Postre artesanal Dulce Sabor',
  className = 'w-full h-full',
  duration = 14,
  overlay = true,
  scaleFrom = 1.0,
  scaleTo = 1.14
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton de carga sutil */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#FDF6E2] animate-pulse" />
      )}

      {/* Imagen con efecto cinemático Ken Burns (paneo y zoom suave continuo) */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        initial={{ scale: scaleFrom }}
        animate={{
          scale: [scaleFrom, scaleTo, scaleFrom * 1.06, scaleFrom],
          x: [0, -10, 8, 0],
          y: [0, -6, 5, 0]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Viñeta cálida suave para acentuar el aspecto artesanal y destacar textos */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-black/10 pointer-events-none" />
      )}

      {/* Respaldo elegante si no existiera la imagen */}
      {hasError && (
        <div className="absolute inset-0 bg-[#FCEBBB] flex flex-col items-center justify-center text-[#78350F] p-4 text-center">
          <span className="text-3xl mb-1">🍮</span>
          <span className="text-xs font-semibold">{alt}</span>
        </div>
      )}
    </div>
  );
}
