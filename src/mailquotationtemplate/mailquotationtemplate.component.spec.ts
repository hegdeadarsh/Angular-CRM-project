import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailquotationtemplateComponent } from './mailquotationtemplate.component';

describe('MailquotationtemplateComponent', () => {
  let component: MailquotationtemplateComponent;
  let fixture: ComponentFixture<MailquotationtemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailquotationtemplateComponent]
    });
    fixture = TestBed.createComponent(MailquotationtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
