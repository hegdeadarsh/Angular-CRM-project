import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotation4020Component } from './quotation4020.component';

describe('Quotation4020Component', () => {
  let component: Quotation4020Component;
  let fixture: ComponentFixture<Quotation4020Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quotation4020Component]
    });
    fixture = TestBed.createComponent(Quotation4020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
