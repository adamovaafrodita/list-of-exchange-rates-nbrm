import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss',
})
export class SortingComponent {

  @Input() nbrmData: any[] = [];
  sortOrders: { [key: string]: 'asc' | 'desc' } = {};
  currentSort: string | null = null;
  @Input() isFiltered: boolean = false;
  @Input() filteredData: any[] = [];
  @Output() showPopupEvent = new EventEmitter<any>();
  @Input() isPopupVisible: boolean = false;

  sortData(column: string) {
    const sortOrder = this.sortOrders[column] === 'asc' ? 'desc' : 'asc';
    const dataset = this.isFiltered ? this.filteredData : this.nbrmData;
  
    dataset.sort((a, b) => {
      const valueA =
        typeof a[column] === 'string' ? parseFloat(a[column]) : a[column];
      const valueB =
        typeof b[column] === 'string' ? parseFloat(b[column]) : b[column];
  
      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (
        typeof a[column] === 'string' &&
        typeof b[column] === 'string'
      ) {
        return sortOrder === 'asc'
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
      return 0;
    });
  
    this.sortOrders[column] = sortOrder;
    this.currentSort = column;
  }
  

  showPopup(data: any, index: number) {
    this.showPopupEvent.emit({ data, index });
  }
}
