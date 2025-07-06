// src/app/modules/admin-users/presentation/admin-users-form.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Country, Department, City } from '../interfaces/user.interface';
import { CountriesService } from '../../../core/services/country.service';

@Component({
  selector: 'app-admin-users-form',
  standalone: true,
  templateUrl: './admin-users-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AdminUsersFormComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private countriesService = inject(CountriesService);

  form!: FormGroup;
  paises: Array<any> = [];
  departamentos: Department[] = [];
  ciudades: City[] = [];

  ngOnInit(): void {
    this.initForm();
    this.loadPaises();
  }

  get f() {
    return this.form.controls;
  }

  private initForm(): void {
    this.form = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.minLength(2)]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required, Validators.minLength(2)]],
      segundoApellido: [''],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      paisId: [null, Validators.required],
      departamentoId: [null, Validators.required],
      ciudadId: [null, Validators.required],
      codigoPostal: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)],
      ],
    });
  }

  loadPaises(): void {
    this.countriesService.getAllCountries().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (err) => {
        this.paises = [];
      },
    });
  }

  onPaisChange(): void {
    const country = this.f['paisId'].value;
    if (!country) return;

    this.countriesService.getDepartments(country).subscribe({
      next: (data) =>
        (this.departamentos = data.map((d: any) => ({
          id: d.id,
          nombre: d.nombre,
          countryId: d.countryId ?? this.f['paisId'].value,
        }))),
      error: (err) => {
        console.error('Error cargando departamentos:', err);
        this.departamentos = [];
      },
    });

    this.f['departamentoId'].reset();
    this.f['ciudadId'].reset();
    this.ciudades = [];
  }

  onDepartamentoChange(): void {
    const country = this.f['paisId'].value;
    const state = this.f['departamentoId'].value;
    if (!country || !state) return;

    this.countriesService.getCities(country, state).subscribe({
      next: (data) =>
        (this.ciudades = data.map((c: any) => ({
          id: c.id,
          nombre: c.nombre,
          departmentsId:
            c.departmentsId ?? c.departmentId ?? this.f['departamentoId'].value,
        }))),
      error: (err) => {
        console.error('Error cargando ciudades:', err);
        this.ciudades = [];
      },
    });

    this.f['ciudadId'].reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Datos enviados:', this.form.value);
    this.router.navigate(['/dashboard/admin/directorio']);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/admin/directorio']);
  }
}
