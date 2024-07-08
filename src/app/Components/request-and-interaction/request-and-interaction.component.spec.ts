import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAndInteractionComponent } from './request-and-interaction.component';

describe('RequestAndInteractionComponent', () => {
  let component: RequestAndInteractionComponent;
  let fixture: ComponentFixture<RequestAndInteractionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestAndInteractionComponent]
    });
    fixture = TestBed.createComponent(RequestAndInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
