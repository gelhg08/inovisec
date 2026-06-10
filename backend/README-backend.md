# Backend — API de Casos (NestJS)

API REST que expone la autenticación y los casos georreferenciados de la aplicación.

## Requisitos

- Node.js 20 o superior
- npm

## Instalación y ejecución

```bash
cd backend
npm install
```

Configura las variables de entorno copiando el archivo de ejemplo:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env
# macOS / Linux
cp .env.example .env
```

Abre `.env` y define un `JWT_SECRET` largo y aleatorio. Puedes generar uno con:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Arranca el servidor en modo desarrollo:

```bash
npm run start:dev
```

La API queda disponible en `http://localhost:3000`.

## Variables de entorno

| Variable     | Descripción                                  | Ejemplo            |
|--------------|----------------------------------------------|--------------------|
| `JWT_SECRET` | Clave secreta para firmar y verificar el JWT | `8f3a1c...` (largo)|
| `PORT`       | Puerto del servidor (opcional, por defecto 3000) | `3000`         |

## Arquitectura

Arquitectura **modular por dominio**, con separación en capas: controlador → servicio → repositorio.

```
src/
├── main.ts            Arranque: ValidationPipe global y CORS
├── app.module.ts      Módulo raíz
├── auth/              Autenticación: login, emisión y verificación de JWT
│   ├── auth.controller.ts   (POST /auth/login)
│   ├── auth.service.ts
│   ├── dto/login.dto.ts
│   └── guards/jwt.guard.ts  (protege rutas con Bearer token)
├── users/             Usuarios sembrados (contraseñas hasheadas con bcrypt)
└── cases/             Recurso de negocio
    ├── cases.controller.ts  (GET /cases, GET /cases/:id)
    ├── cases.service.ts
    ├── cases.repository.ts          (contrato/abstracción)
    ├── in-memory-cases.repository.ts (implementación en memoria)
    └── data/cases.seed.ts            (casos de ejemplo)
```

**Decisión clave:** el `CasesService` depende de la abstracción `CasesRepository`, no de una implementación concreta. La persistencia en memoria se inyecta con `{ provide: CasesRepository, useClass: InMemoryCasesRepository }`. Migrar a una base de datos real implica crear una nueva clase que cumpla el contrato y cambiar una sola línea, sin tocar la lógica de negocio.

## Endpoints

| Método | Ruta          | Protegido | Descripción                                |
|--------|---------------|-----------|--------------------------------------------|
| POST   | `/auth/login` | No        | Valida credenciales y devuelve un JWT      |
| GET    | `/cases`      | Sí        | Lista todos los casos (marcadores del mapa)|
| GET    | `/cases/:id`  | Sí        | Detalle de un caso                         |

### Autenticación

1. `POST /auth/login` con `{ "username": "admin", "password": "admin123" }` devuelve un `accessToken` (JWT).
2. Las rutas protegidas requieren la cabecera `Authorization: Bearer <token>`.
3. Si las credenciales son inválidas, responde `401` con el mensaje `Usuario o contraseña incorrectos`. Se usa el mismo mensaje para usuario inexistente y contraseña incorrecta, para no revelar cuál de los dos falló.

### Ejemplo (PowerShell)

```powershell
$res = Invoke-RestMethod -Uri http://localhost:3000/auth/login -Method Post `
  -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
$token = $res.accessToken

Invoke-RestMethod -Uri http://localhost:3000/cases -Headers @{ Authorization = "Bearer $token" }
```

## Datos de ejemplo

Se siembran 6 casos georreferenciados en el área de Medellín (Estación Norte, El Poblado, Envigado, Bello, Itagüí y Sabaneta), cada uno con nombre, descripción, fecha, estado, coordenadas e imágenes. El usuario de demo es `admin` / `admin123`, con la contraseña hasheada en memoria al arrancar (nunca se almacena en texto plano).