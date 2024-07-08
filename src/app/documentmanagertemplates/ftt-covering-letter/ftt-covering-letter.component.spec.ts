import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FttCoveringLetterComponent } from './ftt-covering-letter.component';

describe('FttCoveringLetterComponent', () => {
  let component: FttCoveringLetterComponent;
  let fixture: ComponentFixture<FttCoveringLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FttCoveringLetterComponent]
    });
    fixture = TestBed.createComponent(FttCoveringLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
