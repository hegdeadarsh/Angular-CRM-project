import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtemplateComponent } from './quotationtemplate.component';

describe('QuotationtemplateComponent', () => {
  let component: QuotationtemplateComponent;
  let fixture: ComponentFixture<QuotationtemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationtemplateComponent]
    });
    fixture = TestBed.createComponent(QuotationtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
