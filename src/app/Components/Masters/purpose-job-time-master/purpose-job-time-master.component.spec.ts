import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurposeJobTimeMasterComponent } from './purpose-job-time-master.component';

describe('PurposeJobTimeMasterComponent', () => {
  let component: PurposeJobTimeMasterComponent;
  let fixture: ComponentFixture<PurposeJobTimeMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurposeJobTimeMasterComponent]
    });
    fixture = TestBed.createComponent(PurposeJobTimeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
