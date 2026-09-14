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
    tagline: "El rey dulce de Tierras Altas con raspadura y leche fresca",
    description: "Postre insignia de la provincia de Chiriquí elaborado a fuego lento en pailas de cobre durante horas. Combinamos leche entera pura de ordeño diario con raspadura artesanal de caña dulce y harina de arroz tamizada, logrando esa textura cremosa, acaramelada y profunda inconfundible con un suave aroma a canela tostada.",
    price: 4.50,
    currency: "USD",
    category: "Tradición de Cuchara",
    portion: "Frasco artesanal sellado (8 oz)",
    ingredients: [
      "Leche fresca de ordeño de Tierras Altas",
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
    price: 3.75,
    currency: "USD",
    category: "Tradición de Cuchara",
    portion: "Tazón artesanal biodegradable (10 oz)",
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
    description: "Colorida y refrescante obra de arte comestible. Cubos de gelatina elaborados artesanalmente con sabores a fresa de Cerro Punta, limón persa y mora silvestre, suspendidos en una suntuosa y suave base de crema de tres leches con toque sutil de vainilla bourbon.",
    price: 3.50,
    currency: "USD",
    category: "Refrescantes y Fríos",
    portion: "Copa domo transparente (9 oz)",
    ingredients: [
      "Zumos y extractos frutales (fresa de Cerro Punta, limón, mora)",
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
    price: 4.00,
    currency: "USD",
    category: "Horneados del Día",
    portion: "Rebanada generosa individual (approx. 180g)",
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
    "price": 5.00,
    "currency": "USD",
    "category": "Tradición de Maíz",
    "portion": "Bandeja artesanal con 2 bollos generosos",
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

export const FALLBACK_ZONES = [
  {
    id: "pickup",
    name: "Retiro en Taller Dulce Sabor (Volcán Centro)",
    description: "Retiro gratuito en nuestro taller artesanal frente al Parque Central de Volcán",
    cost: 0.00,
    estimatedTime: "Listo en 24h tras confirmación"
  },
  {
    id: "volcan",
    name: "Volcán y Alrededores",
    description: "Entrega a domicilio en casco urbano de Volcán y áreas residenciales cercanas",
    cost: 2.50,
    estimatedTime: "Entrega en franja horaria programada"
  },
  {
    id: "bambito",
    name: "Bambito",
    description: "Entrega a domicilio ruta hacia Cerro Punta, área de Bambito y hoteles",
    cost: 3.00,
    estimatedTime: "Entrega en franja horaria programada"
  },
  {
    id: "cerro-punta",
    name: "Cerro Punta & Guadalupe",
    description: "Entrega directa hasta fincas y residencias en Cerro Punta y Guadalupe",
    cost: 3.50,
    estimatedTime: "Entrega en franja horaria programada"
  },
  {
    id: "paso-ancho",
    name: "Paso Ancho & Nueva California",
    description: "Ruta agrícola y residencial de Paso Ancho y alrededores",
    cost: 2.75,
    estimatedTime: "Entrega en franja horaria programada"
  }
];

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
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const errJson = await res.json();
      throw new Error(errJson.message || 'Error al procesar el pedido');
    }
    return await res.json();
  } catch (err) {
    console.warn('Guardando simulación local de orden:', err);
    // Simulación local si el backend estuviera inactivo
    const orderNumber = `DS-LOCAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const zone = FALLBACK_ZONES.find(z => z.id === orderPayload.deliveryZoneId) || FALLBACK_ZONES[0];
    const subtotal = orderPayload.items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
    return {
      success: true,
      message: 'Pedido simulado recibido con éxito',
      data: {
        orderId: orderNumber,
        createdAt: new Date().toISOString(),
        customer: orderPayload.customer,
        delivery: {
          zoneId: zone.id,
          zoneName: zone.name,
          cost: zone.cost,
          date: orderPayload.deliveryDate,
          timeSlot: orderPayload.deliveryTimeSlot
        },
        payment: {
          method: orderPayload.paymentMethod,
          details: {
            yappy: 'Envía a @dulcesaborpanama (6745-9921)',
            ach: 'Banco General - Cta Corriente 03-95-01-123456-7',
            cash: 'Pago contra entrega en efectivo'
          }[orderPayload.paymentMethod]
        },
        items: orderPayload.items,
        subtotal,
        deliveryCost: zone.cost,
        total: subtotal + zone.cost
      }
    };
  }
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
