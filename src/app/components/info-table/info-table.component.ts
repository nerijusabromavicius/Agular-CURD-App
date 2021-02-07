import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableRecord } from "../../models/types";
import { deleteCarOwner, getCarOwners } from './api';
import { filterRecords } from './utils';

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss']
})

export class InfoTableComponent implements OnInit {
  
  tableRecords: TableRecord[] = [];
  selectedTableRecord: TableRecord | null = null;
  pageSlice: TableRecord[] = [];
  pageSize: number = 5;
  recordsLength: number = 0;
  searchInput: string = '';
  loadModalWindow: boolean = false;
  
  ngOnInit(): void {
      getCarOwners().then(carOwners=> {
        this.tableRecords = carOwners;
        this.recordsLength = carOwners.length;
        this.pageSlice = carOwners.sort((a, b) => a.firstName.localeCompare(b.firstName)).slice(0, this.pageSize);
      });
  }

  onPaginatorEvent(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.pageSize = event.pageSize;
    if(endIndex > this.tableRecords.length) {
      endIndex = this.tableRecords.length;
    }
    if(this.searchInput){
      this.pageSlice = filterRecords(this.tableRecords, this.searchInput).slice(startIndex, endIndex);
    } else {
      this.pageSlice = this.tableRecords.slice(startIndex, endIndex);
    }
  }

  openModal() {
    this.loadModalWindow = true;
  }

  addRecord() {
    this.selectedTableRecord =  null;
    this.openModal();
  }

  editRecord({id, firstName, lastName, carPlateNumber}: TableRecord) {
    this.selectedTableRecord = {id, firstName, lastName, carPlateNumber};
    this.openModal();
  }

  deleteRecord(id:string, personRecord: string) {
    if(confirm("Are you sure to delete " + personRecord)) {
      deleteCarOwner(id).then(val =>this.ngOnInit());
    }
  }

  getLoadModalWindow(loadModalWindow:boolean){
    this.loadModalWindow = loadModalWindow;
  }

  getSearchInputValue(searchInput:string) {
    if(searchInput === ""){
      this.pageSlice = this.tableRecords.slice(0, this.pageSize);
      this.recordsLength = this.tableRecords.length;
    }else {
      const filteredRecords = filterRecords(this.tableRecords, searchInput);
      this.pageSlice = filteredRecords.slice(0, this.pageSize);
      this.recordsLength = filteredRecords.length
    }
    this.searchInput = searchInput;
  }
}
