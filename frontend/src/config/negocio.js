// Configuración Central del Negocio "Dulce Sabor"
// Este archivo contiene los datos de contacto, pagos y zonas de distribución editables.

// Número para pagos directos por Yappy (sin pasarela externa)
export const YAPPY_NUMERO = '6167-2499';
export const YAPPY_NOMBRE = 'Dulce Sabor';

// Número de WhatsApp oficial para recibir comprobantes y confirmar pedidos manualmente.
// Valor de ejemplo editable (formato internacional con código de país 507):
export const WHATSAPP_NUMERO = '50761672499';

// Correo electrónico oficial
export const EMAIL_NEGOCIO = 'dulcesaborcp@gmail.com';

// Instagram oficial
export const INSTAGRAM_URL = 'https://www.instagram.com/dulcesabor.cp/';
export const INSTAGRAM_HANDLE = '@dulcesabor.cp';

// Localidad oficial de Dulce Sabor
export const LOCALIDAD = {
  comunidad: 'Caisán',
  distrito: 'distrito de Renacimiento',
  provincia: 'provincia de Chiriquí',
  pais: 'Panamá',
  direccionCorta: 'Caisán, Renacimiento, Chiriquí',
  direccionCompleta: 'Caisán, distrito de Renacimiento, provincia de Chiriquí, Panamá'
};

// Objeto de configuración editable: zona -> costo de envío en balboas (B/.)
export const COSTOS_ENVIO_POR_ZONA = {
  'caisan-centro': 1.50,
  'rio-sereno': 3.50,
  'santa-marta': 2.50,
  'canas-gordas': 3.50,
  'monte-lirio': 3.00,
  'brenon': 2.75,
  'san-andres': 3.00
};

// Zonas y comunidades circundantes a Caisán para distribución y entrega
export const ZONAS_ENTREGA = [
  {
    id: 'caisan-centro',
    nombre: 'Plaza de Caisán',
    costo: COSTOS_ENVIO_POR_ZONA['caisan-centro'] ?? 1.50,
    cost: COSTOS_ENVIO_POR_ZONA['caisan-centro'] ?? 1.50,
    tiempo: 'Entrega por pedido (24h de anticipación)',
    descripcion: 'Punto central en Plaza de Caisán y alrededores inmediatos'
  },
  {
    id: 'rio-sereno',
    nombre: 'Río Sereno',
    costo: COSTOS_ENVIO_POR_ZONA['rio-sereno'] ?? 3.50,
    cost: COSTOS_ENVIO_POR_ZONA['rio-sereno'] ?? 3.50,
    tiempo: 'Entrega por pedido (24h de anticipación)',
    descripcion: 'Cabecera de Renacimiento y zonas comerciales'
  },
  {
    id: 'santa-marta',
    nombre: 'Santa Marta',
    costo: COSTOS_ENVIO_POR_ZONA['santa-marta'] ?? 2.50,
    cost: COSTOS_ENVIO_POR_ZONA['santa-marta'] ?? 2.50,
    tiempo: 'Entrega por pedido (24h de anticipación)',
    descripcion: 'Comunidad agrícola vecina de Caisán'
  },
  {
    id: 'canas-gordas',
    nombre: 'Cañas Gordas',
    costo: COSTOS_ENVIO_POR_ZONA['canas-gordas'] ?? 3.50,
    cost: COSTOS_ENVIO_POR_ZONA['canas-gordas'] ?? 3.50,
    tiempo: 'Entrega por pedido (24h de anticipación)',
    descripcion: 'Ruta fronteriza y comunidades aledañas'
  },
  {
    id: 'monte-lirio',
    nombre: 'Monte Lirio',
    costo: COSTOS_ENVIO_POR_ZONA['monte-lirio'] ?? 3.00,
    cost: COSTOS_ENVIO_POR_ZONA['monte-lirio'] ?? 3.00,
    tiempo: 'Entrega por pedido (24h de anticipación)',
    descripcion: 'Sector de Monte Lirio y fincas cafetaleras'
  },
  {
    id: 'brenon',
    nombre: 'Breñón',
    costo: COSTOS_ENVIO_POR_ZONA['brenon'] ?? 2.75,
    cost: COSTOS_ENVIO_POR_ZONA['brenon'] ?? 2.75,
    tiempo: 'Entrega por pedido (24h de anticipación)',
    descripcion: 'Área rural y residencial de Breñón'
  },
  {
    id: 'san-andres',
    nombre: 'San Andrés',
    costo: COSTOS_ENVIO_POR_ZONA['san-andres'] ?? 3.00,
    cost: COSTOS_ENVIO_POR_ZONA['san-andres'] ?? 3.00,
    tiempo: 'Entrega por pedido (24h de anticipación)',
    descripcion: 'Comunidad vecina y ruta de conexión'
  }
];
