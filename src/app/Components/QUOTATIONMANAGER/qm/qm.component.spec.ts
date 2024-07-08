import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QMComponent } from './qm.component';

describe('QMComponent', () => {
  let component: QMComponent;
  let fixture: ComponentFixture<QMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QMComponent]
    });
    fixture = TestBed.createComponent(QMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
