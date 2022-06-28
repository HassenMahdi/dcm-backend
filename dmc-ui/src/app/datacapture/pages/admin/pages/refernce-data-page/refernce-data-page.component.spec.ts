import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefernceDataPageComponent } from './refernce-data-page.component';

describe('RefernceDataPageComponent', () => {
  let component: RefernceDataPageComponent;
  let fixture: ComponentFixture<RefernceDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefernceDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefernceDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
