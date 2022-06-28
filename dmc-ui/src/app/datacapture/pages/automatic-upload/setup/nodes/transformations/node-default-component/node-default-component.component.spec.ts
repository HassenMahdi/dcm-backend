import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDefaultComponent } from './node-default-component.component';

describe('NodeDefaultComponent', () => {
  let component: NodeDefaultComponent;
  let fixture: ComponentFixture<NodeDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
