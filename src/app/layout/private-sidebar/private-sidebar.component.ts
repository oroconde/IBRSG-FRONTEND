import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../modules/auth/application/auth.service';

@Component({
  standalone: true,
  selector: 'app-private-sidebar',
  templateUrl: './private-sidebar.component.html',
  imports: [CommonModule, RouterModule],
})
export class PrivateSidebarComponent {
  private authService = inject(AuthService);

  collapsed = signal(false);
  user = this.authService.user;

  toggleSidebar() {
    this.collapsed.update((value) => !value);
  }
}
