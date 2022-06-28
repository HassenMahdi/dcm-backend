import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeFilterReplaceComponent } from './node-filer-replace-component.component';

describe('NodeFilterReplaceComponent', () => {
  let component: NodeFilterReplaceComponent;
  let fixture: ComponentFixture<NodeFilterReplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeFilterReplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeFilterReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
