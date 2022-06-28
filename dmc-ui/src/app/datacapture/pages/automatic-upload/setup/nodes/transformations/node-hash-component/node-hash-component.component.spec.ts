import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeHashComponent } from './node-hash-component.component';

describe('NodeHashComponent', () => {
  let component: NodeHashComponent;
  let fixture: ComponentFixture<NodeHashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeHashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
