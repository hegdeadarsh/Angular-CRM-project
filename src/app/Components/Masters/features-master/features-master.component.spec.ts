import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesMasterComponent } from './features-master.component';

describe('FeaturesMasterComponent', () => {
  let component: FeaturesMasterComponent;
  let fixture: ComponentFixture<FeaturesMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesMasterComponent]
    });
    fixture = TestBed.createComponent(FeaturesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
