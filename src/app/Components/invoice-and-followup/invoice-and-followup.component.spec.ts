import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAndFollowupComponent } from './invoice-and-followup.component';

describe('InvoiceAndFollowupComponent', () => {
  let component: InvoiceAndFollowupComponent;
  let fixture: ComponentFixture<InvoiceAndFollowupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceAndFollowupComponent]
    });
    fixture = TestBed.createComponent(InvoiceAndFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
