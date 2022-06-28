import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationSaverComponent } from './transformation-saver.component';

describe('TransformationSaverComponent', () => {
  let component: TransformationSaverComponent;
  let fixture: ComponentFixture<TransformationSaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformationSaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
