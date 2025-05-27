// import {
//   ChangeDetectionStrategy,
//   Component,
//   Input,
//   inject,
//   Signal,
//   signal,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { FileUploadHandler } from '../../../core/interfaces/file.upload.handler.interface';
// import { HttpClientModule } from '@angular/common/module.d-CnjH8Dlt';

// @Component({
//   selector: 'app-file-upload',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, FormsModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   template: `
//     <div
//       class="max-w-md mx-auto p-4 border rounded-lg shadow bg-white space-y-4"
//     >
//       <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>

//       <input
//         type="file"
//         class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         (change)="onFileSelected($event)"
//       />

//       <button
//         (click)="upload()"
//         class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//         [disabled]="!selectedFile() || uploadInProgress()"
//       >
//         Subir archivo
//       </button>

//       <div
//         *ngIf="uploadInProgress()"
//         class="relative w-full bg-gray-200 rounded h-4 overflow-hidden"
//       >
//         <div
//           class="bg-blue-600 h-full transition-all"
//           [style.width.%]="uploadProgress()"
//         ></div>
//       </div>

//       <div
//         *ngIf="uploadStatus() === 'done'"
//         class="text-green-600 font-semibold text-sm"
//       >
//         ✅ Archivo subido correctamente
//       </div>
//     </div>
//   `,
// })
// export class FileUploadComponent {
//   /**
//    * Servicio que debe implementar FileUploadHandler
//    */
//   @Input() uploadService!: FileUploadHandler;

//   /**
//    * Ruta relativa al endpoint dentro del servicio (por ejemplo: '/upload-image')
//    */
//   @Input() endpoint!: string;

//   /**
//    * Título opcional
//    */
//   @Input() title = 'Subir archivo';

//   private selectedFile = signal<File | null>(null);
//   private uploadProgress = signal(0);
//   private uploadStatus = signal<'idle' | 'uploading' | 'done'>('idle');

//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     const file = input.files?.[0] ?? null;
//     this.selectedFile.set(file);
//     this.uploadProgress.set(0);
//     this.uploadStatus.set('idle');
//   }

//   upload() {
//     const file = this.selectedFile();
//     if (!file || !this.uploadService || !this.endpoint) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     this.uploadStatus.set('uploading');

//     this.uploadService.uploadFile(this.endpoint, formData).subscribe({
//       next: (progress) => {
//         if (progress === 'done') {
//           this.uploadStatus.set('done');
//         } else if (typeof progress === 'number') {
//           this.uploadProgress.set(progress);
//         }
//       },
//       error: () => {
//         this.uploadStatus.set('idle');
//         alert('❌ Error al subir el archivo');
//       },
//     });
//   }

//   uploadInProgress() {
//     return this.uploadStatus() === 'uploading';
//   }

//   selectedFile() {
//     return this.selectedFile();
//   }

//   uploadProgress() {
//     return this.uploadProgress();
//   }

//   uploadStatus() {
//     return this.uploadStatus();
//   }
// }
