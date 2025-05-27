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


