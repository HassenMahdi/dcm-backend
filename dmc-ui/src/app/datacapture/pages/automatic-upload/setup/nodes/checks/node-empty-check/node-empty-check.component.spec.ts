import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeEmptyCheckComponent } from './node-empty-check.component';

describe('NodeEmptyCheckComponent', () => {
  let component: NodeEmptyCheckComponent;
  let fixture: ComponentFixture<NodeEmptyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeEmptyCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeEmptyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
