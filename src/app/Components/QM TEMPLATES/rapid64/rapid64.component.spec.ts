import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapid64Component } from './rapid64.component';

describe('Rapid64Component', () => {
  let component: Rapid64Component;
  let fixture: ComponentFixture<Rapid64Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Rapid64Component]
    });
    fixture = TestBed.createComponent(Rapid64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
