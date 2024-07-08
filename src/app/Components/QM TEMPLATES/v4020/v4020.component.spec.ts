import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V4020Component } from './v4020.component';

describe('V4020Component', () => {
  let component: V4020Component;
  let fixture: ComponentFixture<V4020Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [V4020Component]
    });
    fixture = TestBed.createComponent(V4020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
