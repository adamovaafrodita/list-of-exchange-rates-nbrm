import { Component, ViewChild, OnInit } from '@angular/core';
import { NbrmService } from '../services/nbrm.service';
import { PopupComponent } from '../popup/popup.component';

interface KursZbirObject {
  [key: string]: string;
}

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss',
})
export class DataDisplayComponent {
  startDate: string = '';
  endDate: string = '';
  nbrmData: any[] = [];

  isfetched:boolean = false;
  isFilteredValue: boolean = false;
  filteredDataValue: any[] = [];
  isPopupVisibleValue: boolean = false;

  @ViewChild('popupComponent') popupComponent!: PopupComponent;
  
  constructor(private nbrmService: NbrmService) {}

  fetchData() {
    if (
      this.validateDateFormat(this.startDate) &&
      this.validateDateFormat(this.endDate) &&
      this.isStartDateEarlier(this.startDate, this.endDate) &&
      this.isEndDateValid(this.endDate)
    ) {
      this.getData();
      this.isfetched = true;
      this.isFilteredValue = false;
    } else {
      if (
        !this.validateDateFormat(this.startDate) ||
        !this.validateDateFormat(this.endDate)
      ) {
        alert('Invalid date format. Please use dd.MM.yyyy.');
        this.resetDates();
        this.isfetched = false;
      } else if (!this.isStartDateEarlier(this.startDate, this.endDate)) {
        alert('Start date must be earlier than the end date.');
        this.resetDates();
        this.isfetched = false;
      } else if (!this.isEndDateValid(this.endDate)) {
        alert('End date should not be later than the current date.');
        this.resetDates();
        this.isfetched = false;
      }
    }
  }

  isEndDateValid(endDate: string): boolean {
    const today = new Date();
    const selectedEndDate = this.convertToDateObject(endDate);
    return selectedEndDate <= today;
  }

  convertToDateObject(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  isStartDateEarlier(startDate: string, endDate: string): boolean {
    const start = this.convertToDateObject(startDate);
    const end = this.convertToDateObject(endDate);
    return start <= end;
  }

  validateDateFormat(dateString: string): boolean {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;

    if (!regex.test(dateString)) {
      return false;
    }

    const dateParts = dateString.split('.');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);
    const isValidDate =
      date.getDate() === day &&
      date.getMonth() === month &&
      date.getFullYear() === year;

    return isValidDate;
  }

  resetDates(){
    this.startDate = ''; // Reset startDate
    this.endDate = ''; // Reset endDate
  }

  async getData(): Promise<void> {
    
    let kursZbir;

    const xmlData = await this.nbrmService.getExchangeRate(this.startDate, this.endDate);

    if (xmlData !== undefined && xmlData !== null) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const GetExchangeRateResult = xmlDoc.getElementsByTagName(
        'GetExchangeRateResult'
      )[0];

      if (GetExchangeRateResult) {
        const content = GetExchangeRateResult.textContent;

        const parsed = parser.parseFromString(content as string, 'text/xml');

        kursZbir = parsed.querySelectorAll('KursZbir');

        const kursZbirArray: KursZbirObject[] = [];

        kursZbir.forEach((element) => {
          const obj: KursZbirObject = {};

          element.childNodes.forEach((childNode) => {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              const tagName = childNode.nodeName;
              const textContent = (childNode as Element).textContent || '';
              obj[tagName] = textContent;
            }
          });

          kursZbirArray.push(obj);
        });

        const jsonString = JSON.stringify(kursZbirArray, null, 2);

        this.nbrmData = kursZbirArray;
      } else {
        console.log('No <KursZbir> element found');
      }
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  receiveIsFilteredValue(isFiltered: boolean) {
    this.isFilteredValue = isFiltered;
  }
  receiveFilteredData(data: any[]) {
    this.filteredDataValue = data;
    this.popupComponent.filteredData = data;
  }
  handleShowPopup(eventData: { data: any, index: number, isFiltered: boolean }) {
    const { data, index, isFiltered } = eventData;
    this.popupComponent.showPopup(data, index, isFiltered);
  }
  receiveIsPopupVisibleValue(isPopupVisible: boolean) {
    this.isPopupVisibleValue = isPopupVisible;
  }
}
