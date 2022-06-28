import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseNodeTransformationComponent } from './base-node-transformation.component';

describe('BaseNodeTransformationComponent', () => {
  let component: BaseNodeTransformationComponent;
  let fixture: ComponentFixture<BaseNodeTransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseNodeTransformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseNodeTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
