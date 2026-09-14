import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas hacia los archivos de datos JSON
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
const ZONES_FILE = path.join(__dirname, 'data', 'zones.json');
const QUOTES_FILE = path.join(__dirname, 'data', 'quotes.json');

/**
 * Funciones auxiliares para lectura y escritura de JSON
 */
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return [];
  }
}

async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error al escribir en el archivo ${filePath}:`, error);
    throw error;
  }
}

// -------------------------------------------------------------
// RUTAS DE PRODUCTOS
// -------------------------------------------------------------

// Obtener catálogo completo de postres artesanales
app.get('/api/products', async (req, res) => {
  try {
    const products = await readJsonFile(PRODUCTS_FILE);
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los postres' });
  }
});

// Obtener un postre por ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readJsonFile(PRODUCTS_FILE);
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Postre no encontrado' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al consultar el postre' });
  }
});

// -------------------------------------------------------------
// RUTAS DE ZONAS DE ENTREGA (LOGÍSTICA CHIRIQUÍ)
// -------------------------------------------------------------
app.get('/api/zones', async (req, res) => {
  try {
    const zones = await readJsonFile(ZONES_FILE);
    res.json({ success: true, data: zones });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener las zonas de entrega' });
  }
});

// -------------------------------------------------------------
// RUTAS DE PEDIDOS (CHECKOUT Y PERSISTENCIA)
// -------------------------------------------------------------

// Crear un nuevo pedido
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customer,
      items,
      deliveryZoneId,
      deliveryDate,
      deliveryTimeSlot,
      paymentMethod,
      specialInstructions
    } = req.body;

    // Validación básica de campos requeridos
    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({
        success: false,
        message: 'El nombre y teléfono del cliente son obligatorios.'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El carrito no puede estar vacío.'
      });
    }

    if (!deliveryDate) {
      return res.status(400).json({
        success: false,
        message: 'Debes seleccionar una fecha de entrega (pedidos por encargo).'
      });
    }

    // Cargar productos y zonas para verificar precios reales
    const products = await readJsonFile(PRODUCTS_FILE);
    const zones = await readJsonFile(ZONES_FILE);

    const selectedZone = zones.find(z => z.id === deliveryZoneId) || zones[0];
    const deliveryCost = selectedZone ? selectedZone.cost : 0;

    let subtotal = 0;
    const verifiedItems = items.map(item => {
      const product = products.find(p => p.id === item.id);
      const unitPrice = product ? product.price : item.price;
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const totalItem = unitPrice * quantity;
      subtotal += totalItem;

      return {
        id: item.id,
        name: product ? product.name : item.name,
        unitPrice: Number(unitPrice.toFixed(2)),
        quantity,
        totalItem: Number(totalItem.toFixed(2))
      };
    });

    const total = Number((subtotal + deliveryCost).toFixed(2));

    // Generar identificador de orden tradicional panameño
    const orderNumber = `DS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      orderId: orderNumber,
      createdAt: new Date().toISOString(),
      status: 'Confirmado - En Cola de Preparación',
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email || '',
        address: customer.address || 'Retiro en punto físico'
      },
      delivery: {
        zoneId: selectedZone.id,
        zoneName: selectedZone.name,
        cost: deliveryCost,
        date: deliveryDate,
        timeSlot: deliveryTimeSlot || 'Mañana (9:00 AM - 1:00 PM)',
        estimatedNotice: selectedZone.estimatedTime
      },
      payment: {
        method: paymentMethod || 'yappy',
        details: getPaymentInstructions(paymentMethod, total, customer.phone),
        isPaid: paymentMethod === 'yappy' || paymentMethod === 'ach' ? false : false // Simulado
      },
      items: verifiedItems,
      subtotal: Number(subtotal.toFixed(2)),
      deliveryCost: Number(deliveryCost.toFixed(2)),
      total,
      specialInstructions: specialInstructions || ''
    };

    // Guardar en el archivo JSON
    const orders = await readJsonFile(ORDERS_FILE);
    orders.unshift(newOrder);
    await writeJsonFile(ORDERS_FILE, orders);

    res.status(201).json({
      success: true,
      message: '¡Pedido recibido con éxito!',
      data: newOrder
    });
  } catch (error) {
    console.error('Error al procesar la orden:', error);
    res.status(500).json({ success: false, message: 'Error interno al procesar el pedido' });
  }
});

// Consultar todas las órdenes registradas
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await readJsonFile(ORDERS_FILE);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al consultar pedidos' });
  }
});

// Consultar una orden específica por código
app.get('/api/orders/:id', async (req, res) => {
  try {
    const orders = await readJsonFile(ORDERS_FILE);
    const order = orders.find(o => o.orderId === req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al buscar la orden' });
  }
});

// -------------------------------------------------------------
// RUTAS DE COTIZACIONES PARA EVENTOS
// -------------------------------------------------------------
app.post('/api/quotes', async (req, res) => {
  try {
    const { name, phone, email, eventType, eventDate, guestsCount, requestedDesserts, notes } = req.body;

    if (!name || !phone || !eventType) {
      return res.status(400).json({
        success: false,
        message: 'Por favor completa tu nombre, teléfono y tipo de evento.'
      });
    }

    const quoteId = `COT-${Date.now().toString().slice(-6)}`;
    const newQuote = {
      quoteId,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email: email || '',
      eventType,
      eventDate: eventDate || 'Por definir',
      guestsCount: guestsCount || 'No especificado',
      requestedDesserts: requestedDesserts || [],
      notes: notes || '',
      status: 'Pendiente de Respuesta'
    };

    const quotes = await readJsonFile(QUOTES_FILE);
    quotes.unshift(newQuote);
    await writeJsonFile(QUOTES_FILE, quotes);

    res.status(201).json({
      success: true,
      message: 'Solicitud de cotización recibida. Nos contactaremos en menos de 24h.',
      data: newQuote
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al guardar la cotización' });
  }
});

// Información simulada para métodos de pago panameños
function getPaymentInstructions(method, total, customerPhone) {
  switch (method) {
    case 'yappy':
      return {
        type: 'Yappy Comercial',
        directoryName: '@dulcesaborpanama',
        phone: '6167-2499',
        instructions: `Envía B/.${total.toFixed(2)} por Yappy al directorio @dulcesaborpanama o al número 6167-2499 con la referencia de tu pedido.`
      };
    case 'ach':
      return {
        type: 'Transferencia ACH Directa',
        bank: 'Banco General de Panamá',
        accountType: 'Cuenta Corriente',
        accountNumber: '03-95-01-123456-7',
        beneficiary: 'Dulce Sabor Artesanal S.A.',
        instructions: `Transfiere B/.${total.toFixed(2)} e incluye tu número de orden en el detalle de la transferencia.`
      };
    case 'cash':
    default: {
      const advance = Number((total * 0.5).toFixed(2));
      const balance = Number((total - advance).toFixed(2));
      return {
        type: 'Pago Contra Entrega (Anticipo 50% Requerido)',
        advanceRequired: advance,
        remainingBalance: balance,
        advanceConfirmed: true,
        instructions: `Para confirmar pedidos contra entrega se requiere un anticipo del 50% del total. El 50% restante se paga al recibir. Anticipo pagado vía Yappy/ACH al 6167-2499: B/.${advance.toFixed(2)}. Saldo pendiente a pagar en efectivo al recibir: B/.${balance.toFixed(2)}.`
      };
    }
  }
}

// Ruta de estado
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Dulce Sabor API Backend',
    region: 'Tierras Altas, Chiriquí, Panamá',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[Dulce Sabor Backend] Servidor ejecutándose en http://localhost:${PORT}`);
});
