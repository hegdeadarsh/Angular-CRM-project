import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quotation2015indollorComponent } from './quotation2015indollor.component';

describe('Quotation2015indollorComponent', () => {
  let component: Quotation2015indollorComponent;
  let fixture: ComponentFixture<Quotation2015indollorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quotation2015indollorComponent]
    });
    fixture = TestBed.createComponent(Quotation2015indollorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
