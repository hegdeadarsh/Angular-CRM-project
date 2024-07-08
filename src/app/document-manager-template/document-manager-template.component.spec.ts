import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagerTemplateComponent } from './document-manager-template.component';

describe('DocumentManagerTemplateComponent', () => {
  let component: DocumentManagerTemplateComponent;
  let fixture: ComponentFixture<DocumentManagerTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentManagerTemplateComponent]
    });
    fixture = TestBed.createComponent(DocumentManagerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
