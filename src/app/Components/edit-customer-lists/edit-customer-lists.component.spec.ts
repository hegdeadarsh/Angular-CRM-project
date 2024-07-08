import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerListsComponent } from './edit-customer-lists.component';

describe('EditCustomerListsComponent', () => {
  let component: EditCustomerListsComponent;
  let fixture: ComponentFixture<EditCustomerListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCustomerListsComponent]
    });
    fixture = TestBed.createComponent(EditCustomerListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
