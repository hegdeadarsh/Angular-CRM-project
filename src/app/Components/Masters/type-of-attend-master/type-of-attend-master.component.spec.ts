import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfAttendMasterComponent } from './type-of-attend-master.component';

describe('TypeOfAttendMasterComponent', () => {
  let component: TypeOfAttendMasterComponent;
  let fixture: ComponentFixture<TypeOfAttendMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeOfAttendMasterComponent]
    });
    fixture = TestBed.createComponent(TypeOfAttendMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
