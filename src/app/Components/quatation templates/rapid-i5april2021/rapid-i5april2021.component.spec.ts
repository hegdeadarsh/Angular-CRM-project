import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidI5april2021Component } from './rapid-i5april2021.component';

describe('RapidI5april2021Component', () => {
  let component: RapidI5april2021Component;
  let fixture: ComponentFixture<RapidI5april2021Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapidI5april2021Component]
    });
    fixture = TestBed.createComponent(RapidI5april2021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
