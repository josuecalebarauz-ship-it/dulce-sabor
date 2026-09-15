import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Mascota({ className = "" }) {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState("¡Bienvenido a Dulce Sabor! 🍮");

  const messages = [
    "¡Bienvenido a Dulce Sabor! 🍮",
    "¡Postres hechos con amor en Chiriquí! 🌄",
    "¿Se te antoja un Bienmesabe? 🍯",
    "¡100% artesanal y casero! ✨",
    "¡Pide con 24h de anticipación! 🕒"
  ];

  // Interacción al hacer click: alternar y cambiar mensaje
  const handleClick = () => {
    setBubbleMessage((prev) => {
      const remaining = messages.filter(m => m !== prev);
      return remaining[Math.floor(Math.random() * remaining.length)];
    });
    setShowBubble(prev => !prev);
  };

  // Interacción al hacer hover: mostrar bienvenida si no está visible
  const handleMouseEnter = () => {
    setShowBubble(true);
  };

  // Auto-ocultar la burbuja después de 4.5 segundos
  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [showBubble]);

  const videoRef = useRef(null);

  // Garantizar reproducción automática sin sonido en navegadores móviles y desktop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Burbuja de diálogo / Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute -top-12 sm:-top-13 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
          >
            <div className="relative bg-[#FFFDF9] text-[#2C1810] border-2 border-[#D97706]/50 text-[11px] sm:text-xs font-bold py-1.5 px-3 rounded-2xl shadow-lg shadow-[#78350F]/15 whitespace-nowrap flex items-center gap-1.5">
              <span>{bubbleMessage}</span>
              {/* Puntas decorativas del bocadillo */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-[#D97706]/50" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#FFFDF9]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenedor de animación de entrada (opacity 0 -> 1, scale 0.8 -> 1 con delay) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        className="relative cursor-pointer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {/* Animación "idle" en loop infinito (traslación vertical suave 10-15px) */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-transparent"
        >
          {/* Video de la Mascota con fondo transparente */}
          <video
            ref={videoRef}
            src="/videos/chef-saludo.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            loading="lazy"
            aria-label="Chef animado de Dulce Sabor saludando"
            className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto object-contain border-0 outline-none bg-transparent shadow-none pointer-events-none block"
            style={{ background: 'transparent' }}
          >
            <source src="/videos/chef-saludo.webm" type="video/webm" />
            <source src="/videos/Chef_saludo.webm" type="video/webm" />
          </video>
        </motion.div>
      </motion.div>
    </div>
  );
}
