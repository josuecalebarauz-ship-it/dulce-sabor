# 🍮 Dulce Sabor | Tienda Virtual de Postres Artesanales Panameños

Sitio web completo de comercio electrónico para **Dulce Sabor**, un negocio artesanal de postres tradicionales de Caisán, distrito de Renacimiento, provincia de Chiriquí, Panamá.

---

## 🛠️ Stack Tecnológico

- **Frontend:**
  - **React 18.3** + **Vite 6**
  - **Tailwind CSS v4** (paleta cálida: crema, caramelo, dorado, cacao y terracota)
  - **Efecto Cinemático Ken Burns:** Movimiento sutil continuo de zoom y paneo suave tipo video con Framer Motion en Hero y Catálogo
  - **Galería Fotográfica Multimagen:** Carrusel interactivo con 3 fotos por postre, selector de miniaturas y visor lightbox
  - **Framer Motion** (transiciones fluidas de interfaz y animaciones de entrada)
  - **Lucide React** (iconografía limpia y moderna)
  - **Canvas-Confetti** (celebración de orden exitosa)

- **Backend:**
  - **Node.js** + **Express**
  - **API REST modular** (`/api/products`, `/api/zones`, `/api/orders`, `/api/quotes`)
  - **CORS** y **Morgan** para registro de peticiones

- **Base de Datos:**
  - Almacenamiento JSON persistente en `backend/data/` (`products.json`, `orders.json`, `zones.json`, `quotes.json`)

---

## 📂 Estructura del Proyecto

```text
dulce-sabor/
├── backend/
│   ├── data/
│   │   ├── products.json     # Catálogo de los 5 postres tradicionales
│   │   ├── orders.json       # Persistencia de pedidos completados
│   │   ├── zones.json        # Zonas y tarifas de entrega en Renacimiento
│   │   └── quotes.json       # Solicitudes de banquetes y eventos
│   ├── server.js             # Servidor Express y rutas REST
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── images/brand/     # Activos de marca optimizados en WebP
│   │   └── _redirects        # Enrutamiento SPA en Netlify
│   ├── originales-brand/     # Copia de respaldo de PNGs de alta resolución
│   ├── src/
│   │   ├── config/
│   │   │   └── negocio.js    # Configuración central (Yappy, WhatsApp, Zonas)
│   │   ├── components/
│   │   │   ├── Navbar.jsx                   # Encabezado con logo oficial y navegación
│   │   │   ├── Hero.jsx                     # Hero con video de mascota y patrón de marca
│   │   │   ├── ProductCard.jsx              # Tarjeta de producto con galería
│   │   │   ├── ProductCatalog.jsx           # Catálogo con filtros y empaques
│   │   │   ├── DeliveryZonesSection.jsx     # Zonas de entrega en Renacimiento
│   │   │   ├── PackagingSection.jsx         # Presentación oficial de empaques
│   │   │   ├── MascotaBrandSection.jsx      # Conoce a la mascota, bocetos y stickers
│   │   │   ├── AboutSection.jsx             # Historia, tradición y modelo B2C
│   │   │   ├── EventQuoteSection.jsx        # Formulario de cotización de eventos
│   │   │   ├── Footer.jsx                   # Contacto, cobertura y redes
│   │   │   ├── CartDrawer.jsx               # Carrito deslizable
│   │   │   ├── CheckoutModal.jsx            # Checkout exclusivo por Yappy
│   │   │   └── OrderSuccessModal.jsx        # Pantalla con número DS-XXXXXX y WhatsApp
│   │   ├── context/
│   │   │   └── CartContext.jsx              # Estado del carrito con sessionStorage
│   │   ├── services/
│   │   │   └── api.js                       # Cliente HTTP con recálculo de precios
│   │   ├── App.jsx                          # Componente raíz
│   │   ├── main.jsx                         # Entrada de React
│   │   └── index.css                        # Estilos globales y Tailwind v4
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── package.json
```

---

## 🍮 Catálogo de Postres Tradicionales

1. **Bienmesabe Chiricano (B/. 1.25):** Postre insignia de Caisán cocinado a fuego lento con leche fresca de ordeño, raspadura de trapiche y canela en rama.
2. **Arroz con Leche Cremoso (B/. 1.25):** Arroz especial con leche entera, leche condensada casera, lluvia de canela fina y toque de limón criollo.
3. **Gelatina de Mosaico Festiva (B/. 1.00):** Cubos translúcidos de fresa, limón y mora suspendidos en suave crema de tres leches.
4. **Dulce de Banana Casero (B/. 1.25):** Bizcocho húmedo horneado con guineos maduros del valle, nueces tostadas y baño de caramelo tibio.
5. **Bollos de Maíz Nuevo Dulces (B/. 2.00):** Bollos tradicionales campesinos elaborados con maíz tierno molido en piedra, raspadura y envueltos en hojas tiernas de maíz.

---

## 💼 Contexto del Negocio & Logística

- **Ubicación:** Caisán, distrito de Renacimiento, provincia de Chiriquí, Panamá.
- **Modelo B2C:** Venta directa al consumidor sin intermediarios para conservar la frescura de la leche y los ingredientes agrícolas.
- **Logística Rural:** Entregas bajo encargo con **24 horas de anticipación**. Cobertura en: Plaza de Caisán, Río Sereno, Santa Marta, Cañas Gordas, Monte Lirio, Breñón y San Andrés.
- **Pago por Yappy (Sin Pasarela Externa):**
  - Número de Yappy: **6167-2499**.
  - El cliente realiza su pedido, recibe su código único `DS-XXXXXX` con estado "Pendiente de pago" y envía su comprobante por WhatsApp para confirmación manual.
- **Identidad de Marca:** Nueva imagen visual con logo oficial, patrones decorativos sutiles, mascota de la marca y empaques artesanales.

---

## 🚀 Instrucciones para Ejecutar el Proyecto Localmente

### Prerrequisitos
Tener instalado Node.js (v18 o superior) y npm.

### Paso 1: Iniciar el Backend (API REST)
Abre una terminal (PowerShell o CMD):
```powershell
cd C:\Users\Delli\.gemini\antigravity\scratch\dulce-sabor\backend
npm install
npm run dev
```
> El servidor iniciará en `http://localhost:5000`.

### Paso 2: Iniciar el Frontend (React + Vite + 3D)
Abre una segunda terminal:
```powershell
cd C:\Users\Delli\.gemini\antigravity\scratch\dulce-sabor\frontend
npm install
npm run dev
```
> Vite iniciará el servidor de desarrollo en `http://localhost:3000`.

### Paso 3: Abrir en el Navegador
Visita **`http://localhost:3000`** en tu navegador para interactuar con la tienda, ver las imágenes cinemáticas Ken Burns, la galería de fotos, probar el carrito, seleccionar tu zona en Tierras Altas y completar el checkout simulado con Yappy o ACH.

---

## 🌐 Despliegue en Netlify (Producción)

### Variables de Entorno en Netlify:
1. En tu dashboard de Netlify ve a **Site configuration > Environment variables**.
2. Agrega la variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://dulce-sabor-backend.onrender.com/api`

### Configuración de Build en Netlify:
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `frontend/dist`
- El archivo `frontend/public/_redirects` ya se encuentra configurado para gestionar el enrutamiento SPA sin errores 404.
