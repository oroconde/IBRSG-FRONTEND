# IBRSG Front-End

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Routing

**URLs**

Con la estructura actual que ya tienes y la configuración que hicimos, tus rutas quedarían así:

| URL                | ¿Qué muestra?                             | Protegida por... |
| ------------------ | ----------------------------------------- | ---------------- |
| `/`                | Página principal (home pública)           | ❌ No            |
| `/login`           | Formulario de inicio de sesión            | ❌ No            |
| `/about`           | Sección “Acerca de”                       | ❌ No            |
| `/media`           | Página de galería o contenido multimedia  | ❌ No            |
| `/donations`       | Página pública de donaciones              | ❌ No            |
| `/articles`        | Listado de artículos                      | ❌ No            |
| `/articles/:slug`  | Detalle de un artículo                    | ❌ No            |
| `/dashboard/admin` | Dashboard exclusivo para administradores  | ✅ `AdminGuard`  |
| `/dashboard/user`  | Dashboard exclusivo para usuarios básicos | ✅ `UserGuard`   |

Estas rutas cargan dentro del PrivateLayoutComponent, el cual puedes usar para incluir `<app-sidebar>` y `<app-private-header>`.

---

## **🐳 Dockerización del Frontend Angular**

Implementación para permitir el despliegue del proyecto frontend mediante **Docker** y **NGINX**, facilitando su ejecución en entornos locales y productivos.

- **Dockerfile:**

  Se creó un Dockerfile para construir una imagen liviana basada en **NGINX**, encargada de servir el contenido generado por Angular tras la compilación (ng build).

- **nginx.conf:**

  Se agregó una configuración personalizada de NGINX con las siguientes características:
  - Soporte para aplicaciones **SPA (Single Page Application)**.
  - Ruta de salud disponible en /front/health para monitoreo.
  - Redirección de rutas /api hacia el backend en http://host.docker.internal:9111 mediante proxy_pass.
  - Inclusión de cabeceras **CORS** necesarias para el desarrollo y pruebas locales.
  - Manejo de errores comunes (400, 405) con páginas personalizadas.

- **environment.prod.ts:**
  Se ajustó temporalmente la URL de apiUrl para apuntar a http://localhost:9111/api/v2, facilitando las pruebas de integración local durante el desarrollo.

## **🚀 Instrucciones para construir y ejecutar contenedores**

### Documentación del despliegue

Levantar una aplicación compuesta por un backend (API), un frontend estático y una base de datos PostgreSQL, orquestados con Docker Compose y configurados mediante un archivo de variables de entorno.

### Componentes principales

- Backend: servicio que expone la API en un puerto interno; construido desde el código fuente y ejecutado en un contenedor. Depende de que la base de datos esté disponible.
- Frontend: aplicación web servida desde un contenedor web (p. ej. Nginx), apuntando al backend para las APIs.
- Database: PostgreSQL en contenedor, con volumen persistente para los datos y healthcheck para comprobar disponibilidad antes de iniciar el backend.

## Variables de entorno relevantes

- Configuración del servidor: puerto y versión de la API.
- Conexión a la base de datos: host, puerto, nombre de usuario, contraseña y nombre de la BD.
- Opciones TypeORM (o equivalente): sincronización y zona horaria.
- JWT: clave secreta y tiempo de expiración del token.
- CORS y URLs públicas: orígenes permitidos y URL base del frontend para generación de enlaces.
- Rutas a archivos estáticos: URL para servicio de ficheros.

Nota: las credenciales y secretos no deben mantenerse en repositorios públicos; usar mecanismos seguros (Vault, secretos de Docker/Kubernetes, variables de entorno en CI/CD).

## Redes, puertos y persistencia

- Red común que permite comunicación entre contenedores.
- Mapeo de puertos expone el frontend y el backend al host para acceso externo.
- Volumen persistente para datos de PostgreSQL para evitar pérdida de información entre reinicios.

## Comprobación de salud y orden de arranque

- La base de datos incluye un healthcheck que verifica disponibilidad.
- El backend espera a que la base de datos esté saludable antes de arrancar (dependencias definidas).
- El frontend depende del backend, por lo que normalmente se arranca después.

## Buenas prácticas y recomendaciones

- En producción, desactivar sincronización automática de esquemas (DB_SYNCHRONIZE=false) y usar migraciones controladas.
- No usar la etiqueta "latest" para la imagen de Postgres en entornos productivos; fijar una versión concreta y probada.
- Proteger el JWT_SECRET_KEY: rotación periódica y almacenamiento seguro.
- Limitar CORS a los orígenes estrictamente necesarios.
- Usar backups regulares del volumen de PostgreSQL y estrategias de recuperación.
- Revisar y ajustar políticas de reinicio y recursos (memoria/CPU) según carga.
- Considerar separaciones de entornos (desarrollo/staging/producción) con diferentes variables de entorno y secretos.

## Despliegue y verificación (pasos generales)

1. Colocar las variables de entorno en un archivo .env fuera del control de versiones.
2. Construir las imágenes y arrancar los servicios mediante Docker Compose desde la raíz del proyecto (reconstruir si ha habido cambios en Dockerfiles).
3. Verificar que el contenedor de la base de datos esté saludable antes de que el backend complete su arranque.
4. Comprobar endpoints del backend y la interfaz del frontend en los puertos expuestos.
5. Revisar logs de los contenedores para detectar errores de conexión, migraciones o dependencias faltantes.

## Solución de problemas comunes

- Error de conexión a la base de datos: comprobar credenciales, host y que el contenedor DB esté en la misma red.
- Backend bloqueado en inicio: revisar migraciones pendientes y ajustes de sincronización.
- CORS bloqueando solicitudes: validar CORS_ORIGIN y cabeceras enviadas por el cliente.
- Pérdida de datos tras reinicio: comprobar que el volumen de Postgres está montado correctamente.

## Notas finales

Este entorno está pensado para facilitar el desarrollo e integración local o despliegues simples con Docker Compose. Para entornos con requisitos de alta disponibilidad, escalado o seguridad avanzada, considerar orquestadores y servicios gestionados (Kubernetes, RDS/Cloud SQL, secretos gestionados).

### .env

```
PORT=9111
API_VERSION=api/v2

# SERVICE_BACK_URL para consumir microservicios o endpoints internos.
SERVICE_BACK_URL=http://localhost:9111/

# URL_WEB para generar enlaces hacia la interfaz de usuario.
URL_WEB=http://ibrsg.io/REPLACE_NUMERAL/auth/Login

# Files Service (rutas hacia archivos estáticos)
FILES_URL=http://localhost:9111/files

# Database Config Docker -> PostgreSQL
DB_TYPE=postgres
DB_PORT=5432
DB_HOST=database
DB_USERNAME=ibrsg
DB_PASSWORD=Password123.
DB_DATABASE=ibrsgdb
DB_TYPEORM_TIMEZONE=UTC
DB_SYNCHRONIZE=true
DB_TRUST_SERVER_CERTIFICATE=true

# JSON Web Token
JWT_SECRET_KEY=MySuperSecretKey
# Suele usarse '30m' con jsonwebtoken; si tu TokenService acepta '30min', déjalo así.
JWT_EXPIRATION=30m

# CORS_ORIGIN para pernitir solicitudes desde dominios específicos.
CORS_ORIGIN=http://localhost:4200,http://localhost:8080
```

### docker-dompose.yml

```yml
services:
  backend:
    build:
      context: ./IBRSG-BACKEND-V2
      dockerfile: Dockerfile
    container_name: ibrsg-backend-prod
    ports:
      - "9111:9111"
    env_file:
      - .env
    depends_on:
      database:
        condition: service_healthy # espera a que Postgres esté listo
    networks:
      - ibrsg-network
    restart: always

  frontend:
    build:
      context: ./IBRSG-FRONTEND
      dockerfile: Dockerfile
    container_name: ibrsg-frontend-prod
    ports:
      - "4200:80"
    depends_on:
      - backend
    networks:
      - ibrsg-network
    restart: always

  database:
    image: postgres:latest
    container_name: ibrsgdb-v2-prod
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ibrsg
      POSTGRES_PASSWORD: Password123.
      POSTGRES_DB: ibrsgdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - ibrsg-network
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ibrsg -d ibrsgdb -h localhost -p 5432"]
      interval: 5s
      timeout: 3s
      retries: 10

networks:
  ibrsg-network:

volumes:
  pgdata:
```

**Ejecutar comando:**

```bash
docker-compose up -d --build
```
