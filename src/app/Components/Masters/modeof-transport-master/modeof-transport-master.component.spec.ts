import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeofTransportMasterComponent } from './modeof-transport-master.component';

describe('ModeofTransportMasterComponent', () => {
  let component: ModeofTransportMasterComponent;
  let fixture: ComponentFixture<ModeofTransportMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeofTransportMasterComponent]
    });
    fixture = TestBed.createComponent(ModeofTransportMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
