import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandsMasterComponent } from './sands-master.component';

describe('SandsMasterComponent', () => {
  let component: SandsMasterComponent;
  let fixture: ComponentFixture<SandsMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SandsMasterComponent]
    });
    fixture = TestBed.createComponent(SandsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
