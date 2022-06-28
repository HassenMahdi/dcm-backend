import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationPipeComponent } from './transformation-pipe.component';

describe('TransformationPipeComponent', () => {
  let component: TransformationPipeComponent;
  let fixture: ComponentFixture<TransformationPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformationPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
