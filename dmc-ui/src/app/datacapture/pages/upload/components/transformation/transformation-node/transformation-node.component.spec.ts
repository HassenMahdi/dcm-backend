import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationNodeComponent } from './transformation-node.component';

describe('TransformationNodeComponent', () => {
  let component: TransformationNodeComponent;
  let fixture: ComponentFixture<TransformationNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformationNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
