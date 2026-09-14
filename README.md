# 🍮 Dulce Sabor | Tienda Virtual 3D de Postres Artesanales Panameños

Sitio web completo de comercio electrónico con visuales 3D interactivos para **Dulce Sabor**, un negocio artesanal de postres tradicionales de Tierras Altas, provincia de Chiriquí, Panamá.

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
│   │   ├── zones.json        # Zonas y tarifas de entrega en Tierras Altas
│   │   └── quotes.json       # Solicitudes de banquetes y eventos
│   ├── server.js             # Servidor Express y rutas REST comentadas en español
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── three/        # Componentes y modelos 3D con Three.js
│   │   │   │   ├── DessertCanvas.jsx        # Canvas reusable con luces y sombras
│   │   │   │   ├── Bienmesabe3D.jsx         # Modelo 3D: Vasija de barro y canela
│   │   │   │   ├── ArrozConLeche3D.jsx      # Modelo 3D: Tazón de cerámica y canela
│   │   │   │   ├── GelatinaMosaico3D.jsx    # Modelo 3D: Gelatina translúcida y frutos
│   │   │   │   ├── DulceBanana3D.jsx        # Modelo 3D: Queque húmedo y caramelo
│   │   │   │   ├── BollosMaiz3D.jsx         # Modelo 3D: Bollos en capullo de maíz
│   │   │   │   ├── DessertModelPicker.jsx   # Selector dinámico de modelo 3D
│   │   │   │   └── HeroShowcase3D.jsx       # Escenario principal del Hero
│   │   │   ├── Navbar.jsx                   # Barra de navegación con contador
│   │   │   ├── Hero.jsx                     # Sección hero inmersiva
│   │   │   ├── ProductCard.jsx              # Tarjeta de producto con viewport 3D
│   │   │   ├── ProductCatalog.jsx           # Catálogo con filtros de categoría
│   │   │   ├── ProductDetailModal.jsx       # Modal 3D detallado 360° con zoom
│   │   │   ├── CartDrawer.jsx               # Carrito lateral deslizable
│   │   │   ├── CheckoutModal.jsx            # Checkout panameño y zonas
│   │   │   ├── OrderSuccessModal.jsx        # Recibo formal y WhatsApp
│   │   │   ├── AboutSection.jsx             # Modelo B2C e historia tradicional
│   │   │   ├── EventQuoteSection.jsx        # Formulario de cotización de eventos
│   │   │   └── Footer.jsx                   # Contacto, cobertura y redes
│   │   ├── context/
│   │   │   └── CartContext.jsx              # Estado global del carrito y modales
│   │   ├── services/
│   │   │   └── api.js                       # Cliente HTTP con fallback resiliente
│   │   ├── App.jsx                          # Componente raíz
│   │   ├── main.jsx                         # Entrada de React
│   │   └── index.css                        # Estilos globales y paleta artesanal
│   ├── index.html
│   ├── vite.config.js                       # Configuración de proxy a Express
│   └── package.json
└── package.json                             # Scripts globales
```

---

## 🍮 Catálogo de Postres Tradicionales en 3D

1. **Bienmesabe Chiricano:** Vasija de barro con dulce cocinado a fuego lento con leche fresca de ordeño, raspadura de trapiche y canela en rama.
2. **Arroz con Leche Cremoso:** Tazón de cerámica con arroz de grano selecto, leche condensada casera, lluvia de canela y toque de limón criollo.
3. **Gelatina de Mosaico Festiva:** Obra de arte comestible con cubos translúcidos de fresa de Cerro Punta, limón y mora sobre una rica base de tres leches.
4. **Dulce de Banana Casero:** Bizcocho húmedo horneado con guineos maduros del valle, nueces tostadas y baño ligero de caramelo tibio.
5. **Bollos de Maíz Nuevo Dulces:** Bollos típicos chiri-campesinos elaborados con maíz tierno molido en piedra, endulzados con raspadura y envueltos en capullos tiernos de maíz.

---

## 💼 Contexto Académico del Negocio

- **Modelo B2C:** Venta directa al consumidor sin intermediarios para conservar la pureza artesanal.
- **Pedidos por Encargo:** Los postres se cocinan frescos bajo demanda (requieren 24h de anticipación).
- **Logística en Chiriquí:** Cobertura para **Volcán**, **Cerro Punta & Guadalupe**, **Bambito**, **Paso Ancho** y opción de **Retiro en Taller**.
- **Formas de Pago Panameñas:**
  - **Yappy:** Billetera móvil más utilizada en Panamá (@dulcesaborpanama / 6167-2499).
  - **ACH:** Transferencia bancaria directa (Banco General).
  - **Pago Contra Entrega:** Con anticipo obligatorio del 50% vía Yappy o ACH, y saldo restante al momento de recibir o retirar.
- **Eventos:** Formulario interactivo para cotizar mesas de dulces para bodas, cumpleaños y banquetes familiares.

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
