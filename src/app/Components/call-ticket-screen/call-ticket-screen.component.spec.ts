import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTicketScreenComponent } from './call-ticket-screen.component';

describe('CallTicketScreenComponent', () => {
  let component: CallTicketScreenComponent;
  let fixture: ComponentFixture<CallTicketScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallTicketScreenComponent]
    });
    fixture = TestBed.createComponent(CallTicketScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
