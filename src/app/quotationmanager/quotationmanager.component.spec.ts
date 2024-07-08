import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationmanagerComponent } from './quotationmanager.component';

describe('QuotationmanagerComponent', () => {
  let component: QuotationmanagerComponent;
  let fixture: ComponentFixture<QuotationmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationmanagerComponent]
    });
    fixture = TestBed.createComponent(QuotationmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
