import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapidi64CamACSCComponent } from './rapidi64-cam-acsc.component';

describe('Rapidi64CamACSCComponent', () => {
  let component: Rapidi64CamACSCComponent;
  let fixture: ComponentFixture<Rapidi64CamACSCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Rapidi64CamACSCComponent]
    });
    fixture = TestBed.createComponent(Rapidi64CamACSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
