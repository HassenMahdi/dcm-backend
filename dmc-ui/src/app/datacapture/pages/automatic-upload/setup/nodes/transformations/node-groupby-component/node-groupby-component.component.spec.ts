import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGroupbyComponent } from './node-groupby-component.component';

describe('NodeGroupbyComponent', () => {
  let component: NodeGroupbyComponent;
  let fixture: ComponentFixture<NodeGroupbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeGroupbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGroupbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
