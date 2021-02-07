import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoTableComponent } from './info-table.component';

describe('InfoTableComponent', () => {
  let component: InfoTableComponent;
  let fixture: ComponentFixture<InfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  toggle modal window', () => {
    expect(component.loadModalWindow).toBeFalsy();
    component.openModal();
    expect(component.openModal).toBeTruthy();
  });

  it('should toggle open modal window', ()=> {
    component.addRecord();
    expect(component.openModal).toBeTruthy();
  });
});

