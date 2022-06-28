import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCheckDuplicateComponent } from './node-check-duplicate.component';

describe('NodeCheckDuplicateComponent', () => {
  let component: NodeCheckDuplicateComponent;
  let fixture: ComponentFixture<NodeCheckDuplicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCheckDuplicateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCheckDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
