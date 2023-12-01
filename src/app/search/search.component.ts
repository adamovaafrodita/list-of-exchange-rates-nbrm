import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchTerm = '';
  selectedSearchColumn = '';
  filteredData: any[] = [];
  isFiltered = false;
  @Output() isFilteredChange = new EventEmitter<boolean>();
  noResultsMessage = '';
  @Input() nbrmData: any[] = [];
  @Output() filteredDataChange = new EventEmitter<any[]>();

  searchByColumn(column: string, searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredData = this.nbrmData;
      this.isFiltered = false;
      this.noResultsMessage =
        'Please enter information to filter the data. Check the full list below.';
    } else {
      this.filteredData = this.nbrmData.filter((item) =>
        item[column].toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.isFiltered = this.filteredData.length > 0;

      if (!this.isFiltered) {
        this.noResultsMessage =
          'No matching results found. Please try different information or check the full list below.';
      } else {
        this.noResultsMessage = '';
      }
    }
    this.isFilteredChange.emit(this.isFiltered);
    this.filteredDataChange.emit(this.filteredData);
  }

  resetSearch() {
    this.searchTerm = '';
    this.selectedSearchColumn = '';
    this.filteredData = this.nbrmData;
    this.isFiltered = false;
    this.noResultsMessage = '';
    this.isFilteredChange.emit(this.isFiltered);
    this.filteredDataChange.emit(this.filteredData);
  }
}
