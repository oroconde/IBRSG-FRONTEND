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
import {
  Country,
  Department,
  City,
} from '../../../core/interfaces/address-interface';
import { UsersService } from '../users.service';
import { finalize } from 'rxjs';
import { ICreateUserDto } from '../interfaces/create-user.interface';
import Swal from 'sweetalert2';

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
  private usersService = inject(UsersService);

  form!: FormGroup;
  paises: Country[] = [];
  departamentos: Department[] = [];
  ciudades: City[] = [];
  loading = false; // deshabilitar el botón mientras guarda

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

    const payload: ICreateUserDto = {
      firstName: this.f['primerNombre'].value,
      middleName: this.f['segundoNombre'].value,
      lastName: this.f['primerApellido'].value,
      secondLastName: this.f['segundoApellido'].value,
      email: this.f['email'].value?.trim(),
      address: this.f['direccion'].value?.trim(),
      postalCode: this.f['codigoPostal'].value,
      countryId: this.f['paisId'].value,
      departmentId: this.f['departamentoId'].value,
      municipalityId: this.f['ciudadId'].value,
    };

    // 1. Muestra confirmación antes de crear
    Swal.fire({
      title: '¿Crear usuario?',
      text: '¿Estás seguro de registrar este nuevo usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
    }).then((result) => {
      if (!result.isConfirmed) return; // Si cancela, no hace nada

      // 2. Llamar al servicio
      this.loading = true;
      this.cdr.markForCheck();

      this.usersService
        .createUser(payload)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.cdr.markForCheck();
          })
        )
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado',
              text: 'El usuario fue registrado exitosamente.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3b82f6',
            }).then(() => {
              this.router.navigate(['/dashboard/admin/directorio']);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text:
                err?.error?.message?.join('\n') ||
                'No se pudo crear el usuario.',
              confirmButtonColor: '#ef4444',
            });
          },
        });
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/admin/directorio']);
  }

  trackById(index: number, item: { id: number }): number {
    return item.id;
  }
}
