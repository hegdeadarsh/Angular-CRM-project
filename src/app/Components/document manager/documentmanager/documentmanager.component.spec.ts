import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmanagerComponent } from './documentmanager.component';

describe('DocumentmanagerComponent', () => {
  let component: DocumentmanagerComponent;
  let fixture: ComponentFixture<DocumentmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentmanagerComponent]
    });
    fixture = TestBed.createComponent(DocumentmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
