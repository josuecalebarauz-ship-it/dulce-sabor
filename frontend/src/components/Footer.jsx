import React from 'react';
import { MapPin, Phone, Mail, Instagram, Clock, ShieldCheck, Heart } from 'lucide-react';

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

            {/* Redes Sociales Oficiales: Únicamente Instagram y WhatsApp */}
            <div className="flex items-center gap-3 text-[#F59E0B] mb-4">
              <a
                href="https://www.instagram.com/dulcesabor.cp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C1810] border border-[#78350F] flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-colors shadow-xs"
                aria-label="Instagram Oficial de Dulce Sabor"
                title="Instagram Oficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/50761672499?text=Hola,%20Dulce%20Sabor.%20Me%20gustar%C3%ADa%20realizar%20una%20consulta%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
                aria-label="WhatsApp Oficial (+507 6167-2499)"
                title="WhatsApp Oficial"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Contacto Directo */}
            <div className="space-y-1.5 text-xs text-[#E5D6BE]">
              <a
                href="mailto:dulcesaborcp@gmail.com"
                className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>dulcesaborcp@gmail.com</span>
              </a>
              <a
                href="https://wa.me/50761672499?text=Hola,%20Dulce%20Sabor.%20Me%20gustar%C3%ADa%20realizar%20una%20consulta%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span>WhatsApp: 6167-2499</span>
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
              Canales oficiales panameños verificados:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#2C1810] border border-[#78350F]/50 text-xs">
                <span className="w-6 h-6 rounded-full bg-[#0089D0] text-white flex items-center justify-center font-bold text-[10px]">
                  Y!
                </span>
                <span>Yappy (6167-2499 / @dulcesaborpanama)</span>
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
                <span>Contra Entrega (50% anticipo requerido)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Créditos y Reconocimiento Académico */}
        <div className="pt-8 border-t border-[#4A2B1B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D6BE]/70">
          <p>© {new Date().getFullYear()} Dulce Sabor Artesanal. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Proyecto de Tienda Virtual</span>
            <span>•</span>
            <span className="text-[#F59E0B]">Chiriquí, República de Panamá</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
