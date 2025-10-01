import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): SafeHtml {
    const sanitizer = inject(DomSanitizer);
    const html = marked.parse(value) as string;
    return sanitizer.bypassSecurityTrustHtml(html);
  }
}
