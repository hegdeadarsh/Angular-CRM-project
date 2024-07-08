import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolloUpListComponent } from './follo-up-list.component';

describe('FolloUpListComponent', () => {
  let component: FolloUpListComponent;
  let fixture: ComponentFixture<FolloUpListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolloUpListComponent]
    });
    fixture = TestBed.createComponent(FolloUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
