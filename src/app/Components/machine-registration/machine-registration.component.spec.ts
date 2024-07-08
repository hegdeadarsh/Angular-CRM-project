import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineRegistrationComponent } from './machine-registration.component';

describe('MachineRegistrationComponent', () => {
  let component: MachineRegistrationComponent;
  let fixture: ComponentFixture<MachineRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineRegistrationComponent]
    });
    fixture = TestBed.createComponent(MachineRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
