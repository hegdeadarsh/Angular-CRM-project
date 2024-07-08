import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quatation4020HTComponent } from './quatation4020-ht.component';

describe('Quatation4020HTComponent', () => {
  let component: Quatation4020HTComponent;
  let fixture: ComponentFixture<Quatation4020HTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Quatation4020HTComponent]
    });
    fixture = TestBed.createComponent(Quatation4020HTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
