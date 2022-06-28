import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDeleteRowComponent } from './node-delete-row-component.component';

describe('NodeDeleteRowComponent', () => {
  let component: NodeDeleteRowComponent;
  let fixture: ComponentFixture<NodeDeleteRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDeleteRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDeleteRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
