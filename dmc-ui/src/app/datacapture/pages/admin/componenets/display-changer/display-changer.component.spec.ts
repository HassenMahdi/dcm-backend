import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayChangerComponent } from './display-changer.component';

describe('DisplayChangerComponent', () => {
  let component: DisplayChangerComponent;
  let fixture: ComponentFixture<DisplayChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
