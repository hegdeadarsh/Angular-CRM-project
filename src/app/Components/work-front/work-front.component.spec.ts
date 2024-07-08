import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFrontComponent } from './work-front.component';

describe('WorkFrontComponent', () => {
  let component: WorkFrontComponent;
  let fixture: ComponentFixture<WorkFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkFrontComponent]
    });
    fixture = TestBed.createComponent(WorkFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
