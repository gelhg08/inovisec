# Inovisec — Prueba técnica Full Stack (enfoque Backend)

Aplicación de gestión de casos georreferenciados. Incluye autenticación basada en token, una API REST que sirve los casos y un cliente que los visualiza sobre un mapa interactivo con un panel de detalle.

> **Nota sobre el enfoque:** la vacante corresponde al rol de **Desarrollador Backend**. Tras consultar con el evaluador, se confirmó que el foco de la prueba **no es el diseño**, sino el **diseño de la API y los componentes** que sustentan la solución. Por eso el esfuerzo se concentró en el backend (arquitectura, autenticación, modelado de datos y separación de responsabilidades), y el frontend se construyó como un **cliente delgado** que consume la API, con un estilo funcional y mínimo.

## Estructura del repositorio

```
inovisec/
├── backend/      API REST en NestJS (autenticación + casos)
├── frontend/     Cliente en React + Vite (login + mapa + panel)
├── docs/         Decisiones técnicas y respuestas a la evaluación
└── README.md     Este archivo
```

## Tecnologías

| Capa      | Tecnología                                             |
|-----------|--------------------------------------------------------|
| Backend   | NestJS (TypeScript), JWT, bcryptjs, class-validator    |
| Frontend  | React + Vite (JavaScript), axios, React-Leaflet        |
| Mapa      | Leaflet + OpenStreetMap (sin API key)                  |
| Control de versiones | Git con ramas por funcionalidad y Conventional Commits |

## Cómo ejecutar (resumen)

Necesitas **dos terminales**: una para el backend y otra para el frontend.

**1. Backend** (puerto 3000)
```bash
cd backend
npm install
# Copia el ejemplo de variables de entorno y define un secreto:
#   Windows (PowerShell): Copy-Item .env.example .env
#   macOS / Linux:        cp .env.example .env
npm run start:dev
```

**2. Frontend** (puerto 5173)
```bash
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173` e inicia sesión con:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

Las instrucciones detalladas están en `backend/README.md` y `frontend/README.md`.

## Documentación adicional

- [`docs/decisiones-tecnicas.md`](docs/decisiones-tecnicas.md) — decisiones de diseño y tecnología, y respuestas a las 8 preguntas de la evaluación de criterio técnico.