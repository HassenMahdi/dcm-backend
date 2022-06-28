import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultChecksComponent } from './default-checks.component';

describe('DefaultChecksComponent', () => {
  let component: DefaultChecksComponent;
  let fixture: ComponentFixture<DefaultChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
