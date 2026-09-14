import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Sparkles, UtensilsCrossed, Filter } from 'lucide-react';

export default function ProductCatalog({ products = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Tradición de Cuchara',
    'Refrescantes y Fríos',
    'Horneados del Día',
    'Tradición de Maíz'
  ];

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-[#FBF6EC]/50 border-t border-[#E5D6BE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado del catálogo */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEBBB] text-[#78350F] text-xs font-bold uppercase tracking-wider mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Nuestras Joyas Culinarias</span>
          </div>

          <h2 className="font-brand-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] mb-4">
            Catálogo de Postres <span className="text-[#B45309] font-serif italic">Artesanales</span>
          </h2>

          <p className="text-[#674029] text-base sm:text-lg leading-relaxed">
            Cada postre es preparado a mano al momento de tu orden, garantizando la máxima frescura de la leche y los frutos de Tierras Altas. Descubre cada receta con fotografía cinemática y galería de imágenes reales.
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#4A2B1B] text-[#FFFDF9] shadow-md scale-105'
                    : 'bg-[#FFFDF9] text-[#674029] border border-[#E5D6BE] hover:border-[#D97706] hover:bg-[#FDF6E2]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cuadrícula de Postres con Modelos 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Banner informativo de pedidos por encargo */}
        <div className="mt-16 p-6 rounded-3xl bg-gradient-to-r from-[#FFFDF9] via-[#FDF6E2] to-[#FFFDF9] border border-[#F4BE54]/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4A2B1B] text-[#F59E0B] flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-brand-title text-lg font-bold text-[#2C1810]">
                ¿Planeas un evento, reunión familiar o boda en Chiriquí?
              </h4>
              <p className="text-sm text-[#674029]">
                Elaboramos bandejas de degustación mixtas y porciones especiales para más de 20 personas.
              </p>
            </div>
          </div>
          <a
            href="#eventos"
            className="px-6 py-3 rounded-full bg-[#B45309] hover:bg-[#78350F] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap"
          >
            Cotizar Postres para Evento
          </a>
        </div>
      </div>
    </section>
  );
}
