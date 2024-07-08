import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationFEMAComponent } from './declaration-fema.component';

describe('DeclarationFEMAComponent', () => {
  let component: DeclarationFEMAComponent;
  let fixture: ComponentFixture<DeclarationFEMAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationFEMAComponent]
    });
    fixture = TestBed.createComponent(DeclarationFEMAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
