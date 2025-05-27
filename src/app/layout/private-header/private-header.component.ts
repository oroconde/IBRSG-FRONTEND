import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../modules/auth/application/auth.service';

@Component({
  selector: 'app-private-header',
  standalone: true,
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.css'],
  imports: [CommonModule, RouterModule],
})
export class PrivateHeaderComponent {
  private authService = inject(AuthService);
  private elementRef = inject(ElementRef);

  user = this.authService.user;
  userMenuOpen = false;

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  handleLogout(): void {
    this.closeUserMenu();
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const clickedTarget = event.target as Node;
    const clickedInside = this.elementRef.nativeElement.contains(clickedTarget);

    if (!clickedInside) {
      this.userMenuOpen = false;
    }
  }
}
