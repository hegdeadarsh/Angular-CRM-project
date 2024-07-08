import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSheetComponent } from './travel-sheet.component';

describe('TravelSheetComponent', () => {
  let component: TravelSheetComponent;
  let fixture: ComponentFixture<TravelSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelSheetComponent]
    });
    fixture = TestBed.createComponent(TravelSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
