import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotation2015z25Component } from './quotation2015z25.component';

describe('Quotation2015z25Component', () => {
  let component: Quotation2015z25Component;
  let fixture: ComponentFixture<Quotation2015z25Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quotation2015z25Component]
    });
    fixture = TestBed.createComponent(Quotation2015z25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
