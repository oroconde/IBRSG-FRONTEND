import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivateHeaderComponent } from '../private-header/private-header.component';
import { PrivateSidebarComponent } from '../private-sidebar/private-sidebar.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css',
  imports: [
    RouterModule,
    CommonModule,
    PrivateHeaderComponent,
    PrivateSidebarComponent,
  ],
})
export class PrivateLayoutComponent {}
