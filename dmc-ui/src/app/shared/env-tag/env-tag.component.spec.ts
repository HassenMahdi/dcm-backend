import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvTagComponent } from './env-tag.component';

describe('EnvTagComponent', () => {
  let component: EnvTagComponent;
  let fixture: ComponentFixture<EnvTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
