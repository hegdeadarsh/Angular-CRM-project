import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestqmComponent } from './testqm.component';

describe('TestqmComponent', () => {
  let component: TestqmComponent;
  let fixture: ComponentFixture<TestqmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestqmComponent]
    });
    fixture = TestBed.createComponent(TestqmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
