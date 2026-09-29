import React from 'react';
import { MapPin, Phone, Mail, Instagram, Clock, ShieldCheck, Heart } from 'lucide-react';
import { YAPPY_NUMERO, WHATSAPP_NUMERO, EMAIL_NEGOCIO, INSTAGRAM_URL, LOCALIDAD, ZONAS_ENTREGA } from '../config/negocio';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#1D0F0A] text-[#FDF6E2] pt-16 pb-12 border-t border-[#D97706]/20 relative overflow-hidden">
      {/* Patrón decorativo de iconos de fondo sutil */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url('/images/brand/patron-iconos.webp')",
          backgroundRepeat: 'repeat',
          backgroundSize: '280px 280px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Columna 1: Marca e Historia */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/brand/logo.png"
                alt="Logo oficial de Dulce Sabor"
                loading="lazy"
                className="h-11 w-auto object-contain"
              />
              <div>
                <span className="font-brand-title text-xl font-bold tracking-tight text-[#FFFDF9] block">
                  Dulce Sabor
                </span>
                <span className="text-[10px] text-[#F59E0B] tracking-wider uppercase font-semibold">
                  Postres Artesanales
                </span>
              </div>
            </div>
            <p className="text-xs text-[#E5D6BE] leading-relaxed mb-4">
              Elaboramos con pasión los dulces y postres típicos de la cultura panameña en {LOCALIDAD.direccionCompleta}. Tradición artesanal, sin conservantes químicos, directo a tu mesa.
            </p>

            {/* Redes Sociales Oficiales: Instagram y WhatsApp */}
            <div className="flex items-center gap-3 text-[#F59E0B] mb-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C1810] border border-[#78350F] flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-colors shadow-xs"
                aria-label="Instagram Oficial de Dulce Sabor"
                title="Instagram Oficial"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMERO}?text=Hola,%20Dulce%20Sabor.%20Me%20gustar%C3%ADa%20realizar%20una%20consulta%20sobre%20sus%20productos.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
                aria-label="WhatsApp Oficial (6167-2499)"
                title="WhatsApp Oficial"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Contacto Directo */}
            <div className="space-y-1.5 text-xs text-[#E5D6BE]">
              <a
                href={`mailto:${EMAIL_NEGOCIO}`}
                className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>{EMAIL_NEGOCIO}</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMERO}?text=Hola,%20Dulce%20Sabor.%20Me%20gustar%C3%ADa%20realizar%20una%20consulta%20sobre%20sus%20productos.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span>WhatsApp: {YAPPY_NUMERO}</span>
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
                  Catálogo de Postres
                </a>
              </li>
              <li>
                <a href="#zonas" className="hover:text-[#F59E0B] transition-colors">
                  Zonas de Entrega (Renacimiento)
                </a>
              </li>
              <li>
                <a href="#empaques" className="hover:text-[#F59E0B] transition-colors">
                  Nuestros Empaques
                </a>
              </li>
              <li>
                <a href="#mascota" className="hover:text-[#F59E0B] transition-colors">
                  Conoce a Nuestra Mascota
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-[#F59E0B] transition-colors">
                  Nuestra Historia
                </a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-[#F59E0B] transition-colors">
                  Cotizaciones de Eventos
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Cobertura en Caisán & Renacimiento */}
          <div>
            <h4 className="font-brand-title text-base font-bold text-[#F59E0B] mb-4 uppercase tracking-wider text-xs">
              Zonas de Entrega
            </h4>
            <ul className="space-y-2 text-xs text-[#E5D6BE]">
              {Array.isArray(ZONAS_ENTREGA) && ZONAS_ENTREGA.slice(0, 5).map((zone) => {
                const rawCost = zone?.costo ?? zone?.cost ?? 0;
                const numericCost = typeof rawCost === 'number' ? rawCost : parseFloat(rawCost) || 0;
                return (
                  <li key={zone?.id || zone?.nombre} className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                    <span>{zone?.nombre || 'Comunidad'} (B/. {numericCost.toFixed(2)})</span>
                  </li>
                );
              })}
              <li className="flex items-start gap-2 text-[#FCEBBB] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                <span>Y comunidades aledañas de Renacimiento</span>
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
              Método de Pago
            </h4>
            <p className="text-xs text-[#E5D6BE] mb-3">
              Pago directo y transparente sin pasarelas externas:
            </p>
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-[#2C1810] border border-[#78350F]/50 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-lg bg-[#0089D0] text-white flex items-center justify-center font-bold text-xs">
                    Y
                  </span>
                  <span className="font-bold text-white">Yappy al {YAPPY_NUMERO}</span>
                </div>
                <p className="text-[11px] text-[#E5D6BE] leading-relaxed">
                  Realiza tu pago usando el número de pedido como concepto y envía tu comprobante a nuestro WhatsApp.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#2C1810]/70 border border-[#78350F]/30 text-[11px] text-[#F59E0B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#16A34A]" />
                <span>Confirmación de pago manual por el propietario</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Créditos y Reconocimiento */}
        <div className="pt-8 border-t border-[#4A2B1B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D6BE]/70">
          <p>© {new Date().getFullYear()} Dulce Sabor Artesanal. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span>{LOCALIDAD.direccionCompleta}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
