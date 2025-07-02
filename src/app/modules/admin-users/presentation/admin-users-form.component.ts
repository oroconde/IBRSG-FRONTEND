import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Country, Department, City } from '../interfaces/user.interface';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-admin-users-form',
  standalone: true,
  templateUrl: './admin-users-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class AdminUsersFormComponent implements OnInit {
  private router = inject(Router);

  form!: FormGroup;
  paises: Country[] = [];
  departamentos: Department[] = [];
  ciudades: City[] = [];

  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      paisId: [null, Validators.required],
      departamentoId: [null, Validators.required],
      ciudadId: [null, Validators.required],
      // otros campos como nombres, email, etc.
    });

    this.loadPaises();
  }

  loadPaises(): void {
    this.usersService.getCountries().subscribe({
      next: (paises) => {
        this.paises = paises;
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí iría this.usersService.createUser(this.form.value).subscribe(...)
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/admin/directorio']);
  }
}
