import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { ArticlesService } from '../../articles.service';
import { ToastEditorComponent } from '../../../../shared-components/editor/toast-editor.component';

@Component({
  standalone: true,
  selector: 'app-admin-articles-form',
  templateUrl: './admin-articles-form.component.html',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MarkdownComponent,
    ToastEditorComponent,
  ],
})
export class AdminArticlesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articlesService = inject(ArticlesService);

  @ViewChild(ToastEditorComponent) toastEditor!: ToastEditorComponent;

  articleId: string | null = null;
  form!: FormGroup;
  showPreview = false;
  isEditMode = false;

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.articleId;

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });

    // if (this.isEditMode) {
    //   this.articlesService.getById(this.articleId!).subscribe({
    //     next: (res) => this.form.patchValue(res.data),
    //     error: () => this.router.navigate(['/dashboard/admin/articulos']),
    //   });
    // }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = this.form.value;
    console.log('Payload enviado:', payload);

    if (this.isEditMode) {
      console.log('Actualizar artículo:', payload);
      // lógica de actualización aquí
    } else {
      this.articlesService.createArticle(payload).subscribe({
        next: () => {
          console.log('Artículo creado');
          alert('Artículo creado con éxito');
          this.router.navigate(['/dashboard/admin/articulos']);
        },
        error: (err) => {
          console.error('Error al crear artículo:', err.error);
          alert(
            'Ocurrió un error: ' +
              JSON.stringify(err.error.message || err.message)
          );
        },
      });
    }
  }

  clearEditor() {
    this.toastEditor.clear();
    this.form.get('content')?.setValue('');
  }

  goBack() {
    this.router.navigate(['/dashboard/admin/articulos']);
  }
}
