import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared-components/components/header/header.component';
import { FooterComponent } from '../../shared-components/components/footer/footer.component';

/**
 * Componente de layout público para la aplicación.
 *
 * Este layout encapsula la estructura común visible en todas las rutas públicas:
 * incluye el encabezado (HeaderComponent), pie de página (FooterComponent),
 * y un <router-outlet> para renderizar vistas hijas como Home, About, Blog, etc.
 *
 * Ventajas:
 * - Evita la duplicación de elementos como header/footer en cada componente.
 * - Mejora el rendimiento gracias a ChangeDetectionStrategy.OnPush.
 * - Permite definir un diseño común (con Tailwind o CSS) para toda la sección pública.
 */
@Component({
  selector: 'app-public-layout',
  standalone: true,
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent], // Usa RouterOutlet para anidar vistas
})
export class PublicLayoutComponent {}
