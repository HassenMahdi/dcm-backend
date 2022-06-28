import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeCalculcatorComponent } from './node-calculcator-component.component';

describe('NodeCalculcatorComponent', () => {
  let component: NodeCalculcatorComponent;
  let fixture: ComponentFixture<NodeCalculcatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeCalculcatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCalculcatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
