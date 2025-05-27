import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  get canGoBack(): boolean {
    return this.currentPage > 1;
  }
  get canGoNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  // This method generates an array of page numbers to be displayed in the pagination.
  visiblePages(): (number | -1)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 0; // Number of pages to show on either side of the current page
    const range: (number | -1)[] = [];

    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    range.push(1);
    if (current > delta + 2) range.push(-1);

    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    for (let i = start; i <= end; i++) range.push(i);
    if (current < total - delta - 1) range.push(-1);

    range.push(total);
    return range;
  }

  // This method sets the current page and emits a page change event.
  setPage(page: number): void {
    if (page !== -1 && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
