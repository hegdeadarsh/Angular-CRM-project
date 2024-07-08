import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallEntryTicketComponent } from './call-entry-ticket.component';

describe('CallEntryTicketComponent', () => {
  let component: CallEntryTicketComponent;
  let fixture: ComponentFixture<CallEntryTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallEntryTicketComponent]
    });
    fixture = TestBed.createComponent(CallEntryTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
