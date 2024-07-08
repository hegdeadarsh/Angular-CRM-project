import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V4030Component } from './v4030.component';

describe('V4030Component', () => {
  let component: V4030Component;
  let fixture: ComponentFixture<V4030Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [V4030Component]
    });
    fixture = TestBed.createComponent(V4030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
