import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationforRapidITableComponent } from './quotationfor-rapid-itable.component';

describe('QuotationforRapidITableComponent', () => {
  let component: QuotationforRapidITableComponent;
  let fixture: ComponentFixture<QuotationforRapidITableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationforRapidITableComponent]
    });
    fixture = TestBed.createComponent(QuotationforRapidITableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
