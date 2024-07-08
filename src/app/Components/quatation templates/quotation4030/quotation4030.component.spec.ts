import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotation4030Component } from './quotation4030.component';

describe('Quotation4030Component', () => {
  let component: Quotation4030Component;
  let fixture: ComponentFixture<Quotation4030Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quotation4030Component]
    });
    fixture = TestBed.createComponent(Quotation4030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
