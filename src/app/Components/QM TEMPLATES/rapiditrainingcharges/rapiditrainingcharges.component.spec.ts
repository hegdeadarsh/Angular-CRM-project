import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapiditrainingchargesComponent } from './rapiditrainingcharges.component';

describe('RapiditrainingchargesComponent', () => {
  let component: RapiditrainingchargesComponent;
  let fixture: ComponentFixture<RapiditrainingchargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapiditrainingchargesComponent]
    });
    fixture = TestBed.createComponent(RapiditrainingchargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
