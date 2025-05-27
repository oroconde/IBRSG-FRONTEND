import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../application/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /** 👇 ¡Esto es lo que faltaba! **/
  showPassword = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  loading = false;
  error: string | null = null;

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.authService.checkAuthStatus().subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err) => {
        this.error = err?.error?.message || 'Credenciales inválidas';
        this.loading = false;
      },
    });
  }
}
