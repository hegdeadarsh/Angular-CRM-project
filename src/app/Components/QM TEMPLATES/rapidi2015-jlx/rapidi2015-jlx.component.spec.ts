import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapidi2015JLXComponent } from './rapidi2015-jlx.component';

describe('Rapidi2015JLXComponent', () => {
  let component: Rapidi2015JLXComponent;
  let fixture: ComponentFixture<Rapidi2015JLXComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Rapidi2015JLXComponent]
    });
    fixture = TestBed.createComponent(Rapidi2015JLXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
