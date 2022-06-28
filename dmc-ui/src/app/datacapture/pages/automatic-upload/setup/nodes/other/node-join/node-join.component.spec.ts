import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeJoinComponent } from './node-join.component';

describe('NodeJoinComponent', () => {
  let component: NodeJoinComponent;
  let fixture: ComponentFixture<NodeJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
