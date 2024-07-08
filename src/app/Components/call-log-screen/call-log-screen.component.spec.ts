import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogScreenComponent } from './call-log-screen.component';

describe('CallLogScreenComponent', () => {
  let component: CallLogScreenComponent;
  let fixture: ComponentFixture<CallLogScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallLogScreenComponent]
    });
    fixture = TestBed.createComponent(CallLogScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
