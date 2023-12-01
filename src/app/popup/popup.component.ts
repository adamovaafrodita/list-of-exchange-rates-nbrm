import { Component, Input, Output, EventEmitter } from '@angular/core';

interface KursZbirObject {
  [key: string]: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  @Input() nbrmData: any[] = [];
  @Input() filteredData: any[] = [];
  @Input() isFiltered: boolean = false;
  @Output() isPopupVisibleChange = new EventEmitter<boolean>()

  selectedData: KursZbirObject | null = null;
  isEditMode = false;
  editedData: KursZbirObject | null = null;
  editedRowIndex = -1;
  editedRowIndexFiltered = -1;
  isPopupVisible= false;
  isSucess = false;
  isNotSucess = false;

  showPopup(data: any, index: number, isFiltered: boolean) {
    this.isPopupVisible = true;
    this.isEditMode = false;
    this.selectedData = { ...data };
    this.editedData = null;
  
    var el = document.getElementById('popup');
    if (el) {
      el.style.display = 'block';
    }
  
    if (this.isFiltered) {
      this.editedRowIndexFiltered = this.filteredData.indexOf(data);
      this.editedRowIndex = this.nbrmData.indexOf(data);
    } else {
      this.editedRowIndex = this.nbrmData.indexOf(data);
    }
  
    this.isPopupVisibleChange.emit(this.isPopupVisible);
  }

  closePopup() {
    var el = document.getElementById('popup');
    if(el){
      el.style.display='none';
    }
    this.isPopupVisible= false;
    this.isPopupVisibleChange.emit(this.isPopupVisible);
    this.isSucess = false;
  }

  getObjectKeys(selectedData: KursZbirObject){
    return Object.keys(selectedData)
  }


  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.selectedData = { ...this.editedData };
    }
    this.isSucess = false;
    this.isNotSucess = false;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedData = { ...this.editedData };
    this.closePopup();
    this.isSucess = false;
  }

  saveChanges() {
    this.isEditMode = false;
    let originalData = { ...this.selectedData };
    this.editedData = { ...this.selectedData };
  
    if (this.editedRowIndex !== -1) {
      originalData = this.nbrmData[this.editedRowIndex];
      this.nbrmData[this.editedRowIndex] = { ...this.editedData };
  
    if (this.editedRowIndexFiltered !== -1) {
      originalData = this.filteredData[this.editedRowIndexFiltered];
      this.filteredData[this.editedRowIndexFiltered] = { ...this.editedData };
    }
    }
    if(JSON.stringify(originalData) !== JSON.stringify(this.editedData)){
      this.isNotSucess = false;
      this.isSucess = true;
    }    
    else if (!(JSON.stringify(originalData) !== JSON.stringify(this.editedData))){
      this.isNotSucess = true;
    }
  }
}

