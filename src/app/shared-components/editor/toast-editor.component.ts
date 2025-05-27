import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import Editor from '@toast-ui/editor';

@Component({
  standalone: true,
  selector: 'app-toast-editor',
  template: `<div #editorRoot class="toast-editor-resizable-container"></div>`,
})
export class ToastEditorComponent implements OnDestroy, AfterViewInit {
  @Input() initialValue: string = '';
  @Output() contentChange = new EventEmitter<string>();
  @ViewChild('editorRoot', { static: true }) editorRoot!: ElementRef;

  private editorInstance!: Editor;
  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    const container = this.editorRoot.nativeElement as HTMLElement;

    this.editorInstance = new Editor({
      el: container,
      height: `${container.offsetHeight}px`,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      initialValue: this.initialValue,
    });

    this.editorInstance.on('change', () => {
      // const content = this.editorInstance.getMarkdown();
      // this.contentChange.emit(content);

      const html = this.editorInstance.getHTML();
      this.contentChange.emit(html);
    });

    this.resizeObserver = new ResizeObserver(() => {
      const height = container.offsetHeight;
      this.editorInstance.setHeight(`${height}px`);
    });

    this.resizeObserver.observe(container);
  }

  ngOnDestroy(): void {
    this.editorInstance?.destroy();
    this.resizeObserver?.disconnect();
  }

  public getContent(): string {
    return this.editorInstance?.getMarkdown();
  }

  public clear(): void {
    this.editorInstance?.setMarkdown('');
  }
}
