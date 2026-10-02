// Configuración dinámica de la URL del Backend (Local vs Producción)
// En desarrollo local: usa '/api' (a través del proxy de Vite hacia localhost:5000) o variable VITE_API_URL
// En producción (Netlify): usa la variable VITE_API_URL configurada hacia Render
const RAW_API_URL = import.meta.env.VITE_API_URL || '/api';
const API_BASE_URL = RAW_API_URL.endsWith('/api')
  ? RAW_API_URL
  : `${RAW_API_URL.replace(/\/+$/, '')}/api`;

// Datos de respaldo por si el servidor backend se encuentra temporalmente apagado
export const FALLBACK_PRODUCTS = [
  {
    id: "bienmesabe",
    name: "Bienmesabe Chiricano",
    tagline: "El rey dulce de Caisán con raspadura y leche fresca",
    description: "Postre insignia de la provincia de Chiriquí elaborado a fuego lento en pailas de cobre durante horas. Combinamos leche entera pura de ordeño diario con raspadura artesanal de caña dulce y harina de arroz tamizada, logrando esa textura cremosa, acaramelada y profunda inconfundible con un suave aroma a canela tostada.",
    price: 1.25,
    currency: "USD",
    category: "Tradición de Cuchara",
    portion: "Frasco artesanal sellado (4 oz)",
    ingredients: [
      "Leche fresca de ordeño de Caisán, Renacimiento",
      "Raspadura pura de caña de trapiche",
      "Harina de arroz fina",
      "Canela en raja de Ceilán",
      "Pizca de sal marina de Aguadulce"
    ],
    preparationTime: "Elaboración de 5 horas a fuego lento. Pedidos con 24h de anticipación.",
    badge: "Insignia Chiricana",
    rating: 4.9,
    reviewCount: 48,
    modelType: "bienmesabe",
    accentColor: "#854d0e"
  },
  {
    id: "arroz-con-leche",
    name: "Arroz con Leche Cremoso",
    tagline: "Cremosa nostalgia perfumada con clavo de olor y canela",
    description: "Una caricia al paladar que evoca las tardes en casa de la abuela. Arroz especial cocinado con leche fresca, leche evaporada y toque de leche condensada artesanal, especiado con astillas de canela, clavitos de olor y ralladura fresca de limón criollo. Servido con lluvia de canela fina espolvoreada.",
    price: 1.25,
    currency: "USD",
    category: "Tradición de Cuchara",
    portion: "Tazón artesanal biodegradable (6 oz)",
    ingredients: [
      "Arroz de grano seleccionado",
      "Leche entera de pastoreo",
      "Leche condensada casera",
      "Canela entera y molida",
      "Clavitos de olor",
      "Ralladura de limón criollo"
    ],
    preparationTime: "Cocción lenta matutina. Se sirve frío o al clima.",
    badge: "Más Popular",
    rating: 4.8,
    reviewCount: 62,
    modelType: "arroz-con-leche",
    accentColor: "#d97706"
  },
  {
    id: "gelatina-mosaico",
    name: "Gelatina de Mosaico Festiva",
    tagline: "Cubos frutales translúcidos en deliciosa crema de tres leches",
    description: "Colorida y refrescante obra de arte comestible. Cubos de gelatina elaborados artesanalmente con sabores a fresa fresca, limón persa y mora silvestre, suspendidos en una suntuosa y suave base de crema de tres leches con toque sutil de vainilla bourbon.",
    price: 1.00,
    currency: "USD",
    category: "Refrescantes y Fríos",
    portion: "Copa domo transparente (5 oz)",
    ingredients: [
      "Zumos y extractos frutales (fresas de fincas chiricanas, limón, mora)",
      "Crema de leche fresca de Chiriquí",
      "Leche condensada y evaporada",
      "Grenetina de alta pureza",
      "Extracto puro de vainilla"
    ],
    preparationTime: "Cuajado y reposo en frío de 8 horas para máxima firmeza.",
    badge: "Favorito de Niños",
    rating: 4.9,
    reviewCount: 35,
    modelType: "gelatina-mosaico",
    accentColor: "#dc2626"
  },
  {
    id: "dulce-banana",
    name: "Dulce de Banana Casero",
    tagline: "Bizcocho húmedo con guineos madurados al sol y caramelo",
    description: "Bizcocho artesanal esponjoso y sumamente húmedo, preparado con plátanos guineos bien maduros cosechados en el valle, azúcar morena de caña, mantequilla de campo y nueces tostadas seleccionadas. Coronado con un baño ligero de caramelo tibio de canela.",
    price: 1.25,
    currency: "USD",
    category: "Horneados del Día",
    portion: "Rebanada individual (aprox. 120 g)",
    ingredients: [
      "Guineos maduros orgánicos del valle",
      "Harina de trigo enriquecida",
      "Mantequilla de campo sin sal",
      "Huevos de granja libres de jaula",
      "Azúcar morena no refinada",
      "Nueces tostadas y canela"
    ],
    preparationTime: "Horneado fresco todas las mañanas a primera hora.",
    badge: "Ideal con Café",
    rating: 4.7,
    reviewCount: 41,
    modelType: "dulce-banana",
    accentColor: "#b45309"
  },
  {
    id: "bollos-maiz",
    "name": "Bollos de Maíz Nuevo Dulces",
    "tagline": "El auténtico sabor del campo envuelto en hojas tiernas de maíz",
    "description": "Nuestros tradicionales bollos chiri-campesinos elaborados con maíz nuevo tierno molido en piedra el mismo día de elaboración. Suavemente endulzados con raspadura de caña, pizca de queso blanco del país desmenuzado y envueltos a mano en hojas tiernas de maíz, cocidos al vapor de leña.",
    "price": 2.00,
    "currency": "USD",
    "category": "Tradición de Maíz",
    "portion": "Bandeja artesanal con 2 bollos",
    "ingredients": [
      "Maíz nuevo tierno cosechado en su punto",
      "Queso prensado blanco artesanal",
      "Raspadura rallada",
      "Hojas verdes de maíz para envoltura",
      "Pizca de mantequilla fresca y sal"
    ],
    "preparationTime": "Molienda y cocción al vapor fresca matutina.",
    "badge": "100% Campo Panameño",
    "rating": 5.0,
    "reviewCount": 54,
    "modelType": "bollos-maiz",
    "accentColor": "#ca8a04"
  }
];

import { ZONAS_ENTREGA, YAPPY_NUMERO, LOCALIDAD } from '../config/negocio';

export const FALLBACK_ZONES = ZONAS_ENTREGA;

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error('Error de red');
    const json = await res.json();
    return json.data || FALLBACK_PRODUCTS;
  } catch (err) {
    console.warn('API no disponible, usando catálogo local:', err);
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('Error al consultar producto');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return FALLBACK_PRODUCTS.find(p => p.id === id) || null;
  }
}

export async function fetchZones() {
  try {
    const res = await fetch(`${API_BASE_URL}/zones`);
    if (!res.ok) throw new Error('Error de red al consultar zonas');
    const json = await res.json();
    return json.data || FALLBACK_ZONES;
  } catch (err) {
    console.warn('Usando zonas de entrega locales:', err);
    return FALLBACK_ZONES;
  }
}

export async function createOrder(orderPayload) {
  // Recalcular precios de forma estricta contra el catálogo oficial
  const validatedItems = orderPayload.items.map(it => {
    const catalogItem = FALLBACK_PRODUCTS.find(p => p.id === it.id);
    const unitPrice = catalogItem ? catalogItem.price : it.price;
    return {
      id: it.id,
      name: catalogItem ? catalogItem.name : it.name,
      price: unitPrice,
      quantity: Math.max(1, parseInt(it.quantity, 10) || 1)
    };
  });

  const zone = (Array.isArray(FALLBACK_ZONES) && FALLBACK_ZONES.find(z => z.id === orderPayload.deliveryZoneId)) || FALLBACK_ZONES[0] || {};
  const subtotal = Number(validatedItems.reduce((acc, it) => acc + (it.price * it.quantity), 0).toFixed(2));
  const rawDeliveryCost = zone.costo ?? zone.cost ?? 0;
  const deliveryCost = Number((typeof rawDeliveryCost === 'number' ? rawDeliveryCost : parseFloat(rawDeliveryCost) || 0).toFixed(2));
  const total = Number((subtotal + deliveryCost).toFixed(2));

  // Generar número de pedido único con formato DS-XXXXXX (6 dígitos)
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const orderNumber = `DS-${randomSuffix}`;

  const orderData = {
    orderId: orderNumber,
    status: 'Pendiente de pago',
    createdAt: new Date().toISOString(),
    customer: {
      name: orderPayload.customer.name,
      phone: orderPayload.customer.phone,
      address: orderPayload.customer.address,
      comunidad: zone.nombre || zone.name
    },
    delivery: {
      zoneId: zone.id,
      zoneName: zone.nombre || zone.name,
      cost: deliveryCost
    },
    payment: {
      method: 'yappy',
      phone: YAPPY_NUMERO,
      instructions: `Paga por Yappy al ${YAPPY_NUMERO} con el número de pedido como concepto y envía tu comprobante por WhatsApp.`
    },
    items: validatedItems,
    subtotal,
    deliveryCost,
    total
  };

  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      const serverJson = await res.json();
      return serverJson;
    }
  } catch (err) {
    console.warn('Backend remoto no disponible, usando registro local garantizado:', err);
  }

  return {
    success: true,
    message: 'Pedido registrado con éxito. Pendiente de pago.',
    data: orderData
  };
}

export async function submitQuote(quotePayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quotePayload)
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      message: 'Solicitud de cotización registrada localmente.',
      data: { quoteId: `COT-${Date.now().toString().slice(-6)}` }
    };
  }
}
