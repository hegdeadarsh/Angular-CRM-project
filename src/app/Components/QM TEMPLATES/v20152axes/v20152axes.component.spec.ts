import { ComponentFixture, TestBed } from '@angular/core/testing';

import { V20152axesComponent } from './v20152axes.component';

describe('V20152axesComponent', () => {
  let component: V20152axesComponent;
  let fixture: ComponentFixture<V20152axesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [V20152axesComponent]
    });
    fixture = TestBed.createComponent(V20152axesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
