import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidtableComponent } from './rapidtable.component';

describe('RapidtableComponent', () => {
  let component: RapidtableComponent;
  let fixture: ComponentFixture<RapidtableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapidtableComponent]
    });
    fixture = TestBed.createComponent(RapidtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
