import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q4020HTComponent } from './q4020-ht.component';

describe('Q4020HTComponent', () => {
  let component: Q4020HTComponent;
  let fixture: ComponentFixture<Q4020HTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Q4020HTComponent]
    });
    fixture = TestBed.createComponent(Q4020HTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
