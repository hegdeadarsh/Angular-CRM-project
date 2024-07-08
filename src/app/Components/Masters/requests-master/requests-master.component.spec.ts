import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsMasterComponent } from './requests-master.component';

describe('RequestsMasterComponent', () => {
  let component: RequestsMasterComponent;
  let fixture: ComponentFixture<RequestsMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsMasterComponent]
    });
    fixture = TestBed.createComponent(RequestsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
