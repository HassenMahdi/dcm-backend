import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationLoaderComponent } from './transformation-loader.component';

describe('TransformationLoaderComponent', () => {
  let component: TransformationLoaderComponent;
  let fixture: ComponentFixture<TransformationLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformationLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
