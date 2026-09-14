import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#1D0F0A] text-[#FDF6E2] pt-16 pb-12 border-t border-[#D97706]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Columna 1: Marca e Historia */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🍮</span>
              <span className="font-brand-title text-2xl font-bold tracking-tight text-[#FFFDF9]">
                Dulce Sabor
              </span>
            </div>
            <p className="text-xs text-[#E5D6BE] leading-relaxed mb-4">
              Elaboramos con pasión los dulces y postres típicos de la cultura panameña en las frescas faldas de Tierras Altas, Chiriquí. Tradición artesanal, sin aditivos, directo a tu paladar.
            </p>
            <div className="flex items-center gap-3 text-[#F59E0B]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2C1810] border border-[#78350F] flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2C1810] border border-[#78350F] flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/50767459921"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-brand-title text-base font-bold text-[#F59E0B] mb-4 uppercase tracking-wider text-xs">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-[#E5D6BE]">
              <li>
                <a href="#inicio" className="hover:text-[#F59E0B] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-[#F59E0B] transition-colors">
                  Catálogo de Postres & Galería
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-[#F59E0B] transition-colors">
                  Historia & Modelo de Negocio B2C
                </a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-[#F59E0B] transition-colors">
                  Cotizaciones de Banquetes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Cobertura & Horario en Chiriquí */}
          <div>
            <h4 className="font-brand-title text-base font-bold text-[#F59E0B] mb-4 uppercase tracking-wider text-xs">
              Entregas en Tierras Altas
            </h4>
            <ul className="space-y-2 text-xs text-[#E5D6BE]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>Volcán (Casco Urbano y Taller)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>Cerro Punta, Guadalupe & Bambito</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>Paso Ancho & Nueva California</span>
              </li>
              <li className="flex items-start gap-2 pt-2 border-t border-[#4A2B1B]">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                <span>Pedidos frescos con 24h de anticipación</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Medios de Pago Panameños */}
          <div>
            <h4 className="font-brand-title text-base font-bold text-[#F59E0B] mb-4 uppercase tracking-wider text-xs">
              Formas de Pago
            </h4>
            <p className="text-xs text-[#E5D6BE] mb-3">
              Facilitamos tu compra mediante los canales oficiales más utilizados en Panamá:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#2C1810] border border-[#78350F]/50 text-xs">
                <span className="w-6 h-6 rounded-full bg-[#0089D0] text-white flex items-center justify-center font-bold text-[10px]">
                  Y!
                </span>
                <span>Yappy (@dulcesaborpanama)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#2C1810] border border-[#78350F]/50 text-xs">
                <span className="w-6 h-6 rounded-full bg-[#78350F] text-white flex items-center justify-center text-[10px]">
                  🏦
                </span>
                <span>Transferencia Bancaria ACH</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#2C1810] border border-[#78350F]/50 text-xs">
                <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[10px]">
                  💵
                </span>
                <span>Pago Contra Entrega (Efectivo)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Créditos y Reconocimiento Académico */}
        <div className="pt-8 border-t border-[#4A2B1B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D6BE]/70">
          <p>© {new Date().getFullYear()} Dulce Sabor Artesanal. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Proyecto Académico de Tienda Virtual</span>
            <span>•</span>
            <span className="text-[#F59E0B]">Chiriquí, República de Panamá</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
