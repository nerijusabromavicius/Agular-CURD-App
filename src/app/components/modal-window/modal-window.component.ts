import { Component, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { TableRecord } from "../../models/types";
import { createCarOwner, editCarOwner } from '../info-table/api';
import { validateCarOwner } from './utils';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})

export class ModalWindowComponent  {
  validationErrors: string[] = [];

  @Input() selectedTableRecord : TableRecord | null = null;
  @Output() loadModalWindowOutput: EventEmitter<boolean> = new EventEmitter();

  targetEvent = "";

  onSubmit(data:Omit<TableRecord, "id">){
    if(this.selectedTableRecord && this.selectedTableRecord.id) {
      const requestData = {id: this.selectedTableRecord.id, ...data}
      editCarOwner(requestData).catch(err => {
      this.validationErrors.push(`${err.message}`)
      }).then(() => {    
      if(!this.validationErrors.length){
        this.close();
      }})
    }else {
      createCarOwner(data).catch(err => {
        this.validationErrors.push(`${err.message}`);
      }).then(() => {    
      if(!this.validationErrors.length){
        this.close();
      }})
    }   
   this.validationErrors = validateCarOwner(data);
  }
  close() {
    this.loadModalWindowOutput.emit(false);
  }
}




