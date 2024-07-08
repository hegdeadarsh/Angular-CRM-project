import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMailTemplateComponent } from './document-mail-template.component';

describe('DocumentMailTemplateComponent', () => {
  let component: DocumentMailTemplateComponent;
  let fixture: ComponentFixture<DocumentMailTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentMailTemplateComponent]
    });
    fixture = TestBed.createComponent(DocumentMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
