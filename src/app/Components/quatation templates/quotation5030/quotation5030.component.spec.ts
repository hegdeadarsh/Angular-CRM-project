import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotation5030Component } from './quotation5030.component';

describe('Quotation5030Component', () => {
  let component: Quotation5030Component;
  let fixture: ComponentFixture<Quotation5030Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quotation5030Component]
    });
    fixture = TestBed.createComponent(Quotation5030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
