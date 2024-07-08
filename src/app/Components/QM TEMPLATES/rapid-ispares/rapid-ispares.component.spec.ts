import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidIsparesComponent } from './rapid-ispares.component';

describe('RapidIsparesComponent', () => {
  let component: RapidIsparesComponent;
  let fixture: ComponentFixture<RapidIsparesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapidIsparesComponent]
    });
    fixture = TestBed.createComponent(RapidIsparesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
