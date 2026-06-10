# Frontend — Cliente de Casos (React + Vite)

Cliente que consume la API del backend: pantalla de login, mapa interactivo con los casos y panel de detalle.

## Requisitos

- Node.js 20 o superior
- npm
- El **backend debe estar corriendo** en `http://localhost:3000`

## Instalación y ejecución

```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173` e inicia sesión con `admin` / `admin123`.

## Estructura

```
src/
├── main.jsx            Punto de entrada
├── App.jsx             Estado de sesión: muestra Login o MapView según el token
├── App.css             Estilos
├── api/api.js          Capa de acceso a la API (login, getCases, getCase)
└── components/
    ├── Login.jsx       Formulario de login con manejo de error
    └── MapView.jsx     Vista dividida: mapa Leaflet + panel de detalle

public/
└── images/             Imágenes de los casos (assets estáticos)
```

## Cómo funciona

- **Sesión:** el token JWT se guarda en el estado de `App` y se pasa a los componentes que lo necesitan. Si no hay token, se muestra el login; si lo hay, la vista dividida.
- **Login:** envía las credenciales a `POST /auth/login`. Si el backend responde `401`, muestra "Usuario o contraseña incorrectos".
- **Mapa:** al montarse, pide `GET /cases` y pinta un marcador por caso (Leaflet + OpenStreetMap, sin API key).
- **Panel:** al hacer clic en un marcador, pide `GET /cases/:id` y muestra el detalle (nombre, estado, fecha, descripción e imagen).
- Todas las peticiones protegidas envían la cabecera `Authorization: Bearer <token>`.

## Decisiones

- **JavaScript en lugar de TypeScript:** el frontend es un cliente delgado y se priorizó velocidad de desarrollo. El rigor de tipos se reservó para el backend, donde aporta más valor.
- **Leaflet + OpenStreetMap:** mapa interactivo sin costo ni API key.