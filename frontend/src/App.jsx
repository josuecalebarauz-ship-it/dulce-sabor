import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import AboutSection from './components/AboutSection';
import EventQuoteSection from './components/EventQuoteSection';
import Footer from './components/Footer';
import { fetchProducts, FALLBACK_PRODUCTS } from './services/api';

function MainApp() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Usando catálogo fallback de postres:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const scrollToQuote = () => {
    const el = document.getElementById('eventos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2C1810]">
      {/* Barra de Navegación */}
      <Navbar onOpenQuoteModal={scrollToQuote} />

      {/* Contenido Principal */}
      <main className="flex-1">
        {/* Sección Hero con Escaparate Cinemático Ken Burns */}
        <Hero products={products} />

        {/* Catálogo de Postres Tradicionales con Galería de Fotos */}
        <ProductCatalog products={products} />

        {/* Sección Nosotros: Historia, Modelo B2C y Enfoque en Chiriquí */}
        <AboutSection />

        {/* Formulario de Cotización para Eventos y Bodas */}
        <EventQuoteSection products={products} />
      </main>

      {/* Pie de Página */}
      <Footer />

      {/* Modales y Drawers Globales */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
