import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CountriesService } from '../../../core/services/country.service';
import { Country, Department, City } from '../interfaces/user.interface';

@Component({
  selector: 'app-admin-users-form',
  standalone: true,
  templateUrl: './admin-users-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AdminUsersFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private countriesService = inject(CountriesService);

  form!: FormGroup;
  paises: Country[] = [];
  departamentos: Department[] = [];
  ciudades: City[] = [];

  ngOnInit(): void {
    this.initForm();
    this.loadPaises();
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

  get f() {
    return this.form.controls;
  }

  loadPaises(): void {
    this.countriesService.getAllCountries().subscribe({
      next: (data: Country[]) => {
        this.paises = data;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Error cargando países:', err);
        this.paises = [];
        this.cdr.markForCheck();
      },
    });
  }

  onPaisChange(): void {
    const countryId = this.f['paisId'].value;
    if (!countryId) return;

    this.countriesService.getDepartments(countryId).subscribe({
      next: (data: Department[]) => {
        this.departamentos = data;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Error cargando departamentos:', err);
        this.departamentos = [];
        this.cdr.markForCheck();
      },
    });

    this.f['departamentoId'].reset();
    this.f['ciudadId'].reset();
    this.ciudades = [];
  }

  onDepartamentoChange(): void {
    const departmentId = this.f['departamentoId'].value;
    if (!departmentId) return;

    this.countriesService.getCities(departmentId).subscribe({
      next: (data: City[]) => {
        this.ciudades = data;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Error cargando ciudades:', err);
        this.ciudades = [];
        this.cdr.markForCheck();
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

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}
