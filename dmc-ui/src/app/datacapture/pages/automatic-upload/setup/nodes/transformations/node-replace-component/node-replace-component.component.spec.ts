import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeReplaceComponent } from './node-replace-component.component';

describe('NodeReplaceComponent', () => {
  let component: NodeReplaceComponent;
  let fixture: ComponentFixture<NodeReplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeReplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
