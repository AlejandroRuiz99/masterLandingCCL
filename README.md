# Compromiso Legal · Landing de recursos

Landing de captación de leads para **Compromiso Legal**: una biblioteca de recursos
gratuitos (guías y calculadoras) sobre extranjería, pensiones, derecho laboral y
Seguridad Social. Cada recurso se desbloquea rellenando un formulario que registra
el contacto en Brevo y entrega el recurso al instante.

## Stack

- **React 18 + Vite + TypeScript**
- **Tailwind CSS** (sistema de diseño negro cálido + dorado)
- **Framer Motion** (animaciones y reveals al scroll)
- **Lenis** (scroll con inercia)
- **@paper-design/shaders-react** (fondo `MeshGradient` y medallón `LiquidMetal` en WebGL)
- **React Hook Form + Zod** (formularios con validación)
- **Brevo** vía función serverless en `/api/subscribe` (la API key nunca se expone al cliente)

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc + vite)
npm run preview  # previsualizar el build
```

## Variables de entorno

Copia `.env.example` a `.env` y rellena (en Vercel: Project Settings → Environment Variables):

| Variable | Descripción |
|----------|-------------|
| `BREVO_API_KEY` | Clave API v3 de Brevo (obligatoria) |
| `BREVO_LIST_ID` | ID de la lista donde se guardan los leads (opcional) |
| `BREVO_SENDER_EMAIL` | Email remitente verificado en Brevo |
| `BREVO_SENDER_NAME` | Nombre del remitente |

## Despliegue

Pensado para **Vercel** (`vercel.json` incluido). La carpeta `api/` se despliega como
función serverless automáticamente. Configura las variables de entorno antes del primer
deploy o el formulario devolverá error.

## Estructura

```
api/                 Función serverless de captura de leads (Brevo)
public/              Assets estáticos (logos, imágenes)
src/
  components/        UI, secciones, visuales (shaders), formulario
  data/              site.ts (contacto/redes) y resources.ts (recursos)
  hooks/ lib/        utilidades, animaciones, schema y control de Lenis
```

## Pendiente antes de producción

- Configurar `BREVO_API_KEY` real en Vercel.
- Sustituir testimonios de ejemplo por reseñas reales.
- Adjuntar los PDF reales y el enlace de descarga en el email transaccional.
