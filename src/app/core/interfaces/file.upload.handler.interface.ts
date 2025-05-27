import { Observable } from 'rxjs';

export interface FileUploadHandler {
  uploadFile(endpoint: string, formData: FormData): Observable<number | 'done'>;
}
