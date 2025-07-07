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

|URL|¿Qué muestra?|Protegida por...|
|---|---|---|
|`/`|Página principal (home pública)|❌ No|
|`/login`|Formulario de inicio de sesión|❌ No|
|`/about`|Sección “Acerca de”|❌ No|
|`/media`|Página de galería o contenido multimedia|❌ No|
|`/donations`|Página pública de donaciones|❌ No|
|`/articles`|Listado de artículos|❌ No|
|`/articles/:slug`|Detalle de un artículo|❌ No|
|`/dashboard/admin`|Dashboard exclusivo para administradores|✅ `AdminGuard`|
|`/dashboard/user`|Dashboard exclusivo para usuarios básicos|✅ `UserGuard`|


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
    

### **🚀 Instrucciones para construir y ejecutar el contenedor**

Asegúrate de haber compilado previamente el proyecto Angular en modo producción:

1. Compilar la aplicación Angular
    ```
    ng build --configuration=production
    ```

Luego, construye y ejecuta el contenedor Docker:

2. Construir la imagen Docker
    ```
    docker build -t ibrsg-frontend .
    ```

3. Ejecutar el contenedor en el puerto 8080   
    ```
    docker run --name ibrsg-frontend -p 8080:80 ibrsg-frontend
    ```

La aplicación estará disponible en:

```
http://localhost:8080
```

### **📌 Notas adicionales**

- host.docker.internal permite que el contenedor acceda al backend corriendo en tu máquina host (solo funciona en Docker Desktop).
- Este entorno está optimizado para desarrollo local, pero la estructura es compatible con despliegues productivos o en la nube (NGINX + Docker).
- Se recomienda usar environment.prod.ts con URLs definitivas antes de hacer un despliegue a producción real.

