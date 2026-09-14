import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, Sparkles, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenQuoteModal }) {
  const { cartCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Barra superior de anuncios y ubicación panameña */}
      <div className="bg-[#4A2B1B] text-[#FDF6E2] text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
        <span>Elaborados en Volcán, Chiriquí • Entregas frescas en Tierras Altas y envíos programados</span>
        <span className="hidden md:inline text-[#D97706]">•</span>
        <span className="hidden md:inline text-[#F59E0B] font-semibold">Pedidos con 24h de anticipación</span>
      </div>

      {/* Navegación principal */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF9]/95 backdrop-blur-md shadow-sm border-b border-[#E5D6BE]/80 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo de la marca artesanal */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#D97706] to-[#78350F] flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl">🍮</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-brand-title text-2xl sm:text-3xl font-bold tracking-tight text-[#2C1810]">
                  Dulce Sabor
                </span>
                <span className="font-handwriting text-[#B45309] text-base font-bold hidden sm:inline">
                  artesanal
                </span>
              </div>
              <p className="text-[11px] text-[#78350F] font-medium tracking-wide">
                Tierras Altas • Chiriquí, Panamá
              </p>
            </div>
          </a>

          {/* Menú de navegación en escritorio */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A2B1B]">
            <a href="#inicio" className="hover:text-[#D97706] transition-colors">
              Inicio
            </a>
            <a href="#catalogo" className="hover:text-[#D97706] transition-colors flex items-center gap-1">
              Catálogo
              <span className="px-1.5 py-0.2 bg-[#FCEBBB] text-[#B45309] text-[10px] font-bold rounded-full">
                Galería
              </span>
            </a>
            <a href="#nosotros" className="hover:text-[#D97706] transition-colors">
              Nuestra Historia
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="hover:text-[#D97706] transition-colors cursor-pointer"
            >
              Eventos & Fiestas
            </button>
            <a href="#contacto" className="hover:text-[#D97706] transition-colors">
              Contacto
            </a>
          </nav>

          {/* Acciones: Carrito y Menú Móvil */}
          <div className="flex items-center gap-3">
            {/* Botón de Carrito de Compras */}
            <button
              onClick={openCart}
              aria-label="Abrir carrito de compras"
              className="relative p-2.5 sm:px-4 sm:py-2 rounded-full bg-[#4A2B1B] text-[#FFFDF9] hover:bg-[#2C1810] active:scale-95 transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Carrito</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 sm:static bg-[#DC2626] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFFDF9] sm:border-none"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Toggle Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="md:hidden p-2 rounded-lg text-[#4A2B1B] hover:bg-[#F2E9D7] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Drawer de Menú Móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FFFDF9] border-b border-[#E5D6BE] px-4 pt-3 pb-6 shadow-xl"
            >
              <nav className="flex flex-col gap-3 font-medium text-base text-[#4A2B1B]">
                <a
                  href="#inicio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-[#FBF6EC] transition-colors"
                >
                  Inicio
                </a>
                <a
                  href="#catalogo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-[#FBF6EC] flex items-center justify-between"
                >
                  <span>Catálogo de Postres</span>
                  <span className="px-2 py-0.5 bg-[#D97706] text-white text-xs font-bold rounded-full">
                    Fotos
                  </span>
                </a>
                <a
                  href="#nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-[#FBF6EC] transition-colors"
                >
                  Nuestra Historia & Tradición
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="text-left py-2 px-3 rounded-lg hover:bg-[#FBF6EC] transition-colors"
                >
                  Pedidos para Eventos y Bodas
                </button>
                <a
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-[#FBF6EC] transition-colors"
                >
                  Contacto & Entregas
                </a>
                <div className="pt-2 border-t border-[#E5D6BE] flex flex-col gap-2">
                  <a
                    href="https://wa.me/50767459921?text=Hola%20Dulce%20Sabor,%20deseo%20hacer%20una%20consulta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 bg-[#16A34A] text-white font-semibold text-sm rounded-lg shadow-xs"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Chiriquí (+507 6745-9921)</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
