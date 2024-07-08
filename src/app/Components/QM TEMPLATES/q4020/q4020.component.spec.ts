import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q4020Component } from './q4020.component';

describe('Q4020Component', () => {
  let component: Q4020Component;
  let fixture: ComponentFixture<Q4020Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Q4020Component]
    });
    fixture = TestBed.createComponent(Q4020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
