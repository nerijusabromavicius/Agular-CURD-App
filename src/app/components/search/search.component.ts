import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  @Output() searchInputValueOutput:  EventEmitter<string> = new EventEmitter();

  searchInputValue(event: any) {  
    this.searchInputValueOutput.emit(event.target.value);   
  }
}
