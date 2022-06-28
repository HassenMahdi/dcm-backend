import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodePycodeComponent } from './node-pycode.component';

describe('NodePycodeComponent', () => {
  let component: NodePycodeComponent;
  let fixture: ComponentFixture<NodePycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodePycodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
