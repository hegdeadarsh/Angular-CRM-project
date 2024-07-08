import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidIVMCComponent } from './rapid-i-vmc.component';

describe('RapidIVMCComponent', () => {
  let component: RapidIVMCComponent;
  let fixture: ComponentFixture<RapidIVMCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapidIVMCComponent]
    });
    fixture = TestBed.createComponent(RapidIVMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
