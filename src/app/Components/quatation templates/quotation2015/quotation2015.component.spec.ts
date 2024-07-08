import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotation2015Component } from './quotation2015.component';

describe('Quotation2015Component', () => {
  let component: Quotation2015Component;
  let fixture: ComponentFixture<Quotation2015Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quotation2015Component]
    });
    fixture = TestBed.createComponent(Quotation2015Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
