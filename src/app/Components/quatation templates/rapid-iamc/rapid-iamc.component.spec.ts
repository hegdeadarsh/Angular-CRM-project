import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidIAMCComponent } from './rapid-iamc.component';

describe('RapidIAMCComponent', () => {
  let component: RapidIAMCComponent;
  let fixture: ComponentFixture<RapidIAMCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapidIAMCComponent]
    });
    fixture = TestBed.createComponent(RapidIAMCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
