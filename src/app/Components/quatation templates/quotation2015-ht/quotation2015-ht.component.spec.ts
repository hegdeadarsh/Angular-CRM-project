import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotation2015HTComponent } from './quotation2015-ht.component';

describe('Quotation2015HTComponent', () => {
  let component: Quotation2015HTComponent;
  let fixture: ComponentFixture<Quotation2015HTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quotation2015HTComponent]
    });
    fixture = TestBed.createComponent(Quotation2015HTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
