import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationdetailslistComponent } from './locationdetailslist.component';

describe('LocationdetailslistComponent', () => {
  let component: LocationdetailslistComponent;
  let fixture: ComponentFixture<LocationdetailslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationdetailslistComponent]
    });
    fixture = TestBed.createComponent(LocationdetailslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
