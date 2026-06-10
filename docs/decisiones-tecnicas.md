# Decisiones técnicas y evaluación de criterio técnico

## Parte 1 — Decisiones de diseño y tecnología

### Enfoque del ejercicio
La vacante es de **Desarrollador Backend**. 

### Stack
- **Backend: NestJS (TypeScript).** Se eligió por su arquitectura modular y opinada (módulos, controladores, servicios, guards, DTOs), que hace explícita la separación de responsabilidades y facilita el crecimiento en equipo. Es justamente el "vocabulario de componentes" que la prueba pide demostrar.
- **Frontend: React + Vite (JavaScript).** Cliente delgado; se priorizó velocidad de desarrollo. El rigor de TypeScript se reservó para el backend.
- **Mapa: Leaflet + OpenStreetMap.** Open source, sin costo ni API key.

### Autenticación
Login real con **JWT**: `POST /auth/login` valida credenciales y emite un token firmado; un guard verifica el token en las rutas protegidas. Las contraseñas de los usuarios sembrados se **hashean con bcrypt** al arrancar (nunca se guardan en texto plano). El secreto del JWT se lee de una variable de entorno, no se escribe en el código. El error de login es genérico ("Usuario o contraseña incorrectos") para no revelar si falló el usuario o la contraseña.

### Acceso a datos: patrón repositorio
El `CasesService` depende de la abstracción `CasesRepository`, no de una implementación concreta. Hoy se inyecta una implementación en memoria; migrar a una base de datos real implica crear otra clase que cumpla el mismo contrato y cambiar **una sola línea** en el módulo, sin tocar el servicio ni el controlador. Es una aplicación directa de la **inversión de dependencias** (la D de SOLID) que reduce el acoplamiento.

### Calidad de borde
- Validación de entrada con `class-validator` y un `ValidationPipe` global.
- Semántica HTTP correcta: `401` sin token o credenciales inválidas, `404` si el caso no existe.
- CORS habilitado para permitir la comunicación entre frontend (5173) y backend (3000).

### Control de versiones
Git con **ramas de funcionalidad de vida corta** (`feat/auth`, `feat/cases`, `feat/frontend`) integradas a `main`, y **Conventional Commits**. Se descartó Gitflow completo por ser excesivo para el alcance.

---

## Parte 2 — Respuestas a la evaluación de criterio técnico

### 4.1 Escalabilidad y arquitectura

**1. Si esta maqueta evolucionara a una aplicación productiva con miles de usuarios concurrentes, ¿qué cambios arquitectónicos propondría y por qué?**

- **Persistencia real:** reemplazar el repositorio en memoria por **PostgreSQL con la extensión PostGIS**, que añade tipos e índices geoespaciales. Gracias al patrón repositorio ya aplicado, el cambio queda localizado.
- **Escalado horizontal:** el JWT no guarda sesión en el servidor, así que el backend ya es *stateless* y se puede replicar en varias instancias detrás de un **balanceador de carga**, sin sesiones pegajosas.
- **Caché:** **Redis** para respuestas frecuentes (lista de casos), rate limiting y manejo de refresh tokens.
- **Base de datos:** réplicas de lectura, paginación obligatoria e índices (incluidos los geoespaciales) para sostener la carga de consultas.
- **Contenedores y orquestación:** empaquetar con **Docker** y desplegar en **Kubernetes / ECS** con autoescalado según demanda.
- **Assets y mapa:** servir imágenes desde **almacenamiento de objetos (S3/GCS) detrás de un CDN**, igual que las teselas del mapa.
- **Observabilidad:** logs centralizados, métricas y trazas distribuidas para detectar cuellos de botella.
- **Tareas pesadas:** mover procesos largos a **colas de mensajería** (RabbitMQ/SQS) y workers asíncronos.

**2. ¿Cómo estructuraría el frontend y el backend para garantizar mantenibilidad y crecimiento a largo plazo?**

- **Backend:** mantener la **arquitectura modular por dominio** (auth, users, cases) con capas controlador/servicio/repositorio y dependencia de abstracciones. Si crece, evolucionar hacia una **arquitectura hexagonal / limpia**, separando el dominio de la infraestructura. DTOs y validación en los bordes, y pruebas por capa.
- **Frontend:** organizar **por features**, con una capa de servicios de API separada (ya aplicada en `api.js`), componentes reutilizables, y una solución de estado global (Context/Zustand/Redux) cuando la complejidad lo justifique. Adoptar TypeScript a medida que el cliente crece.
- **Contratos compartidos:** tratar los DTOs como contrato y, idealmente, **generar los tipos del frontend a partir del OpenAPI del backend** para que ambos no se desincronicen.
- **Convenciones:** linting, formateo, Conventional Commits y CI que los haga cumplir.

**3. ¿Qué estrategias implementaría para optimizar el rendimiento del mapa con miles de casos georreferenciados?**

- **Cargar solo lo visible:** pedir al backend únicamente los casos dentro del *bounding box* del viewport y del nivel de zoom actual, filtrando con índices geoespaciales (PostGIS). No traer todo el dataset.
- **Carga incremental** al hacer pan/zoom, con *debounce* de esos eventos para no saturar la API.
- **Respuesta ligera en la lista** (solo id, coordenadas y nombre) y **detalle bajo demanda** con `GET /cases/:id` —patrón ya aplicado en esta maqueta.
- **Caché** de respuestas y de teselas; para datasets enormes, considerar **teselas vectoriales** generadas en el servidor.

### 4.2 Gestión técnica y organización del trabajo

**4. Si liderara un equipo de 3 a 5 desarrolladores, ¿cómo organizaría el trabajo?**

- **Metodología:** Scrum o Kanban ligero, con sprints de 1–2 semanas, *daily*, refinamiento y retrospectiva.
- **División de tareas:** por vertical de dominio (auth, casos, mapa) según las fortalezas de cada persona, con historias de usuario que tengan **criterios de aceptación** claros.
- **Revisiones de código:** *Pull Requests* obligatorios con al menos un revisor, ramas cortas (como las usadas en este proyecto) y una checklist de revisión.
- **CI/CD:** pipeline que en cada PR corre lint + tests + build, y despliegues automatizados a entornos.
- **Entregables:** una **Definición de Hecho (DoD)** compartida y demos al cierre de cada sprint.
- **Documentación viva:** README actualizados y **ADRs** (registros de decisiones de arquitectura) para dejar trazado el porqué de cada decisión.

**5. ¿Qué prácticas implementaría para garantizar calidad del código y reducir deuda técnica?**

- **Automatización en CI:** ESLint + Prettier y la suite de tests como puerta obligatoria antes de fusionar.
- **Pruebas en varios niveles:** unitarias (servicios), de integración (endpoints) y una cobertura mínima acordada.
- **Revisión de código y *pair programming*** para difundir conocimiento y detectar problemas temprano.
- **Principios SOLID y tipado fuerte:** el patrón repositorio de este proyecto es un ejemplo concreto de bajo acoplamiento.
- **Gestión de la deuda:** registrarla de forma visible, reservar capacidad por sprint para pagarla y medir con herramientas como SonarQube.
- **ADRs** para que las decisiones queden documentadas y no se repitan discusiones.

### 4.3 Toma de decisiones

**6. Si existieran dos propuestas para el mapa (Google Maps vs. Leaflet), ¿qué criterios usaría para decidir?**

- **Costo total:** Google Maps factura por uso y requiere API key con facturación; **Leaflet + OpenStreetMap es gratuito y open source**. Para esta maqueta inclinó la balanza hacia Leaflet.
- **Requisitos funcionales reales:** ¿se necesitan Street View, rutas, geocodificación avanzada o lugares? Ahí Google es más fuerte. Si solo se requieren mapas base y marcadores, Leaflet sobra.
- **Licenciamiento y control de datos:** open source vs. propietario, y dónde residen los datos.
- **Peso y extensibilidad:** Leaflet es liviano y tiene un ecosistema amplio de plugins.
- **Soporte, madurez y comunidad.**
- **Conclusión:** ponderar costo, requisitos reales y restricciones, y **dejar la decisión documentada en un ADR**. Para este alcance, Leaflet por costo cero y simplicidad.

**7. A una semana de la entrega, el cliente solicita nuevas funcionalidades no contempladas. ¿Cómo gestionaría la situación?**

- **No comprometer la fecha a ciegas:** primero evaluar alcance, esfuerzo y riesgo del nuevo pedido.
- **Gestión de alcance:** clarificar el requisito, priorizarlo con el cliente (p. ej. MoSCoW) y distinguir lo imprescindible de lo deseable.
- **Presentar opciones de forma transparente:** (a) negociar mover la fecha, (b) entregar el alcance original a tiempo y lo nuevo en una segunda iteración, o (c) intercambiar alcance sacando algo de menor prioridad.
- **Proteger la calidad:** no introducir funcionalidades sin pruebas por presión de tiempo, para no generar deuda.
- **Trazabilidad:** documentar el cambio como *change request*.
- *Este es, de hecho, el criterio que apliqué en esta misma prueba: al detectar que el enunciado parecía orientado a frontend siendo una vacante backend, consulté el alcance con el evaluador antes de ejecutar, en lugar de asumir.*

### 4.4 Visión de producto

**8. ¿Qué mejoras propondría para convertir esta maqueta en un producto robusto y de alto impacto?**

- **Seguridad:** refresh tokens, roles y permisos (RBAC), rate limiting, HTTPS, cookies `httpOnly` para el token y auditoría de accesos.
- **Persistencia real:** PostgreSQL + PostGIS con migraciones versionadas.
- **Funcionalidad:** CRUD completo de casos, búsqueda y filtros, adjuntar evidencias, historial de estados, asignación de casos a usuarios y **notificaciones en tiempo real** (WebSockets).
- **Mapa:** clustering, capas temáticas, filtros geográficos y dibujo de zonas.
- **Calidad y operación:** suite de pruebas, CI/CD, observabilidad (logs, métricas, alertas) y **documentación OpenAPI/Swagger**.
- **Assets:** imágenes en almacenamiento de objetos + CDN, con redimensionado y compresión.
- **Experiencia:** accesibilidad e internacionalización.
- **Escalabilidad:** todo lo descrito en la pregunta 1, aplicado según el crecimiento real de usuarios y datos.