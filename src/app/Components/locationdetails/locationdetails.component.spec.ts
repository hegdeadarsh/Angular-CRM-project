import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationdetailsComponent } from './locationdetails.component';

describe('LocationdetailsComponent', () => {
  let component: LocationdetailsComponent;
  let fixture: ComponentFixture<LocationdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationdetailsComponent]
    });
    fixture = TestBed.createComponent(LocationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
