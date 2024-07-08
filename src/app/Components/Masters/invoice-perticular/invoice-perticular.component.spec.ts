import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePerticularComponent } from './invoice-perticular.component';

describe('InvoicePerticularComponent', () => {
  let component: InvoicePerticularComponent;
  let fixture: ComponentFixture<InvoicePerticularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicePerticularComponent]
    });
    fixture = TestBed.createComponent(InvoicePerticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
