import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNumberComponent } from './route-number.component';

describe('RouteNumberComponent', () => {
  let component: RouteNumberComponent;
  let fixture: ComponentFixture<RouteNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteNumberComponent]
    });
    fixture = TestBed.createComponent(RouteNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
